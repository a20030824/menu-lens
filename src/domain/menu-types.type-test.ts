import type {
  Candidate,
  ConfiguredOrderItem,
  DraftOrderItem,
  ModifierSelection,
  SubmittedOrderRound,
} from "./menu-types.js";

const productId = "product-1";
const selection: ModifierSelection = {
  modifierGroupId: "group-1",
  optionIds: ["option-1"],
};

const candidate: Candidate = { productId };
void candidate;

const candidateWithQuantityValue = { productId, quantity: 1 };
// @ts-expect-error Candidate cannot carry quantity.
const candidateWithQuantity: Candidate = candidateWithQuantityValue;
void candidateWithQuantity;

const candidateWithConfigurationValue = {
  productId,
  configuration: { selections: [selection] },
};
// @ts-expect-error Candidate cannot carry completed configuration.
const candidateWithConfiguration: Candidate = candidateWithConfigurationValue;
void candidateWithConfiguration;

const candidateWithSelectionsValue = { productId, selections: [selection] };
// @ts-expect-error Candidate cannot carry modifier selections.
const candidateWithSelections: Candidate = candidateWithSelectionsValue;
void candidateWithSelections;

const draft: DraftOrderItem = {
  state: "draft",
  id: "draft-1",
  productId,
  quantity: 1,
};
void draft;

const draftWithSelectionsValue = {
  state: "draft" as const,
  id: "draft-2",
  productId,
  quantity: 1,
  selections: [selection],
};
// @ts-expect-error DraftOrderItem cannot carry modifier selections.
const draftWithSelections: DraftOrderItem = draftWithSelectionsValue;
void draftWithSelections;

const draftWithConfigurationValue = {
  state: "draft" as const,
  id: "draft-3",
  productId,
  quantity: 1,
  configuration: { selections: [selection] },
};
// @ts-expect-error DraftOrderItem cannot carry completed configuration.
const draftWithConfiguration: DraftOrderItem = draftWithConfigurationValue;
void draftWithConfiguration;

const configuredWithoutConfigurationValue = {
  state: "configured" as const,
  id: "configured-1",
  productId,
  quantity: 1,
};
// @ts-expect-error ConfiguredOrderItem requires completed configuration.
const configuredWithoutConfiguration: ConfiguredOrderItem =
  configuredWithoutConfigurationValue;
void configuredWithoutConfiguration;

const configured: ConfiguredOrderItem = {
  state: "configured",
  id: "configured-2",
  productId,
  quantity: 1,
  configuration: { selections: [selection] },
};
void configured;

const configuredWithInvalidSelectionValue = {
  state: "configured" as const,
  id: "configured-3",
  productId,
  quantity: 1,
  configuration: {
    selections: [
      { modifierGroupId: "group-1", selectedOptionIds: ["option-1"] },
    ],
  },
};
// @ts-expect-error Configuration selections must use ModifierSelection.
const configuredWithInvalidSelection: ConfiguredOrderItem =
  configuredWithInvalidSelectionValue;
void configuredWithInvalidSelection;

const submitted: SubmittedOrderRound = {
  state: "submitted",
  id: "round-1",
  submittedAt: "2026-07-23T12:00:00+08:00",
  items: [configured],
};
void submitted;

const submittedWithDraftValue = {
  state: "submitted" as const,
  id: "round-2",
  submittedAt: "2026-07-23T12:00:00+08:00",
  items: [draft],
};
// @ts-expect-error SubmittedOrderRound can only contain configured items.
const submittedWithDraft: SubmittedOrderRound = submittedWithDraftValue;
void submittedWithDraft;
