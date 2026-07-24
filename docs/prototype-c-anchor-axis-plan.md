# Prototype C — Anchor + explicit shared axis

## Document status

This document records the planned and implemented boundary for Prototype C.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Current status:

```text
[useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [passed for current scope] Prototype C — Anchor + explicit shared axis
→ [implemented, awaiting review] CND1 — Attached Candidate marks
→ [blocked] Candidate workspace / Comparison / Decision / Configuration / Current order
```

Prototype C is the accepted current-scope relational-reading substrate. Its acceptance does not authorize Candidate workspace, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, shared-table composition, or checkout.

No unfamiliar-participant evidence is claimed. The product-owner current-scope disposition allows the separately bounded CND1 Candidate slice to proceed.

## Why Prototype C exists

Prototype A made one shared semantic dimension truthful across all rows, but required switching dimensions and its price scale duplicated the visible numeric price column.

Prototype B added a temporary reference Product and useful exact price deltas, but automatically selected one semantic token per row. That rule silently hid other trusted differences and made omission indistinguishable from equality.

With `山椒烤雞半隻` as a slow Anchor, every trusted shared-dish alternative is faster. Prototype B displayed `較快` only for the soft-shell crab because portion or uncertainty occupied the other rows. The crab was the strongest faster class, not the only faster Product.

Prototype C asks:

> Can one temporary Anchor preserve exact price deltas while one explicit category-wide semantic axis keeps every row answering the same question, so no trusted difference is silently suppressed?

## Core corrective principle

```text
Prototype B
row A → portion
row B → preparation
row C → uncertainty

Prototype C
all rows → the same explicitly selected axis
```

The user explicitly selects `份量` or `準備`. A row-level heuristic no longer decides which dimension is shown.

## Implemented layout

Prototype C reuses the same canonical ledger and adds one fixed shared-axis control row below the fixed Anchor control.

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
- the same four columns;
- canonical Product order;
- visible price, sold-out state, and incomplete-data state;
- no copied Product list;
- no fifth column;
- no modal, sheet, rail, fixed footer, detail row, horizontal matrix, or second comparison destination;
- no sorting, filtering, hiding, dimming, ranking, recommendation, Candidate, or order state inside the reading model.

## Why absolute semantic labels are used

Prototype C displays the resolved formal class instead of inventing another compressed relative phrase.

Visible portion labels:

```text
小份
一人
2–3 人
多人
未提供
```

Visible preparation labels:

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

This allows a diner to see:

```text
Anchor = 慢
normal alternatives = faster class
fast alternative = strongest faster class
```

The interface does not invent `快很多`, suitability scores, similarity scores, or recommendation ranks.

## Equality, unknown, and the non-active axis

An active semantic cell is never blank.

Every row displays exactly one of:

```text
trusted absolute value
or
未提供
```

Equality appears as matching visible labels:

```text
Anchor: 一般
target: 一般
```

Unknown remains explicit:

```text
missing or low-confidence value
→ 未提供
```

The non-active axis remains visible in the shared control. It is not silently omitted by an automatic per-row rule.

## Interaction state

