# Prototype C — Anchor + explicit shared axis

## Document status

This document defines a new, separately reviewable hypothesis after Prototype A and Prototype B were both found useful but insufficient.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Current status:

```text
[useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [planned, implementation not started] Prototype C — Anchor + explicit shared axis
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

This document authorizes planning only. It does not authorize implementation until the layout, state, projection, geometry, and evaluation contracts below are reviewed.

## Why a new hypothesis is necessary

Prototype A produced one truthful shared dimension across all rows, but only one dimension was visible at a time and its price scale duplicated the numeric price column.

Prototype B produced useful exact price deltas, but automatically selected one semantic token per row. The selected dimension varied across rows and silently suppressed other trusted differences.

With `山椒烤雞半隻` as a slow anchor, every trusted shared-dish alternative is faster. Prototype B displayed `較快` only for the soft-shell crab because portion or uncertainty occupied the other rows. Omission became indistinguishable from equality.

Prototype C therefore asks:

> Can one temporary anchor preserve exact price deltas while one explicit category-wide semantic axis keeps every row answering the same question, so no trusted difference is silently suppressed?

## Core corrective principle

Prototype C must not automatically decide which semantic dimension matters for each product.

```text
Prototype B
row A → portion
row B → preparation
row C → uncertainty

Prototype C
all rows → the same explicitly selected axis
```

The user, not a row-level heuristic, determines whether the visible semantic axis is `份量` or `準備`.

## Selected low-fidelity direction

Selected direction:

```text
C2 — one anchor + exact price delta + one explicit shared semantic axis
```

Two control rows are reserved above the same canonical ledger:

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
比較內容： [ 份量 ] [ 準備 ]
──────────────────────────────────────────
菜名                   價差 · 準備            價格
山椒烤雞半隻           基準 · 慢              NT$520
紹興奶油蝦             少 NT$40 · 一般        NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 快          NT$460
豆豉蒸鱸魚             多 NT$40 · 一般        NT$560
宮保杏鮑菇             少 NT$180 · 一般       NT$340
季節時蔬豆腐煲         少 NT$140 · 一般       NT$380
```

The row no longer chooses between portion and preparation. Every row contains the active axis value or explicit unknown.

## Why absolute semantic labels are used

Prototype C displays the resolved absolute semantic class rather than another automatically compressed relative phrase.

Examples:

```text
portion
多人 / 2–3 人 / 一人 / 小份 / 未提供

preparation
快 / 一般 / 慢 / 未提供
```

The anchor row exposes its own value:

```text
基準 · 多人
基準 · 慢
```

This makes difference magnitude visible without inventing language such as `快很多` or a numerical suitability score.

For example:

```text
anchor = 慢
normal = visibly faster category
fast = visibly strongest faster category
```

The interface does not need to hide three `normal` relationships merely to emphasize one `fast` relationship.

## How omission differs from equality

Prototype C has no blank semantic cell in active mode.

For the active axis, every row must display exactly one of:

```text
trusted absolute value
or
未提供
```

Equality is represented by the same visible absolute value as the anchor.

```text
anchor: 一般
target: 一般
→ visibly equal
```

Unknown is explicit:

```text
anchor or target lacks trusted value
→ 未提供
```

The non-active axis is not silently omitted by a row-level heuristic. It remains visibly discoverable in the category-wide axis control.

## Explicit alternatives considered

### C1 — show all semantic dimensions simultaneously in every row

Example:

```text
少 NT$40 · 2–3 人 · 一般
```

Rejected for the first C prototype because:

- narrow-screen density becomes the dominant variable;
- long price deltas and three labels risk truncation;
- rows may need a second line and taller baseline;
- it becomes harder to distinguish whether success came from completeness or simply more text;
- it approaches a compact comparison matrix rather than testing one focused correction.

### C2 — anchor + explicit shared axis

Selected because:

- all rows answer the same semantic question;
- exact price delta remains persistent;
- every trusted value in the active axis remains visible;
- other axes remain explicitly discoverable;
- one-line mobile relation geometry remains plausible;
- the correction is directly attributable to removal of row-level automatic dimension selection.

### C3 — horizontally scrollable semantic matrix

Rejected because:

- horizontal scrolling destroys simultaneous visibility;
- frozen and moving columns complicate spatial memory;
- it behaves like a second comparison destination embedded inside the menu;
- mobile navigation cost becomes a new confound.

### C4 — keep B and add a `更多差異` affordance

Rejected because:

- the visible row remains incomplete;
- omission still looks like equality until another interaction occurs;
- it returns to one-product-at-a-time inspection;
- it risks reintroducing detail, modal, or expansion behavior.

## Interaction state

Planned state:

```ts
type SemanticAxis = "portion" | "preparation";

type PrototypeCReading = Readonly<{
  anchorReading:
    | { kind: "idle" }
    | { kind: "selecting" }
    | { kind: "active"; productId: ProductId };
  semanticAxis: SemanticAxis;
}>;
```

No Candidate, comparison set, score, recommendation, quantity, configuration, or order state is added.

## State behavior

### Idle

```text
比較基準：尚未選擇                         選擇
比較內容： 份量 / 準備                     disabled
```

The semantic-axis row remains reserved so selecting an anchor does not move the table.

Ordinary menu cues remain visible until an anchor is active.

### Selecting

```text
選擇一項作為比較基準                       取消
比較內容： 份量 / 準備                     disabled
```

The existing relation lane contains explicit `作為基準` buttons. Product names and rows remain non-clickable.

### Active

```text
比較基準：山椒烤雞半隻               更換  清除
比較內容： [份量] [準備]
```

- exact price delta is visible for every non-anchor row;
- the anchor row shows `基準`;
- every row shows the same semantic axis;
- changing axis changes every semantic label together;
- changing anchor recalculates price deltas but preserves the selected semantic axis;
- clearing the anchor preserves the selected axis preference but disables it until another anchor is chosen.

### Category boundary

Changing category:

- clears the anchor;
- resets the semantic axis to the first eligible category axis;
- preserves canonical category and product order;
- performs no URL or persistent-state update.

## Axis eligibility

The active semantic axes are bounded to:

```text
portion
preparation
```

Price is not an axis option because exact price delta is always visible while an anchor is active.

Meal role remains excluded because Prototype A showed it was category-redundant in the formal reference data.

A category axis is eligible only when:

1. the category contains at least three products; and
2. the resolved category data contains at least two visible states across trusted values and explicit unknown.

Eligibility is category-level, not anchor-level. Changing anchor must not make axis controls appear, disappear, reorder, or shift.

Expected current reference behavior:

```text
個人主餐       準備
飯麵類         準備
分享料理       份量 / 準備
小食           準備
飲料           no C control
甜點           no C control
```

A category with no eligible semantic axis does not offer Prototype C merely to expose price deltas. This keeps the prototype focused on the semantic correction rather than turning anchor selection into a general pricing tool.

## Projection grammar

### Price token

Every non-anchor row uses the same exact formatter as Prototype B:

```text
少 NT$40
多 NT$60
同價
```

### Portion axis labels

Visible short labels:

```text
小份
一人
2–3 人
多人
未提供
```

Accessible full labels:

```text
小份
一人份
約二至三人
多人分享
份量資訊未提供
```

### Preparation axis labels

```text
快
一般
慢
未提供
```

### Anchor row

```text
基準 · 多人
基準 · 慢
```

### Alternative row

```text
少 NT$40 · 2–3 人
少 NT$60 · 快
多 NT$40 · 未提供
```

No visible output may use:

- best, better, recommended, suitable, similar, substitute, value, score, rank, or CP language;
- `最接近` or any automatic closeness claim;
- color alone to communicate axis values or unknown.

## Sticky orientation context

The existing sticky menu context remains the only sticky orientation surface.

In active state it must include both the selected axis and anchor identity:

```text
份量｜山椒烤雞半隻
準備｜山椒烤雞半隻
```

The axis comes first because losing the active question would make rows ambiguous. The anchor name follows immediately and receives the remaining width.

The full text remains available through accessible labeling and `title`.

No second sticky axis bar, comparison rail, or frozen matrix header is added.

## Layout and geometry contract

Prototype C may establish one new baseline by reserving a fixed semantic-axis control row above the table.

After that baseline, the following state changes must produce zero geometry and scroll differences:

```text
idle → selecting
selecting → active
portion → preparation
anchor A → anchor B
active → cleared
```

Measure at 320 px and 390 px:

```text
row height
row top
column width
header height
table height
anchor-control height
axis-control height
sticky-context height
scroll position
```

Additional constraints:

- the table remains four columns;
- the relation lane remains one line;
- relative text truncation is not accepted when the hidden part contains the active semantic value;
- fixture phrases must fit without relying on hover or `title` on touch devices;
- no row measurement or compensatory scroll restoration is allowed;
- axis buttons must not wrap;
- anchor and axis controls keep fixed block sizes in all states.

## Mobile readability gate

A phrase fitting its container is not sufficient.

At 320 px, the planned implementation must verify:

- semantic text is at least the current ordinary cue reading size or larger;
- price delta and semantic value remain visually separable;
- `2–3 人`, `未提供`, and three-digit deltas remain fully visible;
- the active axis and anchor remain identifiable after the source control rows scroll away;
- touch targets remain at least the existing control height;
- no horizontal scrolling is introduced.

The implementation may adjust column allocation once as a new baseline, but it may not create state-dependent widths.

