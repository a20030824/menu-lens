# Interaction model

## One menu, several lenses

Menu Lens treats quick selection, shared-table planning, editorial highlights, and full browsing as different lenses over the same menu.

A lens may change:

- which information is emphasized
- which items are initially surfaced
- how items are grouped
- what contextual explanation is shown

A lens must not create a second product identity or independently maintain price, availability, modifiers, or order state.

## Primary states

```text
overview
  ├─ full menu
  ├─ quick decision lens
  ├─ shared-table lens
  └─ featured lens

all lenses
  ├─ candidate workspace
  ├─ decided order items
  └─ transaction configuration
```

The full menu is always directly reachable. Selecting a lens must never imply that unshown products do not exist.

## 1. Overview

The first screen should establish the restaurant's shape before presenting a long product feed.

It should expose:

- meal period and coarse operational status when trustworthy
- category names and item counts
- category price ranges
- a small number of optional entry lenses
- a clear path to the complete menu

The overview is not a mandatory questionnaire. Party size or constraints may have sensible defaults and remain editable later.

## 2. Full-menu browsing

The complete menu is a first-class reading mode.

Preferred behavior:

- category directory remains visible or readily accessible
- categories exist in one stable document rather than mutually exclusive tabs
- product rows are information-dense enough to compare nearby alternatives
- optional imagery does not dominate the entire reading surface
- category anchors move within the document instead of replacing it
- users can switch between denser and more visual presentation without changing product order

The menu should maintain a stable canonical ordering. Dynamic ranking may be shown in explicit lenses, but returning to the complete menu should restore the familiar structure.

## 3. Inline product detail

Opening a product should preserve context.

A detail surface may expand inline or appear in a bottom sheet, provided that closing it restores:

- scroll position
- category context
- previously open candidate state
- surrounding alternatives

The detail surface may show descriptions, ingredients, dietary information, portion guidance, preparation class, and optional modifiers. It should not force required modifier completion until the user expresses intent to order.

## 4. Candidate workspace

The candidate workspace stores serious possibilities without converting them into order lines.

Candidate items:

- do not require modifiers
- do not affect order total
- do not imply quantity
- survive lens changes
- can be compared or dismissed without touching the cart

This creates a clear distinction:

```text
considering ≠ decided ≠ submitted
```

Language and visual treatment should reinforce the distinction. Examples:

- `看看中` or `考慮中` for candidates
- `已決定` for configured but unsent items
- `已送出` for submitted items

## 5. Comparison

Comparison should be generated from candidates and limited to decision-relevant dimensions.

Possible dimensions:

- price
- portion class
- meal role
- flavor character
- dietary compatibility
- preparation class
- shareability
- required customization

Comparison should not become a universal specification table. Missing or low-confidence metadata must be identified rather than silently guessed.

## 6. Explicit decision and configuration

Only after the user chooses `決定點這道` does the interface require transaction details:

- quantity
- required modifiers
- optional add-ons
- ownership or shared status when relevant
- special instructions within operational limits

This boundary should be observable and reversible. Returning from configuration should not erase the candidate or browsing context.

## 7. Table workspace

The table workspace summarizes meal composition, not only money.

It may show:

- party size
- personal versus shared items
- meal roles already represented
- coarse portion coverage
- candidate, decided, and submitted states
- ownership or proposer when multi-device collaboration is introduced
- current and previous order rounds

Suggestions should remain modest and explainable:

- `目前可能較少蔬菜類料理`
- `以一般份量估算，可能還可增加一道共享料理`

Avoid prescriptive language such as `你應該再點一道`.

## Lens behavior

### Quick decision

Quick decision narrows choices using visible, editable conditions such as:

- availability
- budget
- meal role
- coarse preparation class
- dietary requirements

Each result should explain why it appears. The initial result set should remain small enough to compare, while a direct route back to the full menu stays visible.

### Shared-table planning

Shared-table planning emphasizes:

- party size
- personal and shared roles
- coarse portion estimates
- flavor and category balance
- duplicate or missing meal roles

The lens must not pretend that portion estimates are exact. It should display the basis and confidence of any guidance.

### Featured

Featured is an editorial view, not an automatically generated sales ranking.

It can explain what helps a first-time visitor understand the restaurant:

- representative dishes
- characteristic techniques or ingredients
- seasonal items
- deliberate pairings

Featured products still open the same product entity used everywhere else.

## State preservation contract

Lens switching must preserve at least:

```ts
type DemoState = {
  lens: "overview" | "browse" | "quick" | "shared" | "featured";
  partySize: number;
  constraints: {
    budgetMax?: number;
    preparation?: "fast" | "normal";
    vegetarian?: boolean;
  };
  candidateProductIds: string[];
  decidedItems: OrderItem[];
  submittedRounds: SubmittedRound[];
  expandedProductId?: string;
  browseAnchor?: string;
  scrollPositionByLens: Record<string, number>;
};
```

The exact implementation may change, but the observable continuity must remain.

## Reversibility rules

- Leaving a detail view restores the previous menu position.
- Removing a candidate never affects decided or submitted items.
- Editing a decided item does not require finding the product again.
- Submitted items remain visibly distinct from the current order round.
- Changing constraints modifies a lens result, not the underlying menu.
- Returning to the full menu restores canonical ordering.

## Restaurant-type adaptation

The interaction grammar should remain shared, while individual restaurant types may emphasize different layers:

- beverage shop: category → product → specification
- family-style restaurant: party → composition → shared portions
- fast food: bundle construction
- izakaya: repeated order rounds and table state
- all-you-can-eat: rounds, limits, and fulfillment state
- set-menu restaurant: course structure and substitutions

The project should not attempt one identical screen hierarchy for every restaurant type.
