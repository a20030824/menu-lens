# Bounded Candidate comparison

## Document status

This document defines the first bounded comparison slice after the accepted Candidate workspace.

```text
branch  agent/menu-map-atlas
PR      #4 — Build menu reading workspace
status  [planned, implementation not started]
```

Current sequence:

```text
[passed for current scope] Prototype C — Anchor + explicit shared axis
→ [passed for current scope] CND1 — Attached Candidate marks
→ [passed for current scope] CND2 — Candidate review workspace
→ [planned, implementation not started] CMP1 — Bounded Candidate comparison
→ [blocked] Decision / Configuration / Current order
```

CMP1 is a separate authorization boundary. This plan must be reviewed before implementation begins.

## Research question

> Can a diner reduce repeated memory work across two or three serious Candidates using a bounded, truthful comparison without mistaking comparison selection for commitment or losing the Candidate workspace?

CMP1 investigates only:

- explicit selection of two or three existing Candidates;
- simultaneous review of a small set of decision-relevant differences;
- truthful missing, source, and confidence states;
- return continuity to the Candidate workspace.

CMP1 does not investigate:

- choosing a winner;
- explicit Decision;
- quantity;
- Configuration;
- modifier selection;
- Current order;
- totals or submission;
- recommendation, ranking, or scoring;
- table composition;
- a conventional comparison baseline.

## Product boundary

```text
canonical Products
+ Candidate ProductId membership
+ reversible comparison selection
→ bounded comparison projection
```

Comparison is generated only from Candidates. It does not create another Product collection and does not change Candidate membership.

The state boundaries remain:

```text
Product
≠ Candidate
≠ comparison selection
≠ DraftOrderItem
≠ ConfiguredOrderItem
≠ SubmittedOrderRound
```

Comparison selection expresses only which Candidates are visible together in the comparison projection.

It has:

- no quantity;
- no configuration;
- no modifier selections;
- no total;
- no commitment;
- no winner;
- no rank;
- no recommendation;
- no copied Product data.

## Proposed state model

Add one identity-only comparison state beside reading and Candidate state:

```ts
export type CandidateComparisonState = Readonly<{
  productIds: ReadonlyArray<ProductId>;
}>;
```

Extend the explicit app wrapper:

```ts
type MenuSurface =
  | { kind: "menu" }
  | { kind: "candidates" }
  | { kind: "comparison" };

type MenuAppState = Readonly<{
  reading: MenuReadingState;
  candidates: CandidateState;
  comparison: CandidateComparisonState;
  surface: MenuSurface;
}>;
```

No browsing measurements or DOM references enter pure state.

The App controller may retain one browser-only return context:

```ts
type ComparisonReturnContext = Readonly<{
  scrollY: number;
  focusElement: HTMLElement | null;
}>;
```

## Comparison-state invariants

1. A selected ProductId must be a valid current Candidate.
2. Selection contains no duplicates.
3. Selection contains at most three ProductIds.
4. Selection order is derived from canonical Product order, not click order.
5. Zero or one selected Product is valid selection state but does not produce a comparison projection.
6. Two or three selected Products produce the comparison projection.
7. Comparison toggling never changes Candidate membership.
8. Removing a Candidate sanitizes the comparison selection.
9. Re-adding a Candidate does not silently reselect it.
10. Stale or unknown ProductIds are ignored.
11. A sold-out Product that remains a Candidate may remain selected and must expose current availability.
12. Comparison selection lasts only for the active session.
13. Session reset or reload creates an empty comparison state.

## Opening rules

The Candidate workspace exposes comparison only when at least two canonical Candidates exist.

Opening behavior:

1. fewer than two Candidates → no surface transition;
2. sanitize any previous comparison selection against current Candidates;
3. if the sanitized selection is empty and exactly two or three Candidates exist, select all of them in canonical order;
4. if more than three Candidates exist and no valid prior selection exists, begin with no selected Products;
5. preserve an existing valid one-, two-, or three-Product selection;
6. preserve the complete menu reading state, Candidate state, active Anchor, and semantic axis.

This rule avoids arbitrary ranking:

```text
2–3 Candidates
→ all fit the comparison bound
→ compare all

4+ Candidates
→ no arbitrary first-three projection
→ user explicitly selects 2–3
```

CMP1 must not require removing Candidates merely to compare a subset.

