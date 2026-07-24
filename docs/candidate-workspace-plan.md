# Candidate review workspace

## Document status

This document records the second bounded Candidate slice after CND1.

```text
branch  agent/menu-map-atlas
PR      #4 — Build menu reading workspace
status  [implemented, awaiting review]
```

Current sequence:

```text
[passed for current scope] Prototype C — Anchor + explicit shared axis
→ [passed for current scope] CND1 — Attached Candidate marks
→ [implemented, awaiting review] CND2 — Candidate review workspace
→ [blocked] Candidate comparison
→ [blocked] Decision / Configuration / Current order
```

CND2 is a separate authorization boundary. It does not automatically authorize comparison or transaction state.

## Research question

> Can a diner retrieve, review, revisit, and dismiss Candidates collected across the canonical menu without losing the previous menu position or mistaking the workspace for an order?

CND2 investigates Candidate retrieval and continuity only.

It does not investigate:

- Candidate comparison;
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

`CandidateState` remains identity-only:

```ts
type CandidateState = Readonly<{
  productIds: ReadonlyArray<ProductId>;
}>;
```

The derived model stores only:

```ts
type CandidateWorkspaceModel = Readonly<{
  groups: ReadonlyArray<{
    category: Category;
    products: ReadonlyArray<Product>;
  }>;
  count: number;
}>;
```

Category and Product values are canonical object references. CND2 stores no Candidate-specific name, price, availability, timestamp, insertion order, manual order, score, comparison selection, quantity, configuration, total, or order state.

## Implemented surface state

CND2 adds one application-level surface state beside reading and Candidate state:

```ts
type MenuSurface =
  | { kind: "menu" }
  | { kind: "candidates" };

type MenuAppState = Readonly<{
  reading: MenuReadingState;
  candidates: CandidateState;
  surface: MenuSurface;
}>;
```

Browser measurements and DOM focus references remain in the App controller rather than pure state:

```ts
type CandidateReturnContext = Readonly<{
  scrollY: number;
  focusElement: HTMLElement | null;
}>;
```

Observable invariants:

1. opening the workspace preserves the complete `MenuReadingState` reference;
2. opening preserves Candidate membership;
3. ordinary Back returns to the same menu mode, category, Anchor, semantic axis, scroll position, and focus origin when that origin remains available;
4. removing the final Candidate falls back to the stable Candidate summary because the workspace entry is then disabled and invisible;
5. no workspace operation creates comparison or transaction state.

## Entry point

The existing Candidate summary remains informational:

```text
考慮中 3 道 · 尚未點餐
```

CND2 adds one adjacent native button:

```text
查看考慮項目
```

Behavior:

- zero Candidates keep the same heading geometry but expose no interactive entry;
- the entry accessible name includes the canonical count;
- the Candidate count remains the only polite live region;
- no second sticky Candidate bar exists;
- no router, URL state, modal, dialog, sheet, rail, overlay, or fixed footer is added.

## Workspace structure

The workspace is one compact document `main` surface:

```text
[ 回到完整菜單 ]

考慮中的 3 道
尚未點餐，可隨時移除或回菜單查看。

共享料理
山椒烤雞半隻                         NT$520
多人分享 · 辣味
[ 在菜單中查看 ] [ 移出考慮 ]
```

Grouping and ordering:

1. categories follow canonical category order;
2. Products follow canonical Product order;
3. empty category groups are omitted;
4. duplicate and stale ProductIds are ignored;
5. rows reuse canonical Product references;
6. Candidate insertion order is not presented or stored.

Allowed row evidence:

- canonical category name;
- Product name;
- current formatted price;
- ordinary primary and secondary cues;
- sold-out status;
- incomplete-data status.

Not present:

- Prototype C Anchor-relative projection;
- a workspace semantic axis;
- side-by-side comparison columns;
- score, rank, recommendation, match percentage, or winner state;
- quantity, modifiers, total, or order language.

## Surface ownership

The canonical menu and Candidate workspace remain mounted as sibling `main` elements.

Only one is visible and interactive at a time:

```text
surface.kind = menu
→ menu visible
→ Candidate workspace hidden + inert

surface.kind = candidates
→ menu hidden + inert
→ Candidate workspace visible
```

The hidden Candidate workspace does not rebuild during unrelated menu-reading renders. Its DOM rerenders only when the `CandidateState` reference changes.

## Ordinary Back

The workspace action is:

```text
回到完整菜單
```

It restores:

- exact previous menu surface;
- previous expansion mode;
- active category;
- active Anchor and semantic axis;
- exact captured `window.scrollY`;
- previous focus origin with `preventScroll`.

After the final Candidate is removed, the original entry becomes disabled and invisible. Back therefore focuses the stable Candidate summary instead of attempting to focus an unavailable button.

Browser Back integration is not part of CND2.

## Locate a canonical Product

Each row exposes:

```text
在菜單中查看
```

Behavior:

