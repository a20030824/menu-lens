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
        → [current] M1 mobile semantic menu zoom
        → M2 product focus continuity
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
    [current] M1 mobile semantic menu zoom
    → [pending] M2 product focus continuity
    → [pending] M3 accessibility and motion finalization
→ [pending] Candidate + comparison
→ [pending] explicit Decision + Configuration + Current order
```

### Required outputs

- **Complete:** one client application using the canonical menu
- **Complete:** stable category and product ordering
- **Current:** compressed overview containing all six category regions
- **Current:** reversible `overview`, single-category, and all-expanded reading modes
- **Current:** category expansion in place without removing the other five regions
- **Current:** explicit route to all 30 products
- **Current:** compact product rows using no more than two trusted semantic cues
- **Pending:** product focus using a mobile partial sheet and desktop inspector
- **Pending:** layered semantic detail with evidence folded separately
- **Pending:** focus return, scroll preservation, and surrounding-alternative continuity
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

## Current implementation slice: M1 mobile semantic menu zoom

### Goal

Make the first mobile interaction preserve a mental model of the whole menu while allowing one region to be examined:

```text
six-region compressed overview
→ expand one category in place
→ return to overview or expand all products
```

This slice tests semantic zoom, not product detail or ordering intent.

### Reading modes

#### Overview

- all six canonical categories remain visible in canonical order
- each compressed band shows category number, name, product count, price range, trustworthy structural summary, and relative product-count bar
- each band previews at most two currently available products in canonical order
- sold-out products are not used as preview examples but remain in the canonical category collection
- the initial screen does not use horizontal category chips

#### Single-category focus

- exactly one category expands at its original position
- the other five categories remain visible as compressed bands
- selecting another category changes which region is expanded without reordering regions
- selecting the focused category again returns to overview
- a sticky context bar identifies the current region and provides explicit overview and all-expanded actions

#### All-expanded

- all six categories reveal their complete canonical product rows
- all 30 products remain reachable in one document
- scroll position updates the current category label without filtering or reordering content
- returning to overview compresses all regions again

### Product-row behavior

- use compact menu rows rather than full-height card nodes
- show name, price, at most two trusted semantic cues, sold-out state, and partial-metadata state
- omit unsupported or low-confidence cues instead of guessing
- retain sold-out products in canonical position
- product rows are not interactive during M1

### Meaningful motion

- category reveal may animate only the semantic expansion relationship
- motion must not reorder categories or products
- reduced-motion preference removes the reveal transition and smooth scrolling
- no decorative entrance, hover-lift, parallax, or continuously moving elements

### Explicit exclusions for M1

- no product opening or product detail
- no bottom sheet or desktop product inspector
- no Candidate or comparison state
- no quantity, modifier selection, Configuration, total, Current order, or checkout
- no product filtering or ranking
- no persistence, URL state, router, backend, or remote analytics
- no alternative lenses

### M1 checkpoint gate

M1 is useful only if a mobile tester can:

1. identify all six category regions before opening one
2. see which regions contain more or fewer products
3. understand the approximate category price ranges
4. expand one category at its original location
5. continue seeing the other five regions in their canonical positions
6. switch focused categories without interpreting the interaction as mutually exclusive tabs
7. return clearly to the compressed menu overview
8. explicitly reveal all 30 products
9. scan expanded products as compact menu rows rather than a card feed
10. describe the difference as:

```text
I first saw the whole menu compressed,
then enlarged one region while the other regions stayed in place.
```

A response such as `the category buttons look different` does not pass the gate.

If M1 still feels like conventional category navigation plus a long list, implementation stops before product detail, Candidate, or comparison work.
