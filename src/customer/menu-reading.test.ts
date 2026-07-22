import { referenceMenu } from "../domain/reference-menu.js";
import {
  categoryAtlasSize,
  categoryScrollBehavior,
  closeProduct,
  createCompleteMenuModel,
  createInitialMenuReadingState,
  createProductDetailModel,
  isDetailCloseKey,
  openProduct,
} from "./menu-reading.js";

type TestCase = Readonly<{ name: string; run: () => void }>;
const tests: TestCase[] = [];
const test = (name: string, run: () => void): void => {
  tests.push({ name, run });
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

test("complete menu model contains all 30 canonical products", () => {
  const model = createCompleteMenuModel(referenceMenu);
  assert(model.productCount === 30, "overview count must be 30");
  assert(
    model.categories.flatMap((category) => category.products).length === 30,
    "all products must remain in one complete menu",
  );
});

test("atlas and menu use the same ordered category collection", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const expectedCounts = [8, 6, 6, 4, 4, 2];
  assert(model.categories.length === referenceMenu.categories.length, "all categories must appear");
  assert(
    model.atlasCategories.length === model.categories.length,
    "atlas must represent every complete-menu category",
  );

  model.categories.forEach((category, index) => {
    const atlasCategory = model.atlasCategories[index];
    assert(category.id === referenceMenu.categories[index]?.id, "category order must stay canonical");
    assert(category.productCount === expectedCounts[index], "category count must be correct");
    assert(atlasCategory?.id === category.id, "atlas order must match the complete menu");
    assert(
      atlasCategory.availableCount + atlasCategory.soldOutCount === category.productCount,
      "atlas availability counts must cover the whole category",
    );
  });
});

test("atlas size tiers reflect category scale without reordering", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const sizes = model.atlasCategories.map((category) => category.size);
  assert(
    JSON.stringify(sizes) ===
      JSON.stringify(["large", "medium", "medium", "medium", "medium", "small"]),
    "atlas size tiers must reflect the canonical category counts",
  );
  assert(categoryAtlasSize(7) === "large", "seven products should be a large region");
  assert(categoryAtlasSize(4) === "medium", "four products should be a medium region");
  assert(categoryAtlasSize(3) === "small", "three products should be a small region");
});

test("atlas summaries and representatives use only supported menu data", () => {
  const model = createCompleteMenuModel(referenceMenu);
  model.atlasCategories.forEach((atlasCategory, index) => {
    const menuCategory = model.categories[index];
    const expectedRepresentatives = menuCategory?.products
      .filter((product) => !product.isSoldOut)
      .slice(0, 3)
      .map((product) => product.name);

    assert(atlasCategory.structuralSummary.length > 0, "atlas summary must not be empty");
    assert(
      JSON.stringify(atlasCategory.representativeProducts) ===
        JSON.stringify(expectedRepresentatives),
      "representative products must keep canonical available-product order",
    );
  });

  const visibleText = JSON.stringify(model.atlasCategories);
  ["personal_main", "shared_main", "merchant_confirmed", "category_default"].forEach(
    (rawValue) => assert(!visibleText.includes(rawValue), `atlas must not expose ${rawValue}`),
  );
});

test("atlas keeps sold-out and incomplete metadata visible as aggregate signals", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const soldOutCount = model.atlasCategories.reduce(
    (total, category) => total + category.soldOutCount,
    0,
  );
  const partialMetadataCount = model.atlasCategories.reduce(
    (total, category) => total + category.partialMetadataCount,
    0,
  );
  assert(soldOutCount === 2, "atlas must account for both sold-out products");
  assert(partialMetadataCount === 6, "atlas must account for all partial metadata products");
});

test("sold-out products remain at their canonical positions", () => {
  const model = createCompleteMenuModel(referenceMenu);
  const products = model.categories.flatMap((category) => category.products);
  const mapoIndex = products.findIndex((product) => product.id === "sichuan-mapo-tofu-pot");
  assert(mapoIndex === 4, "sold-out mapo tofu must keep its original position");
  assert(products[mapoIndex]?.isSoldOut === true, "sold-out state must be explicit");
});

test("incomplete metadata products remain readable and openable", () => {
  const detail = createProductDetailModel(referenceMenu, "black-garlic-beef-short-rib");
  assert(detail.title === "黑蒜胡椒牛小排", "detail must resolve by stable ProductId");
  assert(detail.metadataNotice !== null, "partial metadata must be explained without guessing");
  assert(detail.facts.length > 0, "category defaults may still provide supported facts");
});

test("opening another product replaces the prior detail state", () => {
  const initial = createInitialMenuReadingState(referenceMenu);
  const first = openProduct(initial, "miso-grilled-chicken-set");
  const second = openProduct(first, "lemon-koji-salmon-set");
  assert(second.expandedProductId === "lemon-koji-salmon-set", "only the newest detail stays open");
  const closed = closeProduct(second);
  assert(closed.state.expandedProductId === null, "close must clear the expanded product");
  assert(
    closed.focusProductId === "lemon-koji-salmon-set",
    "close must identify the original focus-return target",
  );
});

test("display transformations never expose domain enum strings", () => {
  const detail = createProductDetailModel(referenceMenu, "sansho-roast-half-chicken");
  const visibleText = JSON.stringify(detail);
  ["personal_main", "shared_main", "two_to_three", "large_shared", "merchant_confirmed", "category_default"].forEach(
    (rawValue) => assert(!visibleText.includes(rawValue), `must not expose ${rawValue}`),
  );
});

test("category scrolling uses auto for reduced motion", () => {
  assert(
    categoryScrollBehavior(true) === "auto",
    "reduced motion must disable smooth category scrolling",
  );
});

test("category scrolling uses smooth for normal motion", () => {
  assert(
    categoryScrollBehavior(false) === "smooth",
    "normal motion may use smooth category scrolling",
  );
});

test("Escape is the keyboard close command", () => {
  assert(isDetailCloseKey("Escape"), "Escape must close detail");
  assert(!isDetailCloseKey("Enter"), "Enter must not be treated as close");
});

test("the menu-map slice contains no ordering workspace state", () => {
  const state = createInitialMenuReadingState(referenceMenu);
  const serialized = JSON.stringify(state);
  assert(!serialized.includes("candidate"), "Candidate state must not start in this slice");
  assert(!serialized.includes("order"), "Current order state must not start in this slice");
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
