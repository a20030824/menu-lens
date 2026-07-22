# Product contract

## Purpose

This document is the shared contract for every Menu Lens workstream and conversation.

Read it before changing domain data, interaction behavior, evaluation criteria, or implementation structure. A workstream may refine details inside this contract, but it must not silently redefine the product.

## Product model

Menu Lens separates three layers that conventional QR ordering interfaces often collapse:

1. **Menu map** — establish the restaurant's scope, categories, price range, and structure.
2. **Decision workspace** — preserve candidates, comparisons, constraints, and table composition while choices remain reversible.
3. **Transaction system** — collect required configuration, quantity, submission, and payment details after explicit commitment.

The first demo focuses on the transition from the menu map into the decision workspace, then crosses the transaction boundary only far enough to make that distinction real.

```text
browse → consider → compare → decide → configure → order
```

## First research questions

The first implementation exists to investigate three questions:

1. Can a dense, stable full-menu view help people establish an overview without feeling that products are hidden?
2. Does separating candidates from order items support genuine consideration without turning the cart into a temporary bookmark?
3. Can inline detail and preserved browsing context improve comparison without destroying spatial memory?

Features that do not materially help investigate these questions are deferred by default.

## Non-negotiable invariants

### One menu, multiple views

- There is one canonical product collection.
- A lens changes presentation, ordering, grouping, or filtering rules over that collection.
- A lens must not create a separately maintained catalog.
- Product identity, price, availability, configuration, and metadata come from the same source of truth.

### Full menu remains first-class

- The complete menu is always directly reachable.
- A user must not need to answer a questionnaire before browsing.
- Filtered or guided views must make their conditions understandable.
- Missing semantic metadata must not silently remove an otherwise orderable product from the complete menu.

### Browsing is not ordering

- Opening a product is not commitment.
- Adding a candidate is not adding an order item.
- A candidate does not require modifiers, affect the order total, or imply quantity.
- Required configuration begins only after an explicit decision to order.

### Interaction continuity

- Opening and closing product detail must preserve browsing position.
- Switching views must preserve candidates and order state.
- Returning from configuration must preserve the decision context.
- Stable category ordering is preferred over adaptive reordering that destroys spatial memory.

### Visible state boundaries

The interface must make these states distinguishable:

```text
available product
→ candidate
→ decided draft order item
→ configured order item
→ submitted order round
```

A submitted item does not return to candidate state. A candidate may be removed without affecting an order. A draft decision may be cancelled and returned to browsing or candidate state.

### Progressive merchant data

- Basic product data must be sufficient for complete-menu browsing and ordering.
- Additional semantic data may enable comparison, guidance, and table composition.
- Category defaults and exception editing are preferred over repeated item-by-item authoring.
- Inferred, estimated, and merchant-confirmed values must remain distinguishable.
- Wrong operational information is worse than absent information.

## Initial state contract

This model describes product behavior, not a required implementation architecture.

```ts
type ProductId = string;
type OrderItemId = string;
type OrderRoundId = string;

type Lens =
  | "full-menu"
  | "quick"
  | "shared-table"
  | "featured";

type MenuLensState = {
  activeLens: Lens;
  partySize: number;
  candidates: ProductId[];
  draftOrderItems: DraftOrderItem[];
  submittedRounds: SubmittedOrderRound[];
  constraints: DecisionConstraints;
  browsingContext: BrowsingContext;
};

type BrowsingContext = {
  categoryId?: string;
  expandedProductId?: ProductId;
  scrollOffset: number;
};
```

The first coded slice may implement only `full-menu`, but it should not merge candidates and order items to simplify the code.

## Low-entropy implementation contract

The first implementation should optimize for legibility, reversibility, and easy deletion rather than architectural reach.

- one deployable client application
- one local product dataset
- one explicit application state model
- one primary end-to-end decision flow
- no backend
- no authentication
- no persistence requirement beyond the active session
- no production integration layer
- no generic plugin system
- no premature monorepo
- no separate design-system package
- no abstraction introduced solely for hypothetical future variants

Prefer plain data, pure domain functions, and small feature-local UI modules. Add an abstraction only when an existing concept is already repeated or when a tested product invariant needs enforcement.

## Deferred by default

These remain valid future investigations, but they must not expand the first implementation:

- conventional-interface comparison
- real-time multi-device collaboration
- payment and split payment
- POS, KDS, inventory, and kitchen-load integration
- personalized machine-learning recommendations
- mandatory conversational interfaces
- production merchant administration
- precise preparation-time prediction
- broad visual design system work

## Change rule

A proposed change to an invariant, state boundary, or first research question must be recorded in the core conversation and reflected here before dependent workstreams adopt it.

Local implementation choices that do not alter product meaning may proceed within their workstream.