# Prototype B — Anchor-only relation plan

## Document status

This document records the layout and interaction contract for Prototype B before implementation.

It does not authorize Prototype C, Candidate, Comparison, Decision, Configuration, Current order, sorting, filtering, ranking, recommendation, product detail, or checkout work.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

## Prototype A disposition

Designer self-review disposition:

```text
[useful but insufficient] Prototype A — Axis-only score
```

Prototype A produced useful evidence:

- one shared preparation axis made several products simultaneously comparable;
- the portion axis exposed `多人分享`, `約 2–3 人`, and explicit unknown evidence without opening products;
- canonical order, complete-menu credibility, and stable ledger geometry were preserved.

Prototype A remains insufficient as a complete answer:

- the price scale duplicates a visible numeric column and has weak independent value;
- only one dimension is visible at a time;
- switching from portion to preparation removes the previous evidence and reintroduces cross-axis memory work.

This disposition authorizes **Prototype B planning only**. It is not participant evidence that Prototype A passed, and it does not authorize a combined A+B interface.

## Core research question

> Can a diner nominate one dish as a temporary comparison reference and read bounded differences to several alternatives on the same stable ledger, with less mental subtraction and cross-axis remembering than Prototype A?

Prototype B must remain an anchor-reading experiment, not a product-selection or recommendation feature.

## Isolated prototype rule

Prototype B must be evaluated independently from Prototype A.

The B evaluation build must not show the Axis-only selector and Anchor comparison at the same time. Combining them would be Prototype C and would make it impossible to tell which mechanism produced the result.

```text
Prototype A
one shared dimension across all rows

Prototype B
one temporary reference product across all rows

Prototype C
axis + anchor together — still blocked
```

## Layout options considered

### B1 — Relation lane only

```text
菜名                   相對基準              價格
山椒烤雞半隻           比較基準              $520
紹興奶油蝦             少 $40 · 份量較小     $480
軟殼蟹                 少 $60 · 較快         $460
```

Advantages:

- smallest DOM and geometry change;
- no second surface;
- comparison remains attached to canonical rows.

Failure:

- after the anchor row scrolls away, the diner may forget what the phrases are relative to.

### B2 — Existing top control row + relation lane

```text
比較基準：山椒烤雞半隻              更換  清除
────────────────────────────────────────
菜名                   相對基準              價格
山椒烤雞半隻           比較基準              $520
紹興奶油蝦             少 $40 · 份量較小     $480
軟殼蟹                 少 $60 · 較快         $460
豆豉蒸鱸魚             多 $40 · 份量未知     $560
```

Advantages:

- reuses the existing control row above the table;
- keeps the reference name visible after its row scrolls away;
- does not add a rail, modal, sheet, footer, column, or second product list;
- keeps all relative evidence in the existing third column.

Risk:

- the control row must remain the same height in idle, selecting, and active states.

### B3 — Anchor action permanently visible on every row

```text
○ 山椒烤雞半隻
○ 紹興奶油蝦
○ 軟殼蟹
```

Rejected because it resembles Candidate selection, radio selection, or a form field and adds permanent control noise to the whole menu.

## Selected layout

```text
B2 — existing top control row + existing relation lane
```

The current DOM already provides the two required attachment points:

- `.category-reading-control` above the ledger;
- `.product-row__relation` in the third column of every canonical row.

No fifth column or detached comparison destination is required.

## Interaction states

The planned state is deliberately bounded:

```ts
type AnchorReading =
  | { kind: "idle" }
  | { kind: "selecting" }
  | { kind: "active"; productId: ProductId };
```

It is not Candidate state and never contains more than one `ProductId`.

### Idle

Top control:

```text
比較基準：尚未選擇                         選擇
```

The ledger remains in its ordinary reading state.

### Selecting

Top control:

```text
選擇一項作為比較基準                       取消
```

The relation lane of every row shows a bounded button:

```text
作為基準
```

The product name cell is not converted into a row-wide click target. This avoids implying product detail and keeps the action explicit.

### Active

Top control:

```text
比較基準：山椒烤雞半隻              更換  清除
```

The anchor row relation lane shows:

```text
比較基準
```

Every other row shows at most two compact relative tokens.

### Reset boundaries

- entering overview clears the anchor;
- entering all-expanded mode clears the anchor;
- changing category clears the anchor;
- an anchor may reference only a product in the active category;
- clearing the anchor restores the ordinary ledger without moving rows;
- changing the anchor replaces only the active `ProductId` and relation text;
- there is no URL state or cross-category persistence.

## Relative-language grammar

The visible grammar must remain factual, compact, and non-recommendatory.

### Price token

Price is always the first token because it removes mental subtraction from the visible numeric price column.

```text
少 $40
多 $60
同價
```

The implementation must use the menu currency formatter rather than a hard-coded currency symbol.

### Portion token

```text
份量較小
份量較大
同份量
份量未知
```

### Preparation token

```text
較快
較久
同節奏
節奏未知
```

### Unknown comparison

A relative semantic claim may be made only when both the anchor value and target value are trusted.

If either side is missing or low confidence:

```text
份量未知
節奏未知
```

The accessible label should explain that the reference item or the current item lacks trusted information and therefore cannot be compared. Unknown must not be treated as smaller, slower, unsuitable, unavailable, or not recommended.

### Maximum visible output

Each non-anchor row displays:

```text
price token
+ at most one semantic token
```

Example:

```text
少 $40 · 份量較小
少 $60 · 較快
多 $40 · 份量未知
```

Semantic-token selection is deterministic and not personalized:

1. show portion when trusted portion values differ or portion is unknown;
2. otherwise show preparation when trusted preparation values differ or preparation is unknown;
3. otherwise show only the price token.

This is a bounded display rule, not a suitability score or recommendation ranking.

## Forbidden language

Prototype B must not emit or imply:

- 比較好
- 更適合
- 最接近
- 推薦
- 最佳
- 最划算
- CP 值
- 相似商品
- 替代方案
- 應該選

## Geometry contract

Prototype B may change the baseline layout once during implementation, but switching among idle, selecting, active, changed-anchor, and cleared-anchor states must not change geometry.

Required invariants:

- same table element;
- same product row elements;
- same canonical row count and order;
- same four columns and widths;
- same price and status cells;
- no inline detail row;
- no row-wide click target;
- no fixed or sticky comparison rail;
- no product hiding, copying, sorting, filtering, or dimming;
- no scroll correction;
- no animation required to explain the state change.

The existing top control row must reserve one fixed block size across all states. Product and action labels must truncate rather than wrap.

The relation lane must retain its current fixed one-line block size. Relative phrases must truncate with a full `title` and accessible label rather than increase row height.

The following must measure `0 px` change at 320 px and 390 px when selecting, changing, and clearing the anchor:

```text
row height
row top
column width
header height
table height
scroll position
```

## Visual treatment

The anchor must be identifiable without changing table geometry or muting alternatives.

Allowed:

- `比較基準` text in the relation lane;
- a non-layout-changing inset rule or text-weight change on the anchor row;
- explicit top context containing the anchor name.

Not allowed:

- dimming non-anchor rows;
- moving the anchor to the top;
- duplicating the anchor in a card;
- applying recommendation color to alternatives;
- turning the anchor into a Candidate mark;
- adding a persistent bottom or side surface.

## Availability behavior

Sold-out products remain in canonical order and retain their status.

Prototype B is a reading experiment rather than an ordering action, so availability must not silently remove a product from possible comparison. Whether unfamiliar users naturally avoid using a sold-out item as an anchor should be observed rather than encoded as filtering.

## Accessibility contract

