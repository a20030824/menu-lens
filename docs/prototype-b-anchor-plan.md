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
→ [planned, implementation not started] Prototype C — Anchor + explicit shared axis
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

The B implementation remains intact as isolated research evidence. Its disposition does not authorize Prototype C implementation or any deferred decision or transaction state.

The separately planned correction is documented in `docs/prototype-c-anchor-axis-plan.md`.

## Research question

> Can a diner nominate one dish as a temporary comparison reference and read bounded differences to several alternatives on the same stable ledger, with less mental subtraction and cross-axis remembering than Prototype A?

The anchor is a temporary reading reference. It is not a Candidate, favorite, cart item, order selection, recommendation, or saved product.

## Isolated prototype rule

Prototype B does not show the Prototype A Axis-only selector.

```text
Prototype A
one shared dimension across all rows

Prototype B
one temporary reference product across all rows
```

## Implemented layout

Prototype B uses:

```text
one fixed-height category anchor control
+ the existing third-column relation lane
+ the existing sticky menu context for persistent anchor identity
```

It preserves:

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

Every relation lane temporarily contains a native `作為基準` button. Product rows and names are not click targets.

### Active

- the anchor row shows `比較基準`;
- each alternative shows an exact price delta plus at most one semantic token;
- changing the anchor replaces one `ProductId`;
- clearing returns to ordinary reading cues.

### Reset boundaries

- overview clears the anchor;
- all-expanded mode clears the anchor;
- category changes clear the anchor;
- an anchor must belong to the active category;
- there is no URL state or cross-category persistence;
- Escape cancels selecting state but does not clear an active anchor.

## Relative grammar

Every alternative begins with exact price difference:

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

The implemented deterministic rule:

1. preserves explicit portion unknown;
2. compares formal ordinal distance for trusted portion and preparation;
3. shows the dimension with the larger distance;
4. prefers portion when distances tie;
5. shows price only when both semantic dimensions are equal.

The rule is factual and non-personalized. It does not calculate suitability, similarity, value, or recommendation.

## Implementation reverse-review corrections

Before the disposition review, implementation-level reverse testing corrected three concrete failures.

### Repeated portion token hid the strongest preparation difference

The first rule always preferred portion. It was changed to prefer the larger formal semantic distance, which made the soft-shell crab's two-step preparation difference visible.

### Clearing could discard keyboard focus

After `清除` removes itself, focus returns to the remaining `選擇` action without scrolling.

### Anchor identity could scroll away

The existing sticky menu context leads with the anchor name:

```text
基準：山椒烤雞半隻　分享料理
```

No second sticky comparison rail was added.

## Geometry and accessibility evidence

A code-derived Chromium proxy at 320 px and 390 px reported `0 px` state-change difference across idle, selecting, active, changed-anchor, and cleared states for:

```text
row height
row top
column width
header height
table height
control height
scroll position
```

The fixture phrases fit the 6.7rem mobile relation lane in the proxy. The relation text is `0.6rem`, so actual mobile readability still requires participant evidence.

Accessibility behavior includes:

- native buttons;
- product-specific accessible action names;
- a polite anchor status;
- textual anchor identity;
- full titles and accessible labels for truncated text;
- focus preservation after select, cancel, and clear;
- Escape limited to temporary selecting state.

## Designer reverse-review method

This review is an adversarial designer proxy, not an unfamiliar-participant study.

It can reject a logically misleading projection because the canonical source data and visible output are known. It cannot prove learnability, perceived meaning, or task effort for unfamiliar diners.

The review used `分享料理` with `山椒烤雞半隻` as anchor.

Canonical shared-dish semantics:

```text
山椒烤雞半隻           NT$520 · 多人分享 · 慢
紹興奶油蝦             NT$480 · 約 2–3 人 · 一般
蒜酥椒鹽軟殼蟹         NT$460 · 約 2–3 人 · 快
豆豉蒸鱸魚             NT$560 · 份量低可信度 · 一般
宮保杏鮑菇             NT$340 · 約 2–3 人 · 一般
季節時蔬豆腐煲         NT$380 · 約 2–3 人 · 一般 · 已售完
```