## Selection behavior

Every current Candidate appears in one canonical-order selector list on the comparison surface.

Each selector uses one persistent native button:

```text
比較
```

Button contract:

- stable visible label `比較`;
- stable accessible name `比較「商品名」`;
- `aria-pressed="false"` when not selected;
- `aria-pressed="true"` when selected;
- same DOM node after toggling;
- same dimensions in both states;
- focus remains on the toggled control;
- selection is visible through pressed styling, not a changing action label.

When three Products are already selected:

- selected Products remain removable from the comparison selection;
- unselected selectors expose the three-item limit;
- attempting to select a fourth Product does not replace an existing Product;
- the state remains unchanged;
- one bounded status message explains `最多比較 3 道，請先取消一項。`.

A fourth selection must never silently remove the earliest, latest, cheapest, or canonically first Product.

## Candidate workspace entry

CND2 keeps exactly two row actions:

```text
在菜單中查看
移出考慮
```

CMP1 does not add a third per-row action.

Instead, the Candidate workspace header gains one fixed-geometry action row:

```text
比較考慮項目
```

Entry behavior:

- fewer than two Candidates → disabled and visually hidden while geometry remains reserved;
- two or more Candidates → visible and interactive;
- accessible name includes the canonical Candidate count;
- entering captures Candidate-workspace scroll and focus;
- entering scrolls to the comparison heading instantly;
- entering focuses the comparison heading;
- no Candidate row moves when the entry changes availability.

The entry must not use cart, checkout, order, winner, or recommendation language.

## Surface ownership and return continuity

The application keeps three mounted sibling `main` surfaces:

```text
menu
candidates
comparison
```

Exactly one is visible and interactive.

Every hidden surface is:

- `hidden`;
- `inert`;
- retained in the DOM;
- not rebuilt by unrelated reading-state changes.

The primary comparison Back action is:

```text
回到考慮項目
```

It restores:

- the Candidate workspace surface;
- exact captured `window.scrollY`;
- the prior Candidate-workspace focus origin when still available;
- Candidate membership;
- comparison selection;
- the still-preserved menu reading state and Candidate-to-menu return context.

Comparison opening and Back use explicit `behavior: "instant"`. They do not inherit global smooth scrolling.

The expected nested return path remains:

```text
menu
→ Candidate workspace
→ comparison
→ Candidate workspace
→ exact previous menu context
```

Opening comparison must not clear CND2's existing menu return context.

CMP1 does not add Browser Back integration, URL state, routing, modal history, or deep links.

## Comparison surface structure

The comparison surface is a compact document, not a modal, sheet, rail, carousel, horizontal specification table, or card deck.

Proposed structure:

```text
[ 回到考慮項目 ]

比較考慮項目
選擇 2–3 道；只是在比較，尚未點餐。

已選 2 / 3 道

山椒烤雞半隻          分享料理        [ 比較 ]
紹興奶油蝦            分享料理        [ 比較 ]
炙烤味噌雞腿定食      個人主餐        [ 比較 ]

價格
山椒烤雞半隻                           NT$520
紹興奶油蝦                             NT$480

份量
山椒烤雞半隻                           多人分享
紹興奶油蝦                             約 2–3 人

準備節奏
山椒烤雞半隻                           一般
紹興奶油蝦                             較快
```

The surface has two regions:

1. canonical Candidate selector;
2. generated comparison evidence.

No direct Candidate removal, menu locator, Decision, or Configuration action appears in CMP1.

## Mobile comparison grammar

CMP1 does not use a wide matrix with Products as columns.

At 320px and 390px, three Product columns plus a dimension column would force one or more of:

- horizontal scrolling;
- unreadably narrow columns;
- repeated truncation;
- Product-name wrapping that destroys row alignment;
- a desktop-first table compressed into a phone.

Instead, CMP1 uses dimension blocks.

Each dimension is one section, and each selected Product is one aligned row inside that section:

```text
[dimension heading]
Product name             value / evidence state
Product name             value / evidence state
Product name             value / evidence state
```

This keeps comparison simultaneous within each decision dimension while preserving readable Product identity.

Product names may wrap naturally to two lines. Values remain aligned in a bounded trailing column. The document must not require horizontal scrolling.

Desktop may widen the same grammar but must not introduce a separate desktop-only matrix implementation.