- every action uses a native `<button>`;
- button labels name the action and product where needed;
- selecting an anchor announces the new comparison reference;
- `更換`, `清除`, and selection-cancel actions have explicit accessible names;
- visible truncation preserves full text through `title` and accessible labeling;
- the anchor is not communicated by color alone;
- keyboard focus remains on the initiating control or moves to the resulting top context without scroll correction;
- Escape may cancel the temporary selecting state, but must not clear an already active anchor unless explicitly specified and tested.

## Low-fidelity implementation map

Expected files if implementation is authorized:

```text
src/customer/menu-anchor-relations.ts
src/customer/menu-anchor-relations.test.ts
src/customer/menu-reading.ts
src/customer/menu-reading.test.ts
src/app/category-anchor-control.ts
src/app/menu-category.ts
src/app/App.ts
src/styles/menu-workspace.css
scripts/menu-workspace-contract.test.mjs
```

The exact file list may shrink. No abstraction should be introduced merely to support hypothetical future prototypes.

No reference-menu data change is currently required; the existing shared-dish category already contains price, portion, preparation, sold-out, and low-confidence examples needed for B.

## Test-first implementation gates

Before implementation behavior is added, tests should fail for:

### State

- initial state has no anchor;
- entering and cancelling selection preserves expansion and order;
- selecting a product creates exactly one category-local anchor;
- changing anchor replaces rather than accumulates anchors;
- overview, all-expanded mode, and category change clear the anchor;
- no Candidate, Comparison, quantity, configuration, or order state appears.

### Projection

- exact positive, negative, and equal price deltas;
- portion larger, smaller, equal, and unknown;
- preparation faster, slower, equal, and unknown;
- unknown on either side prevents a directional semantic claim;
- output contains no recommendation, similarity, suitability, or value language;
- every row remains in canonical position, including sold-out rows.

### Structure and geometry

- no fifth column;
- no row-wide click handler;
- no rail, modal, sheet, detail row, copied product, or fixed footer;
- control and relation lanes are fixed and one line;
- anchor changes do not call scroll restoration or row measurement code.

## Prototype B evaluation task

Use `分享料理` because it contains enough alternatives and trusted/unknown semantic differences.

Suggested anchor:

```text
山椒烤雞半隻
```

Ask the participant to identify, without opening products:

1. several dishes that cost less than the anchor and the exact difference;
2. a dish that may prepare more quickly;
3. a dish whose portion cannot be compared confidently;
4. what `比較基準` means;
5. whether choosing the anchor saved, ordered, recommended, filtered, or ranked anything;
6. how the answer changes after switching the anchor to another dish;
7. whether they used visible relative evidence or still performed product-by-product subtraction and remembering.

## Pass signals

- at least three alternatives are understood relative to one reference at the same time;
- exact price differences remove visible mental subtraction;
- one semantic difference is understood without returning to an Axis-only mode;
- the participant can explain the anchor without calling it selected, saved, ordered, or recommended;
- unknown is understood as not confidently comparable;
- changing and clearing the anchor preserve orientation and complete-menu credibility;
- the interaction reduces cross-axis remembering compared with Prototype A.

## Failure signals

- the anchor is understood as Candidate, favorite, cart item, recommendation, or selected order;
- participants expect product detail from the anchor action;
- the reference name is forgotten after its row scrolls away;
- relative phrases are slower to interpret than reading the original values;
- hidden deterministic token selection produces misleading conclusions;
- participants still subtract every price manually;
- changing anchors creates row, table, or scroll movement;
- the interface becomes a disguised comparison destination or product picker;
- one anchor causes alternatives to be dimmed, ranked, or treated as secondary.

## Planning disposition

```text
[useful but insufficient] Prototype A — Axis-only score
→ [planned, implementation not started] Prototype B — Anchor-only relation
→ [blocked] Prototype C — Combined relational score
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

The next gate is review of this layout and grammar contract. Implementation must not begin by expanding scope beyond this document.
