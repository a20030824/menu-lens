# Relational menu research

## Document status

This is the exploratory design record for the current Menu Lens menu-reading work.

It records observed failures, the relational hypothesis, the implemented Axis-only prototype, and its falsification gate. It is **not** a product-contract change and does not authorize Prototype B, Prototype C, Candidate, Comparison, Decision, Configuration, or order implementation.

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
→ [implemented, awaiting review] Prototype A — Axis-only score
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
- secondary evidence in the domain dataset, without a Prototype A product-detail interaction

The remaining `requestAnimationFrame` use only throttles active-category tracking in all-expanded mode. It does not measure rows, correct scroll, restore focus, or compensate for a rail.

## Prototype A implementation result — Axis-only score

Status:

```text
[implemented, awaiting review]
```

### Interaction

A single expanded category shows one small native control:

```text
閱讀方式：[一般 ▾]
```

Options:

```text
一般
價格
份量
餐點角色
準備節奏
```

Rules:

- overview mode does not show the control
- all-expanded mode uses the default ledger and does not show the control
- entering overview resets the axis to `default`
- entering all-expanded mode resets the axis to `default`
- changing category resets the axis to `default`
- there is no cross-category persistence or URL state

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

Only the existing relation lane and its heading are updated. Every value is bounded to one line; the relation lane and status lane reserve stable height.

### Projection boundary

Pure projection lives in:

```text
src/customer/menu-relations.ts
src/customer/menu-relations.test.ts
```

It defines:

```ts
type MenuReadingAxis =
  | "default"
  | "price"
  | "portion"
  | "role"
  | "preparation";
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
- the scale does not label products cheap, expensive, high value, or good CP
- if all category prices are identical, every marker uses the same centered safe fallback and announces that the category prices are the same

#### Portion

Formal domain values are rendered with the existing glossary language:

```text
小份
一人份
約 2–3 人
多人分享
未提供
```

#### Meal role

Formal domain values are rendered without adding new classes:

```text
個人主餐
分享主菜
小食或配菜
飯麵主食
飲品
甜點
未提供
```

#### Preparation

Formal coarse values are rendered as:

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

## State result

The reading state is deliberately small:

```ts
type MenuReadingState = {
  activeCategoryId: CategoryId | null;
  expansion: MenuExpansion;
  readingAxis: MenuReadingAxis;
};
```

It contains no:

- `focusedProductId`
- `detailLevel`
- `anchorProductId`
- `candidateProductIds`
- Comparison state
- configuration or order state

Axis changes preserve the current category expansion and cannot change product or category order.

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

### Projection

- price uses one category min–max scale
- the minimum and maximum products map to the scale endpoints
- a single-price category uses a centered safe fallback
- formal portion, role, and preparation labels are correct
- missing and low-confidence metadata render `未提供`
- sold-out products retain axis evidence and canonical position
- projection output contains no recommendation, best-value, suitability, or CP language

### Structural cleanup

The direct diff and compiled source must contain no primary-flow references to:

- `product-focus-rail`
- `preserveSourceRow`
- `8.75rem` rail reservation
- product focus or detail state
- Candidate, Comparison, or order state

## Pages review gate

Prototype A is deployed from `agent/menu-map-atlas` through the existing Pages workflow into the `github-pages-preview` environment.

Use a phone viewport and run this checklist:

1. Expand one category.
2. Record one row's visible position.
3. Switch among 一般、價格、份量、餐點角色、準備節奏.
4. Confirm row position, column widths, row height, and scroll position do not jump.
5. Identify several lower-priced dishes from the shared scale.
6. Identify products suitable for multiple people.
7. Identify products that may prepare more quickly.
8. Identify products whose relevant information is `未提供`.
9. Confirm no product was hidden, moved, copied, dimmed, or reordered.
10. Ask what the control changes without naming it; confirm it is understood as a reading mode rather than a filter.

Prototype A passes only if all of the following are observed:

- one axis switch makes several rows simultaneously comparable
- product detail is not needed for the task
- users answer from visible evidence
- missing data is understood as unknown, not negative
- the complete menu remains credible
- no visible row, column, or scroll jump occurs
- feedback indicates reduced comprehension work, not only visual polish or ordinary convenience

Prototype A fails if:

- the control is understood as a filter
- users still inspect one product at a time
- the shared scale does not lower comprehension work
- relation-lane changes cause orientation loss
- the result only resembles a spreadsheet without improving decisions
- any obvious jump remains

No participant review has been recorded yet, so the status must remain `[implemented, awaiting review]`.

## Prototype B — Anchor-only relation

Status:

```text
[blocked]
```

Prototype B must not begin from implementation convenience. It requires an explicit disposition of Prototype A after Pages review. No anchor state, baseline styling, product selection, relative phrases, or anchor tests are present in this implementation.

## Prototype C and later work

Prototype C remains blocked until Axis-only and Anchor-only each produce useful evidence independently. Candidate, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, product network, scatterplot, shared-table composition, and checkout remain blocked.

## Measurement and falsification

Promising signals:

- one action reveals several product relationships
- less recall language such as “I think the previous one was…”
- users explain differences using currently visible evidence
- canonical order and complete-menu credibility remain intact
- no visible row jump

Failure signals:

- feedback remains limited to visual polish or ordinary convenience
- users still inspect one product at a time
- the interface creates another list or comparison destination
- relationship labels are slower to interpret than the original facts
- row content changes create perceived jumping
- missing metadata produces false conclusions
- users believe items were filtered, ranked, recommended, or selected

## Contract impact

None.

The product contract already requires stable full-menu access, separation between browsing and ordering, preserved browsing context, comparison support, and explicit uncertainty for incomplete metadata. Prototype A changes the experimental route used to investigate those requirements, not the requirements themselves.
