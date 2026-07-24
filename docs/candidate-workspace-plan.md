# Candidate review workspace plan

## Document status

This document defines the next bounded Candidate slice after CND1.

```text
branch  agent/menu-map-atlas
PR      #4 — Build menu reading workspace
status  [planned, implementation not started]
```

Current sequence:

```text
[passed for current scope] Prototype C — Anchor + explicit shared axis
→ [passed for current scope] CND1 — Attached Candidate marks
→ [planned, implementation not started] CND2 — Candidate review workspace
→ [blocked] Candidate comparison
→ [blocked] Decision / Configuration / Current order
```

CND2 is a separate authorization boundary. Passing CND1 did not automatically authorize a Candidate workspace.

## Why CND2 comes before comparison

The product contract requires Candidate and order state to remain distinct, and the interaction model says comparison is generated from Candidates.

CND1 already proves that reversible Candidate membership can attach to canonical Product rows. It intentionally leaves two limitations:

- the global count does not identify which collapsed categories contain Candidates;
- there is no place to review several cross-category Candidates together.

Comparison should not be added before the Candidate collection itself has a coherent retrieval, review, removal, and return path.

CND2 therefore asks whether a small derived workspace can make the existing Candidate collection usable without becoming a cart, recommendation list, or second Product source of truth.

## Research question

> Can a diner retrieve, review, revisit, and dismiss Candidates collected across the canonical menu without losing the previous menu position or mistaking the workspace for an order?

CND2 investigates Candidate retrieval and continuity only.

It does not investigate:

- comparison;
- ranking or recommendation;
- selecting a winner;
- explicit Decision;
- quantity or modifiers;
- Configuration;
- Current order;
- totals or submission;
- shared-table composition.

## Product boundary

```text
canonical Products
+ Candidate ProductId membership
→ derived Candidate review view
```

The workspace is a view over the canonical menu, not another maintained catalog.

It may derive:

- canonical Product references;
- canonical category grouping;
- canonical Product order;
- current price, availability, and metadata-completeness labels.

It must not store:

- copied Product objects;
- Candidate-specific names, prices, or availability;
- insertion timestamps;
- manual Candidate order;
- comparison selections;
- quantity, configuration, total, or order state.

`CandidateState` remains identity-only:

```ts
type CandidateState = Readonly<{
  productIds: ReadonlyArray<ProductId>;
}>;
```

## Surface and return-context boundary

CND2 may add one application-level surface state beside reading and Candidate state.

Observable shape:

```ts
type MenuSurface =
  | { kind: "menu" }
  | {
      kind: "candidates";
      returnContext: {
        scrollY: number;
        focusedProductId: ProductId | null;
      };
    };

type MenuAppState = Readonly<{
  reading: MenuReadingState;
  candidates: CandidateState;
  surface: MenuSurface;
}>;
```

The exact implementation may keep browser measurements in a small controller rather than the pure domain state. The observable contract may not change:

1. opening the workspace preserves the complete `MenuReadingState`;
2. ordinary Back returns to the same menu mode, category, Anchor, semantic axis, scroll position, and focus origin;
3. Candidate membership remains unchanged unless the user explicitly removes a Candidate;
4. no workspace action creates comparison, Decision, Configuration, or order state.

## Entry point

CND1's heading summary currently says:

```text
考慮中 3 道 · 尚未點餐
```

CND2 adds one explicit adjacent action when the canonical Candidate count is greater than zero:

```text
[ 查看考慮項目 ]
```

Requirements:

- the count remains informational and continues to state the non-order boundary;
- the entry action is a native button;
- accessible name includes the count, for example `查看 3 道考慮項目`;
- zero Candidates expose no enabled workspace entry;
- the heading area establishes one fixed geometry for zero and nonzero states;
- no second sticky Candidate bar is introduced;
- the existing sticky `菜單全貌` action remains the path back to the heading when the diner is deep in the menu.

The first CND2 slice does not add a second Candidate entry inside the sticky context. That mobile-width decision remains separate.

## Opening behavior

When the entry action is activated:

1. capture the current menu scroll position and focus origin;
2. preserve `MenuReadingState` and `CandidateState` unchanged;
3. keep the menu surface mounted but hidden and inert;
4. reveal the Candidate workspace as the only active `main` content;
5. move focus to the workspace heading with `preventScroll` where supported;
6. begin the workspace at its top.

The workspace is not a modal, dialog, bottom sheet, side rail, overlay, or fixed footer.

