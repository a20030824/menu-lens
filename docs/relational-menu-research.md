# Relational menu research

## Document status

This is the exploratory design record for the active Menu Lens menu-reading work.

It records failed single-product interactions, the stable-ledger hypothesis, Prototype A and B dispositions, and the implemented Prototype C correction. It is not a product-contract change and does not authorize Candidate, Comparison, Decision, Configuration, Current order, or checkout work.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Current status:

```text
[passed] M1 compressed overview + shared ledger
→ [rejected] M2 modal product detail
→ [rejected, removed] C1 fixed product focus rail
→ [useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [implemented, awaiting review] Prototype C — Anchor + explicit shared axis
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

## Core problem

Most product-detail interactions preserve comprehension linearity:

```text
inspect A
→ remember A
→ inspect B
→ reconstruct A
→ repeat
```

The relational-menu work asks whether several product relationships can remain visible on one stable menu surface without sorting, filtering, recommendation, row movement, or a detached comparison list.

## Stable substrate — M1 shared ledger

M1 established the passed coordinate plane:

- one semantic table per category;
- one canonical row per product;
- shared sequence, dish-name, evidence, and price columns;
- sold-out and incomplete-data state retained;
- canonical order retained;
- no independent product cards.

The ledger is a substrate, not a complete relational-reading answer.

## Rejected single-product approaches

### Modal detail

The modal moved the source row and preserved one-product-at-a-time reading. It did not reduce repeated opening, memory work, or relocation.

### Fixed product rail

The rail occupied the viewport, required compensatory scroll and focus choreography, and still represented only one current product. The rail module, state, DOM, CSS, and restoration code were removed.

## Prototype A — Axis-only score

Disposition:

```text
[useful but insufficient]
```

Prototype A projected one shared dimension across all rows.

Useful evidence:

- preparation made several products simultaneously comparable;
- portion exposed `多人分享`, `約 2–3 人`, and explicit unknown;
- canonical order, complete-menu credibility, and stable geometry were preserved.

Insufficient evidence:

- the price scale duplicated the numeric price column;
- only one dimension was visible at a time;
- switching axes removed prior evidence and reintroduced cross-axis remembering.

Prototype A remains isolated research evidence. Its selector is not active in Prototype C.

## Prototype B — Anchor-only relation

Disposition:

```text
[useful but insufficient]
```

Prototype B allowed one temporary category-local reference product and displayed:

```text
exact price delta
+ at most one automatically selected semantic token
```

The implementation preserved:

- the canonical table and rows;
- four columns, prices, statuses, and order;
- sold-out and incomplete-data products;
- no filtering, sorting, ranking, hiding, copying, or dimming;
- no detail, modal, rail, sheet, fixed footer, Candidate, Comparison, or order state;
- stable geometry and scroll position;
- persistent anchor identity in the existing sticky menu context.

### Useful result — price

With `山椒烤雞半隻` at NT$520 as anchor, the surface directly displayed:

```text
紹興奶油蝦             少 NT$40
蒜酥椒鹽軟殼蟹         少 NT$60
豆豉蒸鱸魚             多 NT$40
宮保杏鮑菇             少 NT$180
季節時蔬豆腐煲         少 NT$140
```

This removes repeated subtraction and is stronger evidence than Prototype A's duplicated price scale.

### Decisive failure — semantic omission

The anchor is `slow`. The prawns, seabass, mushroom, and tofu pot are `normal`; the crab is `fast`. Every alternative with trusted preparation data is therefore faster than the anchor.

Visible Prototype B output selected:

```text
紹興奶油蝦             份量較小
蒜酥椒鹽軟殼蟹         較快
豆豉蒸鱸魚             份量未知
宮保杏鮑菇             份量較小
季節時蔬豆腐煲         份量較小
```

The crab correctly exposed the strongest preparation difference, but the surface silently hid four other true faster-preparation relationships. An unfamiliar diner could reasonably conclude that the crab was the only faster dish.

This triggered the predefined failure signal:

> deterministic token selection hides useful evidence.

The problem was not merely the priority order. Any single automatically selected semantic token could suppress another known difference. Omission was indistinguishable from equality, and the relation column mixed dimensions across rows.

### Designer reverse-review result

- exact price deltas: **pass**;
- explicit unknown: **pass**;
- anchor identity and geometry: **pass**;
- structural separation from Candidate and order state: **proxy pass**;
- complete and truthful semantic comparison: **fail**;
- reliable reduction of semantic remembering and backtracking: **insufficient**.

The full task matrix is in `docs/prototype-b-anchor-plan.md`.

## Shared conclusion from A and B

```text
Prototype A
complete one-axis evidence
but cross-axis memory remains

Prototype B
persistent anchor and exact price delta
but semantic omission becomes misleading
```

Neither experiment is the finished relational-reading answer.

## Prototype C — Anchor + explicit shared axis

Status:

```text
[implemented, awaiting review]
```

Question:

> Can one temporary anchor preserve exact price deltas while one explicit category-wide semantic axis keeps every row answering the same question, so no trusted difference is silently suppressed?

### Implemented correction

```text
Prototype B
price delta + row-selected semantic dimension

