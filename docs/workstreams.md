# Workstreams

This file is the current coordination view for Menu Lens.

It exists to prevent parallel conversations from redefining the product, duplicating work, or expanding the demo before the decision spine is coherent.

## Coordination rules

- The core conversation owns product-contract changes and cross-workstream conflict resolution.
- Each implementation conversation should own one bounded outcome, not a collection of screens or technologies.
- Workstreams should modify only the files needed for their outcome.
- Cross-cutting discoveries should be recorded and returned to the core conversation rather than silently expanding scope.
- Conventional-interface comparison is parked until the Menu Lens interaction is coherent enough to evaluate on its own.
- Prefer fewer moving parts, fewer dependencies, and fewer abstractions while the product model is still being tested.
- A difference that exists only on desktop does not count as a core product difference.

## Current sequence

```text
[complete] foundation memory
→ [complete] domain schema and reference dataset
→ [complete] formative evaluation protocol
→ [active] customer decision spine
    [complete] complete-menu technical baseline
    → [active] mobile-first menu reading
        [rejected] large category Atlas
        → [rejected] desktop-first static workspace
        → [passed] M1 mobile semantic menu zoom + shared ledger
        → [current] M2 product focus continuity
        → M3 accessibility and motion finalization
    → Candidate + comparison
    → Decision + Configuration + Current order
→ continuity and table state
→ thin alternative lenses
→ merchant-authoring test
→ decide whether a conventional baseline is useful
```

## Workstream status

| Workstream | Status | Scope | Depends on | Primary output |
|---|---|---|---|---|
| Foundation memory | Complete | product contract, glossary, workstream boundaries, handoff protocol | existing design core | stable cross-conversation reference |
| Domain and reference data | Complete | types, validation, 30-product fictional menu, incomplete metadata cases | product contract | local typed dataset and tests |
| Formative evaluation | Complete | task scripts, observation notes, lightweight local events, falsification signals | product contract | protocol that shapes implementation |
| Customer decision spine | In progress | menu overview → category focus → product focus → candidates → comparison → decision → configuration → current order | domain dataset and formative protocol | one complete mobile-first flow |
| Continuity and table state | Deferred | scroll restoration, preserved candidates, submitted rounds, coarse table composition | customer decision spine | continuity behavior over the same state model |
| Alternative lenses | Deferred | thin quick, shared-table, and featured views | stable decision spine | views over the same canonical menu |
| Merchant authoring | Deferred | category defaults, exceptions, confidence, incomplete-data preview | proven useful semantic fields | small authoring test, not production CMS |
| Conventional baseline | Parked | credible conventional ordering flow using the same data | coherent Menu Lens demo and explicit study need | optional comparison condition |
| Production integration | Out of scope | payment, POS, KDS, inventory, auth, deployment operations | none in current demo | none |

## Completed foundation work

The authoritative entry points are:

- `docs/product-contract.md`
- `docs/glossary.md`
- `docs/workstreams.md`
- `docs/handoff.md`

The domain and reference-data workstream provides:

- canonical TypeScript menu and order-state types
- runtime validation for the local dataset boundary
- one fictional restaurant with 30 products
- required and optional modifier examples
- personal and shared portion examples
- two sold-out products that remain in the canonical collection
- six intentionally incomplete semantic metadata cases
- metadata source and confidence representation
- focused compile-time and runtime invariant tests

The formative-evaluation workstream provides:

- four moderated task scripts for overview, consideration, comparison, and Configuration
- neutral moderator and think-aloud guidance
- observable success, failure, and falsification signals
- a bounded local event vocabulary
- observation and session-summary templates
- explicit criteria for redesigning, simplifying, or removing a feature

The complete-menu technical baseline proved:

- one static local client can render the validated canonical menu
- all six categories and all 30 products can remain in one stable collection
- stable `ProductId` and `CategoryId` can drive detail behavior
- sold-out and incomplete metadata can remain explicit
- keyboard close, focus return, and reduced-motion behavior are feasible
- the static build path is sufficient for Pages review

## Rejected reading hypotheses

### Rejected: large category Atlas

The first deployed attempt placed six large category regions before the existing complete-menu list.

Pages review showed that it behaved as a larger category selector:

```text
large category controls
→ conventional complete-menu list
```

Region size, counts, price ranges, and representative products did not create a different reading model. That hypothesis must not be restored by styling changes.

### Rejected: desktop-first static workspace

The second deployed attempt used a desktop structure rail, dense center field, and category summary inspector.

On mobile, the rail and inspector were hidden and the interface collapsed to:

```text
horizontal category chips
→ single-column product list
```

The implementation therefore placed its meaningful differences in desktop columns rather than in the product state model. That hypothesis is also rejected.

## M1 deployed findings

The first mobile semantic-zoom Pages review produced a split result:

```text
compressed whole-menu overview → passed
expanded category content → failed as an ordinary product-card feed
```

The overview preserved the six-region mental model, but expanded products still repeated an isolated per-item pattern. Removing rounded cards did not change the feed reading rhythm.

The correction was structural:

- each expanded category became one semantic table surface
- sequence, dish name, supported reading cues, and price use shared columns
- sold-out and incomplete-data status stay inside the shared cue column
- individual products do not receive separate surfaces or header/body/status stacks
- the same category does not split into desktop-only tile columns
- canonical product order and one continuous table reading order remain stable

The deployed ledger revision was judged to have the intended menu-map character. M1 is therefore treated as passed, while the ledger remains the stable coordinate plane for later states rather than a completed product by itself.

