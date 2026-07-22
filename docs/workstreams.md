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

## Current sequence

```text
[complete] foundation memory
→ [complete] domain schema and reference dataset
→ [complete] formative evaluation protocol
→ [active] customer decision spine
    [complete] complete-menu technical baseline
    → [active] menu-map reading model
        [current] category atlas
        → menu field
        → focus inspector
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
| Customer decision spine | In progress | menu map → full menu → inline detail → candidates → comparison → decision → configuration → current order | domain dataset and formative protocol | one complete interactive flow |
| Continuity and table state | Deferred | scroll restoration, preserved candidates, submitted rounds, coarse table composition | customer decision spine | continuity behavior over the same state model |
| Alternative lenses | Deferred | thin quick, shared-table, and featured views | stable decision spine | views over the same canonical menu |
| Merchant authoring | Deferred | category defaults, exceptions, confidence, incomplete-data preview | proven useful semantic fields | small authoring test, not production CMS |
| Conventional baseline | Parked | credible conventional ordering flow using the same data | coherent Menu Lens demo and explicit study need | optional comparison condition |
| Production integration | Out of scope | payment, POS, KDS, inventory, auth, deployment operations | none in current demo | none |

## Completed foundation work

A new conversation can determine, without relying on chat history:

- what Menu Lens is investigating
- which states must remain distinct
- which terminology to use
- which workstream is currently allowed to proceed
- which work is deferred or out of scope
- how to report changes and unresolved questions

The authoritative entry points are:

- `docs/product-contract.md`
- `docs/glossary.md`
- `docs/workstreams.md`
- `docs/handoff.md`

The domain and reference-data workstream now provides:

- canonical TypeScript menu and order-state types
- runtime validation for the local dataset boundary
- one fictional restaurant with 30 products
- required and optional modifier examples
- personal and shared portion examples
- sold-out products that remain in the canonical collection
- intentionally incomplete semantic metadata
- metadata source and confidence representation
- focused compile-time and runtime invariant tests

The formative-evaluation workstream now provides:

- four moderated task scripts for overview, consideration, comparison, and Configuration
- neutral moderator and think-aloud guidance
- observable success, failure, and falsification signals
- a bounded local event vocabulary
- observation and session-summary templates
- explicit criteria for redesigning, simplifying, or removing a feature

The complete-menu technical baseline now provides:

- one static local client using the validated canonical menu
- restaurant summary and complete-menu trust cues
- all six categories and all 30 products in one stable document
- category navigation that moves without filtering or replacing products
- inline product detail resolved by stable `ProductId`
- sold-out and incomplete-metadata behavior
- keyboard open, Escape close, and focus return
- reduced-motion-aware category scrolling
- focused menu-reading tests and a static build path

The baseline proved the data, continuity, and accessibility contracts, but the deployed preview remained visually close to a conventional category list. The menu-map reading model is therefore inserted before Candidate work so the product first establishes a perceptible restaurant and menu structure.

## Active workstream: customer decision spine

### Goal

Implement one coherent mobile-first interaction using the canonical reference menu:

```text
menu map
→ complete menu
→ inline detail
→ Candidate
→ comparison
→ explicit Decision
→ Configuration
→ Current order
```

### Progress

```text
[complete] complete-menu technical baseline
→ [active] menu-map reading model
    [current] category atlas
    → [pending] menu field
    → [pending] focus inspector
→ [pending] Candidate + comparison
→ [pending] explicit Decision + Configuration + Current order
```

### Required outputs

- **Complete:** one client application
- **Complete:** complete-menu browsing with stable category ordering
- **Complete:** inline product detail without losing browsing context
- **Current:** first-screen category atlas that exposes restaurant shape
- **Pending:** category zones and denser menu-field reading
- **Pending:** desktop focus inspector and mobile partial sheet
- **Pending:** Candidate add, remove, workspace, and comparison behavior
- **Pending:** explicit transition from consideration to Decision
- **Pending:** Configuration only after Decision
- **Pending:** Current order clearly separated from Candidates
- **Pending:** local-only observation events aligned with `docs/evaluation-plan.md`
- focused tests for every implemented state transition and preserved invariant

### Constraints

- no backend, database, authentication, payment, POS, or KDS integration
- no conventional baseline
- no Quick, Shared-table, or Featured lens implementation
- no merchant CMS
- no remote analytics
- no generic state-machine, repository, plugin, or design-system framework
- do not add abstractions for deferred work
- preserve canonical product and category order
- preserve `Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound`

## Current implementation slice: category atlas

### Goal

Turn the first screen from a restaurant summary plus category controls into a readable map of the canonical menu:

```text
restaurant shape
→ connected category regions
→ complete menu anchor
```

### Required behavior

- represent every canonical category exactly once in the atlas
- preserve canonical category order and stable category identity
- use region scale only to communicate coarse product-count differences
- show category item count and price range
- derive structural summaries only from supported semantic data or category descriptions
- use available products in canonical order as representative examples
- keep sold-out and incomplete metadata visible as bounded aggregate signals
- make each region an anchor into the same complete-menu document
- keep the compact category-position navigation synchronized with scroll position
- preserve existing detail, focus-return, and reduced-motion behavior
- add focused tests for atlas invariants and display mappings

### Explicit exclusions

- no Product reordering
- no category filtering or tab replacement
- no menu-field product-node redesign
- no focus inspector or bottom sheet
- no Candidate or comparison state
- no `DraftOrderItem` creation
- no Configuration form, quantity, modifier selection, order total, or Current order
- no persistence, URL state, router, backend, or remote analytics
- no alternative lenses

### Completion gate

The category-atlas slice is complete when a tester can:

1. identify all six category regions from the first screen
2. see which category contains the most products
3. read category counts and price ranges without entering a category
4. understand that the atlas is a map, not a filter
5. activate a region and arrive at the matching complete-menu section
6. scroll through all 30 products with no category removed or reordered
7. see the atlas and compact position control agree about the active category

It does not need the menu-field redesign, focus inspector, Candidate, comparison, Decision, Configuration, Current order, alternative lenses, merchant tooling, production integration, or a baseline comparison before completion.
