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
→ [implemented, awaiting review] Prototype C — Anchor + explicit shared axis
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

Prototype C is an isolated relational-reading experiment. It does not authorize Candidate, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, shared-table composition, or checkout.

## Why Prototype C exists

Prototype A made one shared semantic dimension truthful across all rows, but required switching dimensions and its price scale duplicated the visible numeric price column.

Prototype B added a temporary reference product and useful exact price deltas, but automatically selected one semantic token per row. That rule silently hid other trusted differences and made omission indistinguishable from equality.

With `山椒烤雞半隻` as a slow anchor, every trusted shared-dish alternative is faster. Prototype B displayed `較快` only for the soft-shell crab because portion or uncertainty occupied the other rows. The crab was the strongest faster class, not the only faster dish.

Prototype C asks:

> Can one temporary anchor preserve exact price deltas while one explicit category-wide semantic axis keeps every row answering the same question, so no trusted difference is silently suppressed?

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

Prototype C reuses the same canonical ledger and adds one fixed shared-axis control row below the fixed anchor control.

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
- one canonical row per product;
- the same four columns;
- canonical product order;
- visible price, sold-out state, and incomplete-data state;
- no copied product list;
- no fifth column;
- no modal, sheet, rail, fixed footer, detail row, horizontal matrix, or second comparison destination;
- no sorting, filtering, hiding, dimming, ranking, recommendation, Candidate, or order state.

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

The anchor row includes its own formal value:

```text
基準 · 多人
基準 · 慢
```

This allows a diner to see:

```text
anchor = 慢
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
anchor: 一般
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

The axis row remains reserved. Ordinary menu cues remain visible until an anchor is active.

### Selecting

```text
選擇一項作為比較基準                       取消
比較內容： [份量] [準備]                   disabled
```

Every existing relation lane contains an explicit native `作為基準` button. Product names and rows do not become click targets.

### Active

- exact price delta is visible for every non-anchor row;
- the anchor row displays `基準` and its semantic value;
- every row displays the same semantic axis;
- switching axis changes every row together;
- changing anchor recalculates price deltas and preserves the selected axis;
- clearing removes the anchor but preserves the disabled axis preference.

### Category and overview boundaries

- changing to a different category clears the anchor and resets to that category's first eligible axis;
- entering overview or all-expanded mode clears the anchor;
- reopening the same category preserves its explicitly selected axis;
- an ineligible category cannot enter anchor selection;
- there is no URL state or cross-session persistence;
- Escape cancels temporary anchor selection only.

## Axis eligibility

Prototype C axes are bounded to:

```text
portion
preparation
```

Price is persistent evidence, not an axis option. Meal role remains excluded because it is category-redundant in the formal reference data.

A semantic axis is eligible only when:

1. the category contains at least three products; and
2. resolved category data contains at least two visible states across trusted values and explicit unknown.

Eligibility is category-level and stable across anchor changes.

Current reference behavior:

```text
個人主餐       準備
飯麵類         準備
分享料理       份量 / 準備
小食           準備
飲料           no C control
甜點           no C control
```

A category with no eligible semantic axis does not expose anchor-only price comparison under Prototype C.

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

## Geometry contract

Prototype C establishes one new baseline:

```text
fixed anchor-control row: 2.6rem
fixed semantic-axis row: 2.4rem
fixed relation lane: 1.55rem
fixed mobile relation column: 7.2rem
```

After that baseline, these transitions must preserve geometry and scroll position:

```text
idle → selecting
selecting → active
portion → preparation
anchor A → anchor B
active → cleared
```

A code-derived Chromium proxy using the current DOM structure, CSS dimensions, fixture strings, and Chromium font metrics was run at 320 px and 390 px.

Measured results:

```text
row-height difference       0px
row-top difference          0px
table-height difference     0px
anchor-control difference   0px
axis-control difference     0px
```

The following current fixture phrases fit without ellipsis at both widths:

```text
少 NT$180 · 2–3 人
少 NT$140 · 2–3 人
多 NT$40 · 未提供
少 NT$180 · 一般
```

This is a code-derived implementation proxy, not deployed participant evidence.

## Mobile readability boundary

At 320 px:

- the relation text is `0.62rem`, slightly larger than Prototype B's `0.6rem` relation text;
- exact price delta and semantic value remain on one line;
- `2–3 人` and `未提供` remain fully visible;
- product names may wrap while relation and price columns stay aligned;
- no horizontal scrolling is introduced;
- touch controls retain the existing 2rem control height.

Fitting text does not prove comfortable mobile reading. Actual readability remains part of the review gate.

## Accessibility behavior

- anchor and axis actions use native buttons;
- the axis buttons are a named group;
- selected axis uses `aria-pressed`;
- unavailable category axes are absent;
- idle and selecting states disable the axis group while preserving geometry;
- row anchor actions name the product;
- active rows expose accessible price and semantic phrases;
- unknown explains lack of trusted metadata;
- sticky context exposes axis and anchor;
- axis switching does not replace the axis-button DOM;
- Escape cancels selecting state only.

Focus restoration is now source-local:

```text
select a row as anchor
→ focus remains on that row's relation lane

press Escape while focused in a row
→ cancellation returns focus to that same canonical row