## Active workstream: customer decision spine

### Goal

Implement one coherent mobile-first interaction using the canonical reference menu:

```text
compressed menu overview
→ category semantic zoom
→ product focus
→ Candidate
→ comparison
→ explicit Decision
→ Configuration
→ Current order
```

The same state may be displayed more simultaneously on a wide screen, but mobile defines the core interaction.

### Progress

```text
[complete] complete-menu technical baseline
→ [active] mobile-first menu reading
    [passed] M1 mobile semantic menu zoom + shared ledger
    → [current] M2 product focus continuity
    → [pending] M3 accessibility and motion finalization
→ [pending] Candidate + comparison
→ [pending] explicit Decision + Configuration + Current order
```

### Required outputs

- **Complete:** one client application using the canonical menu
- **Complete:** stable category and product ordering
- **Complete:** compressed overview containing all six category regions
- **Complete:** reversible `overview`, single-category, and all-expanded reading modes
- **Complete:** category expansion in place without removing the other five regions
- **Complete:** explicit route to all 30 products
- **Complete:** shared product ledger using no more than two trusted semantic cues
- **Current:** product focus using a mobile partial sheet and desktop inspector
- **Current:** layered semantic detail with evidence folded separately
- **Current:** focus return, scroll preservation, and surrounding-alternative continuity
- **Pending:** Candidate add, remove, workspace, and bounded comparison
- **Pending:** explicit transition from consideration to Decision
- **Pending:** Configuration only after Decision
- **Pending:** Current order clearly separated from Candidates
- focused tests for every implemented state transition and preserved invariant

### Constraints

- no backend, database, authentication, payment, POS, or KDS integration
- no conventional baseline
- no Quick, Shared-table, or Featured lens implementation
- no merchant CMS
- no remote analytics
- no generic state-machine, repository, plugin, animation, or design-system framework
- do not add abstractions for deferred work
- preserve canonical product and category order
- preserve `Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound`
- do not count desktop-only layout as proof of the interaction model

## Completed slice: M1 mobile semantic menu zoom

M1 established the menu map as a stable mobile-first coordinate plane:

```text
six-region compressed overview
→ expand one category in place
→ read one shared category ledger
→ return to overview or expand all products
```

M1 invariants remain active during later work:

- all six canonical categories remain visible in canonical order
- single-category focus does not remove the other five regions
- all-expanded mode keeps all 30 products in one document
- each category ledger shares visible columns for sequence, dish name, reading cues, and price
- sold-out and incomplete-data products remain in canonical position
- unsupported or low-confidence cues are omitted instead of guessed
- later state markers must attach to existing product rows rather than moving products elsewhere

## Current implementation slice: M2 product focus continuity

### Goal

Allow a user to inspect one product without replacing or deforming the menu map:

```text
stable category ledger
→ focus one product row
→ read bounded summary detail
→ optionally reveal full semantic evidence
→ close and return to the exact row and surrounding alternatives
```

Product focus remains browsing. It does not create Candidate, quantity, configuration selections, totals, or an order item.

### State contract

M2 adds only reading state:

```ts
type ProductDetailLevel = "closed" | "summary" | "full";

type MenuReadingState = {
  activeCategoryId: CategoryId | null;
  expansion: MenuExpansion;
  focusedProductId: ProductId | null;
  detailLevel: ProductDetailLevel;
};
```

Rules:

- opening a product preserves the current category expansion
- detail initially opens at `summary`
- `summary` and `full` are reversible for the same `ProductId`
- closing detail preserves expansion and returns the source `ProductId` for focus restoration
- changing to a reading mode that hides the focused product closes detail first
- Product focus must not be represented as Candidate or ordering state

### Presentation

#### Mobile

- selecting a ledger row opens a modal bottom sheet
- the row remains in place and keeps a persistent focused marker behind the sheet
- the sheet owns its own scrolling and does not change the document scroll offset
- Escape, backdrop, and the explicit close control close the sheet
- closing returns keyboard focus to the original ledger product without scrolling it elsewhere

#### Wide screen

- the same `focusedProductId` renders in a sticky inspector
- the inspector appears only while a product is focused
- desktop may show menu and detail simultaneously but does not introduce a separate interaction model
- the ledger remains one continuous table rather than changing into cards or tiles

### Information layers

Summary detail shows:

- category and product name
- price and availability
- description
- at most three trusted semantic facts
- incomplete-data and delayed-configuration notices when relevant

Full detail additionally shows:

- all trusted semantic facts
- a native `<details>` evidence section
- merchant-confirmed or category-default source labels
- confidence labels without exposing raw domain enums

Required and optional modifier groups may be mentioned only as future configuration notices. No selection control appears before explicit Decision.

### M2 checkpoint gate

M2 passes only if a mobile tester can:

1. open a product without the ledger row moving or changing height
2. continue recognizing the category and nearby alternatives behind the sheet
3. distinguish quick summary from deliberately requested full information
4. close through the button, Escape, or backdrop
5. return to the exact product row without a scroll jump
6. inspect sold-out and incomplete-data products without them disappearing
7. understand that viewing the product did not add it to a shortlist or order

A detail page, inline accordion that pushes the ledger, or sheet that loses the source row does not pass the gate.

### Explicit exclusions for M2

- no Candidate or comparison state
- no quantity or modifier controls
- no explicit Decision
- no Configuration, total, Current order, or checkout
- no filtering, ranking, persistence, URL state, router, backend, or remote analytics
- no alternative lenses