## Bounded comparison dimensions

CMP1 uses only the existing canonical data model.

Allowed dimensions, in fixed priority order:

1. price;
2. portion class;
3. meal role;
4. preparation class;
5. shareability;
6. coarse traits;
7. required customization presence.

Availability is shown with Product identity rather than as a scored comparison dimension.

Product description, editorial feature text, optional modifier choices, modifier prices, quantities, totals, and free-text notes are not comparison dimensions in CMP1.

### Price

Price is always shown once the selection contains two or three Products.

Values use the existing `zh-TW` TWD formatter:

```text
NT$320
NT$360
NT$390
```

CMP1 shows exact prices, not:

- cheapest badges;
- best-value claims;
- percentage differences;
- value scores;
- price rankings.

Visible price equality is allowed.

### Required customization

Required customization is derived from canonical modifier-group references using the existing pure rule.

Allowed labels:

```text
有必選項目
無必選項目
```

CMP1 does not show:

- modifier-group names;
- modifier options;
- defaults;
- option prices;
- selection controls.

The dimension appears only when selected Products differ.

## Semantic evidence projection

Semantic comparison uses `resolveProductSemantics()` so category defaults and Product overrides follow the same canonical merge rule already used by menu reading.

Each semantic datum preserves:

```ts
type ComparisonEvidence = Readonly<{
  valueLabel: string | null;
  source: MetadataSource | null;
  confidence: MetadataConfidence | null;
  status: "known" | "low_confidence" | "missing";
}>;
```

Display contract:

### Known

A high- or medium-confidence value shows its normal label.

Source remains available as bounded supporting text:

```text
商家確認
分類預設
```

### Low confidence

A low-confidence value is never presented as ordinary certain evidence.

It shows both the coarse value and its limitation:

```text
一人份 · 低可信
```

### Missing

Missing data shows:

```text
未提供
```

Missing must not be rendered as:

- `否`;
- `不適合`;
- an empty string;
- a dash indistinguishable from equality;
- absence of the Product row.

## Difference-only inclusion rule

CMP1 is not a universal Product specification table.

Price is always included.

A semantic dimension is included only when:

1. at least one selected Product has a value; and
2. selected Products differ in normalized value, or at least one selected Product is missing or low-confidence.

A semantic dimension is omitted when:

- all selected Products are missing that dimension; or
- all selected Products have the same value with high or medium confidence.

Source differences alone do not force a dimension to appear when the value is equal and evidence is not low-confidence.

Required customization appears only when selected Products differ.

If price is the only included dimension, the surface states:

```text
目前資料沒有顯示其他可比較差異。
```

This is not a claim that the Products are identical.

## Labels

CMP1 may establish one small shared semantic-label module because the same domain labels are already needed by menu reading and comparison.

Allowed extraction:

```text
src/customer/menu-semantic-labels.ts
```

It may contain only stable domain label maps and small formatting helpers for:

- meal role;
- portion class;
- preparation class;
- shareability;
- coarse traits;
- metadata source;
- metadata confidence.

It must not become:

- a generic presentation framework;
- a schema registry;
- a plugin system;
- a design-system package;
- a dynamic comparison-field engine.

## Selection summary and announcements

The comparison heading contains one bounded status summary:

```text
尚未選擇 · 最多 3 道
已選 1 / 3 道 · 再選 1 道即可比較
已選 2 / 3 道
已選 3 / 3 道
```

Announcement contract:

- one polite live region on the active comparison surface;
- update only after explicit comparison-selection changes;
- do not reannounce on unrelated menu reading renders;
- do not announce every comparison value automatically;
- fourth-selection rejection uses the same bounded status region;
- Candidate count remains a separate state and is not mutated.

## Focus and keyboard contract

- comparison entry is a native button;
- Back is a native button;
- selector controls are native buttons with `aria-pressed`;
- selector accessible names include Product names;
- selector DOM nodes remain persistent across selection changes;
- toggling keeps focus on the same selector;
- rendering comparison evidence does not steal focus or scroll;
- opening focuses the comparison heading;
- Back restores Candidate-workspace scroll before focus;
- hidden surfaces are inert;
- no row-wide click, swipe, long press, hover-only control, or pointer-only gesture exists.

The Product row itself is not a selector. Only the explicit comparison button changes comparison state.

## Candidate and comparison independence

