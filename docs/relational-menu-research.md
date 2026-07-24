# Relational menu research

## Document status

This is the exploratory design record for the active Menu Lens menu-reading work.

It records failed single-product interactions, the stable-ledger hypothesis, Prototype A evidence, Prototype B implementation, and the remaining falsification gates. It is not a product-contract change and does not authorize Prototype C, Candidate, Comparison, Decision, Configuration, Current order, or checkout work.

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
→ [implemented, awaiting review] Prototype B — Anchor-only relation
→ [blocked] Prototype C — Combined relational score
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

## Why this research exists

The menu-reading work produced one useful substrate and several failed interaction hypotheses.

```text
large category Atlas
→ rejected: a larger category selector over a conventional list

desktop-first static workspace
→ rejected: meaningful differences disappeared on mobile

M1 compressed overview
→ passed: restaurant structure remained visible

M1 shared ledger
→ passed: one stable category coordinate plane

M2 modal product detail
→ rejected: source-row displacement and conventional single-product reading

C1 fixed product focus rail
→ rejected: perceived jumping and no meaningful reduction in linear comparison
```

The failures show that improving access to one product is not the same as helping diners understand several products together.

## The three linearity problems

### Navigation linearity

The user must traverse categories and products as one long sequence. M1 partly improved this by exposing the complete menu shape before category expansion.

### Comprehension linearity

The user inspects one product, remembers it, inspects another, reconstructs the first, and repeats.

```text
inspect A
→ remember A
→ inspect B
→ reconstruct A
→ repeat
```

This remains the immediate research target.

### Decision linearity

The user moves through a pipeline such as browse → save → comparison page → decide while the original menu stops participating. This remains deferred until relational reading proves value.

## Evidence from failed detail experiments

The modal and fixed rail looked different but shared one model:

```text
one current product
→ one separate information surface
→ replace it with the next product
```

The rail reduced modal interruption but still represented only one current product. It did not preserve prior comparison context or expose relationships among alternatives.

Its restoration code became compensatory choreography:

```text
measure a row
→ render or close a surface
→ wait for a frame
→ correct scroll
→ restore focus
```

The research therefore prefers structures that do not require restoration over increasingly complex compensation.

## Design principles

### Stable substrate

- canonical row order remains unchanged;
- row DOM identity remains unchanged;
- four-column table structure remains unchanged;
- no inline expansion row;
- no fixed footer, rail, modal, or sheet;
- no state-specific row measurement or scroll correction.

### Multiple simultaneous relationships

One interaction must make relationships among at least three products visible at the same time. Otherwise the interface remains a single-product reader.

### Useful evidence, not schema exhibition

A metadata field does not deserve visible UI merely because the schema supports it. Evidence should reduce product-by-product reading.

### Explicit uncertainty

Missing or low-confidence data remains unknown. It must not become a negative property, inferred fact, false equivalence, or recommendation.

### No hidden recommendation

The prototype must not imply:

- best;
- recommended;
- most suitable;
- best value;
- closest match;
- automatic ranking.

### Complete-menu credibility

Changing a reading mechanism must not make diners believe products were filtered out or reduced to a recommendation subset.

## Passed substrate — M1 shared ledger

M1 established the reusable coordinate plane:

- each category is one semantic table;
- sequence, dish name, bounded evidence, and price use shared columns;
- sold-out and incomplete-data status remain visible;
- each product has one canonical row;
- canonical ordering remains stable;
- products do not become independent cards.

The ledger is a passed substrate, not a finished product.

## Removed experiment — C1

The fixed product rail was fully removed from the primary flow:

- rail module and DOM;
- fixed rail CSS and bottom reservation;
- product-row focus behavior;
- focus and detail state;
- `preserveSourceRow()`;
- rail-specific row measurement, scroll correction, and focus restoration;
- C1-only tests and wide-screen inspector structure.

The remaining `requestAnimationFrame` only throttles active-category tracking in all-expanded mode.

## Prototype A — Axis-only score

Disposition:

```text
[useful but insufficient]
```

### Question

> Can one stable category ledger expose several product relationships at once, reduce memory work, and preserve complete-menu credibility without sorting, filtering, recommendation, or a second comparison destination?

### Implemented mechanism

One category could display one shared dimension:

```text
一般
價格
份量
餐點角色
準備節奏
```

A non-default axis appeared only when the category contained at least three products and at least two distinct visible states.

The same table and canonical rows remained. Only the third-column relation lane and its heading changed.

### Corrective reverse review

The first internal review found:

1. the price microbar changed row geometry on narrow screens;
2. deployed data could not display axis-level `未提供`;
3. uniform fields such as meal role merely repeated category structure.

Corrections:

- all table cells use top alignment;
- relation and status lanes reserve fixed line boxes;
- price rendering fits the same line box;
- headings remain one line;
- a low-confidence portion example makes `未提供` executable;
- visible axes require real multi-product differences.

A code-derived 320 px and 390 px geometry measurement then reported zero state-change difference in row, column, header, and table geometry.

### Useful evidence

- preparation made several dishes simultaneously comparable;
- portion exposed `多人分享`, `約 2–3 人`, and unknown;
- canonical order and complete-menu credibility remained intact;
- no detail, sorting, filtering, recommendation, or decision state was introduced.

### Insufficient evidence

- the price scale duplicated the numeric price column;
- only one dimension was visible at a time;
- switching axes removed the previous evidence;
- cross-axis remembering remained.

Prototype A is retained as research evidence but is not the active evaluation UI.

## Prototype B — Anchor-only relation

Status:

```text
[implemented, awaiting review]
```

### Question

> Can a diner nominate one dish as a temporary reference and read bounded differences to several alternatives on the same stable ledger, with less mental subtraction and cross-axis remembering than Prototype A?

