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
    → [active, plan-review-gated] CND2 — Candidate review workspace
    → [blocked] Candidate comparison
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
| CND2 Candidate review workspace | Active, plan-review-gated | derived Candidate retrieval, revisit, removal, and exact menu return | approved workspace contract |
| Candidate comparison | Blocked | bounded decision-relevant comparison generated from Candidates | explicit CND2 disposition first |
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

Active slice:

```text
docs/candidate-workspace-plan.md
```

Accepted substrate records:

```text
docs/relational-menu-research.md
docs/prototype-b-anchor-plan.md
docs/prototype-c-anchor-axis-plan.md
docs/candidate-marks-plan.md
```

## Passed substrate — M1 shared ledger

M1 established one stable table surface per category:

- sequence, Product name, bounded evidence, and price use shared columns;
- sold-out and incomplete-data states remain visible;
- canonical order and one continuous reading order remain stable;
- Products do not receive separate card identities.

This remains the coordinate plane for Prototype C and CND1 Candidate marks.

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

- price duplicated the visible numeric price column;
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

The first two limitations motivate CND2. The latter two remain accepted current-scope limitations.

## Active workstream — CND2 Candidate review workspace

### Question

> Can a diner retrieve, review, revisit, and dismiss Candidates collected across the canonical menu without losing the previous menu position or mistaking the workspace for an order?

### Why this precedes comparison

Comparison is generated from Candidates, but CND1 exposes only attached row marks and a global count. A bounded Candidate collection view must first establish:

- which Products are currently Candidates;
- which canonical categories they belong to;
- how to remove one without affecting reading or order state;
- how to return to the exact previous menu context;
- how to navigate back to one Candidate's canonical row.

Comparison would otherwise combine an unproven Candidate collection surface with a second new interaction problem.

### Authorized derived view

```text
canonical Products
+ Candidate ProductId membership
→ derived Candidate review workspace
```

CND2 may derive canonical Product references and group them by canonical category order. It may not store copied Product objects, insertion order, ranking, selection, comparison state, quantity, configuration, totals, or order state.

### Entry and return

The menu heading may add one explicit `查看考慮項目` action when count is greater than zero.

Opening the workspace must preserve:

- complete `MenuReadingState`;
- Candidate membership;
- previous scroll position;
- previous focus origin.

Ordinary `回到完整菜單` restores those values exactly.

A separate row action, `在菜單中查看`, may intentionally focus the Candidate's canonical category and row using existing menu-reading transitions.

### Workspace content

The workspace is a compact derived document, not a modal, rail, sheet, overlay, fixed footer, cart, or comparison matrix.

Allowed row evidence:

- canonical category name;
- Product name;
- current price;
- ordinary cues;
- sold-out and incomplete-data labels;
- `在菜單中查看`;
- `移出考慮`.

Not allowed:

- Prototype C Anchor-relative projections;
- workspace semantic-axis controls;
- side-by-side comparison fields;
- score, rank, match, winner, quantity, modifiers, total, checkout, or order language.

### Removal and empty state

`移出考慮` removes only Candidate membership. It leaves reading state, Anchor, semantic axis, Product data, and all order states unchanged.

Removing the final Candidate leaves an in-place empty workspace with an explicit return action. The workspace does not auto-close and CND2 does not add `clear all`.

### Plan and gate

Full plan:

```text
docs/candidate-workspace-plan.md
```

Before implementation, the plan must be accepted. Implementation must then begin with failing tests for canonical derivation, stale and duplicate handling, surface continuity, exact scroll/focus return, Product locator behavior, removal focus recovery, narrow-screen fit, and absence of comparison or transaction state.

## Blocked later work

Until CND2 receives an explicit implementation disposition, do not begin:

- Candidate comparison;
- comparison selection or matrix;
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

Prototype C, CND1, and the CND2 plan refine existing product invariants without changing `docs/product-contract.md`.