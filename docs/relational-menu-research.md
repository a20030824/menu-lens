# Relational menu research

## Document status

This is the exploratory design record for the active Menu Lens menu-reading work.

It records failed single-product interactions, the stable-ledger hypothesis, Prototype A and B evidence, and the current block on later decision states. It is not a product-contract change.

Current branch and Draft PR:

```text
agent/menu-map-atlas
PR #4 — Build menu reading workspace
```

Current status:

```text
[passed] M1 compressed overview + shared ledger
→ [rejected] M2 modal product detail
→ [rejected, removed] C1 fixed product focus rail
→ [useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [blocked] Prototype C — Combined relational score
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

## Core problem

Most product-detail interactions preserve comprehension linearity:

```text
inspect A
→ remember A
→ inspect B
→ reconstruct A
→ repeat
```

The relational-menu work asks whether several product relationships can remain visible on one stable menu surface without sorting, filtering, recommendation, row movement, or a detached comparison list.

## Stable substrate — M1 shared ledger

M1 established the passed coordinate plane:

- one semantic table per category;
- one canonical row per product;
- shared sequence, dish-name, evidence, and price columns;
- sold-out and incomplete-data state retained;
- canonical order retained;
- no independent product cards.

The ledger is a substrate, not a complete relational-reading answer.

## Rejected single-product approaches

### Modal detail

The modal moved the source row and preserved one-product-at-a-time reading. It did not reduce repeated opening, memory work, or relocation.

### Fixed product rail

The rail occupied the viewport, required compensatory scroll and focus choreography, and still represented only one current product. The rail module, state, DOM, CSS, and restoration code were removed.

## Prototype A — Axis-only score

Disposition:

```text
[useful but insufficient]
```

Prototype A projected one shared dimension across all rows.

Useful evidence:

- preparation made several products simultaneously comparable;
- portion exposed `多人分享`, `約 2–3 人`, and explicit unknown;
- canonical order, complete-menu credibility, and stable geometry were preserved.

Insufficient evidence:

- the price scale duplicated the numeric price column;
- only one dimension was visible at a time;
- switching axes removed prior evidence and reintroduced cross-axis remembering.

Prototype A remains isolated research evidence. Its selector is not active in Prototype B.

## Prototype B — Anchor-only relation

Disposition:

```text
[useful but insufficient]
```

Prototype B allowed one temporary category-local reference product and displayed:

```text
exact price delta
+ at most one automatically selected semantic token
```

The implementation preserved:

- the canonical table and rows;
- four columns, prices, statuses, and order;
- sold-out and incomplete-data products;
- no filtering, sorting, ranking, hiding, copying, or dimming;
- no detail, modal, rail, sheet, fixed footer, Candidate, Comparison, or order state;
- stable geometry and scroll position;
- persistent anchor identity in the existing sticky menu context.

### Useful result — price

With `山椒烤雞半隻` at NT$520 as anchor, the surface directly displayed:

```text
紹興奶油蝦             少 NT$40
蒜酥椒鹽軟殼蟹         少 NT$60
豆豉蒸鱸魚             多 NT$40
宮保杏鮑菇             少 NT$180
季節時蔬豆腐煲         少 NT$140
```

This removes repeated subtraction and is stronger evidence than Prototype A's duplicated price scale.

### Decisive failure — semantic omission

The anchor is `slow`. The prawns, seabass, mushroom, and tofu pot are `normal`; the crab is `fast`. Every alternative with trusted preparation data is therefore faster than the anchor.

Visible Prototype B output selected:

```text
紹興奶油蝦             份量較小
蒜酥椒鹽軟殼蟹         較快
豆豉蒸鱸魚             份量未知
宮保杏鮑菇             份量較小
季節時蔬豆腐煲         份量較小
```

The crab correctly exposes the strongest preparation difference, but the surface silently hides four other true faster-preparation relationships. An unfamiliar diner can reasonably conclude that the crab is the only faster dish.

This triggers the predefined failure signal:

> deterministic token selection hides useful evidence.

The problem is not merely the priority order. Any single automatically selected semantic token can suppress another known difference.

Omission is indistinguishable from equality, and the relation column mixes dimensions across rows:

```text
row A → portion
row B → preparation
row C → uncertainty
```

The result is neither one shared semantic axis nor a complete relative profile.

### Designer reverse-review result

- exact price deltas: **pass**;
- explicit unknown: **pass**;
- anchor identity and geometry: **pass**;
- structural separation from Candidate and order state: **proxy pass**;
- complete and truthful semantic comparison: **fail**;
- reliable reduction of semantic remembering and backtracking: **insufficient**.

This is an adversarial designer proxy. It can reject the formal contradiction between canonical data and visible output, but it cannot prove unfamiliar-user learnability or perceived effort.

The full task matrix is in `docs/prototype-b-anchor-plan.md`.

## Shared conclusion from A and B

Prototype A exposes one complete dimension but requires switching dimensions.

Prototype B keeps one reference visible and removes price arithmetic, but compresses semantic evidence by hiding dimensions.

```text
A failure
complete one-axis evidence
but cross-axis memory remains

B failure
persistent anchor and exact price delta
but semantic omission becomes misleading
```

Neither experiment should be treated as the finished relational-reading answer.

## Prototype C and later work

Prototype C is not automatically authorized by A and B being useful.

Any next hypothesis must explicitly answer:

- whether all trusted dimensions remain discoverable;
- how omission differs visibly from equality;
- how mobile density remains readable;
- why the interface is not a disguised comparison destination;
- how the experiment will be evaluated independently.

Until a separate plan is reviewed and explicitly authorized, the following remain blocked:

- Prototype C;
- Candidate;
- Comparison;
- Decision;
- Configuration;
- Current order;
- quantity and modifiers;
- recommendation, ranking, or filtering;
- product networks or scatterplots;
- shared-table composition;
- checkout.

## Contract impact

None.

The product contract already requires complete-menu access, browsing distinct from ordering, preserved browsing context, comparison support, and explicit uncertainty. These prototype dispositions change the evidence, not the requirements.
