import { referenceMenu } from "../domain/reference-menu.js";
import {
  categoryIsExpanded,
  categoryScrollBehavior,
  createCompleteMenuModel,
  createInitialMenuReadingState,
  focusCategory,
  showAllCategories,
  showMenuOverview,
} from "./menu-reading.js";

type TestCase = Readonly<{ name: string; run: () => void }>;
const tests: TestCase[] = [];
const test = (name: string, run: () => void): void => {
  tests.push({ name, run });
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

test("initial state starts in compressed menu overview", () => {
  const state = createInitialMenuReadingState(referenceMenu);
  assert(state.expansion.kind === "overview", "initial mode must be overview");
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
  assert(
    referenceMenu.categories.filter((category) => categoryIsExpanded(focused, category.id))
      .length === 1,
    "only one category expands",
  );
});

test("category focus can move while canonical region order remains stable", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const first = referenceMenu.categories[0]?.id;
  const last = referenceMenu.categories.at(-1)?.id;
  assert(first !== undefined && last !== undefined, "edge categories must exist");
  const moved = focusCategory(
    focusCategory(createInitialMenuReadingState(referenceMenu), first),
    last,
  );
  assert(
    moved.expansion.kind === "category" && moved.expansion.categoryId === last,
    "focus moves to requested category",
  );
  assert(
    JSON.stringify(model.categories.map((category) => category.id)) ===
      JSON.stringify(referenceMenu.categories.map((category) => category.id)),
    "category order must remain canonical",
  );
});

test("overview and all-expanded modes are reversible", () => {
  const initial = createInitialMenuReadingState(referenceMenu);
  const all = showAllCategories(initial);
  assert(all.expansion.kind === "all", "all mode must be explicit");
  assert(
    referenceMenu.categories.every((category) => categoryIsExpanded(all, category.id)),
    "all mode expands all six regions",
  );
  const overview = showMenuOverview(all);
  assert(overview.expansion.kind === "overview", "overview must be recoverable");
  assert(
    referenceMenu.categories.every((category) => !categoryIsExpanded(overview, category.id)),
    "overview compresses every region again",
  );
});

test("compressed overview previews at most two canonical available products", () => {
  const model = createCompleteMenuModel(referenceMenu);
  model.categories.forEach((category) => {
    assert(category.previewProductNames.length <= 2, "preview must remain bounded");
    const canonicalAvailable = category.products
      .filter((product) => !product.isSoldOut)
      .slice(0, 2)
      .map((product) => product.name);
    assert(
      JSON.stringify(category.previewProductNames) === JSON.stringify(canonicalAvailable),
      "preview must use canonical available products",
    );
  });
});

test("complete model preserves all products, sold-out placement, and partial metadata", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const products = model.categories.flatMap((category) => category.products);
  assert(products.length === 30, "all 30 products remain reachable");
  assert(
    JSON.stringify(products.map((product) => product.id)) ===
      JSON.stringify(referenceMenu.products.map((product) => product.id)),
    "product order stays canonical",
  );
  assert(
    model.categories.reduce((sum, category) => sum + category.soldOutCount, 0) === 2,
    "both sold-out products remain represented",
  );
  assert(
    model.categories.reduce((sum, category) => sum + category.partialMetadataCount, 0) === 6,
    "all six partial metadata products remain represented",
  );
  const mapoIndex = products.findIndex((product) => product.id === "sichuan-mapo-tofu-pot");
  assert(mapoIndex === 4, "sold-out mapo tofu keeps its canonical position");
});

test("display models never expose raw domain values", () => {
  const visible = JSON.stringify(createCompleteMenuModel(referenceMenu));
  [
    "personal_main",
    "shared_main",
    "one_person",
    "two_to_three",
    "merchant_confirmed",
    "category_default",
  ].forEach((value) => assert(!visible.includes(value), `must not expose ${value}`));
});

test("reading state does not introduce Candidate or ordering state", () => {
  const target = referenceMenu.categories[2]?.id;
  assert(target !== undefined, "reference menu must have a third category");
  const state = focusCategory(createInitialMenuReadingState(referenceMenu), target);
  const serialized = JSON.stringify(state);
  assert(!serialized.includes("candidate"), "Candidate state must not exist in M1");
  assert(!serialized.includes("order"), "ordering state must not exist in M1");
});

test("category scrolling respects reduced motion", () => {
  assert(categoryScrollBehavior(true) === "auto", "reduced motion uses auto");
  assert(categoryScrollBehavior(false) === "smooth", "normal motion may use smooth scrolling");
});

let failures = 0;
for (const testCase of tests) {
  try {
    testCase.run();
    console.log(`✓ ${testCase.name}`);
  } catch (error) {
    failures += 1;
    console.error(`✗ ${testCase.name}`);
    console.error(error);
  }
}
if (failures > 0) throw new Error(`${failures} menu reading test(s) failed`);
console.log(`\n${tests.length} menu reading tests passed.`);
