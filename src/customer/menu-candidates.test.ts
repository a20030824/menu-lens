import { referenceMenu } from "../domain/reference-menu.js";
import {
  addCandidate,
  candidateCount,
  candidateProducts,
  createEmptyCandidateState,
  isCandidate,
  removeCandidate,
  toggleCandidate,
} from "./menu-candidates.js";

type TestCase = Readonly<{ name: string; run: () => void }>;
const tests: TestCase[] = [];
const test = (name: string, run: () => void): void => { tests.push({ name, run }); };
function assert(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }

const availableProducts = referenceMenu.products.filter((product) => product.availability === "available");
const soldOutProduct = referenceMenu.products.find((product) => product.availability === "sold_out");
assert(availableProducts.length >= 3, "fixture must contain at least three available products");
assert(soldOutProduct !== undefined, "fixture must contain a sold-out product");
const first = availableProducts[0];
const second = availableProducts[1];
const later = availableProducts[availableProducts.length - 1];
assert(first !== undefined && second !== undefined && later !== undefined, "fixture products must exist");

test("empty Candidate state contains only Product identity membership", () => {
  const state = createEmptyCandidateState();
  assert(JSON.stringify(state) === JSON.stringify({ productIds: [] }), "empty state must contain only productIds");
  const serialized = JSON.stringify(state).toLowerCase();
  ["quantity", "configuration", "selection", "total", "order", "rank"].forEach((term) =>
    assert(!serialized.includes(term), `${term} must remain absent from Candidate state`),
  );
});

test("adding an available Product creates one unique membership", () => {
  const empty = createEmptyCandidateState();
  const added = addCandidate(empty, referenceMenu, first.id);
  assert(isCandidate(added, first.id), "available product must become a Candidate");
  assert(candidateCount(referenceMenu, added) === 1, "one Candidate must be counted");
  const duplicate = addCandidate(added, referenceMenu, first.id);
  assert(duplicate === added, "duplicate add must be a referential no-op");
  assert(candidateCount(referenceMenu, duplicate) === 1, "duplicate add must not duplicate membership");
});

test("sold-out and invalid Products cannot be newly marked", () => {
  const empty = createEmptyCandidateState();
  assert(addCandidate(empty, referenceMenu, soldOutProduct.id) === empty, "sold-out add must be rejected");
  assert(addCandidate(empty, referenceMenu, "missing-product") === empty, "invalid ProductId add must be rejected");
});

test("removal is reversible and non-member removal is a no-op", () => {
  const added = addCandidate(createEmptyCandidateState(), referenceMenu, first.id);
  const removed = removeCandidate(added, first.id);
  assert(!isCandidate(removed, first.id), "removal must clear Candidate membership");
  assert(candidateCount(referenceMenu, removed) === 0, "removal must update count");
  assert(removeCandidate(removed, first.id) === removed, "removing a non-member must be a referential no-op");
});

test("toggle uses the same bounded add and remove rules", () => {
  const empty = createEmptyCandidateState();
  const added = toggleCandidate(empty, referenceMenu, second.id);
  assert(isCandidate(added, second.id), "first toggle must add an available product");
  const removed = toggleCandidate(added, referenceMenu, second.id);
  assert(!isCandidate(removed, second.id), "second toggle must remove membership");
  assert(toggleCandidate(empty, referenceMenu, soldOutProduct.id) === empty, "toggle cannot add a sold-out product");
});

test("derived Candidate Products follow canonical menu order rather than insertion order", () => {
  const laterFirst = addCandidate(createEmptyCandidateState(), referenceMenu, later.id);
  const insertedOutOfOrder = addCandidate(laterFirst, referenceMenu, first.id);
  const derived = candidateProducts(referenceMenu, insertedOutOfOrder);
  assert(
    JSON.stringify(derived.map((product) => product.id)) === JSON.stringify([first.id, later.id]),
    "derived Candidates must follow canonical Product order",
  );
  assert(derived[0] === first && derived[1] === later, "derived view must reuse canonical Product objects");
});

test("derived display and count ignore stale or duplicate ids without mutating source state", () => {
  const source = { productIds: ["missing-product", first.id, first.id] } as const;
  const derived = candidateProducts(referenceMenu, source);
  assert(JSON.stringify(derived.map((product) => product.id)) === JSON.stringify([first.id]), "invalid and duplicate ids must not appear in derived display");
  assert(candidateCount(referenceMenu, source) === 1, "count must include only unique canonical ProductIds");
  assert(source.productIds[0] === "missing-product", "derivation must not mutate source state");
});

let failures = 0;
for (const testCase of tests) {
  try { testCase.run(); console.log(`✓ ${testCase.name}`); }
  catch (error) { failures += 1; console.error(`✗ ${testCase.name}`); console.error(error); }
}
if (failures > 0) throw new Error(`${failures} Candidate domain test(s) failed`);
console.log(`\n${tests.length} Candidate domain tests passed.`);