1. preserve Candidate membership;
2. close the workspace;
3. use the existing `focusCategory()` transition;
4. reveal the canonical category and row;
5. scroll that existing row into view;
6. focus its existing Candidate toggle;
7. if the Product is sold out and has no Candidate toggle, focus the canonical relation lane;
8. do not open detail, comparison, Decision, or order state.

Cross-category locator behavior therefore inherits existing Anchor reset and destination-axis rules.

## Removal

Each workspace row exposes an explicit non-toggle action:

```text
移出考慮
```

Removal:

- changes only Candidate membership;
- preserves reading state and active surface;
- leaves an active Anchor active even when the same Product is removed from Candidates;
- updates the canonical menu toggle through the shared Candidate state;
- keeps the workspace open after the final removal.

Focus recovery derives from current canonical workspace order:

```text
next remaining removal action
→ otherwise previous remaining removal action
→ otherwise empty-state heading
```

No `clear all` action exists.

## Empty workspace

Removing the final Candidate produces:

```text
尚無考慮項目
你可以回到完整菜單繼續瀏覽。
```

The workspace remains open. It does not silently navigate away.

## Accessibility

Implemented contracts:

- native entry, Back, locator, and removal buttons;
- exactly one visible and interactive `main` surface;
- hidden surface is inert;
- workspace heading is programmatically focusable;
- category groups use real headings;
- Product identity and price remain in the same row;
- locator and removal accessible names include the Product name;
- deterministic removal focus;
- ordinary Back restores scroll before focus;
- final-removal Back has a stable summary fallback;
- sold-out locator has a relation-lane fallback;
- no second Candidate live region;
- no row-wide click, swipe, long press, hover-only action, or pointer-only gesture.

## Geometry contract

The workspace establishes:

```text
full-width compact document rows
two-column Product identity / price line
two equal-width action columns
fixed zero/nonzero Candidate summary row
reserved status line height
```

CSS contracts target 320px and 390px without horizontal scrolling or unpredictable action wrapping.

Runtime Chromium verification was not completed in this execution environment because the container could not resolve GitHub and the pull-request workflow did not publish a downloadable Pages artifact. No real-device or runtime-browser fit claim is made in this disposition.

## Test-first implementation

Added:

```text
src/customer/candidate-workspace.ts
src/customer/candidate-workspace.test.ts
src/app/candidate-workspace.ts
scripts/candidate-workspace-review.test.mjs
```

Updated:

```text
src/customer/menu-app-state.ts
src/customer/menu-app-state.test.ts
src/app/App.ts
src/app/menu-overview.ts
src/app/menu-category.ts
src/styles/menu-workspace.css
scripts/menu-workspace-contract.test.mjs
package.json
```

Automated tests and contracts cover:

- canonical category and Product ordering;
- canonical object reference reuse;
- duplicate and stale ProductId handling;
- empty category omission;
- sold-out Candidate visibility;
- surface open and close continuity;
- reading and Candidate reference preservation;
- explicit removal and active-Anchor independence;
- final-removal empty workspace;
- canonical Product locator transitions;
- one visible and interactive `main`;
- fixed Candidate entry geometry;
- focus and scroll restoration code paths;
- absence of comparison and transaction state.

## Reverse-review corrections

The first implementation passed CI, then narrow reverse review found and corrected:

1. **Final-removal Back focus** — the original entry becomes unavailable after the final Candidate is removed. Back now focuses the stable Candidate summary.
2. **Sold-out locator focus** — sold-out rows have no Candidate toggle. Locator now falls back to the canonical relation lane.
3. **Hidden workspace rebuilds** — unrelated menu renders initially rebuilt the hidden Candidate workspace. Rendering now short-circuits when the Candidate-state reference is unchanged.
4. **Status-lane geometry** — empty status rows initially used the `hidden` attribute. The lane now remains present and reserves geometry without depending on hidden-element CSS behavior.

## CI evidence

The latest implementation head passes:

```text
Typecheck         ✓
Tests             ✓
Static build      ✓
```

The test suite includes the initial red contracts and the later reverse-review contract.

## Current disposition

```text
[implemented, awaiting review] CND2 — Candidate review workspace
```

Known review questions:

- whether an entry available only near the menu heading is sufficient;
- whether the grouped review surface feels like consideration rather than a cart;
- whether the two row actions have acceptable mobile density;
- whether ordinary Back and Product locator are clearly distinguishable;
- whether the current CSS geometry holds in a runtime browser at 320px and 390px;
- whether CND2 is accepted for the current scope.

## Blocked later work

CND2 does not authorize:

- Candidate comparison or comparison matrix;
- explicit Decision;
- Configuration;
- Current order;
- quantity, modifiers, totals, cart, or submission;
- recommendation, ranking, filtering, or shared-table composition;
- backend, persistence, routing, analytics, or checkout.

## Contract impact

None.

CND2 implements a derived Candidate workspace already anticipated by `docs/product-contract.md`, `docs/interaction-model.md`, and `docs/demo-scope.md`. It does not change Candidate or transaction invariants.
