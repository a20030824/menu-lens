import type { Category, Menu, Product } from "../domain/menu-types.js";
import { referenceMenu } from "../domain/reference-menu.js";
import { axisValueFor, pricePositionFor } from "./menu-relations.js";

type TestCase = Readonly<{ name: string; run: () => void }>;
const tests: TestCase[] = [];
const test = (name: string, run: () => void): void => { tests.push({ name, run }); };
function assert(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }

const category = referenceMenu.categories[0];
assert(category !== undefined, "fixture must include a category");
const categoryProducts = referenceMenu.products.filter((product) => product.categoryId === category.id);
assert(categoryProducts.length >= 2, "fixture category must include products");

const minimumProduct = categoryProducts.reduce((minimum, product) =>
  product.price < minimum.price ? product : minimum,
);
const maximumProduct = categoryProducts.reduce((maximum, product) =>
  product.price > maximum.price ? product : maximum,
);

test("price position uses one category min–max scale", () => {
  assert(pricePositionFor(minimumProduct, categoryProducts).position === 0, "minimum price must start the scale");
  assert(pricePositionFor(maximumProduct, categoryProducts).position === 1, "maximum price must end the scale");
});

test("single-price categories degrade to a centered marker", () => {
  const samePrice = categoryProducts.map((product, index) => ({ ...product, id: `same-${index}`, price: 180 }));
  const projection = pricePositionFor(samePrice[0] as Product, samePrice);
  assert(projection.scale === "single", "same-price category must expose a single scale");
  assert(projection.position === 0.5, "same-price marker must remain safely centered");
});

test("portion, role, and preparation use formal labels", () => {
  const product = categoryProducts[0];
  assert(product !== undefined, "fixture must include a product");
  const portion = axisValueFor(referenceMenu, product, categoryProducts, "portion");
  const role = axisValueFor(referenceMenu, product, categoryProducts, "role");
  const preparation = axisValueFor(referenceMenu, product, categoryProducts, "preparation");
  assert(portion.kind === "text" && portion.label === "一人份", "portion label must use the domain enum");
  assert(role.kind === "text" && role.label === "個人主餐", "role label must use the domain enum");
  assert(preparation.kind === "text" && preparation.label === "一般準備", "preparation label must use the domain enum");
});

const emptyCategory: Category = { id: "unknown", name: "未標註" };
const missingProduct: Product = {
  id: "missing",
  name: "未標註商品",
  description: "測試",
  price: 100,
  categoryId: emptyCategory.id,
  availability: "available",
};
const lowConfidenceProduct: Product = {
  ...missingProduct,
  id: "low-confidence",
  semanticOverrides: {
    portionClass: {
      value: "large_shared",
      source: "merchant_confirmed",
      confidence: "low",
    },
  },
};
const incompleteMenu: Menu = {
  restaurant: referenceMenu.restaurant,
  categories: [emptyCategory],
  modifierGroups: [],
  products: [missingProduct, lowConfidenceProduct],
};

test("missing and low-confidence metadata remain unknown", () => {
  [missingProduct, lowConfidenceProduct].forEach((product) => {
    const value = axisValueFor(incompleteMenu, product, incompleteMenu.products, "portion");
    assert(value.kind === "text" && value.label === "未提供", "unsupported metadata must not be guessed");
    assert(value.status === "unknown", "unknown metadata must stay explicit");
  });
});

test("sold-out products retain axis evidence and canonical position", () => {
  const soldOutIndex = referenceMenu.products.findIndex((product) => product.availability === "sold_out");
  assert(soldOutIndex >= 0, "fixture must include a sold-out product");
  const soldOut = referenceMenu.products[soldOutIndex];
  assert(soldOut !== undefined, "sold-out product must exist");
  const peers = referenceMenu.products.filter((product) => product.categoryId === soldOut.categoryId);
  const value = axisValueFor(referenceMenu, soldOut, peers, "preparation");
  assert(value.kind === "text", "sold-out product must retain axis projection");
  assert(referenceMenu.products[soldOutIndex]?.id === soldOut.id, "projection must not move the product");
});

test("axis projections never emit recommendation language", () => {
  const visible = JSON.stringify(
    referenceMenu.products.flatMap((product) => {
      const peers = referenceMenu.products.filter((entry) => entry.categoryId === product.categoryId);
      return ["price", "portion", "role", "preparation"].map((axis) =>
        axisValueFor(referenceMenu, product, peers, axis as "price" | "portion" | "role" | "preparation"),
      );
    }),
  );
  ["推薦", "最佳", "較適合", "CP 值", "recommended", "best value"].forEach((phrase) =>
    assert(!visible.includes(phrase), `projection must not emit ${phrase}`),
  );
});

let failures = 0;
for (const testCase of tests) {
  try { testCase.run(); console.log(`✓ ${testCase.name}`); }
  catch (error) { failures += 1; console.error(`✗ ${testCase.name}`); console.error(error); }
}
if (failures > 0) throw new Error(`${failures} menu relation test(s) failed`);
console.log(`\n${tests.length} menu relation tests passed.`);
