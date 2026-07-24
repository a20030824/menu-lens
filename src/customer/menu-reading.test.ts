import { referenceMenu } from "../domain/reference-menu.js";
import {
  beginAnchorSelection,
  cancelAnchorSelection,
  categoryIsExpanded,
  categoryScrollBehavior,
  clearAnchor,
  createCompleteMenuModel,
  createInitialMenuReadingState,
  focusCategory,
  isAnchorSelectionCancelKey,
  selectAnchor,
  showAllCategories,
  showMenuOverview,
} from "./menu-reading.js";

type TestCase = Readonly<{ name: string; run: () => void }>;
const tests: TestCase[] = [];
const test = (name: string, run: () => void): void => { tests.push({ name, run }); };
function assert(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }

const firstCategoryId = referenceMenu.categories[0]?.id;
const secondCategoryId = referenceMenu.categories[1]?.id;
const firstProductId = referenceMenu.products.find((product) => product.categoryId === firstCategoryId)?.id;
const secondProductId = referenceMenu.products.find(
  (product) => product.categoryId === firstCategoryId && product.id !== firstProductId,
)?.id;
const otherCategoryProductId = referenceMenu.products.find((product) => product.categoryId === secondCategoryId)?.id;
assert(firstCategoryId !== undefined, "fixture must include a first category");
assert(secondCategoryId !== undefined, "fixture must include a second category");
assert(firstProductId !== undefined && secondProductId !== undefined, "fixture must include two products in the first category");
assert(otherCategoryProductId !== undefined, "fixture must include a product in another category");

test("initial state starts in overview without an anchor", () => {
  const state = createInitialMenuReadingState(referenceMenu);
  assert(state.expansion.kind === "overview", "initial mode must be overview");
  assert(state.anchorReading.kind === "idle", "initial anchor state must be idle");
  referenceMenu.categories.forEach((category) =>
    assert(!categoryIsExpanded(state, category.id), "overview keeps every category compressed"),
  );
});

test("selection mode preserves the focused category and canonical expansion", () => {
  const focused = focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId);
  const selecting = beginAnchorSelection(focused);
  assert(selecting.anchorReading.kind === "selecting", "focused category may enter anchor selection");
  assert(selecting.expansion === focused.expansion, "selection must preserve the expansion object");
  assert(referenceMenu.categories.filter((category) => categoryIsExpanded(selecting, category.id)).length === 1, "exactly one category remains expanded");
});

test("cancelling selection returns to idle without changing category position", () => {
  const focused = focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId);
  const cancelled = cancelAnchorSelection(beginAnchorSelection(focused));
  assert(cancelled.anchorReading.kind === "idle", "cancel must leave no anchor");
  assert(cancelled.expansion === focused.expansion, "cancel must preserve category expansion");
  assert(cancelled.activeCategoryId === firstCategoryId, "cancel must preserve active category");
});

test("selecting and changing an anchor stores exactly one category-local ProductId", () => {
  const focused = focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId);
  const first = selectAnchor(beginAnchorSelection(focused), referenceMenu, firstProductId);
  assert(first.anchorReading.kind === "active" && first.anchorReading.productId === firstProductId, "first product becomes the anchor");

  const changed = selectAnchor(beginAnchorSelection(first), referenceMenu, secondProductId);
  assert(changed.anchorReading.kind === "active" && changed.anchorReading.productId === secondProductId, "new anchor replaces the prior ProductId");
  assert(JSON.stringify(changed).split(firstProductId).length === 1, "prior ProductId must not accumulate in state");

  const invalid = selectAnchor(beginAnchorSelection(changed), referenceMenu, otherCategoryProductId);
  assert(invalid.anchorReading.kind === "selecting", "a product outside the active category cannot become the anchor");
});

test("overview, all-expanded mode, category changes, and clear reset the anchor", () => {
  const active = selectAnchor(
    beginAnchorSelection(focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId)),
    referenceMenu,
    firstProductId,
  );
  assert(showMenuOverview(active).anchorReading.kind === "idle", "overview clears the anchor");
  assert(showAllCategories(active).anchorReading.kind === "idle", "all-expanded mode clears the anchor");
  assert(focusCategory(active, secondCategoryId).anchorReading.kind === "idle", "category change clears the anchor");
  assert(clearAnchor(active).anchorReading.kind === "idle", "explicit clear removes the anchor");
});

test("complete model preserves canonical product order", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const productIds = model.categories.flatMap((category) => category.products.map((product) => product.id));
  assert(JSON.stringify(productIds) === JSON.stringify(referenceMenu.products.map((product) => product.id)), "model order must remain canonical");
});

test("sold-out and partial metadata products remain in the shared ledger", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const products = model.categories.flatMap((category) => category.products);
  assert(products.length === referenceMenu.products.length, "all products remain reachable");
  assert(model.categories.reduce((sum, category) => sum + category.soldOutCount, 0) === 2, "both sold-out products remain represented");
  assert(model.categories.reduce((sum, category) => sum + category.partialMetadataCount, 0) === 6, "all partial metadata products remain represented");
  assert(products.findIndex((product) => product.id === "sichuan-mapo-tofu-pot") === 4, "sold-out mapo tofu keeps its canonical position");
});

test("Prototype B state introduces no axis, Candidate, Comparison, detail, configuration, or order state", () => {
  const state = selectAnchor(
    beginAnchorSelection(focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId)),
    referenceMenu,
    firstProductId,
  );
  const serialized = JSON.stringify(state).toLowerCase();
  ["readingaxis", "candidate", "comparison", "detail", "configuration", "quantity", "order"].forEach((term) =>
    assert(!serialized.includes(term), `${term} state must remain absent`),
  );
});

test("Escape cancels only temporary selection", () => {
  assert(isAnchorSelectionCancelKey("Escape"), "Escape may cancel selecting state");
  assert(!isAnchorSelectionCancelKey("Enter"), "Enter is not a cancel key");
  const active = selectAnchor(
    beginAnchorSelection(focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId)),
    referenceMenu,
    firstProductId,
  );
  assert(cancelAnchorSelection(active) === active, "cancel helper must not clear an active anchor");
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
