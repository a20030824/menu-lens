# Workstreams

This file is the current coordination view for Menu Lens.

It prevents parallel conversations from redefining the product, retaining failed interaction surfaces, or expanding the demo before the decision spine is coherent.

## Coordination rules

- The core conversation owns product-contract changes and cross-workstream conflict resolution.
- Each implementation conversation owns one bounded outcome.
- Cross-cutting discoveries must be recorded instead of silently expanding scope.
- Desktop-only differences do not count as core product differences.
- Visual polish does not prove a Menu Lens product difference.
- Failed or insufficient experiments remain isolated as evidence instead of accumulating in the active path.
- Conventional-interface comparison remains parked.
- Candidate, Comparison, Decision, Configuration, and order work remain blocked while relational menu reading is unresolved.
- Prefer fewer moving parts, dependencies, and abstractions while the product model is still being tested.

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
        → [useful but insufficient] Prototype A — Axis-only score
        → [useful but insufficient] Prototype B — Anchor-only relation
        → [implemented, awaiting review] Prototype C — Anchor + explicit shared axis
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
| Domain and reference data | Complete | types, validation, fictional menu, incomplete metadata cases | product contract | local typed dataset and tests |
| Formative evaluation | Complete | tasks, observations, local events, falsification signals | product contract | protocol that shapes implementation |
| Customer decision spine | In progress | menu overview → relational reading → consideration → comparison → decision → configuration → order | domain dataset and formative protocol | one coherent mobile-first flow |
| Relational menu research | Active, C-review-gated | stable ledger, A/B evidence, C implementation and evaluation | M1 shared ledger | explicit C disposition |
| Continuity and table state | Deferred | preserved candidates, submitted rounds, coarse table composition | validated decision spine | continuity over one state model |
| Alternative lenses | Deferred | thin quick, shared-table, and featured views | stable decision spine | views over the canonical menu |
| Merchant authoring | Deferred | defaults, exceptions, confidence, incomplete-data preview | proven semantic fields | small authoring test |
| Conventional baseline | Parked | conventional flow using the same data | coherent Menu Lens demo and explicit study need | optional comparison condition |
| Production integration | Out of scope | payment, POS, KDS, inventory, auth, deployment operations | none | none |

## Authoritative entry points

- `README.md`
- `docs/product-contract.md`
- `docs/glossary.md`
- `docs/workstreams.md`
- `docs/handoff.md`

Current design research:

- `docs/relational-menu-research.md`
- `docs/prototype-b-anchor-plan.md`
- `docs/prototype-c-anchor-axis-plan.md`

Supporting documents:

- `docs/problem-framing.md`
- `docs/interaction-model.md`
- `docs/merchant-data-strategy.md`
- `docs/demo-scope.md`
- `docs/evaluation-plan.md`

## Passed substrate — M1 shared ledger

M1 preserved the restaurant's six-region shape and established one stable table surface per category:

- sequence, dish name, bounded evidence, and price use shared columns;
- sold-out and incomplete-data status remain visible;
- canonical order and one continuous reading order remain stable;
- individual products do not receive separate card surfaces.

The ledger is a passed coordinate plane, not a completed relational-reading answer.

## Rejected single-product experiments

### M2 modal product detail

The modal moved the source row and retained a conventional one-product-at-a-time model. It did not reduce repeated opening, memory work, or relocation.

### C1 fixed product focus rail

The fixed rail occupied the viewport, required compensatory scroll and focus choreography, and still represented only one current product. Its module, DOM, CSS, state, restoration code, and C1-only tests were removed.

## Core research question

> Can one stable menu surface make relationships among several products visible at once without changing canonical order, moving rows, filtering products, or requiring a second comparison list?

The target is comprehension linearity:

```text
inspect A
→ remember A
→ inspect B
→ reconstruct A
→ repeat
```

## Prototype A — Axis-only score

Disposition:

```text
[useful but insufficient]
```

Useful evidence:

- one shared preparation axis made several products simultaneously comparable;
- portion exposed `多人分享`, `約 2–3 人`, and explicit unknown;
- complete-menu credibility, canonical order, and stable geometry were preserved.

Insufficient evidence:

- the price scale duplicated the numeric price column;
- only one dimension was visible at a time;
- switching dimensions reintroduced cross-axis remembering.

Prototype A remains historical evidence. Its selector is not active in the Prototype C path.

## Prototype B — Anchor-only relation

Disposition:

```text
[useful but insufficient]
```

Prototype B added one category-local anchor and displayed:

```text
exact price difference
+ at most one automatically selected semantic token
```

Useful evidence:

- exact deltas clearly reduced arithmetic;
- one table, canonical rows, sold-out state, uncertainty, and stable geometry remained;
- anchor identity remained visible in the existing sticky context;
- no Candidate, recommendation, ranking, or transaction state was introduced.

Decisive failure:

- semantic dimensions varied by row;
- trusted differences were silently suppressed;
- omission was indistinguishable from equality;
- the surface could imply false exclusivity.

With `山椒烤雞半隻` as a slow anchor, all trusted shared-dish alternatives are faster. B showed `較快` only for the fast soft-shell crab because portion or uncertainty occupied the other rows.