## Workspace structure

The workspace uses one compact document view:

```text
[ 回到完整菜單 ]

考慮中的 3 道
尚未點餐，可隨時移除或回菜單查看

共享料理
山椒烤雞半隻                         NT$520
多人分享 · 辣味
[ 在菜單中查看 ]  [ 移出考慮 ]

紹興奶油蝦                           NT$480
2–3 人 · 資訊有限
[ 在菜單中查看 ]  [ 移出考慮 ]

甜點
黑糖豆花                             NT$120
[ 在菜單中查看 ]  [ 移出考慮 ]
```

Grouping and ordering:

1. categories follow canonical category order;
2. Products follow canonical Product order within each category;
3. empty category groups are omitted;
4. stale and duplicate ProductIds are ignored;
5. rows reuse canonical Product values at render time;
6. no Candidate is promoted because it was added earlier, later, or more recently.

## Candidate row evidence

The review workspace displays enough evidence to identify a Product without becoming a comparison matrix.

Allowed:

- canonical category name;
- Product name;
- current price;
- ordinary primary and secondary cues when present;
- sold-out label;
- incomplete-data label.

Not allowed:

- Prototype C Anchor-relative deltas;
- a workspace-wide semantic axis;
- side-by-side attribute columns;
- recommendation reason;
- score, rank, match percentage, or winner state;
- quantity, modifiers, total, or order language.

Prototype C remains a category-local reading tool on the canonical menu. CND2 does not reproduce C inside the Candidate workspace.

## Return to the previous menu context

The top action is:

```text
回到完整菜單
```

It restores:

- the exact prior menu expansion mode;
- active category;
- active Anchor and semantic axis;
- prior scroll position;
- focus to the workspace entry action without changing scroll.

Back does not:

- clear Candidates;
- reset Prototype C;
- focus the first Candidate;
- reorder or expand categories;
- scroll to the menu top.

Browser Back integration is not required in CND2. The first slice uses one explicit in-app return action and does not add routing or URL state.

## Return to a specific canonical Product

Each Candidate row may expose:

```text
在菜單中查看
```

This is purposeful navigation rather than ordinary Back.

Behavior:

1. preserve all Candidate membership;
2. close the Candidate workspace;
3. focus the Product's canonical category using the existing menu-reading transition;
4. reveal and scroll the canonical Product row into view;
5. move focus to that row's Candidate toggle or relation target;
6. do not open detail, start comparison, or create an order item.

If the Product belongs to the currently focused category, the current eligible semantic-axis preference remains. If it belongs to another category, existing category-focus rules apply, including clearing the old Anchor and using the destination category's eligible default axis.

The implementation must reuse current reading transitions rather than inventing a second category-navigation rule.

## Removal behavior

Candidate workspace removal uses an explicit action:

```text
移出考慮
```

It is not an `aria-pressed` toggle because the row is removed from the workspace after activation.

Requirements:

- removing a Candidate does not alter reading state;
- removing the active Anchor's Candidate membership leaves the Anchor active;
- the canonical menu row remains present and its attached Candidate toggle becomes unpressed;
- focus moves to the next remaining row's removal action;
- when the removed row was last, focus moves to the previous remaining row;
- when no Candidates remain, focus moves to the empty-state heading;
- the workspace never closes automatically after removal;
- removal never affects DraftOrderItem, ConfiguredOrderItem, submitted state, or totals.

## Empty workspace

Removing the final Candidate produces an in-place empty state:

```text
尚無考慮項目
你可以回到完整菜單繼續瀏覽。

[ 回到完整菜單 ]
```

The workspace remains open so the state change is understandable and reversible through the menu. It does not silently navigate away.

No `clear all` action is added in CND2.

## Accessibility contract

- exactly one visible `main` surface exists at a time;
- the hidden menu surface is inert while the workspace is active;
- the workspace has one programmatically focusable heading;
- category groups use real headings;
- Product names and prices remain associated within each row;
- `在菜單中查看` includes the Product name in its accessible name;
- `移出考慮` includes the Product name in its accessible name;
- removal focus recovery is deterministic;
- ordinary Back restores the prior focus origin without moving the restored scroll position;
- the workspace does not add a second Candidate-count live region;
- no action depends on swipe, long press, hover, or row-wide click.

## Geometry contract

Primary checks at 320px and 390px:

- no horizontal scrolling;
- Product name and price remain readable without overlap;
- the two row actions do not wrap unpredictably between Candidate rows;
- category headings do not become cards or detached panels;
- empty and populated workspace headers share a stable baseline;
- opening and closing the workspace restores the exact menu scroll position;
- removing a row moves later rows only by the removed row's height;
- focus recovery does not cause an additional unexpected scroll jump.

The workspace may establish its own compact row geometry. It must not alter the hidden canonical menu's row geometry.

## Test-first implementation gate

### Derived-view tests

Add failing tests for:

- deriving canonical Product references from Candidate ProductIds;
- canonical category and Product ordering;
- duplicate and stale ProductId handling;
- empty category omission;
- sold-out Candidate visibility if an existing Candidate later becomes unavailable;
- no Candidate-specific Product copy;
- absence of score, rank, quantity, configuration, total, or order fields.

The previously removed `candidateProducts()` projection may return only when this real workspace consumes it.

### Surface-state tests

Add failing tests proving:

- workspace open preserves reading and Candidate references;
- ordinary Back restores the previous surface and context;
- Candidate removal preserves reading state;
- removing the active Anchor's Candidate membership preserves the Anchor;
- empty state remains in the workspace;
- `在菜單中查看` uses existing category-focus rules;
- no operation creates comparison or transaction state.

### Structure tests

Lock:

- one canonical menu surface and one derived Candidate workspace surface;
- only one is active and interactive at a time;
- no modal, dialog, rail, sheet, overlay, or fixed Candidate footer;
- one explicit workspace entry;
- one canonical-category group per represented category;
- no copied Product dataset;
- no sorting, ranking, filtering controls, comparison matrix, quantity, modifiers, totals, cart, or order language;
- no row-wide click.

### Focus and scroll tests

Lock:

- entry captures return focus and scroll;
- workspace heading receives focus on open;
- ordinary Back restores focus and exact scroll;
- Product locator focuses the canonical row;
- removal focuses next, previous, or empty-state target deterministically;
- removing a row does not focus `body` or a detached node.

### Narrow-screen checks

At 320px and 390px verify:

- populated and empty workspace headers;
- longest Product names and prices;
- two-action rows;
- sold-out and incomplete-data labels;
- no horizontal scrolling;
- no clipped focus rings;
- stable return to the hidden menu geometry.

## Pass signals

- Candidates from several categories are visible in one truthful derived view;
- the workspace is understood structurally as review, not order state;
- category and Product order remain canonical;
- removal is explicit and leaves the menu and order state untouched;
- ordinary Back restores the previous menu context exactly;
- Product locator returns to the correct canonical row;
- the workspace contains no comparison or transaction mechanics;
- 320px and 390px layouts remain usable without horizontal scrolling;
- Typecheck, tests, structure contracts, and static build pass.

## Failure signals

- the workspace resembles a cart or order summary;
- Candidate rows acquire quantity, modifiers, totals, or checkout language;
- Products are copied or become stale relative to the canonical menu;
- order depends on Candidate insertion time or ranking;
- returning loses the prior category, Anchor, axis, scroll, or focus;
- removing a Candidate unexpectedly closes the workspace;
- Product locator opens detail, comparison, or order state;
- the workspace hides its relationship to the complete menu;
- mobile actions overflow, wrap inconsistently, or cause horizontal scrolling;
- a comparison control appears before a bounded comparison plan exists.

## Expected implementation files

Expected new modules:

```text
src/customer/candidate-workspace.ts
src/customer/candidate-workspace.test.ts
src/app/candidate-workspace.ts
```

Expected updates:

```text
src/customer/menu-app-state.ts
src/customer/menu-app-state.test.ts
src/app/App.ts
src/app/menu-overview.ts
src/styles/menu-workspace.css
scripts/menu-workspace-contract.test.mjs
package.json
```

Do not add:

- router or URL state;
- backend or persistence;
- generic navigation state machine;
- Candidate comparison module;
- Decision, Configuration, Current order, or submission modules;
- copied Candidate Product storage;
- analytics infrastructure.

## Current disposition

```text
[planned, implementation not started] CND2 — Candidate review workspace
```

The plan must be reviewed before implementation.

Candidate comparison, Decision, Configuration, Current order, quantity, modifiers, totals, submission, recommendation, ranking, filtering, and shared-table composition remain blocked.

## Contract impact

None.

CND2 authorizes a derived Candidate view already anticipated by `docs/product-contract.md`, `docs/interaction-model.md`, and `docs/demo-scope.md`. It does not change Candidate or transaction invariants.