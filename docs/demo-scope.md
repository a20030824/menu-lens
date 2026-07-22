# Demo scope

## Purpose

The first demo is not a miniature production ordering system.

It is a test of the decision model:

> Does adding a menu map, candidate workspace, preserved browsing context, and visible table composition help people understand and choose without creating unacceptable merchant maintenance cost?

## Reference restaurant

Use one fictional casual restaurant with enough variety to expose the problem without introducing complex operations.

Suggested menu size: **30 products**.

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
- products with and without required modifiers
- two sold-out products
- four editorially featured products
- approximately 20% incomplete semantic metadata

The menu must be realistic enough that testers can form genuine preferences, but it does not need to represent a real restaurant.

## Primary customer flow

The first implementation should prioritize one complete flow:

```text
full menu
→ inline detail
→ add candidate
→ compare candidates
→ decide to order
→ configure modifiers
→ add to current order
→ review table state
```

This flow tests the core distinctions:

1. browsing is not purchasing
2. candidates are not cart items
3. product detail should not destroy menu context

## Customer surfaces

### Required for the first usable demo

1. **Menu overview**
   - category map
   - item counts
   - price ranges
   - direct access to the full menu

2. **Dense full menu**
   - stable category ordering
   - category anchors
   - compact product rows
   - optional image mode without reordering

3. **Inline product detail**
   - description and decision-relevant metadata
   - add to candidates
   - decide to order
   - close without losing position

4. **Candidate workspace**
   - candidate count
   - candidate list
   - removal without affecting the order
   - comparison entry point

5. **Candidate comparison**
   - up to three products
   - price, portion, role, flavor, preparation, dietary fit
   - visible missing or low-confidence values

6. **Configuration boundary**
   - required modifiers only after explicit decision
   - reversible return to candidate or menu context

7. **Current order and table state**
   - decided items
   - candidates
   - category or meal-role composition
   - total
   - simulated submit action

8. **Submitted round state**
   - submitted items remain visible
   - candidates remain available
   - user can continue browsing and add another round

### Lightweight lenses

The first demo may include thin versions of these lenses after the primary flow works:

#### Quick decision

Visible conditions such as:

- available now
- individual main
- under a budget
- coarse preparation class

Show three to five results and explain why each qualifies.

#### Shared-table planning

Use party size and coarse portion roles to show:

- personal versus shared items
- currently represented meal roles
- modest guidance about possible gaps

Do not implement multi-device synchronization in the first demo.

#### Featured

Show four editorially selected products with short explanations of how they represent the restaurant.

## Merchant surfaces

The merchant demo should remain small:

1. imported product table
2. category-level semantic defaults
3. detected or manually selected exceptions
4. per-product override
5. metadata source and confirmation state
6. customer preview
7. example of graceful degradation for incomplete data

The merchant workflow should answer:

- How many actions are required for 30 products?
- How much can be handled by category defaults?
- Which fields create hesitation or disagreement?

## Baseline comparison

Build a conventional version from the same data:

```text
horizontal category tabs
→ large product cards
→ separate product page
→ required modifiers
→ add to cart
→ checkout summary
```

The baseline should be credible and visually competent. It must not be intentionally degraded.

The comparison is intended to isolate information architecture and decision flow, not visual polish.

## Explicit exclusions

Do not implement in the first demo:

- real payment
- authentication
- loyalty or membership
- POS integration
- KDS integration
- exact preparation-time prediction
- live inventory
- delivery or pickup logistics
- real-time multi-device collaboration
- split payment
- staff messaging
- production analytics
- mandatory conversational assistant
- personalized machine-learning recommendations

## Technical starting point

A local mobile-first single-page prototype is sufficient.

Suggested initial constraints:

- TypeScript
- Vite
- local JSON data
- in-memory application state
- no backend
- primary viewport around 390 × 844, while remaining responsive
- deterministic explainable filtering rules

Possible initial structure:

```text
menu-lens/
├─ src/
│  ├─ app/
│  ├─ domain/
│  ├─ features/
│  │  ├─ menu-overview/
│  │  ├─ menu-browse/
│  │  ├─ candidates/
│  │  ├─ comparison/
│  │  ├─ order-workspace/
│  │  └─ merchant-authoring/
│  └─ styles/
├─ data/
│  ├─ menu.json
│  ├─ merchant-metadata.json
│  └─ scenarios.json
├─ docs/
└─ README.md
```

This is a provisional shape, not an architectural commitment. The repository should not become a monorepo until customer and merchant demos actually require separate applications.

## Build sequence

### Phase 0 — written model

- problem framing
- interaction contract
- merchant data strategy
- evaluation plan

### Phase 1 — decision spine

- reference dataset
- full-menu browsing
- inline detail
- candidates
- comparison
- decision/configuration boundary
- current order

### Phase 2 — continuity and table state

- preserved scroll and expanded state
- lens state preservation
- submitted order rounds
- coarse table composition

### Phase 3 — alternative lenses

- quick decision
- shared-table planning
- featured editorial view

### Phase 4 — merchant authoring test

- category defaults
- exception editing
- incomplete metadata preview

### Phase 5 — baseline and user study

- conventional comparison interface
- scripted tasks
- instrumentation and observation

No later phase should be used to postpone testing the Phase 1 interaction spine.

## Definition of demo-ready

The demo is ready for an initial study when a tester can:

- understand the restaurant's menu shape and price range
- browse all products without losing context
- place several items into a candidate workspace
- compare candidates
- commit one item and only then configure it
- understand candidate, decided, and submitted states
- switch at least one lens without losing work
- observe how incomplete merchant metadata changes, but does not break, the experience
