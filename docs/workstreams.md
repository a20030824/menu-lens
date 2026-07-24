# Workstreams

This file is the current coordination view for Menu Lens.

It prevents parallel conversations from redefining the product, retaining failed interaction surfaces, or expanding the demo before the decision spine is coherent.

## Coordination rules

- The core conversation owns product-contract changes and cross-workstream conflict resolution.
- Each implementation conversation owns one bounded outcome.
- Cross-cutting discoveries must be recorded instead of silently expanding scope.
- Desktop-only differences and visual polish do not prove a product difference.
- Failed or insufficient experiments remain isolated as evidence instead of accumulating in the active path.
- Conventional-interface comparison remains parked.
- Prefer fewer moving parts, dependencies, and abstractions while the product model is still being tested.
- Do not merge Product, Candidate, DraftOrderItem, ConfiguredOrderItem, or SubmittedOrderRound state.
- Passing one slice does not automatically authorize the next surface.

## Current sequence

```text
[complete] foundation memory
→ [complete] domain schema and reference dataset
→ [complete] formative evaluation protocol
→ [active] customer decision spine
    [complete] complete-menu technical baseline
    → [passed] mobile-first relational menu reading
        [rejected] large category Atlas
        → [rejected] desktop-first static workspace
        → [passed] M1 compressed overview + shared ledger
        → [rejected] M2 modal product detail
        → [rejected, removed] C1 fixed Product focus rail
        → [useful but insufficient] Prototype A — Axis-only score
        → [useful but insufficient] Prototype B — Anchor-only relation
        → [passed for current scope] Prototype C — Anchor + explicit shared axis
    → [passed for current scope] CND1 — Attached Candidate marks
    → [blocked] Candidate workspace / bounded comparison
    → [blocked] Decision / Configuration / Current order
→ [deferred] continuity and table state
→ [deferred] thin alternative lenses
→ [deferred] merchant-authoring test
→ [parked] conventional baseline decision
```

## Workstream status

| Workstream | Status | Scope | Primary output |
|---|---|---|---|
| Foundation memory | Complete | product contract, glossary, boundaries, handoff | stable shared memory |
| Domain and reference data | Complete | types, validation, fictional menu, incomplete metadata | canonical local dataset |
| Formative evaluation | Complete | tasks, observations, events, falsification signals | observation contract |
| Relational menu research | Passed for current scope | stable ledger and A/B/C evidence | accepted C reading substrate |
| CND1 Attached Candidate marks | Passed for current scope | row-attached reversible Candidate membership only | accepted consideration state |
| Candidate workspace / bounded comparison | Blocked | second-stage decision support | separate bounded plan required |
| Decision / Configuration / Current order | Blocked | transaction-boundary states | Candidate and comparison coherence first |
| Continuity and table state | Deferred | submitted rounds and coarse composition | stable decision spine first |
| Alternative lenses | Deferred | quick, shared-table, featured | stable decision spine first |
| Merchant authoring | Deferred | defaults, exceptions, confidence preview | proven semantic value first |
| Conventional baseline | Parked | conventional comparison condition | explicit later research need |
| Production integration | Out of scope | payment, POS, KDS, auth, live inventory | none |

## Authoritative entry points

Read before new work:

1. `README.md`
2. `docs/product-contract.md`
3. `docs/glossary.md`
4. `docs/workstreams.md`
5. the active slice document

Accepted substrate records:

```text
docs/relational-menu-research.md
docs/prototype-b-anchor-plan.md
docs/prototype-c-anchor-axis-plan.md
docs/candidate-marks-plan.md
```

No next slice is active yet.

## Passed substrate — M1 shared ledger

M1 established one stable table surface per category:

- sequence, Product name, bounded evidence, and price use shared columns;
- sold-out and incomplete-data states remain visible;
- canonical order and one continuous reading order remain stable;
- Products do not receive separate card identities.

This remains the coordinate plane for C and Candidate marks.

## Relational prototype dispositions

### Prototype A — Axis-only score

```text
[useful but insufficient]
```

