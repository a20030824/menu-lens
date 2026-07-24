# Attached Candidate marks

## Document status

This document defines and records the first Candidate implementation slice after Prototype C.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Current sequence:

```text
[passed for current scope] Prototype C — Anchor + explicit shared axis
→ [implemented, awaiting review] CND1 — Attached Candidate marks
→ [blocked] Candidate workspace / bounded comparison
→ [blocked] Decision / Configuration / Current order
```

Prototype C was accepted for the current implementation scope by product-owner decision. No unfamiliar-participant evidence is claimed or required as a gate for this slice.

## Research question

> Can a diner preserve several serious possibilities directly on the canonical menu without mistaking them for an order, losing menu position, or creating a second Product list?

CND1 investigates reversible consideration only.

It does not investigate:

- Candidate workspace navigation;
- comparison generated from Candidates;
- deciding to order;
- quantity or modifiers;
- Current order;
- submitted rounds;
- shared-table composition;
- recommendation or ranking.

## Product boundary

The repository contract defines:

```text
Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound
```

A Candidate is only a stable `ProductId` under active-session consideration.

It has:

```text
product identity
candidate membership
```

It does not have:

```text
quantity
configuration
modifier selections
order total contribution
submission state
recommendation rank
notes or ownership
```

## Relationship to Prototype C

Prototype C and Candidate are independent dimensions of state.

```text
Anchor / semantic axis
= how the diner reads differences

Candidate
= which Products the diner wants to keep considering
```

Therefore:

- a Product may be neither an Anchor nor a Candidate;
- a Product may be the Anchor but not a Candidate;
- a Product may be a Candidate but not the Anchor;
- a Product may be both the Anchor and a Candidate;
- changing or clearing the Anchor does not change Candidates;
- changing the semantic axis does not change Candidates;
- adding or removing a Candidate does not change the Anchor or axis;
- no action automatically converts an Anchor into a Candidate.

## Implemented state contract

Candidate membership lives beside reading state rather than inside `MenuReadingState`.

```ts
type CandidateState = Readonly<{
  productIds: ReadonlyArray<ProductId>;
}>;

type MenuAppState = Readonly<{
  reading: MenuReadingState;
  candidates: CandidateState;
}>;
```

Implemented Candidate invariants:

1. membership is keyed only by stable `ProductId`;
2. one Product may appear at most once through normal operations;
3. only an available Product may be newly added;
4. removing a Candidate never changes Product data or order state;
5. Candidate state survives all menu-reading transitions;
6. Candidate state lasts only for the active client session;
7. Candidate display order derives from canonical menu order;
8. no Candidate-specific Product copy is stored;
9. summaries count only unique canonical ProductIds;
10. stale invalid ProductIds are ignored by derived display and count.

The slice does not add `clear all`.

## Eligibility and sold-out behavior

### Available Product

An available Product exposes one Candidate toggle:

```text
考慮
↔
考慮中
```

### Sold-out Product

A sold-out Product remains in the canonical menu but has no enabled Candidate action.

The row preserves the same lower-lane geometry and displays its sold-out state.

The current reference menu has static availability. A future live-availability transition would need an explicit policy and must not silently delete an existing Candidate.

## Implemented layout

The existing four-column ledger remains:

```text
序｜菜名｜閱讀／操作｜價格
```

The third column now has two fixed lanes:

```text
relation lane
candidate / status lane
```

Example without an active Anchor:

```text
01  山椒烤雞半隻       多人分享 · 辣味         NT$520
                         [ 考慮 ]
```

Example with Prototype C active:

```text
01  山椒烤雞半隻       基準 · 多人             NT$520
                         [ 考慮中 ]

02  紹興奶油蝦         少 NT$40 · 2–3 人       NT$480
                         [ 考慮 ]
```

Candidate state does not replace or hide:

- ordinary menu cues;
- C price delta;
- C semantic value;
- sold-out state;
- incomplete-data state.

The lower lane is reserved on every expanded row, so toggling Candidate membership does not move the row or table.

