# Prototype B — Anchor-only relation

## Document status

This document records the implemented Prototype B hypothesis, designer reverse review, useful evidence, decisive failure, and final disposition.

Current sequence:

```text
[useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [passed for current scope] Prototype C — Anchor + explicit shared axis
→ [implemented, awaiting product-owner review] CND1 — Attached Candidate marks
```

Prototype B remains historical evidence. Its automatic semantic-token rendering is not active.

Prototype A and B pure projection modules remain compiled and tested. Obsolete experiment UI has been removed from the application tree.

## Research question

> Can a diner nominate one Product as a temporary comparison reference and read bounded differences to several alternatives on the same stable ledger, with less mental subtraction and cross-axis remembering than Prototype A?

The Anchor is a temporary reading reference. It is not a Candidate, favorite, cart item, order selection, recommendation, or saved Product.

## Isolated hypothesis

```text
Prototype A
one shared dimension across all rows

Prototype B
one temporary reference Product across all rows
```

B did not display the Prototype A axis selector.

## Implemented layout

Prototype B used:

```text
one fixed-height category Anchor control
+ the existing third-column relation lane
+ the existing sticky menu context for Anchor identity
```

It preserved:

- one canonical table;
- one canonical row per Product;
- four columns;
- canonical order;
- visible prices, sold-out state, and incomplete-data state;
- no sorting, filtering, ranking, hiding, copying, or dimming;
- no modal, rail, sheet, fixed footer, detail row, Candidate, or order state.

Example:

```text
比較基準：山椒烤雞半隻              更換  清除
────────────────────────────────────────
菜名                   相對基準                 價格
山椒烤雞半隻           比較基準                 NT$520
紹興奶油蝦             少 NT$40 · 份量較小      NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 較快          NT$460
豆豉蒸鱸魚             多 NT$40 · 份量未知      NT$560
```

## State boundary

```ts
type AnchorReading =
  | { kind: "idle" }
  | { kind: "selecting" }
  | { kind: "active"; productId: ProductId };
```

- selecting used explicit row buttons;
- changing Anchor replaced one ProductId;
- clearing returned to ordinary menu cues;
- overview, all-expanded mode, and category changes cleared Anchor;
- Escape cancelled temporary selection only;
- Product rows and names did not become click targets.

## Relation grammar

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

The rule remained factual but could not make omitted differences visible.

## Useful evidence

### Exact price differences

With `山椒烤雞半隻` at NT$520:

```text
紹興奶油蝦             少 NT$40
蒜酥椒鹽軟殼蟹         少 NT$60
豆豉蒸鱸魚             多 NT$40
宮保杏鮑菇             少 NT$180
季節時蔬豆腐煲         少 NT$140
```

Result:

```text
PASS — exact deltas remove repeated arithmetic
```

### Anchor model

B established that:

- one temporary Anchor is coherent;
- Anchor identity can remain visible while scrolling;
- changing and clearing can preserve geometry and orientation;
- an Anchor does not require Candidate or transaction state.

### Explicit uncertainty

The low-confidence seabass portion rendered:

```text
份量未知
```

This preserved uncertainty instead of guessing.

## Decisive failure

Canonical shared-dish preparation classes:

```text
山椒烤雞半隻           慢
紹興奶油蝦             一般
蒜酥椒鹽軟殼蟹         快
豆豉蒸鱸魚             一般
宮保杏鮑菇             一般
季節時蔬豆腐煲         一般
```

Every trusted alternative is faster than the slow Anchor.

Visible B output selected:

```text
紹興奶油蝦             份量較小
蒜酥椒鹽軟殼蟹         較快
豆豉蒸鱸魚             份量未知
宮保杏鮑菇             份量較小
季節時蔬豆腐煲         份量較小
```

The crab correctly exposed the strongest preparation difference, but four other true faster relationships were hidden.

An unfamiliar diner could reasonably read the crab as the only faster Product.

This triggered the predefined failure:

> deterministic token selection hides useful evidence.

The problem was structural rather than a priority-order bug. Any single automatically selected semantic token could suppress another trusted difference.

The relation column mixed dimensions:

```text
row A → portion
row B → preparation
row C → uncertainty
```

Omission was indistinguishable from equality.

## Task matrix

```text
exact price differences                         PASS
explicit unknown                                PASS
stable Anchor identity and geometry             PASS
separation from Candidate and order state       PROXY PASS
complete truthful semantic comparison           FAIL
reliable reduction of semantic reconstruction   INSUFFICIENT
```

## Geometry evidence

A code-derived Chromium proxy at 320 px and 390 px reported zero state-change differences for:

```text
row height
row top
column width
header height
table height
control height
scroll position
```

This was implementation evidence, not participant evidence.

## Final disposition

```text
[useful but insufficient] Prototype B — Anchor-only relation
```

B's useful price and Anchor evidence was retained in Prototype C.

C replaced automatic row-level token selection with one explicit category-wide axis and has since passed for the current scope.

Candidate remains independent from Anchor. CND1 does not automatically convert an Anchor into a Candidate.

Current Candidate implementation record:

```text
docs/candidate-marks-plan.md
```
