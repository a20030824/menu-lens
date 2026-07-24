# Prototype C — Anchor + explicit shared axis

## Document status

This document records the implemented Prototype C hypothesis, evidence, corrections, and final current-scope disposition.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Current sequence:

```text
[useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [passed for current scope] Prototype C — Anchor + explicit shared axis
→ [planned, implementation not started] CND1 — Attached Candidate marks
→ [blocked] Candidate workspace / Comparison / Decision / Configuration / Current order
```

## Evidence boundary

Prototype C is accepted for the current implementation scope by product-owner decision.

The acceptance is based on:

- formal data truthfulness;
- automated projection and state tests;
- designer reverse review;
- keyboard-focus re-review;
- code-derived Chromium geometry and text-fit proxies at 320 px and 390 px;
- passing Typecheck, tests, and static build.

This disposition does **not** claim:

- unfamiliar-participant evidence;
- proven learnability;
- measured reduction in task time;
- statistical usability results;
- superiority over a conventional interface.

The previously planned unfamiliar-user gate has been cancelled as a blocking requirement. Remaining comprehension and mobile-comfort risks are accepted known limitations rather than blockers for the next bounded slice.

## Why Prototype C exists

Prototype A made one shared semantic dimension complete across all rows, but switching dimensions retained memory work and its price scale duplicated the numeric price column.

Prototype B introduced a temporary reference Product and useful exact price deltas, but automatically selected one semantic token per row. That mixed dimensions and silently hid other trusted differences.

With `山椒烤雞半隻` as a slow anchor, every trusted shared-dish alternative is faster. B displayed `較快` only for the soft-shell crab because portion or uncertainty occupied the other rows. The crab was the strongest faster class, not the only faster Product.

Prototype C tested:

> Can one temporary anchor preserve exact price deltas while one explicit category-wide semantic axis keeps every row answering the same question, so no trusted difference is silently suppressed?

## Implemented correction

```text
Prototype B
row A → portion
row B → preparation
row C → uncertainty

Prototype C
all rows → one explicitly selected axis
```

The user selects `份量` or `準備`. Every canonical row displays the same active axis.

### Portion mode

```text
比較基準：山椒烤雞半隻               更換  清除
比較內容： [份量] [準備]
──────────────────────────────────────────
菜名                   價差 · 份量            價格
山椒烤雞半隻           基準 · 多人            NT$520
紹興奶油蝦             少 NT$40 · 2–3 人      NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 2–3 人      NT$460
豆豉蒸鱸魚             多 NT$40 · 未提供      NT$560
宮保杏鮑菇             少 NT$180 · 2–3 人     NT$340
季節時蔬豆腐煲         少 NT$140 · 2–3 人     NT$380
```

### Preparation mode

```text
菜名                   價差 · 準備            價格
山椒烤雞半隻           基準 · 慢              NT$520
紹興奶油蝦             少 NT$40 · 一般        NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 快          NT$460
豆豉蒸鱸魚             多 NT$40 · 一般        NT$560
宮保杏鮑菇             少 NT$180 · 一般       NT$340
季節時蔬豆腐煲         少 NT$140 · 一般       NT$380
```

## Truthfulness contract

For one active axis:

1. every canonical Product remains present;
2. every non-anchor row has one exact price delta;
3. every row has one value for the same semantic axis;
4. trusted values use their formal absolute class;
5. missing or low-confidence values display `未提供`;
6. equal values remain visible as matching labels;
7. the anchor row displays its own formal value;
8. no row-level heuristic selects another dimension;
9. no blank active semantic cell exists;
10. sold-out and incomplete-data states remain independent.

Visible portion grammar:

```text
小份
一人
2–3 人
多人
未提供
```

Visible preparation grammar:

```text
快
一般
慢
未提供
```

Visible price grammar:

```text
少 NT$40
多 NT$60
同價
```

No output introduces suitability, score, ranking, recommendation, value, or closeness language.

## State contract

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

Observable behavior:

- changing the anchor preserves the semantic axis;
- clearing the anchor preserves the disabled axis preference;
- overview and all-expanded modes clear the anchor;
- reopening the same category preserves its explicit axis preference;
- changing category resets to the destination's first eligible axis;
- ineligible categories cannot begin anchor selection;
- Escape cancels temporary anchor selection only;
- no Candidate or transaction state is stored inside reading state.

## Axis eligibility

Axes are bounded to:

```text
portion
preparation
```

Price is persistent evidence rather than an axis. Meal role remains excluded because the reference data makes it category-redundant.

Current reference behavior:

```text
個人主餐       準備
飯麵類         準備
分享料理       份量 / 準備
小食           準備
飲料           no C control
甜點           no C control
```