## Why the lower third-column lane

### Not the name column

At 320 px, adding a fixed Candidate control beside the Product name would reduce the flexible name width and could alter wrapping.

### Not the price column

Candidate is not a commercial amount or transaction action. Placing it beside price would encourage cart interpretation and compress the numeric column.

### Not the relation lane

The relation lane already contains ordinary cues, Anchor selection, exact price deltas, and the active semantic axis. Candidate must coexist with that evidence.

### Not a fifth column

A fifth mobile column would weaken the passed ledger geometry.

## Candidate control

Each available expanded Product row owns one persistent native button.

```text
not a Candidate
visible text: 考慮
aria-pressed: false
accessible action: 將「商品名」列入考慮

Candidate
visible text: 考慮中
aria-pressed: true
accessible action: 將「商品名」移出考慮
```

Implementation properties:

- off and on states use the same `3.4rem × 1.35rem` dimensions;
- the same DOM node remains after toggling;
- keyboard focus remains on that button;
- visible state uses text and border/background treatment;
- Product-name typography does not change with Candidate membership;
- there is no heart, cart, bookmark-only icon, row-wide click, swipe-only action, or automatic Candidate creation from Anchor selection.

## Candidate summary

CND1 includes one count and state-boundary explanation, not a Candidate list.

```text
尚無考慮項目 · 不影響點餐
```

or:

```text
考慮中 3 道 · 尚未點餐
```

The summary:

- uses one fixed-height `1.5rem` line;
- is noninteractive;
- is the only polite live status region for Candidate count changes;
- counts unique canonical ProductIds only.

The existing sticky menu context may append:

```text
準備｜山椒烤雞半隻 · 考慮中 3
```

No second sticky Candidate surface exists.

## Interaction boundaries

Candidate state survives:

- menu overview;
- focused category mode;
- all-expanded mode;
- category changes;
- beginning or cancelling Anchor selection;
- choosing, changing, or clearing an Anchor;
- switching between portion and preparation;
- returning to the same category.

Candidate state changes only through:

```text
explicit row toggle
or
active-session reset / reload
```

Removing Candidate membership from the active Anchor leaves the Anchor active.

Clearing an Anchor that is also a Candidate leaves Candidate membership intact.

## Canonical-menu integrity

Candidate marks do not:

- reorder Products;
- group Candidates at the top;
- hide or dim non-Candidates;
- filter categories;
- copy Products into another list;
- change prices or availability;
- add quantity, modifiers, total, or submission state;
- create Candidate-specific Product objects;
- change the complete-menu Product count.

## Geometry contract

CND1 establishes one new row baseline:

```text
relation lane       1.55rem
Candidate lane      1.55rem
Candidate button    3.4rem × 1.35rem
Candidate summary   1.5rem
```

After that baseline, these transitions are structurally geometry-invariant:

```text
not Candidate → Candidate
Candidate → not Candidate
Candidate + Anchor → Candidate + different Anchor
Candidate + portion → Candidate + preparation
Candidate row → overview → reopen category
```

The contract prevents Candidate-dependent Product-name font metrics, width changes, row-wide styling, and dynamic button replacement.

The current code keeps the existing mobile cue column at `7.2rem`. The button plus `資訊有限` status fits inside the padded cue column at the current font sizes.

This is structural implementation evidence. No additional real-device or unfamiliar-participant claim is made.

## Accessibility contract

Implemented behavior:

- native buttons;
- Candidate membership exposed through `aria-pressed`;
- Product name included in the accessible action;
- focus remains on the same button after toggling;
- the button DOM node is never replaced by Candidate rendering;
- sold-out rows have no Candidate-add button;
- one bounded polite status region announces count changes;
- C's row-local focus behavior for Anchor selection and Escape remains unchanged;
- visible focus styling remains browser-accessible;
- no pointer-only gesture is required.

## Test-first implementation record

Implementation began with missing-module tests for Candidate domain and app-state contracts.

Added:

```text
src/customer/menu-candidates.ts
src/customer/menu-candidates.test.ts
src/customer/menu-app-state.ts
src/customer/menu-app-state.test.ts
```

Updated:

```text
src/app/App.ts
src/app/menu-overview.ts
src/app/menu-category.ts
src/styles/menu-workspace.css
scripts/menu-workspace-contract.test.mjs
package.json
```

No `MenuReadingState` Candidate field was added. The app wrapper preserves the separation.

## Automated validation

### Candidate domain

Tests cover:

- empty identity-only state;
- add and remove;
- duplicate-add no-op;
- non-member removal no-op;
- sold-out and invalid add rejection;
- toggle behavior;
- canonical derived Product order;
- reuse of canonical Product objects;
- stale and duplicate ID handling;
- unique canonical count;
- absence of quantity, configuration, total, order, and ranking fields.

### App-state continuity

Tests prove Candidate membership survives:

- category focus and changes;
- overview;
- all-expanded mode;
- Anchor begin, cancel, select, change, and clear;
- semantic-axis switching;
- same-category reopen.

Tests also prove:

- Candidate toggling preserves reading-state identity;
- a Product may be Candidate and Anchor simultaneously;
- removing Candidate membership does not clear Anchor;
- clearing Anchor does not restore removed membership or remove remaining Candidates;
- CND1 adds no Comparison, Decision, Configuration, quantity, total, Current order, or submitted state.

### Structure and focus

The static contract locks:

- four columns and one canonical row per Product;
- persistent Candidate buttons;
- `aria-pressed` updates on the same DOM node;
- fixed relation and Candidate lanes;
- fixed noninteractive summary;
- no Candidate-dependent Product-name typography;
- one sticky context only;
- no Candidate list, workspace, rail, modal, sheet, or fixed Candidate footer;
- no row-wide Candidate click;
- preservation of Prototype C focus contracts.

Required CI passes:

```text
Typecheck         ✓
Tests             ✓
Static build      ✓
```

## Designer reverse review

### Cross-category continuity

Two Candidate ProductIds from different categories remain in one app-level Candidate state while reading state changes.

Result:

```text
PASS — automated state evidence
```

### Candidate and Anchor coexistence

A Product can become both Candidate and Anchor. Removing Candidate membership leaves the Anchor active. Clearing the Anchor leaves other Candidate membership intact.

Result:

```text
PASS — automated state evidence
```

### Sold-out boundary

Domain operations reject newly adding a sold-out Product, and sold-out rows have no enabled Candidate button.

Result:

```text
PASS — domain and structure evidence
```

### Focus continuity

Candidate toggling updates the existing button rather than replacing it. No focus-moving code runs in the Candidate callback.

Result:

```text
PASS — structural focus evidence
```

### Geometry correction

The first UI version made Candidate Product names heavier. That could change glyph width and line wrapping at 320 px. The style was removed and a contract now forbids Candidate-dependent Product-name metrics.

Result:

```text
CORRECTED
```

### Count correction

The first summary helper counted unique state IDs without confirming they existed in the canonical menu. It now counts only unique canonical ProductIds, and stale IDs are ignored.

Result:

```text
CORRECTED
```

### Transaction boundary

No Candidate list, quantity, configuration, total, Current order, submission, recommendation, or ranking state exists.

Result:

```text
PASS — formal and structure evidence
```

## Remaining product questions

Product-owner review should decide:

- whether `考慮` is the retained visible term;
- whether the noninteractive count provides enough orientation;
- whether the additional row lane is an acceptable density cost;
- whether CND1 is accepted for the current scope;
- only after acceptance, which bounded next slice should be planned.

These questions do not authorize Candidate workspace or Comparison automatically.

## Current disposition

```text
[implemented, awaiting review] CND1 — Attached Candidate marks
```

This review gate is a product-owner disposition, not a required unfamiliar-participant study.

Candidate workspace, bounded comparison, Decision, Configuration, Current order, quantity, modifiers, totals, and submission remain blocked.
