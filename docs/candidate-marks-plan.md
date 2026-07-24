# Attached Candidate marks plan

## Document status

This document defines the first Candidate implementation slice after Prototype C.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Current sequence:

```text
[passed for current scope] Prototype C — Anchor + explicit shared axis
→ [planned, implementation not started] CND1 — Attached Candidate marks
→ [blocked] Candidate workspace / bounded comparison
→ [blocked] Decision / Configuration / Current order
```

Prototype C was accepted for the current implementation scope by product-owner decision after formal, automated, designer-proxy, focus, and narrow-screen checks. No unfamiliar-participant evidence is claimed.

## Research question

> Can a diner preserve several serious possibilities directly on the canonical menu without mistaking them for an order, losing menu position, or creating a second product list?

This slice investigates reversible consideration only.

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

The repository contract already defines:

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
= which products the diner wants to keep considering
```

Therefore:

- a Product may be neither an Anchor nor a Candidate;
- a Product may be the Anchor but not a Candidate;
- a Product may be a Candidate but not the Anchor;
- a Product may be both the Anchor and a Candidate;
- changing or clearing the Anchor must not change Candidates;
- changing the semantic axis must not change Candidates;
- adding or removing a Candidate must not change the Anchor or axis.

No action automatically converts an Anchor into a Candidate.

## State contract

The Candidate collection belongs to application decision state, not inside the category reading state.

Planned shape:

```ts
type CandidateState = Readonly<{
  productIds: ReadonlyArray<ProductId>;
}>;

type MenuAppState = Readonly<{
  reading: MenuReadingState;
  candidates: CandidateState;
}>;
```

The exact wrapper name may change, but the observable separation may not.

Candidate invariants:

1. membership is keyed only by stable `ProductId`;
2. one Product may appear at most once;
3. only an available Product may be newly added;
4. removing a Candidate never changes Product data or order state;
5. Candidate state survives all menu-reading transitions;
6. Candidate state lasts only for the active client session;
7. Candidate display order is derived from canonical menu order, not insertion order or ranking;
8. no Candidate-specific Product copy is stored.

The first slice does not add `clear all` because bulk removal is not required to test reversible consideration.

## Eligibility and sold-out behavior

### Available Product

An available Product exposes the Candidate toggle.

```text
考慮
↔
考慮中
```

### Sold-out Product

A sold-out Product remains in the canonical menu but cannot be newly marked as a Candidate.

The row keeps the same geometry and presents its sold-out state instead of an enabled Candidate action.

The first demo has static availability. If live availability is introduced later, an existing Candidate must not be silently deleted; that future transition requires an explicit unavailable-state policy.

## Selected layout

The existing four-column ledger remains:

```text
序｜菜名｜閱讀／操作｜價格
```

The third column receives two fixed lanes:

```text
relation lane
candidate lane
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

The Candidate action does not replace or hide:

- ordinary menu cues;
- C price delta;
- C semantic value;
- sold-out state;
- incomplete-data state.

The candidate lane is always reserved for eligible expanded rows, so toggling Candidate state does not move rows or the table.

## Why the third-column lower lane

### Not the name column

At 320 px, the existing fixed index, relation, and price columns already leave a narrow flexible name column. Adding a fixed-width Candidate button beside the name would force unnecessary name wrapping and could alter row height.

### Not the price column

Candidate is not a commercial amount or transaction action. Placing it beside price would encourage cart interpretation and compress the numeric column.

### Not the relation lane

The relation lane is already responsible for ordinary cues, Anchor selection, exact price deltas, and the active semantic axis. Replacing that evidence with Candidate state would make C and Candidate mutually exclusive.

### Not a fifth column

A fifth mobile column would weaken the passed shared-ledger geometry and reduce readable width for product identity or evidence.

## Candidate control

Use one native button per available expanded Product row.

Planned behavior:

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

The off and on states use the same fixed dimensions.

The button remains the same DOM node when toggled so keyboard focus does not move.

Avoid:

- heart icons;
- cart icons;
- bookmark-only icons;
- the words `加入`, `選取`, `已選`, or `點餐` as the primary row action;
- row-wide click;
- swipe or long-press as the only action;
- automatic Candidate creation from Anchor selection.

## Candidate summary

The first slice includes a count and state-boundary explanation, but not a Candidate list.

At the menu heading:

```text
尚無考慮項目 · 不影響點餐
```

or:

```text
考慮中 3 道 · 尚未點餐
```

The summary remains present at a fixed height so `0 → 1` does not shift category geometry.

When the existing sticky menu context is visible, it may append the count to the current orientation text:

```text
準備｜山椒烤雞半隻 · 考慮中 3
```

This remains the existing sticky context, not a second sticky Candidate surface.

The count is informational only in CND1. It must not look clickable before a Candidate workspace exists.

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

Removing a Product from Candidates while it is the Anchor leaves it as the Anchor.

Clearing the Anchor while it is also a Candidate leaves it as a Candidate.

## Canonical-menu integrity

Candidate marks must not:

- reorder products;
- group Candidates at the top;
- hide non-Candidates;
- dim non-Candidates;
- filter categories;
- copy Products into another list;
- change prices or availability;
- add quantity, modifiers, or total;
- create Candidate-specific Product objects;
- change the complete-menu count.

