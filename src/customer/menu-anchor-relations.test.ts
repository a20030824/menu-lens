import type { Product } from "../domain/menu-types.js";
import { referenceMenu } from "../domain/reference-menu.js";
import {
  anchorRelationFor,
  portionRelationToken,
  preparationRelationToken,
  priceRelationToken,
} from "./menu-anchor-relations.js";
import { formatPrice } from "./menu-reading.js";

type TestCase = Readonly<{ name: string; run: () => void }>;
const tests: TestCase[] = [];
const test = (name: string, run: () => void): void => { tests.push({ name, run }); };
function assert(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }

const product = (id: string): Product => {
  const match = referenceMenu.products.find((entry) => entry.id === id);
  if (!match) throw new Error(`Missing product fixture: ${id}`);
  return match;
};

const anchor = product("sansho-roast-half-chicken");
const cheaper = product("shaoxing-butter-prawns");
const faster = product("garlic-salt-pepper-soft-shell-crab");
const unknownPortion = product("black-bean-steamed-seabass");

const withPrice = (source: Product, id: string, price: number): Product => ({ ...source, id, price });

test("price relation emits exact lower, higher, and equal deltas", () => {
  const lower = priceRelationToken(anchor, cheaper, formatPrice);
  const higher = priceRelationToken(cheaper, anchor, formatPrice);
  const equal = priceRelationToken(anchor, withPrice(cheaper, "same-price", anchor.price), formatPrice);
  assert(lower.label === `少 ${formatPrice(40)}`, "cheaper target must expose the exact lower delta");
  assert(higher.label === `多 ${formatPrice(40)}`, "higher target must expose the exact higher delta");
  assert(equal.label === "同價", "equal prices must remain explicit");
});

test("portion relation emits larger, smaller, equal, and unknown states", () => {
  assert(portionRelationToken(referenceMenu, anchor, cheaper).label === "份量較小", "default shared portion is smaller than large shared");
  assert(portionRelationToken(referenceMenu, cheaper, anchor).label === "份量較大", "large shared is larger than default shared portion");
  assert(portionRelationToken(referenceMenu, cheaper, faster).label === "同份量", "equal trusted portions stay equal");
  const unknown = portionRelationToken(referenceMenu, anchor, unknownPortion);
  assert(unknown.label === "份量未知" && unknown.status === "unknown", "low-confidence data must prevent direction claims");
});

test("preparation relation emits faster, slower, and equal states", () => {
  assert(preparationRelationToken(referenceMenu, anchor, faster).label === "較快", "fast target must compare faster than slow anchor");
  assert(preparationRelationToken(referenceMenu, faster, anchor).label === "較久", "slow target must compare slower than fast anchor");
  assert(preparationRelationToken(referenceMenu, cheaper, unknownPortion).label === "同節奏", "equal trusted preparation values stay equal");
});

test("composed relation uses price plus at most one deterministic semantic token", () => {
  const portionFirst = anchorRelationFor(referenceMenu, anchor, cheaper, formatPrice);
  assert(portionFirst.kind === "relative", "non-anchor products must produce relative evidence");
  assert(portionFirst.tokens.length === 2, "visible output is bounded to two tokens");
  assert(portionFirst.tokens[0]?.kind === "price", "price must be the first token");
  assert(portionFirst.tokens[1]?.kind === "portion", "portion difference must take priority");

  const preparationFallback = anchorRelationFor(referenceMenu, cheaper, faster, formatPrice);
  assert(preparationFallback.kind === "relative", "non-anchor products must remain relative");
  assert(preparationFallback.tokens[1]?.kind === "preparation", "preparation appears when portion is equal");
});

test("the anchor row is factual and recommendation language never appears", () => {
  const anchorValue = anchorRelationFor(referenceMenu, anchor, anchor, formatPrice);
  assert(anchorValue.kind === "anchor" && anchorValue.label === "比較基準", "anchor row must identify the reference only");

  const visible = JSON.stringify(
    referenceMenu.products
      .filter((entry) => entry.categoryId === anchor.categoryId)
      .map((entry) => anchorRelationFor(referenceMenu, anchor, entry, formatPrice)),
  );
  ["比較好", "更適合", "最接近", "推薦", "最佳", "最划算", "CP 值", "相似商品", "替代方案", "應該選"].forEach((phrase) =>
    assert(!visible.includes(phrase), `anchor projection must not emit ${phrase}`),
  );
});

let failures = 0;
for (const testCase of tests) {
  try { testCase.run(); console.log(`✓ ${testCase.name}`); }
  catch (error) { failures += 1; console.error(`✗ ${testCase.name}`); console.error(error); }
}
if (failures > 0) throw new Error(`${failures} anchor relation test(s) failed`);
console.log(`\n${tests.length} anchor relation tests passed.`);
