# Prototype B — Anchor-only relation

## Document status

This document records the layout, implementation, designer reverse review, and disposition for Prototype B.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Current sequence:

```text
[useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [implemented, awaiting review] Prototype C — Anchor + explicit shared axis
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

The B pure projection remains isolated as research evidence. Its visible rendering path has been replaced by Prototype C. B does not authorize any deferred decision or transaction state.

Prototype A's obsolete selector UI has been removed from the active application tree. A and B pure projection modules remain compiled and tested so the historical evidence is preserved without retaining inactive UI.

The implemented correction is documented in `docs/prototype-c-anchor-axis-plan.md`.

## Research question

> Can a diner nominate one dish as a temporary comparison reference and read bounded differences to several alternatives on the same stable ledger, with less mental subtraction and cross-axis remembering than Prototype A?

The anchor is a temporary reading reference. It is not a Candidate, favorite, cart item, order selection, recommendation, or saved product.

## Isolated prototype rule

Prototype B did not show the Prototype A axis selector.

```text
Prototype A
one shared dimension across all rows

Prototype B
one temporary reference product across all rows
```

Prototype C is a separate hypothesis rather than a retroactive claim that B passed.

## Implemented layout

Prototype B used:

```text
one fixed-height category anchor control
+ the existing third-column relation lane
+ the existing sticky menu context for persistent anchor identity
```

It preserved:

- one canonical table;
- one canonical row per product;
- the same four columns;
- canonical row order;
- visible prices, sold-out state, and incomplete-data state;
- no filtering, sorting, ranking, hiding, copying, or dimming;
- no modal, rail, sheet, fixed footer, detail row, or second product list.

Active example:

```text
比較基準：山椒烤雞半隻              更換  清除
────────────────────────────────────────
菜名                   相對基準                 價格
山椒烤雞半隻           比較基準                 NT$520
紹興奶油蝦             少 NT$40 · 份量較小      NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 較快          NT$460
豆豉蒸鱸魚             多 NT$40 · 份量未知      NT$560
```

## Interaction state

```ts
type AnchorReading =
  | { kind: "idle" }
  | { kind: "selecting" }
  | { kind: "active"; productId: ProductId };
```

### Idle

```text
比較基準：尚未選擇                         選擇
```

### Selecting

```text
選擇一項作為比較基準                       取消
```

Every relation lane temporarily contained a native `作為基準` button. Product rows and names did not become click targets.

### Active

- the anchor row showed `比較基準`;
- each alternative showed exact price delta plus at most one semantic token;
- changing anchor replaced one ProductId;
- clearing returned to ordinary reading cues.

### Reset boundaries

- overview cleared the anchor;
- all-expanded mode cleared the anchor;
- category changes cleared the anchor;
- an anchor had to belong to the active category;
- there was no URL state or cross-category persistence;
- Escape cancelled selecting state but did not clear an active anchor.

## Relative grammar

Every alternative began with exact price difference:

```text
少 NT$40
多 NT$60
同價
```

Possible semantic tokens:

```text
份量較小
份量較大
同份量
份量未知
較快
較久
同節奏
節奏未知
```

Maximum visible output:

```text
price token + at most one semantic token
```

The final deterministic rule attempted to:

1. preserve explicit portion unknown;
2. compare formal ordinal distance for trusted portion and preparation;
3. show the dimension with the larger distance;
4. prefer portion when distances tied;
5. show price only when semantic dimensions were equal.

The rule remained factual and non-personalized, but it did not solve omission.

## Implementation reverse-review corrections

Before disposition review, implementation-level testing corrected three concrete issues.

### Repeated portion token hid the strongest preparation difference

The first rule always preferred portion. It was changed to prefer the larger formal semantic distance, making the soft-shell crab's two-step preparation difference visible.

### Clearing could discard keyboard focus

After `清除` removed itself, focus returned to the remaining `選擇` action without scrolling.

### Anchor identity could scroll away

The existing sticky menu context led with the anchor name. No second sticky comparison rail was added.

Prototype C later refined row-local focus continuity. Choosing a row as anchor and cancelling with Escape from a row now keep focus on that canonical relation lane rather than moving it to an offscreen top control.

## Geometry evidence

A code-derived Chromium proxy at 320 px and 390 px reported `0px` state-change differences across idle, selecting, active, changed-anchor, and cleared states for:

```text
row height
row top
column width
header height
table height
control height
scroll position
```

Current fixture phrases fit the B relation lane. This was implementation evidence, not participant evidence.

## Designer reverse-review method

The adversarial review used `分享料理` with `山椒烤雞半隻` as anchor.

Canonical shared-dish semantics:

```text
山椒烤雞半隻
NT$520 · 多人分享 · 慢