Candidate count is derived from unique valid ProductIds.

## Geometry contract

CND1 may establish one new row baseline by replacing the small status lane with a fixed candidate/action lane.

After that baseline, these transitions must have zero row, table, and scroll geometry differences:

```text
not Candidate → Candidate
Candidate → not Candidate
Candidate + Anchor → Candidate + different Anchor
Candidate + portion → Candidate + preparation
Candidate row → overview → reopen category
```

Measure at 320 px and 390 px:

- row height and top;
- cue-column width;
- product-name wrapping;
- table height;
- category positions;
- scroll position;
- Candidate button dimensions;
- Candidate summary height;
- sticky-context height.

The fixed button labels `考慮` and `考慮中` must not change lane width or row height.

## Accessibility contract

- use native buttons;
- expose Candidate membership with `aria-pressed`;
- include Product name in the accessible action;
- keep focus on the same button after toggling;
- do not add or remove the button DOM node when membership changes;
- keep sold-out rows non-interactive for Candidate addition;
- announce count changes through one bounded polite status region;
- avoid duplicate live announcements from every row;
- preserve C's row-local focus behavior for Anchor selection and Escape;
- preserve visible focus styling;
- do not require pointer gestures.

## Test-first implementation plan

### Candidate domain tests

Add failing tests for:

- adding one available ProductId;
- duplicate add remaining unique;
- removing one ProductId;
- removing a non-member being a no-op;
- rejecting a sold-out Product;
- candidate membership containing no quantity or configuration;
- deriving Candidate products in canonical order;
- ignoring invalid ProductIds in derived display without mutating source state.

### State-transition tests

Add failing tests proving Candidates survive:

- category focus;
- overview;
- all-expanded mode;
- Anchor selection, cancellation, selection, change, and clear;
- semantic-axis changes;
- same-category reopen;
- different-category navigation.

Also prove:

- Candidate toggle does not alter Anchor or axis;
- Anchor changes do not alter Candidate membership;
- a Product may be both Candidate and Anchor;
- removing Candidate membership does not clear Anchor;
- no Candidate operation creates order state.

### Structure tests

Lock:

- four columns only;
- one canonical row per Product;
- one Candidate button per available expanded Product;
- no enabled Candidate button for sold-out rows;
- fixed relation and Candidate lanes;
- one noninteractive Candidate summary;
- no Candidate list, rail, modal, sheet, footer, or copied workspace;
- no quantity, modifier, total, cart, recommendation, or order language;
- no row-wide Candidate click;
- no sorting, filtering, hiding, or dimming.

### Focus and geometry tests

Lock:

- toggle keeps focus on the same button;
- Candidate on/off preserves scroll position;
- Candidate on/off preserves row and table geometry;
- C Anchor focus behavior remains unchanged;
- 320 px and 390 px relation, Candidate, status, and price content fit the fixed lanes.

## Designer reverse-review tasks

Without treating this as unfamiliar-participant evidence:

1. mark two products from different categories;
2. verify both remain marked after changing category;
3. choose one marked Product as C's Anchor;
4. switch C from portion to preparation;
5. remove Candidate membership from the Anchor;
6. confirm the Anchor remains active;
7. clear the Anchor;
8. confirm the other Candidate remains;
9. enter overview and all-expanded mode;
10. confirm Candidate count and row marks remain accurate;
11. attempt to mark a sold-out Product;
12. confirm no quantity, configuration, total, or Current order appears.

## Pass signals

- Candidate membership is visibly attached to canonical rows;
- marking is clearly reversible;
- Candidate and Anchor can coexist without visual or state collision;
- Candidate state survives all C and navigation transitions;
- Candidate count is accurate and explicitly says it is not an order;
- sold-out behavior is clear;
- toggling does not move rows, table, focus, or scroll;
- the full menu remains complete and canonical;
- no transaction state appears.

## Failure signals

- `考慮` is interpreted as ordering or quantity selection;
- Candidate and Anchor appear to be the same state;
- the Candidate action hides C evidence;
- toggling changes row height or product-name wrapping;
- Candidate marks disappear on category or C changes;
- non-Candidates are dimmed, hidden, or reordered;
- the count looks like a cart total or dead clickable workspace;
- sold-out Products can be newly marked;
- implementation introduces a second Product list prematurely;
- Candidate state acquires quantity, configuration, or order totals.

## Planned implementation files

Expected new pure domain module:

```text
src/customer/menu-candidates.ts
src/customer/menu-candidates.test.ts
```

Expected state and UI updates:

```text
src/customer/menu-reading.ts or a small app-state wrapper
src/customer/menu-reading.test.ts
src/app/menu-category.ts
src/app/menu-overview.ts
src/app/App.ts
src/styles/menu-workspace.css
scripts/menu-workspace-contract.test.mjs
package.json
```

Do not add a Candidate workspace module, Candidate comparison module, order module, persistence layer, router, backend, or generic state machine in CND1.

## Current disposition

```text
[planned, implementation not started] CND1 — Attached Candidate marks
```

The plan must be reviewed before implementation. Candidate workspace, bounded comparison, Decision, Configuration, and Current order remain blocked.