## Accessibility contract

- axis selection uses native buttons in a named group;
- selected axis uses `aria-pressed` or equivalent native state;
- the group has an accessible name such as `比較內容`;
- unavailable axes are absent at category level, not silently disabled per row;
- idle and selecting states disable the axis group while preserving its geometry;
- every active row has an accessible phrase naming price difference, active axis, and value;
- unknown explains lack of trusted metadata;
- the sticky context exposes active axis and anchor;
- keyboard focus remains stable after selecting, changing, clearing, and switching axis;
- Escape cancels temporary anchor selection only;
- reduced-motion behavior remains unchanged.

## Formal truthfulness invariants

For one active axis:

1. every canonical category product remains present;
2. every non-anchor row has exactly one price delta;
3. every row has exactly one active-axis state;
4. trusted values render their formal absolute class;
5. low-confidence or missing values render `未提供`;
6. no row-level heuristic chooses a different dimension;
7. no blank active-axis state exists;
8. equal formal values render the same visible label;
9. switching axis updates every row in the same render;
10. sold-out status remains independent from relational evidence.

## Test-first implementation gate

Implementation must begin with failing tests for:

### State

- default eligible axis per category;
- axis preserved when changing anchor;
- axis reset on category change;
- axis disabled but geometrically reserved without an active anchor;
- no A selector, B automatic semantic selection, Candidate, Comparison, detail, quantity, configuration, or order state.

### Projection

- exact price deltas;
- complete portion projection for every row;
- complete preparation projection for every row;
- trusted absolute labels;
- explicit low-confidence unknown;
- no blank active-axis state;
- no row-level mixed dimensions;
- anchor row includes its absolute semantic value;
- sold-out products remain present.

### Structure

- four columns only;
- one fixed anchor-control row;
- one fixed axis-control row;
- one fixed relation line box;
- one existing sticky context only;
- no row-wide click;
- no modal, rail, sheet, expansion row, horizontal matrix, or second product list;
- no row measurement or scroll correction.

### Geometry

Code-derived Chromium measurement at 320 px and 390 px must compare all planned state transitions before participant review.

## Evaluation task

Use `分享料理` and choose `山椒烤雞半隻` as anchor.

Without teaching the interaction, ask the participant to:

1. identify every item cheaper or more expensive than the anchor and the exact difference;
2. in `份量`, identify all smaller items and the unknown item;
3. explain whether any portion value is silently hidden;
4. switch to `準備` and identify every faster item;
5. identify the strongest faster absolute class;
6. explain why some rows show `一般` while one shows `快`;
7. distinguish equality from unknown;
8. switch anchor while keeping the preparation axis;
9. explain whether the action saved, ordered, recommended, filtered, or ranked anything;
10. report whether switching one explicit axis still requires too much remembering or backtracking.

## Pass signals

- every trusted value in the active axis is visible;
- the participant identifies all faster shared dishes, not only the crab;
- the crab is recognized as the strongest faster class without implying exclusivity;
- `未提供` is understood as unavailable trusted data;
- equality is inferred from matching absolute labels rather than blank output;
- the participant notices and understands the other available axis;
- changing axis updates all rows as one coherent column;
- changing anchor preserves orientation and the selected axis;
- exact price deltas continue to remove arithmetic;
- mobile text remains readable without opening another surface;
- the interaction is not confused with Candidate, recommendation, ranking, or ordering.

## Failure signals

- users do not notice the non-active axis;
- users think the absolute labels are recommendations or scores;
- switching axes still causes substantial reconstruction and memory work;
- price delta plus absolute value is too dense at 320 px;
- the sticky context loses either the active axis or anchor identity;
- equal values remain ambiguous;
- unknown looks like a negative property;
- axis switching moves rows, columns, table, or scroll position;
- the interface behaves like a hidden comparison destination;
- the prototype succeeds only after increasing row density enough to harm ordinary menu reading.

## Planned implementation boundary

Expected implementation files, only after plan approval:

```text
src/customer/menu-anchor-axis.ts
src/customer/menu-anchor-axis.test.ts
src/customer/menu-reading.ts
src/customer/menu-reading.test.ts
src/app/category-anchor-axis-control.ts
src/app/menu-category.ts
src/app/menu-overview.ts
src/app/App.ts
src/styles/menu-workspace.css
scripts/menu-workspace-contract.test.mjs
package.json
```

Prototype A and B pure projections may remain as historical evidence, but the active C path must not render their controls or B's automatic semantic-token output.

No product-contract change is planned.

## Current disposition

```text
[planned, implementation not started] Prototype C — Anchor + explicit shared axis
```

Prototype C is ready for plan review only.

Candidate, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, shared-table composition, and checkout remain blocked.
