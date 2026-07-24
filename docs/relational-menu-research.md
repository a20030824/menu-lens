# Relational menu research

## Document status

This is the exploratory design record for the current Menu Lens menu-reading work.

It records observed failures, the relational hypothesis, the Axis-only implementation, the failed first reverse review, the corrective iteration, and the remaining falsification gate. It is **not** a product-contract change and does not authorize Prototype B, Prototype C, Candidate, Comparison, Decision, Configuration, or order implementation.

Current implementation branch:

```text
agent/menu-map-atlas
```

Current Draft PR:

```text
#4 — Build menu reading workspace
```

Current status:

```text
[passed] M1 compressed overview + shared ledger
→ [rejected] M2 modal product detail
→ [rejected, removed] C1 fixed product focus rail
→ [implemented, awaiting re-review] Prototype A — Axis-only score
→ [blocked] Prototype B — Anchor-only relation
→ [blocked] Prototype C — Combined relational score
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

## Why this record exists

The menu-reading work produced one useful substrate and several failed interaction hypotheses.

```text
large category Atlas
→ rejected: a larger category selector over a conventional list

desktop-first static workspace
→ rejected: meaningful differences disappeared on mobile

M1 compressed overview
→ passed: the restaurant's six-region shape remained visible

M1 product-card expansion
→ rejected: ordinary feed rhythm remained

M1 shared ledger
→ passed as a stable coordinate plane

M2 modal product detail
→ rejected: source-row displacement and conventional single-product reading