Prototype C
price delta + user-selected category-wide semantic axis
```

The user explicitly chooses `份量` or `準備`. Every row then displays the same active axis using a trusted absolute value or `未提供`.

Portion mode:

```text
山椒烤雞半隻           基準 · 多人            NT$520
紹興奶油蝦             少 NT$40 · 2–3 人      NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 2–3 人      NT$460
豆豉蒸鱸魚             多 NT$40 · 未提供      NT$560
宮保杏鮑菇             少 NT$180 · 2–3 人     NT$340
季節時蔬豆腐煲         少 NT$140 · 2–3 人     NT$380
```

Preparation mode:

```text
山椒烤雞半隻           基準 · 慢              NT$520
紹興奶油蝦             少 NT$40 · 一般        NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 快          NT$460
豆豉蒸鱸魚             多 NT$40 · 一般        NT$560
宮保杏鮑菇             少 NT$180 · 一般       NT$340
季節時蔬豆腐煲         少 NT$140 · 一般       NT$380
```

### Why absolute labels

Absolute classes avoid inventing relative magnitude language such as `快很多` or numerical suitability scores.

The anchor displays its value. Matching labels make equality visible. `未提供` makes unknown explicit. The non-active dimension remains visible in the shared axis control rather than disappearing through row-level heuristics.

### Truthfulness invariants

For one active axis:

1. every canonical product remains present;
2. every non-anchor row has one exact price delta;
3. every row has one active-axis value;
4. trusted values render their formal absolute class;
5. low-confidence or missing values render `未提供`;
6. no row selects a different dimension;
7. no blank active-axis state exists;
8. equal values render the same label;
9. switching axis updates every row together;
10. sold-out state remains independent.

### State and orientation

- one anchor remains category-local;
- changing anchor preserves the active axis;
- clearing removes the anchor but preserves the disabled axis preference;
- entering overview or all-expanded mode clears the anchor;
- reopening the same category preserves the selected axis;
- changing categories resets to the destination's first eligible axis;
- ineligible categories cannot enter C selection;
- the existing sticky context remains the only sticky surface and displays `axis｜anchor`.

A reverse-review correction was required here: the first implementation reset `準備` to default `份量` when the user returned to overview and reopened the same category. The state transition now distinguishes same-category reopening from an actual category change.

### Axis eligibility

Axes are bounded to:

```text
portion
preparation
```

Current reference behavior:

```text
個人主餐       準備
飯麵類         準備
分享料理       份量 / 準備
小食           準備
飲料           no C control
甜點           no C control
```

Eligibility is category-level and stable across anchor changes.

### Automated evidence

Tests cover:

- category-level eligibility;
- complete portion and preparation projection;
- exact price deltas;
- formal absolute labels and explicit unknown;
- no blank or mixed active-axis states;
- anchor row value;
- axis preservation across anchor changes and same-category reopening;
- category reset boundaries;
- canonical order and sold-out retention;
- four columns, fixed controls, one sticky context, and no row-wide click;
- absence of B automatic semantics and all deferred states.

The branch passes:

```text
Typecheck
Tests
Static build
```

### Narrow-screen proxy

A code-derived Chromium proxy using current DOM structure, CSS dimensions, fixture text, and Chromium font metrics was run at 320 px and 390 px.

Results across idle, selecting, portion, preparation, switched axis, and cleared states:

```text
row-height difference       0px
row-top difference          0px
table-height difference     0px
fixture relation overflow   none
horizontal scrolling        none
```

This is implementation evidence, not participant evidence.

### Designer reverse-review result

Price:

```text
PASS — exact deltas remove arithmetic
```

Portion:

```text
PASS — all trusted values and explicit unknown remain visible
```

Preparation:

```text
PASS — all normal and fast alternatives remain visible
```

The crab is visibly the strongest faster class without appearing to be the only faster alternative.

Equality and unknown:

```text
FORMAL PASS
```

Orientation:

```text
DESIGNER-PROXY PASS
```

No formal contradiction equivalent to Prototype B remains.

## Prototype C review gate

Prototype C remains unpassed because designer review cannot prove:

- that users notice the non-active axis;
- that users infer every faster item from `慢 / 一般 / 快`;
- that switching one explicit axis sufficiently reduces memory work;
- that absolute labels are understood as comparison evidence;
- that 0.62rem relation text is comfortable on a real phone;
- that anchor selection is not mistaken for saving or ordering.

Use `分享料理` and `山椒烤雞半隻` as the initial anchor. Without teaching the interaction, verify that a participant can:

1. identify every exact price difference;
2. identify all smaller products and the unknown product in portion mode;
3. explain whether any portion value is hidden;
4. switch to preparation and identify every faster product;
5. identify the strongest faster class without false exclusivity;
6. explain `一般` versus `快` relative to a `慢` anchor;
7. distinguish equality from unknown;
8. change anchor while preserving preparation;
9. return to overview and reopen the same category without losing the axis;
10. explain whether anything was saved, ordered, recommended, filtered, or ranked;
11. report whether switching axes still requires too much remembering.

The complete contract and task signals are in:

```text
docs/prototype-c-anchor-axis-plan.md
```

## Blocked later work

Until Prototype C receives an explicit disposition, the following remain blocked:

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

## Contract impact

None.

The product contract already requires complete-menu access, browsing distinct from ordering, preserved browsing context, comparison support, and explicit uncertainty. These prototype dispositions change the experimental route, not the requirements.
