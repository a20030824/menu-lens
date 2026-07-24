# Relational menu research

## Document status

This document records the completed current-scope relational menu research that produced the accepted Prototype C reading substrate.

It is historical evidence for the active Candidate workstream, not authorization to build Comparison, Decision, Configuration, Current order, or checkout.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Final sequence:

```text
[passed] M1 compressed overview + shared ledger
→ [rejected] M2 modal product detail
→ [rejected, removed] C1 fixed product focus rail
→ [useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [passed for current scope] Prototype C — Anchor + explicit shared axis
→ [planned] CND1 — Attached Candidate marks
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

This passed coordinate plane remains the substrate for CND1 Candidate marks.

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

- one shared preparation axis made several Products simultaneously comparable;
- portion exposed known classes and explicit unknown;
- complete-menu credibility, canonical order, and stable geometry remained.

Insufficient evidence:

- the price scale duplicated the visible numeric price column;
- only one dimension was visible at a time;
- switching axes retained cross-axis remembering.

The obsolete A selector UI was removed from the active application tree. Its pure projection remains compiled and tested as historical evidence.

## Prototype B — Anchor-only relation

Disposition:

```text
[useful but insufficient]
```

B introduced one temporary category-local Anchor and displayed:

```text
exact price delta
+ at most one automatically selected semantic token
```

Useful evidence:

- exact deltas removed repeated arithmetic;
- one temporary Anchor fit the state model;
- canonical rows, statuses, order, and geometry remained stable;
- unknown remained explicit;
- no Candidate, recommendation, ranking, or transaction state appeared.

### Decisive semantic failure

With `山椒烤雞半隻` as a slow Anchor, every trusted shared-dish alternative is faster:

```text
anchor                  慢
紹興奶油蝦             一般
蒜酥椒鹽軟殼蟹         快
豆豉蒸鱸魚             一般
宮保杏鮑菇             一般
季節時蔬豆腐煲         一般
```

B displayed `較快` only for the soft-shell crab because portion or uncertainty occupied the other rows.

The crab was the strongest faster class, not the only faster Product.

This proved that the problem was structural rather than a priority-order bug:

- semantic dimensions varied by row;
- trusted differences were silently suppressed;
- omission was indistinguishable from equality;
- the surface could imply false exclusivity.

## Prototype C — Anchor + explicit shared axis

Final disposition:

```text
[passed for current scope]
```

C tested:

> Can one temporary Anchor preserve exact price deltas while one explicit category-wide semantic axis keeps every row answering the same question, so no trusted difference is silently suppressed?

### Implemented correction

```text
Prototype B
price delta + row-selected semantic dimension

Prototype C
price delta + user-selected category-wide semantic axis
```

The user explicitly selects `份量` or `準備`. Every row displays the same active axis using a trusted absolute value or `未提供`.

### Portion mode

```text
山椒烤雞半隻           基準 · 多人            NT$520
紹興奶油蝦             少 NT$40 · 2–3 人      NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 2–3 人      NT$460
豆豉蒸鱸魚             多 NT$40 · 未提供      NT$560
宮保杏鮑菇             少 NT$180 · 2–3 人     NT$340
季節時蔬豆腐煲         少 NT$140 · 2–3 人     NT$380
```

### Preparation mode

```text
山椒烤雞半隻           基準 · 慢              NT$520
紹興奶油蝦             少 NT$40 · 一般        NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 快          NT$460
豆豉蒸鱸魚             多 NT$40 · 一般        NT$560
宮保杏鮑菇             少 NT$180 · 一般       NT$340
季節時蔬豆腐煲         少 NT$140 · 一般       NT$380
```

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
- no Candidate or order state is stored in reading state.

### Re-review corrections

The C re-review found and corrected:

1. same-category reopening incorrectly reset an explicit axis;
2. choosing an Anchor in a row moved focus to an offscreen top control;
3. pressing Escape from a row had the same offscreen-focus problem.

Current focus behavior:

```text
choose Anchor in row
→ focus chosen row relation

Escape from row selection
→ focus same canonical row

Top Cancel or Clear
→ focus top Anchor control
```

The relation lane uses `tabIndex=-1`, receives the complete accessible phrase, and does not add a normal Tab stop.

### Geometry and build evidence

A code-derived Chromium proxy at 320 px and 390 px found:

```text
row-height difference       0px
row-top difference          0px
table-height difference     0px
fixture relation overflow   none
horizontal scrolling        none
```

The branch passes:

```text
Typecheck
Tests
Static build
```

### Final evidence boundary

C is accepted for the current implementation scope by product-owner decision after formal, automated, designer-proxy, focus, and narrow-screen checks.

No unfamiliar-participant evidence, proven learnability, measured task improvement, or conventional-interface superiority is claimed.

The cancelled unfamiliar-user gate is no longer a blocker. Previously listed comprehension and mobile-comfort risks remain recorded as known limitations.

## Handoff to Candidate work

Prototype C is now the stable reading substrate for CND1 Attached Candidate marks.

Candidate and C are independent:

```text
Anchor / semantic axis = how Products are read
Candidate              = which Products remain under consideration
```

The next slice must not modify C's meaning or automatically turn an Anchor into a Candidate.

CND1 plan:

```text
docs/candidate-marks-plan.md
```

## Blocked later work

Until CND1 receives an explicit implementation disposition, do not begin:

- detached Candidate workspace or copied Candidate list;
- Candidate comparison;
- Decision;
- Configuration;
- Current order;
- quantity or modifiers;
- recommendation, ranking, or filtering;
- shared-table composition;
- checkout.

## Contract impact

None.

The product contract already requires complete-menu access, browsing distinct from ordering, Candidate distinct from order state, preserved browsing context, and explicit uncertainty. The relational prototype dispositions changed the implementation route, not those invariants.
