# Prototype B — Anchor-only relation

## Document status

This document records the planned and implemented boundary for Prototype B.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Current status:

```text
[useful but insufficient] Prototype A — Axis-only score
→ [implemented, awaiting review] Prototype B — Anchor-only relation
→ [blocked] Prototype C — Combined relational score
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

Prototype B is implemented as an isolated anchor-reading experiment. It does not authorize Prototype C, Candidate, Comparison, Decision, Configuration, Current order, sorting, filtering, ranking, recommendation, product detail, or checkout work.

## Why Prototype B exists

Prototype A proved that one shared dimension can make several products simultaneously comparable, but it remains insufficient:

- the price scale duplicates a visible numeric price column;
- only one dimension is visible at a time;
- switching axes removes prior evidence and reintroduces cross-axis remembering.

Prototype B asks:

> Can a diner nominate one dish as a temporary comparison reference and read bounded differences to several alternatives on the same stable ledger, with less mental subtraction and cross-axis remembering than Prototype A?

The anchor is a temporary reading reference. It is not a Candidate, favorite, cart item, order selection, recommendation, or saved product.

## Isolated prototype rule

The B implementation does not show the Axis-only selector.

```text
Prototype A
one shared dimension across all rows

Prototype B
one temporary reference product across all rows

Prototype C
axis + anchor together — still blocked
```

Combining A and B would make it impossible to identify which mechanism produced the result.

## Implemented layout

Selected direction:

```text
B2 — existing top control row + existing third-column relation lane
```

Active example:

```text
比較基準：山椒烤雞半隻              更換  清除
────────────────────────────────────────
菜名                   相對基準              價格
山椒烤雞半隻           比較基準              NT$520
紹興奶油蝦             少 NT$40 · 份量較小   NT$480
軟殼蟹                 少 NT$60 · 較快       NT$460
豆豉蒸鱸魚             多 NT$40 · 份量未知   NT$560
```

The implementation reuses:

- one fixed-height context row above the table;
- the existing relation lane in the third column;
- the same four-column ledger;
- the same canonical product rows, prices, statuses, and order.

It adds no fifth column, detached comparison destination, rail, modal, sheet, fixed footer, detail row, or copied product list.

## Interaction state

```ts
type AnchorReading =
  | { kind: "idle" }
  | { kind: "selecting" }
  | { kind: "active"; productId: ProductId };
```

The state contains at most one `ProductId`.

### Idle

```text
比較基準：尚未選擇                         選擇
```

The ledger shows its ordinary reading cues.

### Selecting

```text
選擇一項作為比較基準                       取消
```

Every existing relation lane contains an explicit native button:

```text
作為基準
```

The product name and row are not converted into click targets. This keeps the action distinct from product detail or Candidate selection.

### Active

```text
比較基準：山椒烤雞半隻              更換  清除
```

- the anchor row shows `比較基準`;
- each alternative shows exact price difference plus at most one semantic difference;
- the anchor row remains in canonical position;
- non-anchor products are not dimmed or reordered.

### Reset boundaries

- entering overview clears the anchor;
- entering all-expanded mode clears the anchor;
- changing category clears the anchor;
- an anchor may reference only a product in the active category;
- changing anchor replaces the previous `ProductId` rather than accumulating products;
- clearing restores ordinary reading cues;
- there is no URL state or cross-category persistence.

Escape cancels only temporary selecting state. It does not clear an active anchor.

## Relative-language grammar

Every non-anchor row starts with an exact price token using the menu currency formatter:

```text
少 NT$40
多 NT$60
同價
```

Possible portion tokens:

```text
份量較小
份量較大
同份量
份量未知
```

Possible preparation tokens:

```text
較快
較久
同節奏
節奏未知
```

Each row displays:

```text
price token
+ at most one semantic token
```

## Semantic-token selection

The first implementation always preferred portion. Internal reverse review showed that this produced repeated `份量較小` labels and hid the soft-shell crab's more discriminating `較快` evidence.

The corrected deterministic rule is:

1. preserve explicit portion unknown when portion cannot be compared;
2. when trusted portion and preparation both differ, show the dimension with the larger formal ordinal distance;
3. when distances tie, prefer portion;
4. when portion is equal, show preparation if it differs or is unknown;
5. when both semantic dimensions are equal, show price only.

This yields the intended shared-dish example:

```text
紹興奶油蝦
one-step portion difference + one-step preparation difference
→ tie: 份量較小

蒜酥椒鹽軟殼蟹
one-step portion difference + two-step preparation difference
→ larger difference: 較快

