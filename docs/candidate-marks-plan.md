# Attached Candidate marks

## Document status

This document records the first Candidate implementation slice after Prototype C.

```text
branch  agent/menu-map-atlas
PR      #4 — Build menu reading workspace
status  [passed for current scope]
```

Current sequence:

```text
[passed for current scope] Prototype C — Anchor + explicit shared axis
→ [passed for current scope] CND1 — Attached Candidate marks
→ [implemented, awaiting review] CND2 — Candidate review workspace
→ [blocked] Candidate comparison
→ [blocked] Decision / Configuration / Current order
```

CND1 is accepted after test-first implementation, designer reverse review, accessibility correction, low-entropy cleanup, narrow-screen Chromium proxy checks, and passing CI.

No unfamiliar-participant evidence, measured usability gain, or conventional-interface superiority is claimed or required for this disposition.

## Research question

> Can a diner preserve several serious possibilities directly on the canonical menu without mistaking them for an order, losing menu position, or creating a second Product list?

CND1 investigates reversible consideration only.

It does not authorize Candidate comparison, Decision, Configuration, Current order, quantity, modifiers, totals, submission, ranking, recommendation, or shared-table composition.

## Product boundary

```text
Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound
```

A Candidate contains only stable Product identity and active-session membership.

It has no:

```text
quantity
configuration
modifier selections
order total
submission state
recommendation rank
notes or ownership
```

## Relationship to Prototype C

Prototype C and Candidate are independent dimensions of state.

```text
Anchor / semantic axis = how Products are read
Candidate              = which Products remain under consideration
```

Therefore:

- a Product may be both, either, or neither;
- Anchor actions never create or remove Candidate membership;
- Candidate operations never change Anchor or semantic axis;
- removing Candidate membership from the active Anchor leaves the Anchor active;
- clearing an Anchor leaves Candidate membership intact.

## Implemented state

```ts
type CandidateState = Readonly<{
  productIds: ReadonlyArray<ProductId>;
}>;

type MenuAppState = Readonly<{
  reading: MenuReadingState;
  candidates: CandidateState;
}>;
```

Candidate membership lives beside `MenuReadingState`, not inside it.

Implemented invariants:

1. membership is keyed only by stable `ProductId`;
2. normal operations cannot add the same Product twice;
3. only available Products may be newly marked;
4. removal is reversible and does not affect Product or order state;
5. Candidate state survives every menu-reading transition;
6. summaries count only unique canonical ProductIds;
7. stale invalid IDs do not affect count;
8. no Candidate-specific Product copy is stored;
9. state lasts only for the active client session;
10. no bulk clear action exists in CND1.

## Row-attached interaction

The canonical four-column ledger remains:

```text
序｜菜名｜閱讀／操作｜價格
```

The third column contains two fixed lanes:

```text
relation lane
Candidate / status lane
```

Each available expanded Product row owns one persistent native toggle button.

```text
visible label     考慮
accessible name   考慮「商品名」
aria-pressed      false / true
```

The visible and accessible labels remain stable across state changes. Membership is communicated by `aria-pressed` and pressed styling.

Implementation properties:

- same DOM node before and after toggling;
- focus remains on the same button;
- fixed `3.4rem × 1.35rem` dimensions;
- Product-name typography does not change;
- no row-wide click or pointer-only gesture;
- no heart, cart, or bookmark-only icon;
- no automatic Candidate creation from Anchor selection.

Sold-out Products remain visible but have no enabled Candidate control.

## Candidate summary

CND1 includes one noninteractive fixed-height summary:

```text
尚無考慮項目 · 不影響點餐
```

or:

```text
考慮中 3 道 · 尚未點餐
```

The summary:

- is present before the live region enters the document;
- updates only when Candidate count changes;
- does not reannounce during unrelated category, Anchor, or axis renders;
- is the only polite Candidate-count status region;
- counts unique canonical ProductIds only.

CND1 itself adds no Candidate list or second sticky Candidate surface.

## Continuity

Candidate membership survives:

- overview;
- focused category mode;
- category changes;
- all-expanded mode;
- Anchor begin, cancel, select, change, and clear;
- portion/preparation switching;
- same-category reopening.

Candidate operations do not alter scroll position, Product order, category order, Anchor, axis, price, availability, or transaction state.

## Test-first implementation

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

Automated tests cover:

- add, remove, duplicate-add no-op, and non-member removal no-op;
- sold-out and invalid Product rejection;
- stale and duplicate ID count handling;
- Candidate and Anchor coexistence;
- every reading-state transition;
- persistent Candidate button DOM;
- stable toggle label and accessible name;
- four columns and one canonical Product row;
- fixed relation and Candidate lanes;
- one bounded live status region;
- absence of transaction state.

## Final re-review corrections

The implementation and final re-review found and corrected:

1. **Invalid count input** — stale ProductIds were initially counted; count now includes only canonical ProductIds.
2. **Candidate-dependent typography** — Candidate rows initially increased Product-name weight; this was removed.
3. **Repeated live announcements** — the summary initially rewrote identical text on every render; it now mutates only when count changes.
4. **Invalid toggle naming** — the `aria-pressed` button initially changed visible and accessible labels; both are now stable.
5. **Unused row state mirror** — `data-candidate` duplicated button state without an active consumer; it was removed.
6. **Premature list projection** — a detached Candidate-list projection existed only for tests; it was removed until CND2 had a real consumer.

## Narrow-screen proxy

A code-derived Chromium proxy checked representative CND1 rows at 320px and 390px.

Candidate off/on produced:

```text
row-height difference       0px
row-top difference          0px
table-height difference     0px
button-width difference     0px
button-height difference    0px
lane-width difference       0px
horizontal scrolling        none
```

This is CND1 implementation evidence, not participant evidence or a deployed-device claim.

## Final disposition

```text
[passed for current scope] CND1 — Attached Candidate marks
```

Accepted evidence:

- truthful identity-only Candidate state;
- explicit separation from order state;
- reversible row-attached membership;
- Candidate/Anchor independence;
- continuity across all reading transitions;
- stable focus and DOM identity;
- bounded live announcements;
- stable four-column and narrow-screen geometry;
- sold-out rejection;
- no second Product list in CND1;
- passing Typecheck, tests, and static build.

Known limitations at the CND1 boundary:

- the global count did not identify which collapsed categories contained Candidates;
- CND1 had no Candidate review workspace;
- `考慮` terminology has not been validated with unfamiliar participants;
- no persistence exists beyond the active session.

The first two limitations are now addressed by the separately bounded CND2 implementation record:

```text
docs/candidate-workspace-plan.md
```

CND2 remains awaiting review and does not automatically authorize Candidate comparison, Decision, Configuration, Current order, quantity, modifiers, totals, submission, recommendation, ranking, filtering, shared-table composition, or checkout.

## Contract impact

None.

CND1 implements the existing Candidate invariant without changing `docs/product-contract.md`.
