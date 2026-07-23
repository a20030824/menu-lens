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
- A cleaner or more intuitive conventional interaction does not by itself prove a Menu Lens product difference.

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
        → [foundation] M2a detail geometry and continuity
        → [current] C1 non-modal product focus rail
        → [pending] C2 Candidate persistence
        → [pending] C3 bounded comparison
        → [pending] M3 accessibility and motion finalization
    → [pending] explicit Decision + Configuration + Current order
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

The deployed ledger revision was judged to have the intended menu-map character. M1 is treated as passed, while the ledger remains the stable coordinate plane for later states rather than a completed product by itself.

## M2a finding: detail continuity is infrastructure

The first product-detail deployment failed because closing detail moved the source ledger row severely. The root causes were conditional desktop geometry and native dialog focus or scroll restoration.

The correction:

- reserves the wide-screen inspector column before detail opens
- keeps 64–84rem layouts on an overlay sheet rather than shrinking the ledger
- uses stable scrollbar geometry
- records and restores the source row's viewport coordinate
- keeps the same ledger DOM nodes throughout

This is a required continuity invariant, but it does not prove a distinct product capability. A cleaner detail sheet remains conventional unless it contributes to reversible consideration or comparison.

## Active workstream: customer decision spine

### Goal

Implement one coherent mobile-first interaction using the canonical reference menu:

```text
compressed menu overview
→ category semantic zoom
→ non-modal product focus
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
    → [foundation] M2a detail geometry and continuity
    → [current] C1 non-modal product focus rail
    → [pending] C2 Candidate persistence
    → [pending] C3 bounded comparison
    → [pending] M3 accessibility and motion finalization
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
- **Foundation:** secondary evidence detail with geometry and scroll continuity
- **Current:** non-modal product focus attached to an existing ledger row
- **Pending:** Candidate add, remove, persistence, and original-row markers
- **Pending:** bounded comparison for two or three genuine possibilities
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
- do not count visual polish or ordinary usability improvement as proof of the consideration model

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

## Current implementation slice: C1 non-modal product focus rail

### Goal

Let a user identify and hold one currently inspected product without entering a product page or modal detail surface:

```text
stable category ledger
→ focus one product row
→ read a bounded bottom rail
→ continue scrolling or focus another row
→ optionally request evidence detail
```

This is still browsing. C1 does not create Candidate, quantity, configuration selections, totals, or an order item.

### State contract

C1 separates product focus from product detail:

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

- selecting a product sets `focusedProductId` but leaves `detailLevel` at `closed`
- the focus rail is driven by `focusedProductId`
- `更多資訊` explicitly opens summary detail
- summary and full detail remain reversible for the same `ProductId`
- closing detail returns to the rail and preserves product focus
- `收起` explicitly clears product focus and detail
- changing to a reading mode that hides the product clears focus first
- Product focus must not be represented as Candidate or ordering state

### Presentation

- the rail is fixed at the mobile viewport bottom and does not lock background interaction
- the ledger remains scrollable and another row may be focused directly
- the focused marker stays attached to the canonical product row
- the menu reserves stable bottom clearance before the rail opens
- opening or closing the rail must not change ledger width, row height, or source-row viewport position
- the rail shows category, availability, name, price, and at most two trusted cue values
- the rail exposes only `更多資訊` and `收起` during C1
- no inactive or placeholder Candidate control is shown

### Secondary evidence detail

- evidence detail opens only after `更多資訊`
- mobile uses a modal sheet; sufficiently wide screens may use the reserved inspector
- closing evidence returns keyboard focus to the rail's `更多資訊` control
- closing evidence keeps the focused row and rail active
- description, trusted facts, source, confidence, incomplete-data notice, and delayed-configuration notice remain available
- no Candidate, modifier selection, quantity, total, or ordering action appears

### C1 checkpoint gate

C1 passes only if a mobile tester can:

1. tap a product without opening a modal or leaving the menu
2. continue scrolling and tap another product while the rail is visible
3. recognize which canonical row owns the rail
4. open evidence only through the explicit `更多資訊` action
5. close evidence and return to the same rail without a scroll jump
6. close the rail and return focus to the exact source product
7. describe the interaction as remaining inside one menu rather than navigating into a product page

C1 is not evidence that Menu Lens is complete. It only establishes the interaction substrate needed for C2 Candidate persistence.

### Explicit exclusions for C1

- no Candidate or comparison state
- no `先留著` placeholder before Candidate exists
- no quantity or modifier controls
- no explicit Decision
- no Configuration, total, Current order, or checkout
- no filtering, ranking, persistence, URL state, router, backend, or remote analytics
- no alternative lenses