Eligibility is category-level and stable across anchor changes.

## Structural boundary

Prototype C preserves:

- one canonical table;
- one canonical row per Product;
- four columns;
- canonical Product order;
- visible price, sold-out state, and incomplete-data state;
- one existing sticky orientation context;
- no copied Product list;
- no fifth column;
- no modal, sheet, rail, fixed footer, detail row, horizontal matrix, or second comparison destination;
- no sorting, filtering, hiding, dimming, ranking, recommendation, Candidate, or order state.

The existing sticky context exposes axis and anchor:

```text
份量｜山椒烤雞半隻
準備｜山椒烤雞半隻
```

## Geometry evidence

Implemented baseline:

```text
anchor-control row    2.6rem
axis-control row      2.4rem
relation lane         1.55rem
mobile relation col   7.2rem
```

A code-derived Chromium proxy was run at 320 px and 390 px across:

```text
idle
selecting
active portion
active preparation
axis switch
anchor change
clear
```

Measured result:

```text
row-height difference       0px
row-top difference          0px
table-height difference     0px
fixture relation overflow   none
horizontal scrolling        none
```

Fixture strings including `少 NT$180 · 2–3 人` and `多 NT$40 · 未提供` fit the current lane without hover-dependent information.

## Re-review corrections

### Same-category axis preference

The first implementation reset `準備` to default `份量` after returning to overview and reopening the same category.

That was not a category change. The state transition now preserves an eligible explicit axis for same-category reopening while retaining reset behavior for a real category change.

### Row-local focus after choosing an anchor

The first implementation moved keyboard focus to the top anchor control with `preventScroll`, leaving focus outside the visible viewport.

Current behavior:

```text
choose anchor in row
→ render active relation
→ focus that row's relation lane
→ preserve scroll position
```

The relation lane has `tabIndex=-1`, exposes the complete accessible relation phrase, and does not add a normal Tab stop.

### Row-local Escape cancellation

When Escape is pressed from a row selection button, the focused ProductId is captured before the buttons are replaced and focus returns to the same canonical row.

Top-level Cancel and Clear remain top-local.

### Low-entropy cleanup

The unused Prototype A selector UI module was removed:

```text
src/app/category-reading-control.ts
```

Prototype A and B pure projection modules remain compiled and tested as historical evidence.

## Automated validation

Tests cover:

- stable category-level axis eligibility;
- complete portion projection;
- complete preparation projection;
- exact lower, higher, and equal price deltas;
- formal absolute labels;
- explicit low-confidence unknown;
- anchor row semantic value;
- no blank or mixed active-axis states;
- axis preservation across anchor changes and same-category reopening;
- category reset and ineligible-category boundaries;
- canonical order and sold-out retention;
- four columns, fixed controls, and one sticky context;
- no row-wide Product click;
- row-local focus after anchor selection;
- row-local focus after Escape cancellation;
- top-local focus after top Cancel and Clear;
- absence of the obsolete Prototype A selector UI;
- absence of B automatic semantic rendering;
- absence of Candidate and transaction state.

Required branch checks pass:

```text
Typecheck         ✓
Tests             ✓
Build static site ✓
```

## Designer reverse-review result

Using `分享料理` and `山椒烤雞半隻` as anchor:

```text
exact price differences                         PASS
complete portion projection                     PASS
explicit portion unknown                        PASS
complete preparation projection                 PASS
all trusted faster classes visible              PASS
crab shown as strongest, not uniquely faster    PASS
matching labels expose equality                 FORMAL PASS
unknown distinct from equality                  FORMAL PASS
axis and anchor orientation                     DESIGNER-PROXY PASS
narrow-screen geometry                          PROXY PASS
keyboard focus continuity                       PASS
```

No formal contradiction equivalent to Prototype B remains.

## Known accepted limitations

The following remain unproven and are recorded rather than treated as blockers:

- whether a new user notices the non-active axis;
- whether `慢 / 一般 / 快` is immediately understood relationally;
- whether axis switching materially reduces memory work;
- whether absolute labels are read as comparison evidence;
- whether 0.62rem relation text is comfortable on every real phone;
- whether anchor selection could be confused with saving or ordering.

No unfamiliar-participant evidence is claimed.

## Final current-scope disposition

```text
[passed for current scope] Prototype C — Anchor + explicit shared axis
```

Prototype C is stable enough to become the reading substrate for the next bounded slice.

The next authorized work is planning CND1 Attached Candidate marks. Candidate workspace, bounded comparison, Decision, Configuration, Current order, quantity, modifiers, and checkout remain blocked.