豆豉蒸鱸魚
low-confidence portion
→ 份量未知
```

This is a bounded factual display rule. It is not a personalized score, suitability judgment, similarity measure, or recommendation ranking.

## Explicit uncertainty

A directional semantic claim is made only when both anchor and target values are trusted.

If a compared dimension is missing or low confidence, the visible output remains unknown. Accessible text explains that one side lacks trusted information.

Unknown must not be interpreted as:

- smaller;
- slower;
- unsuitable;
- unavailable;
- not recommended.

## Forbidden language and behavior

Prototype B does not emit or imply:

- 比較好;
- 更適合;
- 最接近;
- 推薦;
- 最佳;
- 最划算;
- CP 值;
- 相似商品;
- 替代方案;
- 應該選.

It also does not:

- sort, filter, hide, copy, rank, or dim products;
- move the anchor to the top;
- duplicate the anchor in a card;
- create a Candidate mark;
- add row-wide product clicks;
- open product detail;
- retain the anchor across categories.

## Geometry contract

The implementation makes one baseline change: the relation lane is reserved at a height that can contain the explicit `作為基準` button.

After that baseline is established, idle, selecting, active, changed-anchor, and cleared states must preserve:

```text
row height
row top
column width
header height
table height
control height
scroll position
```

The top control row has one fixed block size. Product names and context labels truncate instead of wrapping.

The relation lane has one fixed line box. Relative phrases truncate with full `title` and accessible labels instead of increasing row height.

A code-derived Chromium proxy measurement at 320 px and 390 px reported `0 px` difference across idle, selecting, active, changed-anchor, and cleared states for all geometry and scroll measurements above.

This is an internal implementation check, not deployed participant evidence.

## Accessibility behavior

- all actions use native `<button>` elements;
- row buttons explicitly name the product being made the reference;
- the top context uses a polite live status;
- anchor identity is communicated by text, not color alone;
- visible truncation retains full `title` and accessible labels;
- selecting an anchor moves focus to the top anchor control without scrolling;
- cancelling selection returns focus to the top control;
- clearing an active anchor returns focus to the remaining `選擇` control;
- Escape cancels selecting state only.

## Implemented files

```text
src/customer/menu-anchor-relations.ts
src/customer/menu-anchor-relations.test.ts
src/customer/menu-reading.ts
src/customer/menu-reading.test.ts
src/app/category-anchor-control.ts
src/app/menu-category.ts
src/app/menu-overview.ts
src/app/App.ts
src/styles/menu-workspace.css
scripts/menu-workspace-contract.test.mjs
package.json
```

Prototype A projection code remains in the repository as prior research evidence, but its selector and renderer are not active in the Prototype B evaluation path.

## Automated validation

Tests cover:

### State

- initial idle state;
- enter and cancel selecting state;
- exactly one category-local anchor;
- changing the anchor replaces rather than accumulates `ProductId` values;
- overview, all-expanded mode, category change, and clear reset the anchor;
- Escape cancels selecting state but not active state;
- no axis, Candidate, Comparison, detail, quantity, configuration, or order state appears.

### Projection

- exact lower, higher, and equal price deltas;
- portion larger, smaller, equal, and unknown;
- preparation faster, slower, equal, and unknown;
- low-confidence portion remains unknown;
- the most discriminating semantic difference remains visible;
- output is bounded to price plus one semantic token;
- output contains no recommendation, similarity, suitability, or value language.

### Structure

- exactly four table columns;
- no row-wide click handler;
- no visible Axis-only selector;
- no row measurement or scroll-restoration choreography in category rendering;
- fixed control, heading, relation, and status line boxes.

The latest verified GitHub Actions run completes:

```text
Typecheck         ✓
Test              ✓
Build static site ✓
```

## Review task

Use `分享料理` and begin with `山椒烤雞半隻` as the reference.

Without teaching the model, ask the participant to identify:

1. several dishes that cost less or more and by how much;
2. which dish exposes the strongest faster-preparation difference;
3. which dish has unknown portion comparison;
4. what `比較基準` means;
5. whether the action saved, ordered, recommended, filtered, ranked, or selected anything;
6. how the evidence changes after switching the anchor;
7. whether visible relative evidence reduced subtraction, remembering, and backtracking.

## Pass signals

- at least three alternatives are understood relative to one reference at the same time;
- exact price differences remove mental subtraction;
- one semantic difference is understood without returning to an Axis-only mode;
- the participant explains the anchor without calling it saved, ordered, or recommended;
- unknown is understood as not confidently comparable;
- changing and clearing preserve orientation and complete-menu credibility;
- cross-axis remembering is lower than in Prototype A.

## Failure signals

- anchor is understood as Candidate, favorite, cart item, recommendation, or order selection;
- participants expect product detail from the row action;
- the reference name is forgotten after its row scrolls away;
- relative phrases are slower than reading original values;
- deterministic token selection hides the most useful difference;
- participants still subtract prices manually;
- changing anchors moves rows, table, or scroll position;
- the interface behaves like a disguised comparison destination or product picker.

## Current disposition

```text
[useful but insufficient] Prototype A — Axis-only score
→ [implemented, awaiting review] Prototype B — Anchor-only relation
→ [blocked] Prototype C — Combined relational score
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

Automated checks and designer reverse review may reject implementation failures, but they do not prove learnability or reduced comprehension work. Prototype B remains unpassed until the review gate is completed.