```ts
type SemanticAxis = "portion" | "preparation";

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

### Idle

```text
比較基準：尚未選擇                         選擇
比較內容： [份量] [準備]                   disabled
```

The axis row remains reserved. Ordinary menu cues remain visible until an Anchor is active.

### Selecting

```text
選擇一項作為比較基準                       取消
比較內容： [份量] [準備]                   disabled
```

Every existing relation lane contains an explicit native `作為基準` button. Product names and rows do not become click targets.

### Active

- exact price delta is visible for every non-Anchor row;
- the Anchor row displays `基準` and its semantic value;
- every row displays the same semantic axis;
- switching axis changes every row together;
- changing Anchor recalculates price deltas and preserves the selected axis;
- clearing removes the Anchor but preserves the disabled axis preference.

### Category and overview boundaries

- changing to a different category clears the Anchor and resets to that category's first eligible axis;
- entering overview or all-expanded mode clears the Anchor;
- reopening the same category preserves its explicitly selected axis;
- an ineligible category cannot enter Anchor selection;
- there is no URL state or cross-session persistence;
- Escape cancels temporary Anchor selection only.

## Axis eligibility

Prototype C axes are bounded to:

```text
portion
preparation
```

Price is persistent evidence, not an axis option. Meal role remains excluded because it is category-redundant in the formal reference data.

A semantic axis is eligible only when:

1. the category contains at least three Products; and
2. resolved category data contains at least two visible states across trusted values and explicit unknown.

Eligibility is category-level and stable across Anchor changes.

Current reference behavior:

```text
個人主餐       準備
飯麵類         準備
分享料理       份量 / 準備
小食           準備
飲料           no C control
甜點           no C control
```

A category with no eligible semantic axis does not expose Anchor-only price comparison under Prototype C.

## Projection grammar

### Price

```text
少 NT$40
多 NT$60
同價
```

### Anchor

```text
基準 · 多人
基準 · 慢
```

### Alternative

```text
少 NT$40 · 2–3 人
少 NT$60 · 快
多 NT$40 · 未提供
```

No output may use or imply:

- best or better;
- recommended;
- suitable;
- closest or similar;
- substitute;
- value or CP;
- score or rank;
- automatic recommendation.

## Sticky orientation context

The existing sticky menu context remains the only sticky orientation surface.

Active state leads with the current question and then the reference identity:

```text
份量｜山椒烤雞半隻
準備｜山椒烤雞半隻
```

The full text remains available in `title`. No second sticky axis bar or comparison rail is introduced.

CND1 may append a Candidate count to this same context. That does not change Prototype C's reading state or create another sticky surface.

## Geometry contract

Prototype C establishes one baseline:

```text
fixed Anchor-control row: 2.6rem
fixed semantic-axis row: 2.4rem
fixed relation lane: 1.55rem
fixed mobile relation column: 7.2rem
```

After that baseline, these transitions preserve geometry and scroll position:

```text
idle → selecting
selecting → active
portion → preparation
Anchor A → Anchor B
active → cleared
```

A code-derived Chromium proxy using the C DOM structure, CSS dimensions, fixture strings, and Chromium font metrics was run at 320 px and 390 px.

Measured results:

```text
row-height difference       0px
row-top difference          0px
table-height difference     0px
Anchor-control difference   0px
axis-control difference     0px
```

The following C fixture phrases fit without ellipsis at both widths:

```text
少 NT$180 · 2–3 人
少 NT$140 · 2–3 人
多 NT$40 · 未提供
少 NT$180 · 一般
```

This is a code-derived implementation proxy, not participant evidence.

## Mobile readability boundary

At 320 px:

- the relation text is `0.62rem`;
- exact price delta and semantic value remain on one line;
- `2–3 人` and `未提供` remain fully visible;
- Product names may wrap while relation and price columns stay aligned;
- no horizontal scrolling is introduced;
- touch controls retain the existing 2rem control height.

Fitting text does not prove comfortable mobile reading.

## Accessibility behavior

- Anchor and axis actions use native buttons;
- the axis buttons are a named group;
- selected axis uses `aria-pressed`;
- unavailable category axes are absent;
- idle and selecting states disable the axis group while preserving geometry;
- row Anchor actions name the Product;
- active rows expose accessible price and semantic phrases;
- unknown explains lack of trusted metadata;
- sticky context exposes axis and Anchor;
- axis switching does not replace the axis-button DOM;
- Anchor selection focuses the chosen row relation without moving the viewport;
- Escape from a row returns focus to that same canonical row;
- top Cancel and Clear remain top-local;
- Escape does not clear an active Anchor.

## Test-first implementation record

Implementation began with failing tests for the planned C APIs.

Added:

```text
src/customer/menu-anchor-axis.ts
src/customer/menu-anchor-axis.test.ts
src/app/category-anchor-axis-control.ts
```

Updated:

```text
src/customer/menu-reading.ts
src/customer/menu-reading.test.ts
src/app/menu-category.ts
src/app/menu-overview.ts
src/app/App.ts
src/styles/menu-workspace.css
scripts/menu-workspace-contract.test.mjs
package.json
```

Prototype A and B pure projection modules remain historical evidence. The active C rendering path does not use their controls or B's automatic semantic-token output.

## Automated validation

Tests cover:

### Projection

- stable category-level axis eligibility;
- complete portion projection for every canonical row;
- complete preparation projection for every canonical row;
- formal absolute labels;
- explicit low-confidence unknown;
- exact lower, higher, and equal price deltas;
- Anchor row semantic value;
- no blank active-axis state;
- no mixed row dimensions;
- no recommendation, score, or closeness language.

### State

- category defaults;
- ineligible categories;
- disabled axis without Anchor;
- axis switching only with an active Anchor;
- axis preservation across Anchor changes;
- axis preservation when reopening the same category;
- category reset boundaries;
- overview, all-expanded, clear, cancel, and Escape boundaries;
- no Candidate, Comparison, detail, score, Configuration, quantity, or order state inside `MenuReadingState`.

### Structure and focus

- four columns only;
- fixed Anchor-control row;
- fixed axis-control row;
- fixed relation line box;
- one existing sticky context only;
- no row-wide Product click;
- no B automatic semantic relation in active rendering;
- no row measurement or compensatory scroll restoration in category rendering;
- row-local focus after Anchor selection and row-local Escape;
- top-local focus after top Cancel and Clear.

The branch requires:

```text
Typecheck         ✓
Tests             ✓
Static build      ✓
```

## Designer reverse review

Using `分享料理` with `山椒烤雞半隻` as Anchor:

### Exact price differences

```text
紹興奶油蝦             少 NT$40
蒜酥椒鹽軟殼蟹         少 NT$60
豆豉蒸鱸魚             多 NT$40
宮保杏鮑菇             少 NT$180
季節時蔬豆腐煲         少 NT$140
```

Result:

```text
PASS — exact deltas remove arithmetic
```

### Portion completeness

```text
Anchor                  多人
four trusted alternatives 2–3 人
seabass                 未提供
```

Result:

```text
PASS — every row has the selected axis or explicit unknown
```

### Preparation completeness

```text
Anchor                  慢
prawns                  一般
soft-shell crab         快
seabass                 一般
mushroom                一般
tofu pot                一般
```

Result:

```text
PASS — all trusted faster classes remain visible
```

The crab is visibly the strongest faster class without appearing to be the only faster alternative.

### Equality and unknown

Matching absolute labels expose equality. `未提供` is distinct from a matching value.

Result:

```text
FORMAL PASS
```

### Orientation and focus

- active axis is visible in the shared control;
- active axis and Anchor remain in the existing sticky context;
- changing Anchor preserves the axis;
- clearing and reopening the same category preserve the axis preference;
- selecting and Escape keep focus on the source row;
- rows do not move.

Result:

```text
PASS — designer proxy
```

## Final current-scope disposition

```text
[passed for current scope] Prototype C — Anchor + explicit shared axis
```

This is a product-owner current-scope acceptance based on formal contracts, automated validation, designer reverse review, focus review, and narrow-screen proxy evidence.

It does not claim unfamiliar-participant comprehension, measured task improvement, comfortable real-device readability, or superiority to a conventional interface.

Those limitations are recorded but no longer block the separately bounded Candidate slice.

## Handoff to CND1

CND1 implements Candidate membership beside, not inside, Prototype C reading state.

```text
Anchor / semantic axis = how Products are read
Candidate              = which Products remain under consideration
```

CND1 does not automatically create Candidates from Anchor actions and does not alter Prototype C projection rules.

Current CND1 implementation record:

```text
docs/candidate-marks-plan.md
```

Candidate workspace, bounded comparison, Decision, Configuration, Current order, quantity, modifiers, totals, and submission remain blocked until CND1 receives an explicit disposition.