The following transitions must be formally tested:

```text
Candidate added
→ comparison selection unchanged unless first-open initialization applies

Candidate removed
→ same Product removed from comparison selection
→ other selected Products preserved

comparison Product selected or deselected
→ Candidate membership unchanged

comparison opened or closed
→ menu reading state unchanged
→ active Anchor unchanged
→ semantic axis unchanged

comparison selection cleared below two
→ comparison surface remains open
→ evidence becomes incomplete-selection guidance
```

Comparison state must not reuse Candidate membership as its selected state.

## Empty and incomplete states

### Fewer than two Candidates

The Candidate workspace exposes no interactive comparison entry.

If pure state is externally reduced while comparison is active, the comparison surface remains understandable:

```text
至少需要 2 道考慮項目才能比較。
```

It does not silently navigate away.

### Zero selected Products

```text
選擇 2–3 道考慮項目開始比較。
```

### One selected Product

```text
再選 1 道即可比較。
```

### Two or three selected Products

Render the bounded comparison projection.

## Geometry contract

CMP1 may establish one new Candidate-workspace header baseline by adding the fixed comparison-entry row.

After that baseline is established:

- Candidate counts 0, 1, 2, and 3+ do not move the workspace group start;
- hidden and visible comparison entry states share dimensions;
- selector pressed and unpressed states share dimensions;
- comparison evidence appearance does not move selector controls;
- comparison sections fit 320px and 390px without horizontal overflow;
- value columns remain readable with three selected Products;
- Product names do not overlap values;
- focus outlines remain visible without clipping;
- no fixed footer covers comparison evidence.

Required measurements at 320px and 390px:

- document `scrollWidth` versus viewport width;
- header and comparison-entry geometry across Candidate counts;
- selector row and button geometry across pressed states;
- Product-name wrapping;
- dimension value width;
- comparison block positions;
- focus-outline bounds;
- Back scroll restoration.

## Test-first implementation plan

### New pure domain files

```text
src/customer/candidate-comparison.ts
src/customer/candidate-comparison.test.ts
```

Likely shared label extraction:

```text
src/customer/menu-semantic-labels.ts
```

### New UI file

```text
src/app/candidate-comparison.ts
```

### Expected updates

```text
src/customer/menu-app-state.ts
src/customer/menu-app-state.test.ts
src/customer/menu-reading.ts
src/app/App.ts
src/app/candidate-workspace.ts
src/styles/menu-workspace.css
scripts/menu-workspace-contract.test.mjs
scripts/candidate-comparison-review.test.mjs
package.json
README.md
docs/workstreams.md
docs/candidate-comparison-plan.md
```

The exact file list may become smaller during implementation. It must not expand into Configuration, order, routing, persistence, analytics, or a generic field registry.

## Required failing tests before implementation

### Comparison state

- empty initial state;
- only current Candidates can be selected;
- stale and unknown IDs are rejected or sanitized;
- duplicate IDs cannot exist;
- click order does not change canonical display order;
- selecting a fourth Product is a no-op;
- deselecting remains possible at the three-item limit;
- sold-out Candidates remain valid comparison selections;
- Candidate membership is unchanged by comparison toggles;
- removing a Candidate sanitizes comparison selection;
- re-adding a Candidate does not silently reselect it.

### Opening and surface state

- open is a no-op with fewer than two Candidates;
- first open selects all when exactly two Candidates exist;
- first open selects all when exactly three Candidates exist;
- first open selects none when more than three Candidates exist;
- valid prior selection survives reopen;
- open preserves reading and Candidate references;
- close returns to Candidate surface;
- close preserves comparison selection;
- active Anchor and semantic axis remain unchanged;
- nested menu → Candidate → comparison → Candidate → menu continuity remains valid.

### Projection

- two and three selected Products are supported;
- zero and one selected Product produce no comparison evidence;
- canonical Product references are reused;
- canonical Product order is preserved;
- price always appears and uses TWD formatting;
- equal price remains visible;
- equal complete semantic dimensions are omitted;
- differing semantic values are included;
- missing values are shown as `未提供`;
- low-confidence values retain their value and expose `低可信`;
- category-default source remains distinguishable;
- all-missing dimensions are omitted;
- required customization appears only when it differs;
- trait arrays normalize to deterministic label order;
- sold-out status remains visible;
- no score, winner, rank, recommendation, or price badge is emitted.

