import { referenceMenuData } from "../../data/reference-menu.js";
import type {
  Candidate,
  ConfiguredOrderItem,
  DraftOrderItem,
  SubmittedOrderRound,
} from "./menu-types.js";
import {
  hasCompleteComparisonSemantics,
  MenuValidationError,
  productRequiresConfiguration,
  resolveProductSemantics,
  validateMenu,
} from "./menu-validation.js";
import { referenceMenu } from "./reference-menu.js";

type MutableMenuData = Record<string, any>;
type TestCase = Readonly<{ name: string; run: () => void }>;

const tests: TestCase[] = [];

const test = (name: string, run: () => void): void => {
  tests.push({ name, run });
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const cloneReferenceData = (): MutableMenuData =>
  JSON.parse(JSON.stringify(referenceMenuData)) as MutableMenuData;

const expectValidationError = (
  input: unknown,
  expectedFragments: ReadonlyArray<string>,
): MenuValidationError => {
  try {
    validateMenu(input);
  } catch (error) {
    assert(error instanceof MenuValidationError, "expected MenuValidationError");
    expectedFragments.forEach((fragment) => {
      assert(
        error.message.includes(fragment),
        `expected validation message to include ${JSON.stringify(fragment)}\n${error.message}`,
      );
    });
    return error;
  }
  throw new Error("expected menu validation to fail");
};

test("reference dataset passes validation and matches the intended composition", () => {
  assert(referenceMenu.products.length === 30, "reference menu must contain 30 products");

  const expectedCategoryCounts: Record<string, number> = {
    "personal-mains": 8,
    "rice-noodles": 6,
    "shared-dishes": 6,
    "small-plates": 4,
    drinks: 4,
    desserts: 2,
  };

  Object.entries(expectedCategoryCounts).forEach(([categoryId, expectedCount]) => {
    const actualCount = referenceMenu.products.filter(
      (product) => product.categoryId === categoryId,
    ).length;
    assert(
      actualCount === expectedCount,
      `${categoryId} must contain ${expectedCount} products, received ${actualCount}`,
    );
  });

  assert(
    referenceMenu.products.filter((product) => product.availability === "sold_out").length === 2,
    "reference menu must contain exactly two sold-out products",
  );
  assert(
    referenceMenu.products.filter((product) => product.featured !== undefined).length === 4,
    "reference menu must contain exactly four editorially featured products",
  );

  const incompleteProducts = referenceMenu.products.filter((product) =>
    !hasCompleteComparisonSemantics(
      resolveProductSemantics(referenceMenu, product),
    ),
  );
  assert(
    incompleteProducts.length === 6,
    `reference menu must contain six incomplete semantic records, received ${incompleteProducts.length}`,
  );

  assert(
    referenceMenu.products.some((product) =>
      productRequiresConfiguration(referenceMenu, product),
    ),
    "reference menu must contain products with required configuration",
  );
  assert(
    referenceMenu.products.some(
      (product) => !productRequiresConfiguration(referenceMenu, product),
    ),
    "reference menu must contain products without required configuration",
  );
});

test("duplicate product IDs are rejected", () => {
  const input = cloneReferenceData();
  input.products[1].id = input.products[0].id;
  expectValidationError(input, ["duplicate product ID"]);
});

test("negative and non-finite prices are rejected", () => {
  const negative = cloneReferenceData();
  negative.products[0].price = -1;
  expectValidationError(negative, ["finite non-negative number"]);

  const nonFinite = cloneReferenceData();
  nonFinite.products[0].price = Number.POSITIVE_INFINITY;
  expectValidationError(nonFinite, ["finite non-negative number"]);
});

test("unknown category references are rejected", () => {
  const input = cloneReferenceData();
  input.products[0].categoryId = "missing-category";
  expectValidationError(input, ["references unknown category"]);
});

test("invalid modifier cardinality is rejected", () => {
  const input = cloneReferenceData();
  input.modifierGroups[0].minimumSelections = 2;
  input.modifierGroups[0].maximumSelections = 1;
  expectValidationError(input, ["minimumSelections must not exceed maximumSelections"]);
});

test("required modifier groups without options are rejected", () => {
  const input = cloneReferenceData();
  input.modifierGroups[0].options = [];
  input.modifierGroups[0].defaultOptionIds = undefined;
  expectValidationError(input, ["must contain at least one selectable option"]);
});

test("missing optional semantic metadata remains valid", () => {
  const input = cloneReferenceData();
  delete input.products[0].semanticOverrides;
  const validated = validateMenu(input);
  const product = validated.products.find(
    (entry) => entry.id === "miso-grilled-chicken-set",
  );
  assert(product !== undefined, "product must remain in the canonical menu");
  assert(
    !hasCompleteComparisonSemantics(resolveProductSemantics(validated, product)),
    "missing optional semantics should be visible as incomplete, not invalid",
  );
});

test("sold-out products remain in the canonical collection", () => {
  const soldOutProducts = referenceMenu.products.filter(
    (product) => product.availability === "sold_out",
  );
  assert(soldOutProducts.length === 2, "sold-out products must remain loadable");
  assert(
    soldOutProducts.some((product) => product.id === "sichuan-mapo-tofu-pot"),
    "the sold-out mapo tofu product must remain addressable by stable ID",
  );
});

test("candidate, draft, configured, and submitted concepts remain distinct", () => {
  const productId = referenceMenu.products[0]?.id;
  assert(productId !== undefined, "reference menu must have at least one product");

  const candidate: Candidate = { productId };
  const draft: DraftOrderItem = {
    state: "draft",
    id: "draft-1",
    productId,
    quantity: 1,
    selections: [],
  };
  const configured: ConfiguredOrderItem = {
    state: "configured",
    id: "configured-1",
    productId,
    quantity: 1,
    configuration: { selections: [] },
  };
  const submittedRound: SubmittedOrderRound = {
    state: "submitted",
    id: "round-1",
    submittedAt: "2026-07-23T12:00:00+08:00",
    items: [configured],
  };

  assert(!("quantity" in candidate), "candidate must not contain quantity");
  assert(!("configuration" in candidate), "candidate must not contain configuration");
  assert(draft.state === "draft", "draft item must retain the draft state boundary");
  assert(!("configuration" in draft), "draft item must not masquerade as configured");
  assert(
    configured.state === "configured" && "configuration" in configured,
    "configured item must carry completed configuration",
  );
  assert(
    submittedRound.state === "submitted" && submittedRound.items[0] === configured,
    "submitted round must contain configured items without becoming a candidate collection",
  );
});

test("metadata source and confidence values are restricted", () => {
  const invalidSource = cloneReferenceData();
  invalidSource.products[0].semanticOverrides.traits.source = "model_guessed";
  expectValidationError(invalidSource, ["must be one of: merchant_confirmed, category_default"]);

  const invalidConfidence = cloneReferenceData();
  invalidConfidence.products[0].semanticOverrides.traits.confidence = "certain";
  expectValidationError(invalidConfidence, ["must be one of: high, medium, low"]);
});

test("unknown availability values are rejected", () => {
  const input = cloneReferenceData();
  input.products[0].availability = "hidden";
  expectValidationError(input, ["must be one of: available, sold_out"]);
});

test("dangling modifier references and option defaults are rejected", () => {
  const productReference = cloneReferenceData();
  productReference.products[0].modifierGroupIds = ["missing-group"];
  expectValidationError(productReference, ["references unknown modifier group"]);

  const defaultReference = cloneReferenceData();
  defaultReference.modifierGroups[0].defaultOptionIds = ["missing-option"];
  expectValidationError(defaultReference, ["references unknown option"]);
});

test("default modifier selections must respect cardinality", () => {
  const input = cloneReferenceData();
  input.modifierGroups[0].defaultOptionIds = ["white-rice", "multigrain-rice"];
  expectValidationError(input, ["default selections must not exceed maximumSelections"]);
});

let failureCount = 0;
for (const testCase of tests) {
  try {
    testCase.run();
    console.log(`✓ ${testCase.name}`);
  } catch (error) {
    failureCount += 1;
    console.error(`✗ ${testCase.name}`);
    console.error(error);
  }
}

if (failureCount > 0) {
  throw new Error(`${failureCount} domain test${failureCount === 1 ? "" : "s"} failed`);
}

console.log(`\n${tests.length} domain tests passed.`);
