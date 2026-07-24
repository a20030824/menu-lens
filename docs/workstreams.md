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
            [implemented, awaiting re-review] Prototype A — Axis-only score
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
| Relational menu research | Active, re-review-gated | shared axes, stable row projection, useful-axis eligibility, failure gates | M1 shared ledger | evidence for or against relation-first menu reading |
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

The Prototype A corrective iteration adds one low-confidence portion exception to the existing reference menu. This does not change the schema or product contract; it makes explicit uncertainty executable in the deployed relational-reading prototype instead of leaving `未提供` visible only in synthetic unit fixtures.

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
[implemented, awaiting re-review]
```

The first reverse review rejected the initial implementation for two concrete reasons:

1. the price microbar used a different table-cell baseline and changed row geometry on narrow screens;
2. the deployed reference menu could not produce an axis-level `未提供`, so the uncertainty task was not executable.

The corrective iteration keeps the same Prototype A boundary and changes only what is required to test the relational hypothesis correctly.

### Stable ledger

- one canonical table and one canonical row per product
- no sorting, filtering, hiding, dimming, copying, ranking, or recommendation
- no detail row, modal, sheet, rail, or fixed footer
- no axis-specific scroll compensation
- same four columns, price cells, statuses, and product order
- relation and status lanes reserve fixed line boxes
- table cells use one top-alignment rule across text and microbar renderers
- axis headings remain one fixed line

A headless 390 px and 320 px reverse measurement reports zero difference across renderer modes for:

- row height
- row top position
- column width
- header height
- table height

### Useful-axis eligibility

The control remains a labeled native `<select>` in single-category mode, but it no longer presents a mode merely because the schema supports that field.

A non-default axis is offered only when:

- the category contains at least three products; and
- the projected values contain at least two distinct visible states.

This means:

- price is offered where category prices differ;
- portion or preparation is offered where products actually differ or one value is explicitly unknown;
- meal role is not offered in the current reference menu because it only restates the category structure row by row;
- a two-product category cannot claim the required three-product relational evidence and therefore stays in `一般`.

The eligibility rule is not a filter. It changes which reading tools are meaningful for the current category; it never changes the product collection.

### Projection rules

- price uses one category-local min–max scale and visibly labels its direction `低→高`;
- equal-price categories use a centered neutral fallback;
- portion, role, and preparation use only formal semantic values;
- low-confidence or missing axis data displays `未提供`;
- the reference menu now includes one available shared dish with low-confidence portion metadata so the deployed uncertainty path is observable;
- sold-out products retain their canonical position and axis evidence;
- no recommendation, suitability, value judgment, anchor, Candidate, Comparison, or order state exists.

### Automated safeguards

The repository tests now cover:

- state initialization and reset boundaries
- expansion and canonical-order preservation
- category-local price scale and equal-price fallback
- formal labels and explicit unknown handling
- a real deployed unknown-axis fixture
- category-specific useful-axis eligibility
- omission of redundant role modes in the current dataset
- the three-product relational threshold
- sold-out evidence and placement
- absence of recommendation and deferred decision state
- CSS geometry-contract rules for fixed line boxes, top alignment, and one-line headings

## Re-review gate

Prototype A is not passed by automated checks or by the designer's own proxy test.

The next review must use an unfamiliar participant or an explicitly labeled independent proxy and must not teach the control.

Use categories that expose the relevant axes:

1. Open `個人主餐`; switch among its available modes and verify no visible movement.
2. Without reading each numeric price one by one, identify examples near the low, middle, and high ends of the shared scale and explain the evidence used.
3. Use `準備節奏` to identify several dishes that differ simultaneously.
4. Open `分享料理`; use `份量` to identify `多人分享`, `約 2–3 人`, and the `未提供` item.
5. Ask what `未提供` means; reject any interpretation that it means small, unsuitable, unavailable, or not recommended.
6. Confirm that no product disappeared, moved, duplicated, dimmed, or changed order.
7. Ask what the control changed without naming it; confirm it is understood as a reading mode rather than a filter, sorter, or recommendation control.
8. Ask whether the visible relationships reduced remembering and backtracking, not merely whether the table looks cleaner.

Prototype A passes only if:

- one switch exposes relationships among at least three products;
- users answer from simultaneous visible evidence rather than reconstructing earlier rows;
- the shared price scale contributes evidence beyond the existing numeric price column;
- unknown is understood as absent confidence, not a negative property;
- the complete menu remains credible;
- no visible geometry or orientation loss occurs;
- feedback indicates lower comprehension work rather than visual polish alone.

Prototype A fails if:

- the control is understood as filtering, sorting, ranking, or recommendation;
- users still inspect one product at a time;
- the relation marks add more interpretation work than they remove;
- the price axis is ignored in favor of reading every numeric price individually;
- unknown produces false conclusions;
- any obvious jump remains;
- the result only resembles a spreadsheet without improving relational reading.

## Prototype B — Anchor-only relation

Status:

```text
[blocked]
```

No anchor state, baseline styling, relationship phrases, or product click behavior may be added until Prototype A has been independently re-reviewed and explicitly dispositioned.

## Prototype C and later states

Prototype C remains blocked until Axis-only and Anchor-only each produce useful independent evidence. Candidate, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, product networks, scatterplots, and shared-table composition remain blocked.

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
