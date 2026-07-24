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
        → [rejected, removed] C1 fixed product focus rail
        → [useful but insufficient] Prototype A — Axis-only score
        → [useful but insufficient] Prototype B — Anchor-only relation
        → [passed for current scope] Prototype C — Anchor + explicit shared axis
    → [active, plan-review-gated] CND1 — Attached Candidate marks
    → [blocked] Candidate workspace / bounded comparison
    → [blocked] Decision / Configuration / Current order
→ continuity and table state
→ thin alternative lenses
→ merchant-authoring test
→ decide whether a conventional baseline is useful
```

## Workstream status

| Workstream | Status | Scope | Primary output |
|---|---|---|---|
| Foundation memory | Complete | product contract, glossary, boundaries, handoff | stable shared memory |
| Domain and reference data | Complete | types, validation, fictional menu, incomplete metadata | canonical local dataset |
| Formative evaluation | Complete | tasks, observations, events, falsification signals | observation contract |
| Relational menu research | Complete for current scope | stable ledger and A/B/C evidence | accepted C reading substrate |
| CND1 Attached Candidate marks | Active, plan-review-gated | row-attached reversible Candidate membership only | approved implementation contract |
| Candidate workspace and comparison | Blocked | second-stage Candidate decision support | explicit CND1 disposition first |
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

Current slice:

```text
docs/candidate-marks-plan.md
```

Historical relational evidence:

```text
docs/relational-menu-research.md
docs/prototype-b-anchor-plan.md
docs/prototype-c-anchor-axis-plan.md
```

## Passed substrate — M1 shared ledger

M1 established one stable table surface per category:

- sequence, Product name, bounded evidence, and price use shared columns;
- sold-out and incomplete-data states remain visible;
- canonical order and one continuous reading order remain stable;
- Products do not receive separate card identities.

This remains the coordinate plane for Candidate marks.

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
- exact price deltas;
- matching labels expose equality;
- stable canonical order and four-column ledger;
- stable geometry at 320 px and 390 px in a Chromium proxy;
- same-category axis preference preservation;
- row-local keyboard focus after Anchor selection and Escape;
- passing Typecheck, tests, and static build.

Evidence boundary:

- acceptance is a product-owner current-scope disposition;
- unfamiliar-participant evidence is not claimed;
- learnability and measured task improvement remain unproven known limitations;
- those limitations no longer block the next bounded slice.

## Active workstream — CND1 Attached Candidate marks

### Question

> Can a diner preserve several serious possibilities directly on the canonical menu without mistaking them for an order, losing menu position, or creating a second Product list?

### Planned state boundary

```text
Product
→ Candidate membership by ProductId
```

Candidate membership has no:

```text
quantity
configuration
modifier selections
order total
submission state
recommendation rank
```

Anchor and Candidate are independent:

```text
Anchor / semantic axis = reading state
Candidate              = reversible consideration state
```

A Product may be both, either, or neither.

### Selected layout direction

Keep four columns and split the existing third column into two fixed lanes:

```text
relation lane
candidate lane
```

Example:

```text
山椒烤雞半隻    基準 · 多人       NT$520
                  [考慮中]

紹興奶油蝦      少 NT$40 · 2–3 人 NT$480
                  [考慮]
```

This avoids:

- squeezing the already narrow mobile Product-name column;
- compressing the price column;
- replacing C evidence;
- adding a fifth column;
- creating a detached Candidate list before it is justified.

### Planned summary

At the menu heading:

```text
尚無考慮項目 · 不影響點餐
```

or:

```text
考慮中 3 道 · 尚未點餐
```

The existing sticky orientation context may append the count. No second sticky Candidate surface is authorized.

### Eligibility

- available Products may be marked;
- sold-out Products remain visible but cannot be newly marked;
- Candidate state lasts for the active session;
- no bulk clear action is included in CND1.

### Required continuity

Candidate membership must survive:

- overview;
- category focus and changes;
- all-expanded mode;
- Anchor selection, cancellation, change, and clear;
- semantic-axis changes;
- same-category reopening.

Candidate operations must not alter Anchor, axis, Product data, order state, scroll position, or canonical order.

### Planned test gates

Before implementation, add failing tests for:

- unique ProductId membership;
- add, remove, and no-op removal;
- sold-out rejection;
- canonical derived order;
- absence of quantity and configuration;
- persistence through every reading transition;
- Candidate and Anchor coexistence;
- four columns and one canonical row per Product;
- fixed relation and Candidate lanes;
- no Candidate list, rail, modal, sheet, or fixed footer;
- no sorting, filtering, hiding, dimming, cart, total, or order state;
- toggle focus continuity;
- zero geometry and scroll differences between `考慮` and `考慮中` at 320 px and 390 px.

Full plan:

```text
docs/candidate-marks-plan.md
```

## Blocked later work

Until CND1 receives an explicit implementation disposition, do not begin:

- Candidate workspace or copied Candidate list;
- Candidate comparison;
- explicit Decision;
- Configuration;
- Current order;
- quantity or modifiers;
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

The existing product contract already defines Candidate as reversible consideration without quantity, configuration, total, or order commitment. CND1 refines the first implementation route without changing those invariants.