Useful:

- one shared dimension supported simultaneous multi-Product scanning;
- portion and preparation exposed explicit known and unknown states;
- canonical order and geometry remained stable.

Insufficient:

- price duplicated the visible numeric column;
- only one dimension remained visible;
- axis switching retained memory work.

The obsolete A selector UI was removed. Its pure projection remains tested as historical evidence.

### Prototype B — Anchor-only relation

```text
[useful but insufficient]
```

Useful:

- exact price deltas removed repeated arithmetic;
- one temporary Anchor fit the domain model;
- canonical rows, statuses, and geometry remained stable.

Decisive failure:

- row-level semantic selection mixed dimensions;
- trusted differences were silently suppressed;
- omission was indistinguishable from equality;
- the surface could imply false exclusivity.

### Prototype C — Anchor + explicit shared axis

```text
[passed for current scope]
```

C preserves one Anchor and exact price deltas while the user explicitly selects one category-wide `份量` or `準備` axis.

Accepted evidence:

- complete active-axis projection across every canonical row;
- formal absolute labels or `未提供`;
- exact price deltas and visible equality;
- stable canonical order and four-column ledger;
- same-category axis preference preservation;
- row-local keyboard focus after Anchor selection and Escape;
- stable 320px and 390px geometry proxy;
- passing Typecheck, tests, and static build.

Evidence boundary:

- acceptance is a current-scope product disposition;
- unfamiliar-participant evidence is not claimed;
- learnability and measured task improvement remain unproven limitations.

## CND1 — Attached Candidate marks

```text
[passed for current scope]
```

Question:

> Can a diner preserve several serious possibilities directly on the canonical menu without mistaking them for an order, losing menu position, or creating a second Product list?

Implemented state boundary:

```text
Product
→ Candidate membership by ProductId
```

Candidate membership has no quantity, configuration, modifier selections, order total, submission state, recommendation rank, notes, or ownership.

Reading and Candidate state remain independent:

```text
Anchor / semantic axis = reading state
Candidate              = reversible consideration state
```

Implemented surface:

```text
four-column canonical ledger
+ fixed relation lane
+ fixed Candidate/status lane
+ one noninteractive Candidate count
```

Available rows expose one persistent `考慮` toggle. Membership is expressed through `aria-pressed` and pressed styling. Sold-out rows remain visible and cannot be newly marked.

Candidate membership survives overview, category focus and changes, all-expanded mode, every Anchor transition, semantic-axis switching, and same-category reopening.

### Final re-review corrections

The final review corrected:

1. stale ProductIds affecting count;
2. Candidate-dependent Product-name weight;
3. repeated live-region mutations on unrelated renders;
4. changing labels on an `aria-pressed` toggle;
5. an unused row-wide `data-candidate` mirror;
6. a premature detached Candidate-list projection.

A code-derived Chromium proxy at 320px and 390px found zero Candidate on/off differences for row, table, button, lane, and horizontal-scroll geometry. Typecheck, tests, structure contracts, and static build pass.

Known limitations:

- no Candidate workspace exists;
- the count does not identify which collapsed categories contain Candidates;
- `考慮` terminology has no unfamiliar-participant validation;
- state lasts only for the active session.

These limitations do not block the current-scope disposition.

## Blocked later work

Until a separate bounded plan is approved, do not begin:

- Candidate workspace or copied Candidate list;
- Candidate comparison;
- explicit Decision;
- Configuration;
- Current order;
- quantity or modifiers;
- totals or submission;
- recommendation, ranking, or filtering;
- shared-table composition;
- checkout.

## Constraints

- no backend, database, authentication, payment, POS, or KDS integration;
- no conventional baseline;
- no alternative lens implementation;
- no merchant CMS;
- no remote analytics;
- no generic state machine, repository abstraction, plugin system, or design-system package;
- preserve canonical Product and category order;
- preserve `Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound`;
- do not count visual polish or desktop-only behavior as proof.

## Contract impact

None.

Prototype C and CND1 implement existing product invariants without changing `docs/product-contract.md`.