## Task matrix

### Exact price differences

Visible output:

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

The diner no longer needs to subtract each numeric price from NT$520.

### Strongest faster-preparation difference

Visible output identifies:

```text
蒜酥椒鹽軟殼蟹         較快
```

That answer is locally correct because the crab is `fast` while the anchor is `slow`.

However, the source data also says all four other alternatives with trusted preparation data are faster than the slow anchor:

```text
紹興奶油蝦             normal → faster than slow
豆豉蒸鱸魚             normal → faster than slow
宮保杏鮑菇             normal → faster than slow
季節時蔬豆腐煲         normal → faster than slow
```

Their preparation difference is hidden by portion selection or portion unknown.

Disposition:

```text
FAIL — visible output can imply false exclusivity
```

An unfamiliar diner can reasonably conclude that the crab is the only faster dish, even though it is only the strongest faster dish.

### Explicit unknown portion

Visible output:

```text
豆豉蒸鱸魚             份量未知
```

Disposition:

```text
PASS — explicit uncertainty remains visible
```

But this row also has a trusted faster-preparation relation that is omitted.

### Anchor meaning and state separation

Structural evidence:

- no product disappears;
- no row moves;
- no row dims;
- no Candidate or order state exists;
- no recommendation language appears;
- the anchor name remains visible while scrolling.

Disposition:

```text
PROXY PASS — requires unfamiliar-participant confirmation
```

### Anchor switching

Changing to the soft-shell crab recalculates every relative phrase while preserving row and scroll geometry.

```text
山椒烤雞半隻           多 NT$60 · 較久
紹興奶油蝦             多 NT$20 · 較久
豆豉蒸鱸魚             多 NT$100 · 份量未知
宮保杏鮑菇             少 NT$120 · 較久
季節時蔬豆腐煲         少 NT$80 · 較久
```

Disposition:

```text
PASS for orientation and recalculation
FAILURE REMAINS for hidden semantic dimensions
```

## Decisive failure

The documented failure signal occurred:

> deterministic token selection hides useful evidence.

The failure is deeper than choosing the wrong priority rule. Any single automatically selected semantic token can silently suppress another known difference.

The relation column mixes dimensions across rows:

```text
row A → portion
row B → preparation
row C → uncertainty
```

It is not one shared coordinate axis and not a complete relative profile. The surface can be fast to scan while still producing incomplete or misleading conclusions.

This creates a new reconstruction problem:

```text
read one selected token
→ infer why that dimension was selected
→ wonder what other differences were suppressed
→ return to source facts or another mode
```

## Useful evidence retained

Prototype B still provides useful independent evidence:

- exact price deltas clearly reduce arithmetic;
- one temporary anchor is understandable in the model;
- reference identity remains visible while scrolling;
- canonical order and complete-menu credibility remain stable;
- uncertainty is explicit;
- no Candidate, recommendation, or transaction state is introduced;
- changing and clearing preserve geometry and orientation.

## Insufficient evidence

Prototype B is insufficient as the semantic relational-reading answer because:

- one semantic token hides other trusted differences;
- token dimensions vary by row;
- omission is indistinguishable from equality;
- the surface can imply false exclusivity;
- the diner may need to return to source facts to verify what was suppressed.

## Disposition

```text
[useful but insufficient] Prototype B — Anchor-only relation
```

This is a designer reverse-review disposition, not a claim that an unfamiliar participant passed or failed the interface.

The implementation remains isolated as evidence rather than receiving further polish under the same hypothesis.

The next hypothesis is now planned separately:

```text
Prototype C — Anchor + explicit shared axis
```

Its plan removes row-level automatic semantic selection, preserves exact price deltas, and makes all rows display the same explicit `份量` or `準備` axis. Planning does not authorize implementation.

See `docs/prototype-c-anchor-axis-plan.md`.

Candidate, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, shared-table composition, and checkout remain blocked.

## Automated validation

The implemented branch continues to require:

```text
Typecheck         ✓
Test              ✓
Build static site ✓
```

Automated checks prove implementation contracts, not comprehension.
