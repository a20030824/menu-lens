# Workstreams

This file is the current coordination view for Menu Lens.

It exists to prevent parallel conversations from redefining the product, duplicating work, preserving failed interaction surfaces, or expanding the demo before the decision spine is coherent.

## Coordination rules

- The core conversation owns product-contract changes and cross-workstream conflict resolution.
- Each implementation conversation should own one bounded outcome, not a collection of screens or technologies.
- Workstreams should modify only the files needed for their outcome.
- Cross-cutting discoveries should be recorded and returned to the core conversation rather than silently expanding scope.
- Conventional-interface comparison is parked until the Menu Lens interaction is coherent enough to evaluate on its own.
- Prefer fewer moving parts, fewer dependencies, and fewer abstractions while the product model is still being tested.
- A difference that exists only on desktop does not count as a core product difference.
- A cleaner or more intuitive conventional interaction does not by itself prove a Menu Lens product difference.
- Failed interaction experiments should be removed or isolated instead of retained as dormant architecture.
- Candidate, Comparison, Decision, Configuration, and order work remain blocked while the menu-reading hypothesis is unresolved.

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
        → [passed] M1 compressed overview + shared ledger
        → [rejected] M2 modal product detail
        → [rejected, removed] C1 fixed product focus rail
        → [current research] relational menu reading
            [implemented, awaiting review] Prototype A — Axis-only score
            → [blocked] Prototype B — Anchor-only relation
            → [blocked] Prototype C — Combined relational score
        → [blocked] attached Candidate marks
        → [blocked] bounded comparison
        → [blocked] M3 accessibility and motion finalization
    → [blocked] explicit Decision + Configuration + Current order
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
| Formative evaluation | Complete | task scripts, observation notes, local events, falsification signals | product contract | protocol that shapes implementation |
| Customer decision spine | In progress | menu overview → relational reading → consideration → comparison → decision → configuration → current order | domain dataset and formative protocol | one coherent mobile-first flow |
| Relational menu research | Active, review-gated | shared axes, stable row projection, failure gates | M1 shared ledger | evidence for or against relation-first menu reading |
| Continuity and table state | Deferred | preserved candidates, submitted rounds, coarse table composition | customer decision spine | continuity over a validated state model |
| Alternative lenses | Deferred | thin quick, shared-table, and featured views | stable decision spine | views over the same canonical menu |
| Merchant authoring | Deferred | category defaults, exceptions, confidence, incomplete-data preview | proven useful semantic fields | small authoring test, not production CMS |
| Conventional baseline | Parked | credible conventional ordering flow using the same data | coherent Menu Lens demo and explicit study need | optional comparison condition |
| Production integration | Out of scope | payment, POS, KDS, inventory, auth, deployment operations | none | none |

## Authoritative entry points

- `docs/product-contract.md`
- `docs/glossary.md`
- `docs/workstreams.md`
- `docs/handoff.md`

Current design research:

- `docs/relational-menu-research.md`

Supporting documents:

- `docs/problem-framing.md`
- `docs/interaction-model.md`
- `docs/merchant-data-strategy.md`
- `docs/demo-scope.md`
- `docs/evaluation-plan.md`

## Completed foundation work

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

- moderated task scripts for overview, consideration, comparison, and Configuration
- neutral moderator and think-aloud guidance
- observable success, failure, and falsification signals
- a bounded local event vocabulary
- observation and session-summary templates
- explicit criteria for redesigning, simplifying, or removing a feature

The complete-menu technical baseline proved:

- one static local client can render the validated canonical menu
- all six categories and all 30 products can remain in one stable collection
- stable `ProductId` and `CategoryId` can drive reading behavior
- sold-out and incomplete metadata can remain explicit
- the static build path is sufficient for Pages review

## Deployed menu-reading findings

### Rejected: large category Atlas

The first deployed attempt placed six large category regions before the existing complete-menu list. It behaved as large category controls followed by a conventional complete-menu list. Region size, counts, price ranges, and representative products did not create a different reading model.

### Rejected: desktop-first static workspace

The second deployed attempt used a desktop structure rail, dense center field, and category summary inspector. On mobile, the meaningful differences disappeared and the interface collapsed to horizontal category controls followed by a single-column product list. Desktop-only layout is not evidence for the mobile product model.

### Passed: M1 compressed overview + shared ledger

The compressed whole-menu overview preserved the restaurant's six-region shape, approximate menu size, and price range without implying hidden products.

The expanded-category correction became structural:

