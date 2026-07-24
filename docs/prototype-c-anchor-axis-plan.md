# Prototype C — Anchor + explicit shared axis

## Document status

This document records the implemented and accepted Prototype C boundary.

```text
branch  agent/menu-map-atlas
PR      #4 — Build menu reading workspace
status  [passed for current scope]
```

Current sequence:

```text
[useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [passed for current scope] Prototype C — Anchor + explicit shared axis
→ [passed for current scope] CND1 — Attached Candidate marks
→ [blocked] Candidate workspace / bounded comparison
→ [blocked] Decision / Configuration / Current order
```

## Why Prototype C existed

Prototype A made one shared semantic dimension truthful across all rows, but retained axis-switching memory work and duplicated visible price information.

Prototype B added a temporary Anchor and useful exact price deltas, but automatically selected one semantic token per row. That rule hid other trusted differences and made omission indistinguishable from equality.

With `山椒烤雞半隻` as a slow Anchor, every trusted shared-dish alternative was faster. Prototype B displayed `較快` only for the soft-shell crab because portion or uncertainty occupied the other rows. The crab was the strongest faster class, not the only faster Product.

Prototype C asked:

> Can one temporary Anchor preserve exact price deltas while one explicit category-wide semantic axis keeps every row answering the same question, so no trusted difference is silently suppressed?

## Core correction

```text
Prototype B
row A → portion
row B → preparation
row C → uncertainty

Prototype C
all rows → the same explicitly selected axis
```

The user explicitly selects `份量` or `準備`. A row-level heuristic no longer chooses the displayed dimension.

## Implemented layout

Prototype C reuses the canonical four-column ledger and adds one fixed shared-axis control below the fixed Anchor control.

```text
比較基準：山椒烤雞半隻               更換  清除
比較內容： [ 份量 ] [ 準備 ]
──────────────────────────────────────────
菜名                   價差 · 份量            價格
山椒烤雞半隻           基準 · 多人            NT$520
紹興奶油蝦             少 NT$40 · 2–3 人      NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 2–3 人      NT$460
豆豉蒸鱸魚             多 NT$40 · 未提供      NT$560
宮保杏鮑菇             少 NT$180 · 2–3 人     NT$340
季節時蔬豆腐煲         少 NT$140 · 2–3 人     NT$380
```

Switching the shared axis changes every semantic value together:

```text
菜名                   價差 · 準備            價格
山椒烤雞半隻           基準 · 慢              NT$520
紹興奶油蝦             少 NT$40 · 一般        NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 快          NT$460
豆豉蒸鱸魚             多 NT$40 · 一般        NT$560
宮保杏鮑菇             少 NT$180 · 一般       NT$340
季節時蔬豆腐煲         少 NT$140 · 一般       NT$380
```

The implementation keeps:

- one canonical table;
- one canonical row per Product;
- four columns;
- canonical Product order;
- visible price, sold-out state, and incomplete-data state;
- no copied Product list;
- no fifth column;
- no modal, sheet, rail, fixed footer, detail row, horizontal matrix, or second comparison destination;
- no sorting, filtering, hiding, dimming, ranking, recommendation, Candidate, or order state inside reading state.

## Semantic labels

Prototype C displays resolved formal classes rather than inventing compressed relative phrases.

Portion labels:

```text
小份
一人
2–3 人
多人
未提供
```

Preparation labels:

```text
快
一般
慢
未提供
```

The Anchor row includes its own formal value:

```text
基準 · 多人
基準 · 慢
```

## Truthfulness invariants

For one active axis:

1. every canonical Product remains present;
2. every alternative displays one exact price delta;
3. every row answers the same semantic question;
4. trusted values use the formal absolute label;
5. missing or low-confidence values display `未提供`;
6. matching labels expose equality;
7. the Anchor displays its own value;
8. no blank active relation exists;
9. sold-out state remains independent;
10. no recommendation, ranking, suitability, or score is introduced.

## Eligibility

A semantic axis is available only when the category has enough visible variation to make it meaningful.

The implemented fixture yields:

```text
個人主餐       準備
飯麵類         準備
分享料理       份量 / 準備
小食           準備
飲料           no C control
甜點           no C control
```

