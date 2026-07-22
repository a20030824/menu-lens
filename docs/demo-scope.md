# Demo scope

## Purpose

The first demo is not a miniature production ordering system and not yet a comparison study.

It tests whether the Menu Lens decision model is internally coherent:

> Can a stable full-menu view, preserved browsing context, and a candidate workspace help people understand and choose before transaction mechanics begin?

Merchant maintenance cost remains an important later question, but the first coded slice should not expand into a merchant CMS before the customer decision spine establishes which metadata is actually useful.

## Primary research questions

The first implementation investigates only three questions:

1. Can a dense, stable full-menu view help people establish an overview without making them fear that products are hidden?
2. Does separating candidates from order items support genuine consideration without turning the cart into a bookmark?
3. Can inline product detail and preserved browsing context improve comparison without destroying spatial memory?

## Reference restaurant

Use one fictional casual restaurant with enough variety to expose the problem without introducing complex operations.

Suggested menu size: **approximately 30 products**.

```text
Personal mains       8
Rice and noodles     6
Shared dishes        6
Small plates         4
Drinks               4
Desserts             2
```

The dataset should deliberately include:

- similar prices with meaningfully different characteristics
- personal and shared portions
- spicy, non-spicy, and vegetarian items
- fast, normal, and slow preparation classes
- products with and without required configuration
- two sold-out products
- four editorially featured products
- approximately 20% incomplete semantic metadata

The menu must be realistic enough that a tester can form genuine preferences, but it does not need to represent a real restaurant.

Do not add data fields solely for a deferred lens or hypothetical production integration.

## Primary customer flow

The first implementation should prioritize one complete path:

```text
full menu
→ inline detail
→ add candidate
→ compare candidates
→ decide to order
→ configure required choices
→ add to current order
```

This path must preserve the following distinctions:

```text
product ≠ candidate ≠ draft order item ≠ submitted item
```

## Required first surfaces

### 1. Menu overview

- category map
- item counts
- price ranges
- direct entry to the complete menu

### 2. Dense full menu

- stable category ordering
- category anchors
- compact product rows
- no adaptive reordering in the first slice

### 3. Inline product detail

- description and decision-relevant metadata
- add to candidates
- explicit decide-to-order action
- close without losing browsing position

### 4. Candidate workspace

- candidate count
- candidate list
- removal without affecting the order
- comparison entry point

Candidates do not have quantity, required configuration, or an order total.

### 5. Candidate comparison

- two or three products
- only decision-relevant attributes
- visible missing or low-confidence values
- no commitment implied by comparison

### 6. Configuration boundary

- required configuration appears only after explicit decision
- cancellation returns to the prior decision context
- configuration does not silently remove the candidate until the transition is complete

### 7. Current order

- configured draft order items
- total
- clear separation from candidates

A simulated submit action is optional in the first slice. Submitted rounds belong to the continuity phase rather than the first decision-spine milestone.

## Deferred customer surfaces

These remain valid but should not expand the first implementation:

### Continuity and table state

- submitted order rounds
- coarse meal composition
- party-size guidance
- state preservation across alternative lenses

### Alternative lenses

- quick-decision lens
- shared-table lens
- featured editorial lens

The first code may define the `Lens` vocabulary while implementing only `full-menu`.

## Deferred merchant work

Do not build a production merchant interface in the first implementation.

Later merchant research may include:

- imported product table
- category-level semantic defaults
- exception editing
- metadata source and confirmation state
- incomplete-data preview

This work should begin only after the customer flow identifies which semantic fields produce real value.

## Conventional comparison

A conventional comparison interface is **parked**, not rejected.

Do not build it during the initial implementation. First establish:

- a coherent Menu Lens decision spine
- a stable reference dataset
- observable interaction behavior
- credible failure and redesign criteria

A baseline should be added only when there is a specific comparative research question that cannot be answered through formative testing of Menu Lens itself.

## Explicit exclusions

Do not implement in the first demo:

- real payment
- authentication
- loyalty or membership
- POS or KDS integration
- exact preparation-time prediction
- live inventory
- delivery or pickup logistics
- real-time multi-device collaboration
- split payment
- staff messaging
- production analytics
- mandatory conversational assistant
- personalized machine-learning recommendations
- a generic design system or plugin architecture
- a conventional comparison interface

## Low-entropy technical starting point

A local mobile-first client is sufficient.

Initial constraints:

- TypeScript
- Vite or an equivalently small client setup
- one local canonical dataset
- one explicit in-memory application state
- no backend
- no authentication
- no persistence requirement beyond the active session
- deterministic, explainable domain rules
- primary viewport around 390 × 844 while remaining responsive

Prefer a small initial structure:

```text
menu-lens/
├─ src/
│  ├─ domain/
│  ├─ app/
│  └─ features/
├─ data/
├─ docs/
└─ README.md
```

Do not create a monorepo, package boundary, API layer, repository abstraction, or design-system package until a current requirement makes it necessary.

## Build sequence

### Phase 0 — shared memory

- product contract
- glossary
- workstream sequencing
- cross-conversation handoff

### Phase 1 — domain and reference data

- canonical product types
- runtime data validation
- realistic 30-product dataset
- configuration examples
- incomplete metadata cases
- focused invariant tests

### Phase 2 — decision spine

- menu overview
- dense full-menu browsing
- inline detail
- candidate workspace
- comparison
- decision/configuration boundary
- current order

### Phase 3 — continuity

- preserved scroll and expanded state
- submitted order rounds
- coarse table composition

### Phase 4 — thin lenses

- quick decision
- shared-table planning
- featured editorial view

### Phase 5 — merchant-authoring test

- category defaults
- exception editing
- incomplete metadata preview

### Later decision — comparative study

Decide whether a conventional baseline is useful only after the previous phases produce a coherent and testable Menu Lens experience.

No later phase should be used to postpone testing the Phase 2 interaction spine.

## Definition of decision-spine ready

The first implementation milestone is ready for formative use when a tester can:

- understand the menu's broad shape and price range
- browse all products without losing context
- place several products into a candidate workspace
- compare candidates
- explicitly decide on one product
- configure it only after that decision
- distinguish candidates from current-order items
- cancel or return without losing prior browsing context

Alternative lenses, merchant authoring, submitted rounds, and a conventional baseline are not required for this milestone.