- each category is one semantic table surface
- sequence, dish name, bounded reading cues, and price use shared columns
- sold-out and incomplete-data status remain inside the shared lane
- individual products do not receive separate card surfaces
- canonical order and one continuous reading order remain stable

The shared ledger is a passed coordinate plane, not a completed product.

### Rejected: M2 modal product detail

The modal detail experiment failed because closing detail moved the source row severely, the interaction remained a conventional single-product reader, and detail did not reduce repeated opening, memory work, or product relocation. Geometry fixes were infrastructure, not product evidence.

### Rejected and removed: C1 fixed product focus rail

The fixed rail experiment failed because:

- severe perceived jumping remained
- fixed viewport occupation changed the effective reading area
- scroll and focus restoration became compensatory choreography
- only one current product remained visible in the decision model
- replacing one product summary with another did not expose relationships
- the interaction still did not solve comprehension linearity

Phase 0 removed the rail module, fixed rail DOM and CSS, permanent `8.75rem` bottom clearance, `preserveSourceRow()`, rail-specific scroll correction and focus restoration, product-focus state, C1-only tests, and the rejected modal detail entry from the primary flow. C1 is not a substrate for Candidate work.

## Current research question

The current work asks:

> Can one stable menu surface make relationships among several products visible at once, without changing canonical order, moving rows, filtering products, or requiring a second comparison list?

The immediate target is comprehension linearity:

```text
inspect A
→ remember A
→ inspect B
→ reconstruct A
→ repeat
```

The prototype must transform this into direct visible comparison.

## Prototype A — Axis-only score

Status:

```text
[implemented, awaiting review]
```

One shared category ledger can be read through:

```text
default
price
portion
meal role
preparation
```

Implementation rules:

- the control is a labeled native `<select>` shown only in single-category mode
- overview does not show the control
- all-expanded mode uses `default`
- entering overview, all-expanded mode, or another category resets the axis to `default`
- the same table, rows, canonical order, columns, widths, and price cells remain
- only one bounded relation lane changes
- price uses one category min–max scale; a single-price category uses a centered neutral marker
- portion, role, and preparation use only trusted formal metadata
- missing or low-confidence metadata displays `未提供`
- sold-out products retain their canonical position and axis evidence
- no filtering, sorting, ranking, recommendation, anchor, Candidate, Comparison, or order state exists

Pages gate:

- users can answer category-structure questions without opening products
- the control is not mistaken for a filter
- all products remain visibly present
- switching axes causes no row, column, or scroll movement
- missing data is understood as unknown
- the result supports scanning rather than only resembling a spreadsheet
- feedback must indicate lower comprehension work, not merely a prettier or more convenient interface

Prototype A has not passed this gate yet.

## Prototype B — Anchor-only relation

Status:

```text
[blocked]
```

No anchor state, baseline styling, relationship phrases, or product click behavior may be added until Prototype A has been reviewed and explicitly dispositioned.

## Prototype C and later states

Prototype C remains blocked until Axis-only and Anchor-only each produce useful independent evidence. Candidate, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, product networks, scatterplots, and shared-table composition remain blocked.

## Evaluation focus

Observe:

- whether one action exposes relationships among several products
- product-by-product reading and backtracking
- recall language such as “I think the previous one was…”
- ability to identify lower-priced products, shared portions, faster preparation, and missing data
- belief that products were filtered, sorted, ranked, recommended, or selected
- visible row, column, or scroll movement
- whether the result only feels prettier or more convenient

A prototype fails if users still inspect one product at a time, relationship marks add more reading work than they remove, row content creates perceived jumping, missing metadata produces false conclusions, or users believe items were hidden or ranked.

## Constraints

- no backend, database, authentication, payment, POS, or KDS integration
- no conventional baseline
- no Quick, Shared-table, or Featured lens implementation
- no merchant CMS
- no remote analytics
- no generic state-machine, repository, plugin, animation, or design-system framework
- no abstractions for deferred Candidate or order work
- preserve canonical product and category order
- preserve `Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound`
- do not count desktop-only layout as proof
- do not count visual polish as proof
- no fixed rail, Candidate shelf, comparison modal, filter, ranking, or recommendation during the relational prototype round

## Contract impact

None.

The product contract already requires complete-menu access, browsing distinct from ordering, preserved browsing context, comparison support, and explicit uncertainty for incomplete metadata. Prototype A changes the experimental route used to investigate those requirements; it does not change the requirements or authorize deferred states.