Price is persistent evidence, not a selectable axis. Meal role is excluded where category structure already makes it redundant.

## State contract

```ts
type MenuReadingState = Readonly<{
  activeCategoryId: CategoryId | null;
  expansion:
    | { kind: "overview" }
    | { kind: "category"; categoryId: CategoryId }
    | { kind: "all" };
  anchorReading:
    | { kind: "idle" }
    | { kind: "selecting" }
    | { kind: "active"; productId: ProductId };
  semanticAxis: SemanticAxis | null;
}>;
```

Observable rules:

- changing Anchor preserves the axis;
- clearing Anchor preserves the disabled axis preference;
- overview and all-expanded mode clear Anchor;
- same-category reopening preserves an explicit eligible axis;
- changing category resets to the destination default axis;
- ineligible categories cannot enter Anchor selection;
- Escape cancels temporary selection only;
- Candidate and order state remain outside `MenuReadingState`.

## Focus and orientation

The existing sticky menu context exposes:

```text
份量｜山椒烤雞半隻
```

or:

```text
準備｜山椒烤雞半隻
```

Re-review corrected two offscreen-focus paths:

```text
choose Anchor in row
→ focus chosen row relation

Escape from row selection
→ focus same canonical row

Top Cancel or Clear
→ focus top Anchor control
```

The relation lane uses `tabIndex=-1`, receives the complete accessible relation phrase, and does not add a normal Tab stop.

## Geometry contract

Prototype C keeps:

```text
Anchor control      2.6rem
axis control        2.4rem
relation lane       1.55rem
mobile cue column   7.2rem
```

A code-derived Chromium proxy at 320px and 390px reported:

```text
row-height difference       0px
row-top difference          0px
table-height difference     0px
fixture relation overflow   none
horizontal scrolling        none
```

This is implementation evidence, not participant evidence or a deployed-device claim.

## Test-first evidence

Pure projection and state tests cover:

- exact price delta grammar;
- complete portion and preparation projections;
- explicit unknown;
- visible equality;
- Anchor values;
- axis eligibility;
- Anchor and axis transitions;
- same-category preference preservation;
- ineligible-category rejection;
- Escape cancellation.

Static structure contracts lock:

- four columns;
- one canonical row per Product;
- one sticky orientation surface;
- fixed Anchor, axis, and relation geometry;
- row-local focus restoration;
- no inactive Prototype A UI;
- no sorting, filtering, hiding, dimming, copied list, or transaction state.

The branch passes:

```text
Typecheck
Tests
Static build
```

## Re-review corrections

Prototype C review found and corrected:

1. same-category reopening resetting an explicit axis;
2. choosing an Anchor moving focus to an offscreen top control;
3. Escape cancellation from a row moving focus offscreen;
4. an obsolete Prototype A selector UI remaining in the active tree.

## Final disposition

```text
[passed for current scope] Prototype C — Anchor + explicit shared axis
```

This is a current-scope product acceptance based on formal contracts, automated validation, designer reverse review, focus review, and narrow-screen proxy evidence.

It does not claim unfamiliar-participant comprehension, measured task improvement, comfortable real-device readability, or superiority to a conventional interface.

Those limitations are recorded but do not block the separately bounded Candidate slice.

## Completed handoff to CND1

CND1 implements Candidate membership beside, not inside, Prototype C reading state.

```text
Anchor / semantic axis = how Products are read
Candidate              = which Products remain under consideration
```

CND1 does not automatically create Candidates from Anchor actions and does not alter Prototype C projection rules.

CND1 has completed its own implementation and final re-review and is accepted for the current scope.

Current record:

```text
docs/candidate-marks-plan.md
```

## Blocked later work

Passing Prototype C and CND1 does not automatically authorize:

- Candidate workspace or copied Candidate list;
- bounded Candidate comparison;
- Decision;
- Configuration;
- Current order;
- quantity, modifiers, totals, or submission;
- recommendation, ranking, filtering, or shared-table composition;
- checkout.

A separate bounded plan is required.

## Contract impact

None.

Prototype C changes the implementation route without changing the product invariants in `docs/product-contract.md`.