C1 fixed product focus rail
→ rejected: severe perceived jumping and no meaningful reduction in linear comparison
```

The failures show that improving the transition into one product is not the same as helping users understand several products together.

## Problem definition

“Linear menu” currently refers to three different problems.

### Navigation linearity

The user must move through categories and products as one long sequence. M1 partly improved this by exposing the complete menu shape before category expansion.

### Comprehension linearity

The user must inspect one product, remember it, inspect another, reconstruct the first, and repeat. This remains the immediate research target.

### Decision linearity

The user moves through a pipeline such as browse → save → comparison page → decide while the original menu stops participating. This remains deferred because relational reading has not yet proved value.

A successful relational prototype should let one interaction expose relationships among several products without moving rows, opening a second product list, or requiring the user to retain the previous product in memory.

## Evidence from the failed detail experiments

The modal detail and fixed rail experiments failed for different visible reasons but shared the same deeper model:

```text
one current product
→ one separate information surface
→ replace it with the next product
```

The rail reduced modal interruption but still represented only one current product, did not preserve prior comparison context, and did not reveal relationships among nearby alternatives.

The scroll-restoration code became compensatory choreography:

```text
measure a row
→ render or close a surface
→ wait for a frame
→ correct scroll
→ restore focus
```

Future prototypes should prefer structures that do not need scroll correction over increasingly complex restoration logic.

## Design principles

### Stable substrate

- canonical row order remains unchanged
- row DOM identity remains unchanged
- column structure and geometry remain unchanged
- interaction does not add inline expansion rows
- no fixed footer, rail, modal, or sheet is required
- no axis-specific scroll restoration is required

### Shared coordinate system

At least one comparison dimension should use a common scale or consistent lane across all products in the category.

### Multiple simultaneous relationships

One interaction must make relationships among at least three products visible at the same time. Without this property, the interface remains a single-product reader.

### Useful evidence, not schema exhibition

A supported metadata field does not automatically deserve a visible mode. A mode should appear only when the current category contains enough products and distinct projected values to reduce product-by-product reading.

### Explicit uncertainty

Missing or low-confidence data remains unknown. It must not become a negative property, false equivalence, recommendation, or inferred fact.

### No hidden recommendation

The prototype must not use or imply:

- best
- recommended
- most suitable
- best value
- closest match
- automatic ranking

### Complete-menu credibility

Changing a reading mode must not make users believe products were filtered out or that the view is a recommendation subset.

## Phase 0 implementation result — remove C1

Status:

```text
[complete]
```

Removed from the primary flow:

- `src/app/product-focus-rail.ts`
- the rejected modal/inspector product-detail UI
- rail imports, creation, rendering, and focus callbacks in `App.ts`
- product-row click and product-focus behavior
- fixed rail DOM composition and all rail CSS
- fixed `8.75rem` rail bottom reservation
- `preserveSourceRow()`
- rail-specific scroll correction and focus restoration
- `focusedProductId` and `detailLevel` from menu-reading state
- C1-only state transitions and tests
- wide-screen detail-inspector workspace column

Retained:

- M1 compressed overview
- category semantic zoom
- shared category ledger
- canonical category and product order
- sold-out and incomplete-metadata status
- the canonical Product and semantic metadata model

The remaining `requestAnimationFrame` use only throttles active-category tracking in all-expanded mode. It does not measure rows, correct scroll, restore focus, or compensate for a rail.

## Prototype A — Axis-only score

Status:

```text
[implemented, awaiting re-review]
```

### Core research question

> Can one stable category ledger expose several product relationships at once, reduce memory work, and preserve complete-menu credibility without sorting, filtering, recommendation, or a second comparison destination?

### Interaction boundary

A single expanded category may show one small native control:

```text
閱讀方式：[一般 ▾]
```

The schema supports:

```text
default
price
portion
meal role
preparation
```

The visible options are category-specific. `一般` is always available. A non-default axis appears only when:

- the category contains at least three products; and
- the axis produces at least two distinct visible states.

Consequences in the current reference menu:

- `個人主餐` offers `一般`, `價格`, and `準備節奏`;
- `分享料理` offers `一般`, `價格`, `份量`, and `準備節奏`;
- meal role is not offered because it merely repeats the category structure row by row;
- the two-item dessert category stays in `一般` because it cannot meet the three-product relational gate.

The eligibility rule changes only the available reading tools. It never changes the canonical collection, row count, or ordering.

### State rules

- overview mode does not show the control
- all-expanded mode uses the default ledger and does not show the control
- entering overview resets the axis to `default`
- entering all-expanded mode resets the axis to `default`
- changing category resets the axis to `default`
- there is no cross-category persistence or URL state

The reading state remains deliberately small:

```ts
type MenuReadingState = {
  activeCategoryId: CategoryId | null;
  expansion: MenuExpansion;
  readingAxis: MenuReadingAxis;
};
```

It contains no product focus, detail, anchor, Candidate, Comparison, configuration, or order state.

### Ledger invariants

All axes use the same table and canonical product rows:

- same product row DOM
- same canonical order and row count
- same four-column structure
- same column widths
- same price column
- same status line
- no detail row or row expansion
- no fixed or sticky footer
- no sorting, filtering, hiding, dimming, or copying products
- no category expansion changes
- no axis animation or scroll compensation

Only the existing relation lane and its heading are updated.

### Projection boundary

Pure projection and useful-axis eligibility live in:

```text
src/customer/menu-relations.ts
src/customer/menu-relations.test.ts
```

The module contains no DOM, state mutation, sorting, filtering, ranking, recommendation, Candidate state, similarity score, or order state.

### Axis rules

#### Default

The M1 cue grammar remains:

- at most two trusted cues
- sold-out and incomplete-data status remain visible
- unsupported and low-confidence cues are omitted rather than guessed

#### Price

- the numeric price remains in the existing price column
- every product in a category uses the same category min–max scale
- the relation lane shows one neutral position marker
- the heading visibly states `低→高`
- the scale does not label products cheap, expensive, high value, or good CP
- if all category prices are identical, every marker uses the same centered safe fallback

#### Portion

Formal values are:

```text
小份
一人份
約 2–3 人
多人分享
未提供
```

#### Meal role

Formal values remain supported by projection:

```text
個人主餐
分享主菜
小食或配菜
飯麵主食
飲品
甜點
未提供
```

The current menu does not expose this as a selectable mode because each category has one uniform role and the repeated labels do not reduce comprehension work.

#### Preparation

Formal coarse values are:

```text
較快
一般準備
需要較久
未提供
```

No exact waiting time or live prediction is shown.

#### Trust and availability

- `high` and `medium` metadata may be projected
- `low` or missing metadata becomes `未提供`
- category defaults remain visible with their existing medium-confidence authority
- sold-out products retain their axis value and canonical position
- unavailable metadata never becomes a negative attribute

The deployed reference menu now includes one low-confidence portion exception for `豆豉蒸鱸魚`. This makes the uncertainty path executable in the actual prototype rather than only in a synthetic test fixture.

## First reverse review — failed

The first internal reverse review deliberately tried to falsify the implementation rather than confirm it.

It found two concrete failures.

### Failure 1 — price mode changed geometry

The text renderer and price microbar participated in different table-cell baseline calculations. At 320 px, switching to price mode increased some row heights by about 12 px and moved later rows by several dozen pixels.

This violated the stable-substrate requirement even though row DOM identity and table columns were unchanged.

### Failure 2 — unknown task was not executable

All deployed portion, role, and preparation values resolved through category defaults or trusted overrides. `未提供` existed only in synthetic unit fixtures, so the Pages checklist asked for evidence the real prototype could not display.

The first reverse review therefore rejected the implementation as not ready for a pass decision.

## Corrective iteration

### Geometry correction

The shared table now uses explicit geometry rules:

- all product cells use `vertical-align: top`
- relation and status lanes reserve fixed block sizes
- relation text inherits the shared relation line height
- the price renderer uses flex centering inside the same line box and has no separate padding or baseline
- axis headings are constrained to one line

A headless measurement was repeated at 390 px and 320 px. Across default, price, portion, role, and preparation renderers, the measured differences are:

```text
row height      0 px
row top         0 px
column width    0 px
header height   0 px
table height    0 px
```

This is a proxy geometry check, not participant evidence.

### Executable uncertainty

The reference menu now contains one available shared dish whose portion value is low confidence. The portion axis displays `未提供` for that row while retaining the row, price, availability, and canonical position.

### Remove non-relational modes from the control

The control no longer exhibits every supported field. `availableReadingAxesFor()` evaluates actual category projections and offers only axes with multi-product differences.

This keeps the experiment focused on comprehension linearity rather than proving that a dropdown can swap labels.

## Automated safeguards

The implementation tests cover:

### State

- initial axis is `default`
- single-category mode can change axis
- overview resets axis
- category changes reset axis
- all-expanded mode cannot retain a non-default axis
- axis changes preserve category expansion
- axis changes do not affect canonical product order
- no anchor, Candidate, Comparison, detail, or order state appears

### Projection and eligibility

- price uses one category min–max scale
- the minimum and maximum products map to scale endpoints
- a single-price category uses a centered safe fallback
- formal portion, role, and preparation labels are correct
- missing and low-confidence metadata render `未提供`
- the deployed reference menu contains real unknown-axis evidence
- a visible non-default axis requires at least three products and at least two distinct values
- redundant uniform role modes are not offered in the current dataset
- sold-out products retain axis evidence and canonical position
- projection output contains no recommendation, best-value, suitability, or CP language

### Geometry contract

A dependency-free script checks the source CSS contract for:

- no mixed baseline alignment
- fixed relation and status line boxes
- price renderer containment inside the shared relation box
- one-line axis headings

The full repository workflow runs typecheck, tests, and static build.

## Re-review gate

Prototype A remains unpassed. Automated checks and designer self-review can reject implementation failures but cannot prove learnability or reduced comprehension work.

Use an unfamiliar participant or an explicitly labeled independent proxy. Do not teach the control.

### Tasks

1. Open `個人主餐` and switch among every available reading mode.
2. Confirm there is no visible row, column, table, or scroll movement.
3. Without reading every numeric price one by one, identify products near the low, middle, and high ends of the shared price scale.
4. Ask what visual evidence supported that answer.
5. Use `準備節奏` to identify several simultaneous differences.
6. Open `分享料理` and use `份量` to identify `多人分享`, `約 2–3 人`, and `未提供`.
7. Ask what `未提供` means without offering interpretations.
8. Confirm no product disappeared, moved, copied, dimmed, or changed order.
9. Ask what the control changes without naming it.
10. Ask whether it reduced remembering and backtracking, not whether it merely looks cleaner.

### Pass signals

- one switch makes at least three products simultaneously comparable
- product detail is not needed for the task
- users answer from visible evidence
- the shared price scale contributes information beyond the existing number column
- missing data is understood as unknown, not negative
- the complete menu remains credible
- no visible row, column, table, or scroll jump occurs
- feedback indicates reduced comprehension work, not only visual polish or convenience

### Failure signals

- the control is understood as a filter, sorter, ranking, selection, or recommendation control
- users still inspect one product at a time
- the shared scale is ignored while users read every number independently
- relation labels are slower to interpret than the original facts
- row content causes orientation loss
- missing metadata produces false conclusions
- the result only resembles a spreadsheet without improving relational reading
- any obvious jump remains

No independent re-review has been recorded, so the status remains `[implemented, awaiting re-review]`.

## Prototype B — Anchor-only relation

Status:

```text
[blocked]
```

Prototype B must not begin from implementation convenience. It requires an explicit disposition of Prototype A after independent re-review. No anchor state, baseline styling, product selection, relative phrases, or anchor tests are present in this implementation.

## Prototype C and later work

Prototype C remains blocked until Axis-only and Anchor-only each produce useful evidence independently. Candidate, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, product network, scatterplot, shared-table composition, and checkout remain blocked.

## Contract impact

None.

The product contract already requires stable full-menu access, separation between browsing and ordering, preserved browsing context, comparison support, and explicit uncertainty for incomplete metadata. Prototype A changes the experimental route used to investigate those requirements, not the requirements themselves.