紹興奶油蝦
NT$480 · 2–3 人 · 一般

蒜酥椒鹽軟殼蟹
NT$460 · 2–3 人 · 快

豆豉蒸鱸魚
NT$560 · 份量低可信度 · 一般

宮保杏鮑菇
NT$340 · 2–3 人 · 一般

季節時蔬豆腐煲
NT$380 · 2–3 人 · 一般 · 已售完
```

## Task matrix

### Exact price differences

```text
紹興奶油蝦             少 NT$40
蒜酥椒鹽軟殼蟹         少 NT$60
豆豉蒸鱸魚             多 NT$40
宮保杏鮑菇             少 NT$180
季節時蔬豆腐煲         少 NT$140
```

Disposition:

```text
PASS — strong useful evidence
```

The diner no longer needed to subtract each price from NT$520.

### Strongest faster-preparation difference

Visible B output identified:

```text
蒜酥椒鹽軟殼蟹         較快
```

That answer was locally correct because the crab was `fast` while the anchor was `slow`.

However, all other alternatives with trusted preparation data were `normal` and therefore also faster than the `slow` anchor. Their preparation difference was hidden by portion selection or portion unknown.

Disposition:

```text
FAIL — visible output could imply false exclusivity
```

An unfamiliar diner could reasonably conclude that the crab was the only faster dish, even though it was only the strongest faster class.

### Unknown portion

```text
豆豉蒸鱸魚             份量未知
```

Disposition:

```text
PASS — explicit uncertainty remained visible
```

But the row's trusted faster-preparation relation was omitted.

### Anchor meaning and state boundary

Structural evidence showed:

- no product disappeared;
- no row moved;
- no row dimmed;
- no Candidate or order state existed;
- no recommendation language appeared.

Disposition:

```text
PROXY PASS
```

Unfamiliar-user meaning was not proven.

### Changing anchor

Changing anchor recalculated every visible phrase while preserving row and scroll geometry.

Disposition:

```text
PASS for orientation and recalculation
FAILURE REMAINED for hidden semantic dimensions
```

### Comprehension work compared with A

Price:

```text
YES — B reduced arithmetic
```

Semantic comparison:

```text
PARTLY, BUT NOT RELIABLY
```

Each row could display a different semantic dimension, and the interface did not reveal which known dimensions were omitted.

This created a new reconstruction sequence:

```text
read one selected token
→ infer why that dimension was selected
→ wonder what other differences were suppressed
→ return to source facts or another mode
```

## Decisive failure

The predefined failure signal occurred:

> deterministic token selection hides useful evidence.

The failure was deeper than choosing the wrong priority rule. Any single automatically selected semantic token could silently suppress another known difference.

The column mixed dimensions across rows:

```text
row A → portion
row B → preparation
row C → uncertainty
```

It was not one shared coordinate axis, and it was not a complete relative profile.

## Useful evidence retained

Prototype B still established that:

- exact price deltas clearly reduce arithmetic;
- one temporary anchor is coherent in the domain model;
- reference identity can remain visible while scrolling;
- canonical order and complete-menu credibility can remain stable;
- uncertainty can remain explicit;
- no Candidate, recommendation, or transaction state is necessary;
- changing and clearing can preserve geometry and orientation.

## Insufficient evidence

Prototype B was insufficient as the semantic relational-reading answer because:

- one semantic token hid other trusted differences;
- token dimensions varied by row;
- omission was indistinguishable from equality;
- the surface could imply false exclusivity;
- diners could need to return to source facts to verify what was suppressed.

## Disposition

```text
[useful but insufficient] Prototype B — Anchor-only relation
```

This is a designer reverse-review disposition, not a claim that an unfamiliar participant passed or failed the interface.

The pure B projection remains as historical evidence. The active UI now tests Prototype C's explicit shared-axis correction.

Candidate, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, shared-table composition, and checkout remain blocked.
