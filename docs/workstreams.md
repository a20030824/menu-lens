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
    → [active] menu reading workspace
        [current] static workspace
        → semantic detail and folding
        → continuity-focused motion
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
| Customer decision spine | In progress | menu map → full menu → product focus → candidates → comparison → decision → configuration → current order | domain dataset and formative protocol | one complete interactive flow |
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

The complete-menu technical baseline provides:

- one static local client using the validated canonical menu
- restaurant summary and complete-menu trust cues
- all six categories and all 30 products in one stable document
- category navigation that moves without filtering or replacing products
- inline product detail resolved by stable `ProductId`
- sold-out and incomplete-metadata behavior
- keyboard open, Escape close, and focus return
- reduced-motion-aware category scrolling
- focused menu-reading tests and a static build path

The first deployed menu-map attempt enlarged the category controls into six Atlas tiles. Pages review showed that this did not materially change the reading model: users still encountered a category selector followed by a conventional long list. That visual hypothesis is rejected. The menu reading workspace now makes the complete menu itself carry category structure, local comparison, and later product focus.

## Active workstream: customer decision spine

### Goal

Implement one coherent mobile-first interaction using the canonical reference menu:

```text
menu reading workspace
→ product focus
→ Candidate
→ comparison
→ explicit Decision
→ Configuration
→ Current order
```

### Progress

```text
[complete] complete-menu technical baseline
→ [active] menu reading workspace
    [current] static workspace
    → [pending] semantic detail and folding
    → [pending] continuity-focused motion
→ [pending] Candidate + comparison
→ [pending] explicit Decision + Configuration + Current order
```

### Required outputs

- **Complete:** one client application
- **Complete:** complete-menu browsing with stable category and product ordering
- **Baseline complete:** inline product detail with focus return and scroll preservation
- **Current:** static reading workspace with compact restaurant summary, category structure, dense menu field, and category summary inspector
- **Pending:** desktop product inspector and mobile partial sheet
- **Pending:** layered semantic detail with evidence folded separately
- **Pending:** bounded motion that explains selection, location, opening, and return
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
- no generic state-machine, repository, plugin, animation, or design-system framework
- do not add abstractions for deferred work
- preserve canonical product and category order
- preserve `Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound`

## Current implementation slice: static reading workspace

### Goal

Test the information architecture without product-detail interactions or animation:

```text
compact restaurant scope
→ stable category structure
→ complete dense menu field
→ current-category summary
```

The purpose of this checkpoint is to determine whether the complete menu itself can communicate restaurant shape. Product focus, folding, bottom sheets, and motion are deliberately withheld so they cannot disguise a weak static structure.

### Required behavior

- keep all six categories and all 30 products in one canonical document
- preserve canonical category and product ordering
- replace the rejected six-tile Atlas with a compact restaurant summary
- show category product-count proportions, counts, price ranges, and trustworthy structural summaries
- use a desktop structure rail for overview and location rather than a primary category-selection screen
- use a mobile sticky locator that navigates without filtering or replacing products
- render category zones as continuous sections of the complete menu
- render compact product nodes in a shared grid rather than full-width ecommerce rows
- show no more than two supported semantic cues per compact product node
- omit unsupported or low-confidence cues instead of guessing
- keep sold-out products in canonical position
- keep incomplete metadata visible as a bounded signal
- show the active category summary in a stable desktop inspector region
- synchronize desktop and mobile location controls with scroll position
- respect reduced-motion preference for category movement
- add focused tests for ordering, counts, proportions, cue bounds, sold-out placement, and incomplete metadata

### Explicit exclusions for this checkpoint

- no product opening or product-detail interaction
- no inline Accordion
- no desktop product inspector content
- no mobile bottom sheet
- no folding controls
- no transition or micro-animation
- no Product reordering
- no category filtering or tab replacement
- no Candidate or comparison state
- no `DraftOrderItem` creation
- no Configuration form, quantity, modifier selection, order total, or Current order
- no persistence, URL state, router, backend, or remote analytics
- no alternative lenses

### Checkpoint gate

The static workspace checkpoint is useful only if a tester can, without opening anything:

1. identify the six stable menu regions
2. see which regions contain more or fewer products
3. estimate the restaurant's overall menu size and price range
4. scan several neighboring products within one category
5. recognize the main use or portion cue for supported products
6. understand that every category remains in the same complete menu
7. move between categories without believing content was filtered or replaced
8. retain orientation while scrolling from one category zone to another
9. describe a difference from a conventional QR menu that is about understanding relationships, not merely larger controls or visual styling

If the deployed checkpoint still reads as a conventional category selector plus product list, implementation stops here and the static structure is revised before semantic detail, folding, motion, Candidate, or comparison work begins.
