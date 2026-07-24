# Relational menu research

## Document status

This document records the completed current-scope relational menu research that produced the accepted Prototype C reading substrate.

It is historical evidence for the accepted CND1 Candidate slice, not authorization to build Comparison, Decision, Configuration, Current order, or checkout.

```text
branch  agent/menu-map-atlas
PR      #4 — Build menu reading workspace
```

Final sequence:

```text
[passed] M1 compressed overview + shared ledger
→ [rejected] M2 modal product detail
→ [rejected, removed] C1 fixed Product focus rail
→ [useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [passed for current scope] Prototype C — Anchor + explicit shared axis
→ [passed for current scope] CND1 — Attached Candidate marks
```

## Core problem

Single-Product detail interactions tend to preserve this loop:

```text
inspect A
→ remember A
→ inspect B
→ reconstruct A
→ repeat
```

The relational work asked whether several Product relationships could remain visible on one stable menu surface without sorting, filtering, recommendation, row movement, or a detached comparison list.

## Stable substrate — M1 shared ledger

M1 established:

- one semantic table per category;
- one canonical row per Product;
- shared sequence, Product-name, evidence, and price columns;
- sold-out and incomplete-data state retained;
- canonical order retained;
- no independent Product cards.

This passed coordinate plane remains the substrate for Prototype C and CND1 Candidate marks.

## Rejected single-Product approaches

### M2 modal detail

The modal moved attention away from the source row and preserved one-Product-at-a-time reading. It did not reduce repeated opening, memory work, or relocation.

### C1 fixed Product focus rail

The fixed rail occupied the viewport, required compensatory scroll and focus choreography, and still represented only one current Product. Its module, state, DOM, CSS, and restoration logic were removed.

## Prototype A — Axis-only score

Disposition:

```text
[useful but insufficient]
```

Useful evidence:

- one shared dimension made several Products simultaneously comparable;
- portion and preparation exposed explicit known and unknown states;
- complete-menu credibility, canonical order, and stable geometry remained.

Insufficient evidence:

- the price scale duplicated the visible numeric price column;
- only one dimension was visible at a time;
- switching axes retained cross-axis remembering.

The obsolete selector UI was removed. The pure projection remains compiled and tested as historical evidence.

## Prototype B — Anchor-only relation

Disposition:

```text
[useful but insufficient]
```

B introduced one temporary category-local Anchor and displayed exact price delta plus at most one automatically selected semantic token.

Useful evidence:

- exact deltas removed repeated arithmetic;
- one temporary Anchor fit the state model;
- canonical rows, statuses, order, and geometry remained stable;
- uncertainty remained explicit.

Decisive failure:

- semantic dimensions varied by row;
- trusted differences were silently suppressed;
- omission was indistinguishable from equality;
- the surface could imply false exclusivity.

With `山椒烤雞半隻` as a slow Anchor, every trusted shared-dish alternative was faster, but B displayed `較快` only for the soft-shell crab because other semantic tokens occupied the remaining rows.

The problem was structural rather than a priority-order bug.

## Prototype C — Anchor + explicit shared axis

Final disposition:

```text
[passed for current scope]
```

C replaced automatic row-level semantic selection with one explicit category-wide axis:

```text
one Anchor
+ exact price delta on every alternative
+ one user-selected 份量 or 準備 axis
```

Every active row answers the same semantic question using a trusted absolute value or `未提供`.

### Truthfulness invariants

For one active axis:

1. every canonical Product remains present;
2. every alternative has one exact price delta;
3. every row answers the same semantic question;
4. trusted values use their formal absolute class;
5. missing or low-confidence values display `未提供`;
6. matching labels expose equality;
7. the Anchor displays its own value;
8. no blank or mixed-dimension active state exists;
9. sold-out state remains independent;
10. no recommendation, ranking, suitability, or score is introduced.

### State and orientation

- changing Anchor preserves the axis;
- clearing Anchor preserves the disabled axis preference;
- overview and all-expanded modes clear Anchor;
- same-category reopening preserves an explicit eligible axis;
- changing category resets to the destination default axis;
- the existing sticky context exposes `axis｜anchor`;
- Candidate and order state remain outside reading state.

### Re-review corrections

Prototype C corrected:

1. same-category reopening resetting an explicit axis;
2. Anchor selection moving focus to an offscreen control;
3. Escape cancellation moving focus offscreen;
4. an obsolete Prototype A selector UI remaining in the application tree.

Current focus behavior:

```text
choose Anchor in row
→ focus chosen row relation

Escape from row selection
→ focus same canonical row

Top Cancel or Clear
→ focus top Anchor control
```

A code-derived Chromium proxy at 320px and 390px reported zero state-change differences for row height, row top, table height, and scroll position, with no relation overflow or horizontal scrolling.

Typecheck, tests, and static build pass.

### Evidence boundary

Prototype C is accepted for the current implementation scope by product-owner decision.

No unfamiliar-participant comprehension, measured task improvement, comfortable real-device readability, or conventional-interface superiority is claimed.

## Handoff to CND1

CND1 attached Candidate membership to canonical rows without changing Prototype C meaning.

```text
Anchor / semantic axis = how Products are read
Candidate              = which Products remain under consideration
```

CND1 is now also accepted for the current scope after its own test-first implementation and final reverse review.

Current CND1 record:

```text
docs/candidate-marks-plan.md
```

## Blocked later work

Passing Prototype C and CND1 does not automatically authorize:

- Candidate workspace or copied Candidate list;
- Candidate comparison;
- Decision;
- Configuration;
- Current order;
- quantity or modifiers;
- totals or submission;
- recommendation, ranking, or filtering;
- shared-table composition;
- checkout.

A separate bounded plan is required before any of those states begin.

## Contract impact

None.

The relational prototype dispositions changed the implementation route, not the invariants in `docs/product-contract.md`.