### Isolation from Prototype A

The B evaluation path does not show the Axis-only selector.

```text
Prototype A
one dimension across all rows

Prototype B
one temporary reference across all rows

Prototype C
axis + anchor together — blocked
```

### Layout

Prototype B reuses two existing attachment points:

- one fixed-height context row above the table;
- the third-column relation lane in each canonical product row.

It adds no fifth column, detached comparison surface, rail, modal, sheet, footer, or copied list.

### State

```ts
type AnchorReading =
  | { kind: "idle" }
  | { kind: "selecting" }
  | { kind: "active"; productId: ProductId };
```

The state contains at most one category-local `ProductId`.

Boundaries:

- overview clears anchor;
- all-expanded mode clears anchor;
- category change clears anchor;
- changing anchor replaces the prior ID;
- clear returns to idle;
- no URL or cross-category persistence;
- Escape cancels selecting only.

### Explicit selection

Idle:

```text
比較基準：尚未選擇                         選擇
```

Selecting:

```text
選擇一項作為比較基準                       取消
```

Every relation lane temporarily contains an explicit native button:

```text
作為基準
```

Product names and rows are not click targets. The action therefore does not imply detail or Candidate selection.

Active:

```text
比較基準：山椒烤雞半隻              更換  清除
```

The anchor row remains in place and displays `比較基準`. Other rows display bounded relative evidence.

### Relative grammar

Every alternative begins with exact price difference:

```text
少 NT$40
多 NT$60
同價
```

Then at most one semantic token:

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
price token + one semantic token
```

### Corrected semantic selection

The first implementation always preferred portion. Reverse review showed that this hid the soft-shell crab's exceptional faster preparation behind repeated `份量較小` labels.

The corrected rule is deterministic:

1. explicit portion unknown remains visible;
2. if trusted portion and preparation both differ, show the dimension with the larger formal ordinal distance;
3. tied differences prefer portion;
4. equal portion permits differing or unknown preparation;
5. equal semantic dimensions leave price only.

Example with `山椒烤雞半隻` as anchor:

```text
紹興奶油蝦
→ 少 NT$40 · 份量較小

蒜酥椒鹽軟殼蟹
→ 少 NT$60 · 較快

豆豉蒸鱸魚
→ 多 NT$40 · 份量未知
```

This is a factual compression rule, not a recommendation, similarity score, suitability judgment, or personalized ranking.

### Unknown handling

A directional semantic claim requires trusted values on both sides. Unknown output carries accessible explanation that one side lacks trusted metadata.

Unknown does not mean:

- smaller;
- slower;
- unsuitable;
- unavailable;
- not recommended.

### Stable geometry

The relation lane was enlarged once to contain the explicit button. After establishing that baseline, idle, selecting, active, changed-anchor, and cleared states use the same fixed geometry.

A code-derived Chromium proxy at 320 px and 390 px measured zero state-change difference for:

```text
row height
row top
column width
header height
table height
control height
scroll position
```

This is implementation evidence, not participant evidence.

### Accessibility

- actions are native buttons;
- selection buttons name their product;
- top context uses a polite live status;
- anchor identity is textual, not color-only;
- truncated text retains `title` and accessible labels;
- selecting and cancelling return focus to the top control without scrolling;
- clearing returns focus to the remaining `選擇` action;
- Escape cancels selecting but does not clear an active anchor.

### Automated safeguards

State tests cover:

- idle, selecting, active, changed, and cleared states;
- category-local anchor validation;
- replacement rather than accumulation;
- overview, all, and category reset boundaries;
- absence of axis, Candidate, Comparison, detail, quantity, configuration, and order state.

Projection tests cover:

- exact lower, higher, and equal price differences;
- portion and preparation larger, smaller/faster, equal, and unknown;
- low-confidence metadata;
- bounded output;
- the most discriminating semantic evidence;
- absence of recommendation and value language.

Structure tests cover:

- four columns only;
- no row-wide click;
- no active Axis-only control;
- fixed context, relation, status, and header line boxes;
- no category-level row measurement or scroll correction.

The verified GitHub Actions workflow completes typecheck, tests, and static build.

## Prototype B review gate

Use `分享料理` and initially choose `山椒烤雞半隻`.

Without teaching the interaction, ask the participant to identify:

1. alternatives that cost less or more and exact differences;
2. the strongest faster-preparation difference;
3. the dish with unknown portion comparison;
4. what `比較基準` means;
5. whether choosing it saved, ordered, recommended, filtered, ranked, or selected anything;
6. how evidence changes after switching anchors;
7. whether relative evidence reduced subtraction, remembering, and backtracking.

Pass signals:

- at least three alternatives are understood relative to one anchor at once;
- exact deltas remove mental subtraction;
- one semantic difference is understood without returning to A;
- anchor is not confused with Candidate, cart, favorite, recommendation, or order state;
- unknown is understood as not confidently comparable;
- changing and clearing preserve orientation and complete-menu credibility;
- cross-axis remembering is lower than in Prototype A.

Failure signals:

- anchor is interpreted as saved, ordered, or recommended;
- users expect detail from the row action;
- the reference is forgotten after scrolling;
- relative phrases are slower than original facts;
- deterministic selection hides useful evidence;
- users still subtract prices manually;
- changing anchor moves rows, table, or scroll position;
- the interaction behaves as a disguised comparison destination or product picker.

Prototype B remains unpassed until this review gate is completed.

## Prototype C and later work

Prototype C remains blocked until A and B each have explicit independent dispositions.

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

## Contract impact

None.

The product contract already requires complete-menu access, browsing distinct from ordering, preserved browsing context, comparison support, and explicit uncertainty. Prototypes A and B change the experimental route used to investigate those requirements; they do not change the requirements or authorize deferred states.
