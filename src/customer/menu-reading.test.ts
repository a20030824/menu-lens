import { referenceMenu } from "../domain/reference-menu.js";
import {
  categoryIsExpanded,
  categoryScrollBehavior,
  createCompleteMenuModel,
  createInitialMenuReadingState,
  focusCategory,
  setReadingAxis,
  showAllCategories,
  showMenuOverview,
} from "./menu-reading.js";

type TestCase = Readonly<{ name: string; run: () => void }>;
const tests: TestCase[] = [];
const test = (name: string, run: () => void): void => { tests.push({ name, run }); };
function assert(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }

const firstCategoryId = referenceMenu.categories[0]?.id;
const secondCategoryId = referenceMenu.categories[1]?.id;
assert(firstCategoryId !== undefined, "fixture must include a first category");
assert(secondCategoryId !== undefined, "fixture must include a second category");

test("initial state starts in overview with the default axis", () => {
  const state = createInitialMenuReadingState(referenceMenu);
  assert(state.expansion.kind === "overview", "initial mode must be overview");
  assert(state.readingAxis === "default", "initial axis must be default");
  referenceMenu.categories.forEach((category) =>
    assert(!categoryIsExpanded(state, category.id), "overview keeps every category compressed"),
  );
});

test("single-category mode can change the reading axis", () => {
  const focused = focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId);
  const changed = setReadingAxis(focused, "price");
  assert(changed.readingAxis === "price", "single-category mode must accept an axis");
  assert(changed.expansion === focused.expansion, "axis change must preserve the expansion object");
});

test("returning to overview resets the axis", () => {
  const changed = setReadingAxis(
    focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId),
    "portion",
  );
  assert(showMenuOverview(changed).readingAxis === "default", "overview must reset the axis");
});

test("changing category resets the axis", () => {
  const changed = setReadingAxis(
    focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId),
    "role",
  );
  const next = focusCategory(changed, secondCategoryId);
  assert(next.readingAxis === "default", "category change must reset the axis");
  assert(next.activeCategoryId === secondCategoryId, "new category must become active");
});

test("all-expanded mode never retains a non-default axis", () => {
  const changed = setReadingAxis(
    focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId),
    "preparation",
  );
  const all = showAllCategories(changed);
  assert(all.readingAxis === "default", "all-expanded mode must use default");
  assert(setReadingAxis(all, "price").readingAxis === "default", "all-expanded mode must reject axis changes");
});

test("axis changes preserve category expansion", () => {
  const focused = focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId);
  const changed = setReadingAxis(focused, "price");
  assert(changed.expansion.kind === "category" && changed.expansion.categoryId === firstCategoryId, "axis must not alter expansion");
  assert(referenceMenu.categories.filter((category) => categoryIsExpanded(changed, category.id)).length === 1, "exactly one category remains expanded");
});

test("complete model preserves canonical product order for every axis", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const productIds = model.categories.flatMap((category) => category.products.map((product) => product.id));
  assert(JSON.stringify(productIds) === JSON.stringify(referenceMenu.products.map((product) => product.id)), "model order must remain canonical");
  const before = JSON.stringify(productIds);
  ["default", "price", "portion", "role", "preparation"].forEach((axis) => {
    const state = setReadingAxis(
      focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId),
      axis as "default" | "price" | "portion" | "role" | "preparation",
    );
    assert(state.expansion.kind === "category", "axis state must remain category mode");
    assert(JSON.stringify(model.categories.flatMap((category) => category.products.map((product) => product.id))) === before, "axis state must not reorder products");
  });
});

test("category models expose only axes that can reduce product-by-product reading", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const personal = model.categories.find((category) => category.id === "personal-mains");
  const shared = model.categories.find((category) => category.id === "shared-dishes");
  const desserts = model.categories.find((category) => category.id === "desserts");
  assert(personal !== undefined && shared !== undefined && desserts !== undefined, "fixture categories must exist");
  assert(JSON.stringify(personal.readingAxes) === JSON.stringify(["default", "price", "preparation"]), "personal mains should offer only differing category-local evidence");
  assert(JSON.stringify(shared.readingAxes) === JSON.stringify(["default", "price", "portion", "preparation"]), "shared dishes should expose price, portion uncertainty, and preparation differences");
  assert(JSON.stringify(desserts.readingAxes) === JSON.stringify(["default"]), "two desserts cannot satisfy the three-product relational gate");
  assert(model.categories.every((category) => !category.readingAxes.includes("role")), "meal role must not be repeated row-by-row when it only restates category structure");
});

test("sold-out and partial metadata products remain in the shared ledger", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const products = model.categories.flatMap((category) => category.products);
  assert(products.length === referenceMenu.products.length, "all products remain reachable");
  assert(model.categories.reduce((sum, category) => sum + category.soldOutCount, 0) === 2, "both sold-out products remain represented");
  assert(model.categories.reduce((sum, category) => sum + category.partialMetadataCount, 0) === 6, "all partial metadata products remain represented");
  assert(products.findIndex((product) => product.id === "sichuan-mapo-tofu-pot") === 4, "sold-out mapo tofu keeps its canonical position");
});

test("reading state introduces no anchor, Candidate, Comparison, or order state", () => {
  const state = setReadingAxis(
    focusCategory(createInitialMenuReadingState(referenceMenu), firstCategoryId),
    "price",
  );
  const serialized = JSON.stringify(state).toLowerCase();
  ["anchor", "candidate", "comparison", "order", "detail", "productid"].forEach((term) =>
    assert(!serialized.includes(term), `${term} state must remain absent`),
  );
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