### Structure and accessibility

- Candidate rows retain exactly two actions;
- one fixed Candidate-workspace comparison entry exists;
- three sibling `main` surfaces remain mounted;
- exactly one surface is visible and interactive;
- hidden surfaces are inert;
- comparison selectors use stable native `aria-pressed` buttons;
- selection changes do not replace selector DOM nodes;
- one bounded live region exists on the comparison surface;
- no modal, sheet, carousel, wide matrix, fixed footer, or horizontal comparison scroller exists;
- no Decision, quantity, modifier selection, total, cart, checkout, or order action exists;
- no row-wide click or pointer-only gesture exists;
- comparison Back restores exact Candidate-workspace scroll and focus.

### Geometry

- 320px and 390px produce no horizontal overflow;
- pressed state produces no selector geometry difference;
- 0/1/2/3+ Candidate entry states share one header baseline;
- two- and three-Product dimension rows remain readable;
- focus outlines are not clipped;
- rendering comparison evidence does not move the active selector.

## Designer reverse-review tasks

Before any disposition, perform at least these bounded reviews:

1. compare exactly two Candidates from the same category;
2. compare exactly three Candidates from different categories;
3. open comparison with four or more Candidates and explicitly choose a subset;
4. attempt to select a fourth Product;
5. compare equal-price Products;
6. compare Products with different portion classes;
7. compare one missing and one known semantic value;
8. compare one low-confidence and one high-confidence value;
9. compare Products that differ in required customization;
10. include a sold-out existing Candidate;
11. deselect from three to one without leaving the surface;
12. return to Candidate workspace and then to the exact previous menu context;
13. repeat by keyboard at 320px and 390px;
14. inspect whether any control appears to mean order selection or winner selection.

Designer review may establish broken flows, geometry problems, unclear hierarchy, or state collisions.

It is not unfamiliar-participant evidence.

## Pass signals

- comparison contains only current Candidates;
- two or three Products are compared without arbitrary ranking;
- more than three Candidates can coexist without destructive removal;
- comparison selection is visibly distinct from Candidate membership;
- exact price remains visible;
- only bounded differentiating dimensions appear;
- missing and low-confidence evidence is explicit;
- comparison does not name a best Product;
- comparison does not create Decision or transaction state;
- Candidate workspace and menu context survive the round trip;
- selection and Back focus are deterministic;
- 320px and 390px do not require horizontal scrolling;
- Typecheck, tests, contracts, and static build pass.

## Failure signals

- comparison selection is interpreted structurally as order selection;
- Candidate membership changes when a Product is selected for comparison;
- a fourth selection silently replaces another Product;
- the system automatically compares the first or cheapest three out of a larger Candidate set;
- users must remove Candidates to compare a subset;
- comparison becomes an exhaustive specification table;
- missing data appears as a negative Product property;
- low-confidence data looks identical to confirmed data;
- equal complete dimensions create repetitive noise;
- Product order changes by click order, price, score, or recommendation;
- horizontal scrolling is required at the primary mobile viewport;
- Product names and values become unreadably narrow;
- closing comparison loses Candidate-workspace position;
- nested Back loses the prior menu context;
- modifier choices, quantity, total, winner, or order actions leak into CMP1;
- a second Product copy or generic comparison-field registry appears.

## Evidence boundary

A future current-scope disposition may be based on:

- formal state invariants;
- canonical reference and projection tests;
- focus and scroll contracts;
- structure contracts;
- narrow-screen runtime or code-derived geometry evidence;
- designer reverse review;
- passing CI.

It must not claim, without separate participant evidence:

- reduced memory work for unfamiliar users;
- natural comprehension of comparison selection;
- improved decision quality;
- faster decisions;
- conventional-interface superiority;
- real-device usability.

## Implementation gate

```text
[planned, implementation not started] CMP1 — Bounded Candidate comparison
```

Implementation must not begin until this plan receives explicit product-owner approval.

Decision, Configuration, Current order, transaction state, recommendation, and ranking remain blocked regardless of CMP1 plan approval.

## Contract impact

None.

CMP1 refines the comparison surface already anticipated by `docs/product-contract.md`, `docs/interaction-model.md`, `docs/demo-scope.md`, and `docs/evaluation-plan.md`. It does not change Candidate or transaction invariants.
