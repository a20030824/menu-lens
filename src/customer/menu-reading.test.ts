import { referenceMenu } from "../domain/reference-menu.js";
import {
  categoryIsExpanded,
  categoryScrollBehavior,
  closeProductDetail,
  collapseProductDetail,
  createCompleteMenuModel,
  createInitialMenuReadingState,
  expandProductDetail,
  focusCategory,
  focusProduct,
  productDetailFor,
  showAllCategories,
  showMenuOverview,
} from "./menu-reading.js";

type TestCase = Readonly<{ name: string; run: () => void }>;
const tests: TestCase[] = [];
const test = (name: string, run: () => void): void => { tests.push({ name, run }); };
function assert(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }

const firstProductId = referenceMenu.products[0]?.id;
assert(firstProductId !== undefined, "fixture must include a first product");

test("initial state starts in compressed menu overview with product detail closed", () => {
  const state = createInitialMenuReadingState(referenceMenu);
  assert(state.expansion.kind === "overview", "initial mode must be overview");
  assert(state.focusedProductId === null, "initial product focus must be empty");
  assert(state.detailLevel === "closed", "initial detail must be closed");
  referenceMenu.categories.forEach((category) =>
    assert(!categoryIsExpanded(state, category.id), "overview keeps every category compressed"),
  );
});

test("category focus expands exactly one region without removing the others", () => {
  const initial = createInitialMenuReadingState(referenceMenu);
  const target = referenceMenu.categories[2]?.id;
  assert(target !== undefined, "third category must exist");
  const focused = focusCategory(initial, target);
  assert(focused.expansion.kind === "category", "state must enter category focus");
  assert(focused.activeCategoryId === target, "focused category becomes active");
  assert(referenceMenu.categories.filter((category) => categoryIsExpanded(focused, category.id)).length === 1, "only one category expands");
});

test("opening product detail preserves the current category expansion", () => {
  const categoryId = referenceMenu.categories[0]?.id;
  assert(categoryId !== undefined, "first category must exist");
  const categoryState = focusCategory(createInitialMenuReadingState(referenceMenu), categoryId);
  const focused = focusProduct(categoryState, firstProductId);
  assert(focused.expansion.kind === "category" && focused.expansion.categoryId === categoryId, "product focus must not alter category expansion");
  assert(focused.focusedProductId === firstProductId, "product becomes focused");
  assert(focused.detailLevel === "summary", "opening starts at summary level");
});

test("product detail summary and full levels are reversible", () => {
  const opened = focusProduct(showAllCategories(createInitialMenuReadingState(referenceMenu)), firstProductId);
  const full = expandProductDetail(opened);
  assert(full.detailLevel === "full", "detail expands to full");
  const summary = collapseProductDetail(full);
  assert(summary.detailLevel === "summary", "detail collapses to summary");
  assert(summary.focusedProductId === firstProductId, "focus remains on the same product");
});

test("closing product detail returns the source product id and preserves expansion", () => {
  const categoryId = referenceMenu.categories[0]?.id;
  assert(categoryId !== undefined, "first category must exist");
  const opened = focusProduct(focusCategory(createInitialMenuReadingState(referenceMenu), categoryId), firstProductId);
  const result = closeProductDetail(opened);
  assert(result.focusProductId === firstProductId, "close result identifies the focus return target");
  assert(result.state.focusedProductId === null && result.state.detailLevel === "closed", "detail state closes completely");
  assert(result.state.expansion.kind === "category" && result.state.expansion.categoryId === categoryId, "closing detail preserves category expansion");
});

test("changing menu expansion closes a product that would become hidden", () => {
  const opened = focusProduct(showAllCategories(createInitialMenuReadingState(referenceMenu)), firstProductId);
  const overview = showMenuOverview(opened);
  assert(overview.focusedProductId === null && overview.detailLevel === "closed", "overview change clears hidden product focus");
});

test("product detail model exposes readable facts without raw metadata enums", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const detail = productDetailFor(model, firstProductId);
  assert(detail !== null, "first product detail must exist");
  assert(detail.description.length > 0, "detail includes product description");
  assert(detail.summaryFacts.length > 0 && detail.summaryFacts.length <= 3, "summary facts remain bounded");
  assert(detail.evidenceFacts.length >= detail.summaryFacts.length, "full evidence remains available");
  const visible = JSON.stringify(detail);
  ["merchant_confirmed", "category_default", "personal_main", "one_person"].forEach((value) =>
    assert(!visible.includes(value), `detail must not expose ${value}`),
  );
});

test("partial, configurable, optional, and sold-out products retain explicit detail notices", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const required = productDetailFor(model, referenceMenu.products[0]?.id ?? null);
  const optional = productDetailFor(model, referenceMenu.products[1]?.id ?? null);
  const partial = productDetailFor(model, referenceMenu.products[24]?.id ?? null);
  const soldOut = productDetailFor(model, "sichuan-mapo-tofu-pot");
  assert(required?.configurationNotice?.includes("需要選擇規格") === true, "required configuration is delayed but explicit");
  assert(optional?.configurationNotice?.includes("可選擇額外規格") === true, "optional configuration is delayed but explicit");
  assert(partial?.metadataNotice !== null, "partial semantics are explicit");
  assert(soldOut?.availabilityLabel === "已售完", "sold-out product detail remains reachable");
});

test("compressed overview previews at most two canonical available products", () => {
  const model = createCompleteMenuModel(referenceMenu);
  model.categories.forEach((category) => {
    assert(category.previewProductNames.length <= 2, "preview must remain bounded");
    const canonicalAvailable = category.products.filter((product) => !product.isSoldOut).slice(0, 2).map((product) => product.name);
    assert(JSON.stringify(category.previewProductNames) === JSON.stringify(canonicalAvailable), "preview must use canonical available products");
  });
});

test("complete model preserves all products, sold-out placement, and partial metadata", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const products = model.categories.flatMap((category) => category.products);
  assert(products.length === 30, "all 30 products remain reachable");
  assert(JSON.stringify(products.map((product) => product.id)) === JSON.stringify(referenceMenu.products.map((product) => product.id)), "product order stays canonical");
  assert(model.categories.reduce((sum, category) => sum + category.soldOutCount, 0) === 2, "both sold-out products remain represented");
  assert(model.categories.reduce((sum, category) => sum + category.partialMetadataCount, 0) === 6, "all six partial metadata products remain represented");
  assert(products.findIndex((product) => product.id === "sichuan-mapo-tofu-pot") === 4, "sold-out mapo tofu keeps its canonical position");
});

test("reading state still does not introduce Candidate or ordering state", () => {
  const state = focusProduct(showAllCategories(createInitialMenuReadingState(referenceMenu)), firstProductId);
  const serialized = JSON.stringify(state);
  assert(!serialized.includes("candidate"), "Candidate state must not exist in M2");
  assert(!serialized.includes("order"), "ordering state must not exist in M2");
});

test("category scrolling respects reduced motion", () => {
  assert(categoryScrollBehavior(true) === "auto", "reduced motion uses auto");
  assert(categoryScrollBehavior(false) === "smooth", "normal motion may use smooth scrolling");
});

let failures = 0;
for (const testCase of tests) {
  try { testCase.run(); console.log(`✓ ${testCase.name}`); }
  catch (error) { failures += 1; console.error(`✗ ${testCase.name}`); console.error(error); }
}
if (failures > 0) throw new Error(`${failures} menu reading test(s) failed`);
console.log(`\n${tests.length} menu reading tests passed.`);