The problem was structural rather than a priority-order bug. Any automatically selected single semantic token could hide another true difference.

## Prototype C — Anchor + explicit shared axis

Status:

```text
[implemented, awaiting review]
```

Question:

> Can one temporary anchor preserve exact price deltas while one explicit category-wide semantic axis keeps every row answering the same question, so no trusted difference is silently suppressed?

Implemented mechanism:

```text
one temporary anchor
+ exact price delta on every alternative
+ one explicit category-wide semantic axis
```

Shared-dish portion mode:

```text
山椒烤雞半隻           基準 · 多人            NT$520
紹興奶油蝦             少 NT$40 · 2–3 人      NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 2–3 人      NT$460
豆豉蒸鱸魚             多 NT$40 · 未提供      NT$560
```

Preparation mode changes every row together:

```text
山椒烤雞半隻           基準 · 慢              NT$520
紹興奶油蝦             少 NT$40 · 一般        NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 快          NT$460
豆豉蒸鱸魚             多 NT$40 · 一般        NT$560
```

### Corrective properties

- no row-level heuristic chooses between portion and preparation;
- every row shows the same active axis;
- every active-axis cell contains a trusted absolute label or `未提供`;
- equality appears as matching labels rather than blank output;
- the non-active axis remains visible in the control;
- exact price delta remains while switching axes;
- changing anchor preserves the selected axis;
- reopening the same category preserves its explicit axis preference;
- changing categories resets to the destination's first eligible axis;
- the existing sticky context remains the only sticky orientation surface and exposes axis plus anchor.

### Axis eligibility

Axes are bounded to:

```text
portion
preparation
```

Price is persistent evidence rather than an option. Meal role remains excluded because it is category-redundant in the formal reference data.

Current reference behavior:

```text
個人主餐       準備
飯麵類         準備
分享料理       份量 / 準備
小食           準備
飲料           no C control
甜點           no C control
```

### Automated evidence

Tests cover:

- category-level eligibility;
- complete portion and preparation projection;
- exact price deltas;
- formal absolute labels and explicit unknown;
- no blank or mixed active-axis states;
- anchor row semantic value;
- axis preservation across anchor changes and same-category reopening;
- category reset boundaries;
- canonical order and sold-out retention;
- four columns, fixed controls, one sticky context, and no row-wide click;
- absence of B automatic semantics and all deferred states.

A Chromium proxy at 320 px and 390 px found:

```text
state-change row difference    0px
state-change table difference  0px
fixture relation truncation    none
horizontal scrolling           none
```

This is implementation evidence, not participant evidence.

## Prototype C review gate

Use `分享料理` and choose `山椒烤雞半隻` as anchor.

Without teaching the interaction, ask the participant to:

1. identify every exact price difference;
2. in `份量`, identify all smaller products and the unknown product;
3. explain whether any portion value is hidden;
4. switch to `準備` and identify every faster product;
5. identify the strongest faster class without false exclusivity;
6. explain why several rows show `一般` and one shows `快`;
7. distinguish equality from unknown;
8. change anchor while preserving preparation;
9. return to overview and reopen the same category;
10. explain whether anything was saved, ordered, recommended, filtered, or ranked;
11. report whether explicit axis switching still requires too much remembering.

Pass only if:

- all trusted active-axis values are understood as visible;
- all faster shared dishes are identified;
- the crab is recognized as the strongest faster class, not the only faster item;
- matching labels communicate equality;
- `未提供` communicates unavailable trusted data;
- the other axis is noticed;
- switching axis updates the column as one coherent question;
- changing anchor and reopening preserve orientation;
- exact deltas remove arithmetic;
- mobile text remains readable;
- C is not confused with Candidate, recommendation, ranking, or order state.

Fail if:

- users miss the other axis;
- users cannot infer all faster alternatives from `慢 / 一般 / 快`;
- absolute labels look like recommendations or scores;
- switching axes still causes substantial reconstruction;
- mobile density harms ordinary menu reading;
- equality or unknown remains ambiguous;
- changing axis or anchor moves the table;
- the interaction behaves like a hidden comparison destination.

## Blocked later work

Prototype C remains unpassed until the review gate receives an explicit disposition.

The following remain blocked:

- Candidate;
- Comparison;
- Decision;
- Configuration;
- Current order;
- quantity and modifiers;
- recommendation, ranking, or filtering;
- product networks or scatterplots;
- shared-table composition;
- checkout.

## Constraints

- no backend, database, authentication, payment, POS, or KDS integration;
- no conventional baseline;
- no Quick, Shared-table, or Featured lens implementation;
- no merchant CMS;
- no remote analytics;
- no generic state-machine, repository, plugin, animation, or design-system framework;
- no abstractions for deferred Candidate or order work;
- preserve canonical product and category order;
- preserve `Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound`;
- do not count desktop layout or visual polish as proof.

## Contract impact

None.

The product contract already requires complete-menu access, browsing distinct from ordering, preserved browsing context, comparison support, and explicit uncertainty. Prototype C changes the experimental route used to investigate those requirements; it does not change the requirements or authorize deferred states.
