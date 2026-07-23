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
        → [rejected] C1 fixed product focus rail
        → [current research] relational menu reading
            [planned] Prototype A — Axis-only score
            → [planned] Prototype B — Anchor-only relation
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
| Relational menu research | Active | shared axes, anchor relations, stable row projection, failure gates | M1 shared ledger | evidence for or against relation-first menu reading |
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

- four moderated task scripts for overview, consideration, comparison, and Configuration
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

The first deployed attempt placed six large category regions before the existing complete-menu list.

Pages review showed that it behaved as:

```text
large category controls
→ conventional complete-menu list
```

Region size, counts, price ranges, and representative products did not create a different reading model.

### Rejected: desktop-first static workspace

The second deployed attempt used a desktop structure rail, dense center field, and category summary inspector.

On mobile, the meaningful differences disappeared and the interface collapsed to:

```text
horizontal category chips
→ single-column product list
```

Desktop-only layout is not evidence for the mobile product model.

### Passed: M1 compressed overview

The compressed whole-menu overview preserved the restaurant's six-region shape, approximate menu size, and price range without implying hidden products.

### Rejected then corrected: M1 product presentation

The first expanded-category attempt remained an ordinary product-card feed.

The correction was structural:

- each category became one semantic table surface
- sequence, dish name, bounded reading cues, and price use shared columns
- sold-out and incomplete-data status remain inside the shared lane
- individual products do not receive separate card surfaces
- canonical order and one continuous reading order remain stable

The shared ledger is treated as a passed **coordinate plane**, not a complete product.

### Rejected: M2 modal product detail

The modal detail experiment failed because:

- closing detail moved the source row severely
- the interaction remained a conventional single-product reader
- detail did not reduce repeated opening, memory work, or product relocation

Geometry fixes were infrastructure, not product evidence.

### Rejected: C1 fixed product focus rail

The fixed rail experiment failed because:

- severe perceived jumping remained
- fixed viewport occupation changed the effective reading area
- scroll and focus restoration became compensatory choreography
- only one current product remained visible in the decision model
- replacing one product summary with another did not expose relationships
- the interaction still did not solve comprehension linearity

C1 must not be treated as the substrate for Candidate work.

## Current research question

The current work no longer asks:

> Can one product be opened more cleanly?

It asks:

> Can one stable menu surface make relationships among several products visible at once, without changing canonical order, moving rows, filtering products, or requiring a second comparison list?

The immediate target is **comprehension linearity**:

```text
inspect A
→ remember A
→ inspect B
→ reconstruct A
→ repeat
```

The next prototypes must transform this into direct visible comparison.

## Current research slice: relational menu reading

The full design record is in `docs/relational-menu-research.md`.

### Shared principles

- canonical product rows remain the substrate
- one interaction should expose relationships among at least three products
- row identity, order, width, and height remain stable
- no fixed rail, inline expansion row, or scroll correction
- missing or low-confidence data remains unknown
- no filtering, ranking, recommendation, or hidden subset
- mobile evidence is required
- Candidate remains blocked until relational reading shows value

### Prototype A — Axis-only score

The same category ledger is projected through one shared reading dimension:

```text
default
price
portion
meal role
preparation
```

No product becomes selected or anchored.

Gate:

- users can answer category-structure questions without opening products
- the control is not mistaken for a filter
- all products remain visibly present
- switching axes causes no row movement
- missing data is understood as unknown
- the result supports scanning rather than only resembling a spreadsheet

### Prototype B — Anchor-only relation

One product becomes an explicit comparison baseline.

Other rows display:

```text
price difference
＋ one bounded semantic relationship
```

No sorting, filtering, recommendation, fixed rail, or modal is introduced.

Gate:

- users understand the baseline without teaching
- at least three products can be compared on one stable ledger
- changing the anchor does not move rows
- the anchor is not mistaken for recommendation, commitment, or order state
- repeated product-detail openings decrease

### Prototype C — Combined relational score

Axis and Anchor may be combined only after both produce useful evidence independently.

This prototype is blocked by default. It must not be implemented merely because both concepts exist in code.

## Required outputs before Candidate resumes

- remove or isolate the failed C1 focus rail
- remove fixed rail spacing and rail-specific scroll choreography
- retain the passed M1 overview and shared ledger
- implement pure relation projections with explicit uncertainty
- expose Axis-only and Anchor-only as bounded prototypes
- run the existing comparison-oriented evaluation tasks
- record failure as readily as success
- select one relation grammar only after observable evidence

## Evaluation focus

Do not begin with preference questions.

Observe:

- product-detail openings
- backtracking
- attempts to relocate products
- recall language such as "I think the previous one was..."
- ability to explain price and semantic differences
- understanding of missing metadata
- belief that products were filtered or recommended
- visible row movement
- whether the result only feels prettier or more convenient

A prototype fails if:

- users still inspect one product at a time
- relationship labels add more reading work than they remove
- row content changes create perceived jumping
- missing metadata produces false conclusions
- users believe products were hidden, sorted, ranked, or selected
- feedback remains limited to ordinary usability improvement

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

The product contract already requires:

- complete-menu access
- browsing distinct from ordering
- preserved browsing context
- comparison support
- explicit uncertainty for incomplete metadata

The current change is the experimental route used to investigate those requirements. It does not change the requirements or authorize deferred states.
