import { referenceMenu } from "../domain/reference-menu.js";
import {
  categoryScrollBehavior,
  createCompleteMenuModel,
  createInitialMenuReadingState,
  setActiveCategory,
} from "./menu-reading.js";

type TestCase = Readonly<{ name: string; run: () => void }>;
const tests: TestCase[] = [];
const test = (name: string, run: () => void): void => {
  tests.push({ name, run });
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

test("complete menu keeps all canonical products and ordering", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const modelIds = model.categories.flatMap((category) =>
    category.products.map((product) => product.id),
  );
  assert(model.productCount === 30, "product count must stay 30");
  assert(modelIds.length === 30, "all products must remain visible");
  assert(
    JSON.stringify(modelIds) === JSON.stringify(referenceMenu.products.map((product) => product.id)),
    "product ordering must remain canonical",
  );
});

test("category structure uses the canonical six-region order", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const counts = model.categories.map((category) => category.productCount);
  const categoryIds = model.categories.map((category) => category.id);
  assert(
    JSON.stringify(categoryIds) ===
      JSON.stringify(referenceMenu.categories.map((category) => category.id)),
    "category order must stay canonical",
  );
  assert(
    JSON.stringify(counts) === JSON.stringify([8, 6, 6, 4, 4, 2]),
    "category counts must remain 8, 6, 6, 4, 4, 2",
  );
});

test("category proportions are relative to the largest category", () => {
  const proportions = createCompleteMenuModel(referenceMenu).categories.map(
    (category) => category.relativeCount,
  );
  assert(
    JSON.stringify(proportions) === JSON.stringify([1, 0.75, 0.75, 0.5, 0.5, 0.25]),
    "relative proportions must be deterministic",
  );
});

test("compact product nodes expose at most two supported cues", () => {
  const nodes = createCompleteMenuModel(referenceMenu).categories.flatMap(
    (category) => category.products,
  );
  assert(nodes.some((node) => node.primaryCue !== null), "supported cues should be visible");
  nodes.forEach((node) => {
    assert(!("description" in node), "compact nodes must not carry full descriptions");
    const visibleCues = [node.primaryCue, node.secondaryCue].filter(
      (cue): cue is string => cue !== null,
    );
    assert(visibleCues.length <= 2, "compact nodes must expose at most two cues");
  });
});

test("overview preserves sold-out and partial metadata signals", () => {
  const categories = createCompleteMenuModel(referenceMenu).categories;
  assert(
    categories.reduce((sum, category) => sum + category.soldOutCount, 0) === 2,
    "both sold-out products remain represented",
  );
  assert(
    categories.reduce((sum, category) => sum + category.partialMetadataCount, 0) === 6,
    "all six partial metadata products remain represented",
  );
});

test("sold-out products remain in their original positions", () => {
  const products = createCompleteMenuModel(referenceMenu).categories.flatMap(
    (category) => category.products,
  );
  const mapoIndex = products.findIndex((product) => product.id === "sichuan-mapo-tofu-pot");
  assert(mapoIndex === 4, "sold-out mapo tofu must keep its canonical position");
  assert(products[mapoIndex]?.isSoldOut === true, "sold-out state must remain explicit");
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

test("active category state changes without ordering state", () => {
  const initial = createInitialMenuReadingState(referenceMenu);
  const target = referenceMenu.categories[2]?.id;
  assert(target !== undefined, "reference menu must have a third category");
  const next = setActiveCategory(initial, target);
  assert(next.activeCategoryId === target, "active category must update");
  const serialized = JSON.stringify(next);
  assert(!serialized.includes("candidate"), "Candidate state must not exist in this slice");
  assert(!serialized.includes("order"), "ordering state must not exist in this slice");
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