use the top Cancel or Clear action
→ focus remains in the top anchor control
```

The relation lane is programmatically focusable but remains outside the ordinary Tab sequence. It receives the complete accessible relation phrase and uses `preventScroll`, so the keyboard user keeps both visible focus and spatial position.

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

Removed after active-path review:

```text
src/app/category-reading-control.ts
```

That file was Prototype A's unused `<select>` UI. No active code referenced it. Prototype A and B pure projection modules remain as historical evidence; obsolete UI is not retained in the application tree.

## Automated validation

Tests cover:

### Projection

- stable category-level axis eligibility;
- complete portion projection for every canonical row;
- complete preparation projection for every canonical row;
- formal absolute labels;
- explicit low-confidence unknown;
- exact lower, higher, and equal price deltas;
- anchor row semantic value;
- no blank active-axis state;
- no mixed row dimensions;
- no recommendation, score, or closeness language.

### State

- category defaults;
- ineligible categories;
- disabled axis without anchor;
- axis switching only with an active anchor;
- axis preservation across anchor changes;
- axis preservation when reopening the same category;
- axis reset when changing categories;
- overview, all-expanded, clear, cancel, and Escape boundaries;
- no Candidate, Comparison, detail, score, configuration, quantity, or order state.

### Structure and focus

- four columns only;
- fixed anchor-control row;
- fixed axis-control row;
- fixed relation line box;
- one existing sticky context only;
- no row-wide product click;
- no B automatic semantic relation in active rendering;
- no row measurement or compensatory scroll restoration in category rendering;
- selected anchors restore focus to their canonical row;
- Escape cancellation inside a row restores focus to that row;
- top-level cancel and clear keep focus in the anchor control;
- obsolete Prototype A selector UI must remain absent.

The branch requires:

```text
Typecheck         ✓
Test              ✓
Build static site ✓
```

## Designer reverse review

The reverse review uses `分享料理` with `山椒烤雞半隻` as anchor.

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
PASS — exact deltas still remove arithmetic
```

### Portion completeness

```text
anchor                  多人
four trusted alternatives 2–3 人
seabass                 未提供
```

Result:

```text
PASS — every row has the selected axis or explicit unknown
```

### Preparation completeness

```text
anchor                  慢
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

Actual unfamiliar-user interpretation still requires review.

### Orientation and focus

- active axis is visible in the shared control;
- active axis and anchor remain in the existing sticky context;
- changing anchor preserves the axis;
- clearing and reopening the same category preserve the axis preference;
- rows do not move;
- keyboard focus no longer jumps to an offscreen top control after row selection or row-local Escape cancellation.

Result:

```text
PASS — designer proxy
```

## Remaining risks

Prototype C has removed B's formal semantic omission, but it remains unpassed because:

- users may not notice the non-active axis;
- users may not understand that `一般` is faster than a `慢` anchor without guidance;
- explicit axis switching may still require too much memory and backtracking;
- absolute labels may be read as category descriptions rather than comparison evidence;
- 0.62rem relation text may be technically complete but uncomfortable on a real phone;
- a single-axis category may make the axis control feel redundant;
- the anchor action may still be confused with saving or ordering.

## Review task

Without teaching the interaction, ask a participant to:

1. choose `山椒烤雞半隻` as the reference;
2. identify every cheaper or more expensive item and exact difference;
3. in `份量`, identify every smaller item and the unknown item;
4. explain whether any portion value is hidden;
5. switch to `準備` and identify every faster item;
6. identify the strongest faster absolute class;
7. explain why several rows show `一般` while one shows `快`;
8. distinguish equality from unknown;
9. switch anchor while keeping preparation active;
10. return to the menu overview and reopen the same category;
11. explain whether anything was saved, ordered, recommended, filtered, or ranked;
12. report whether switching one explicit axis still requires too much remembering.

## Pass signals

- every trusted value in the active axis is understood as visible;
- all faster shared dishes are identified, not only the crab;
- the crab is recognized as the strongest faster class without false exclusivity;
- matching labels communicate equality;
- `未提供` communicates unavailable trusted data;
- the other axis is noticed and understood;
- changing axis updates the column as one coherent question;
- changing anchor and reopening the category preserve orientation and axis preference;
- exact price deltas remove arithmetic;
- mobile text is readable without another surface;
- the interaction is not confused with Candidate, recommendation, ranking, or ordering.

## Failure signals

- users do not notice the other axis;
- users cannot infer all faster alternatives from `慢 / 一般 / 快`;
- users interpret absolute labels as recommendations or scores;
- switching axes still causes substantial reconstruction;
- mobile density or text size harms ordinary menu reading;
- sticky context loses axis or anchor identity;
- equal values remain ambiguous;
- unknown looks like a negative property;
- axis or anchor switching moves rows, table, or scroll position;
- the interface behaves like a hidden comparison destination.

## Current disposition

```text
[implemented, awaiting review] Prototype C — Anchor + explicit shared axis
```

Automated checks and designer reverse review show that the implementation satisfies its formal contracts and corrects Prototype B's silent semantic omission. They do not prove unfamiliar-user comprehension or reduced task effort.

Candidate and every later decision or transaction state remain blocked until Prototype C receives an explicit review disposition.
