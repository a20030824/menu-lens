# Workstreams

This file is the current coordination view for Menu Lens.

It prevents parallel conversations from redefining the product, preserving failed interaction surfaces, or expanding the demo before the decision spine is coherent.

## Coordination rules

- The core conversation owns product-contract changes and cross-workstream conflict resolution.
- Each implementation conversation owns one bounded outcome.
- Cross-cutting discoveries must be recorded instead of silently expanding scope.
- A desktop-only difference does not count as a core product difference.
- Visual polish does not by itself prove a Menu Lens product difference.
- Failed or insufficient experiments remain isolated as evidence instead of accumulating into the primary flow.
- Conventional-interface comparison remains parked.
- Candidate, Comparison, Decision, Configuration, and order work remain blocked while relational menu reading is unresolved.
- Prefer fewer moving parts, dependencies, and abstractions while the product model is still being tested.

## Current sequence

```text
[complete] foundation memory
→ [complete] domain schema and reference dataset
→ [complete] formative evaluation protocol
→ [active] customer decision spine
    [complete] complete-menu technical baseline
    → [active] mobile-first menu reading
        [rejected] large category Atlas
        → [rejected] desktop-first static workspace
        → [passed] M1 compressed overview + shared ledger
        → [rejected] M2 modal product detail
        → [rejected, removed] C1 fixed product focus rail
        → [useful but insufficient] Prototype A — Axis-only score
        → [useful but insufficient] Prototype B — Anchor-only relation
        → [blocked] Prototype C — Combined relational score
        → [blocked] attached Candidate marks
        → [blocked] bounded comparison
        → [blocked] M3 accessibility and motion finalization
    → [blocked] explicit Decision + Configuration + Current order
→ continuity and table state
→ thin alternative lenses
→ merchant-authoring test
→ decide whether a conventional baseline is useful
```

## Workstream status

| Workstream | Status | Scope | Depends on | Primary output |
|---|---|---|---|---|
| Foundation memory | Complete | product contract, glossary, workstream boundaries, handoff protocol | existing design core | stable cross-conversation reference |
| Domain and reference data | Complete | types, validation, fictional menu, incomplete metadata cases | product contract | local typed dataset and tests |
| Formative evaluation | Complete | tasks, observations, local events, falsification signals | product contract | protocol that shapes implementation |
| Customer decision spine | In progress | menu overview → relational reading → consideration → comparison → decision → configuration → order | domain dataset and formative protocol | one coherent mobile-first flow |
| Relational menu research | Active, no next prototype authorized | stable ledger, Axis-only evidence, Anchor-only evidence, failure gates | M1 shared ledger | evidence for or against relation-first menu reading |
| Continuity and table state | Deferred | preserved candidates, submitted rounds, coarse table composition | validated decision spine | continuity over one state model |
| Alternative lenses | Deferred | thin quick, shared-table, and featured views | stable decision spine | views over the canonical menu |
| Merchant authoring | Deferred | defaults, exceptions, confidence, incomplete-data preview | proven semantic fields | small authoring test |
| Conventional baseline | Parked | conventional flow using the same data | coherent Menu Lens demo and explicit study need | optional comparison condition |
| Production integration | Out of scope | payment, POS, KDS, inventory, auth, deployment operations | none | none |

## Authoritative entry points

- `README.md`
- `docs/product-contract.md`
- `docs/glossary.md`
- `docs/workstreams.md`
- `docs/handoff.md`

Current design research:

- `docs/relational-menu-research.md`
- `docs/prototype-b-anchor-plan.md`

Supporting documents:

- `docs/problem-framing.md`
- `docs/interaction-model.md`
- `docs/merchant-data-strategy.md`
- `docs/demo-scope.md`
- `docs/evaluation-plan.md`

## Passed substrate — M1 shared ledger

M1 preserved the restaurant's six-region shape and established one stable table surface per category:

- sequence, dish name, bounded evidence, and price use shared columns;
- sold-out and incomplete-data status remain visible;
- canonical order and one continuous reading order remain stable;
- individual products do not receive separate card surfaces.

The ledger is a passed coordinate plane, not a completed relational-reading answer.

## Rejected single-product experiments

### M2 modal product detail

The modal moved the source row and retained a conventional one-product-at-a-time model. It did not reduce repeated opening, memory work, or relocation.

### C1 fixed product focus rail

The fixed rail occupied the viewport, required compensatory scroll and focus choreography, and still represented only one current product. Its module, DOM, CSS, state, restoration code, and C1-only tests were removed.

## Core research question

> Can one stable menu surface make relationships among several products visible at once without changing canonical order, moving rows, filtering products, or requiring a second comparison list?

The target is comprehension linearity:

```text
inspect A
→ remember A
→ inspect B
→ reconstruct A
→ repeat
```

## Prototype A — Axis-only score

Disposition:

```text
[useful but insufficient]
```

Useful evidence:

- one shared preparation axis made several products simultaneously comparable;
- portion exposed `多人分享`, `約 2–3 人`, and explicit unknown evidence;
- complete-menu credibility, canonical order, and stable geometry were preserved.

Insufficient evidence:

- the price scale duplicated the numeric price column;
- only one dimension was visible at a time;
- switching dimensions reintroduced cross-axis remembering.

Prototype A remains historical research evidence. Its selector is not active in the Prototype B path.

## Prototype B — Anchor-only relation

Disposition:

```text
[useful but insufficient]
```

Prototype B implemented one temporary category-local anchor on the same canonical ledger.

Visible evidence:

```text
exact price difference
+ at most one automatically selected semantic token
```

It successfully preserved:

- one table and canonical rows;
- four columns, prices, statuses, and order;
- sold-out and incomplete-data products;
- no sorting, filtering, hiding, dimming, copying, ranking, or recommendation;
- no detail, rail, modal, sheet, footer, Candidate, Comparison, or order state;
- stable geometry across idle, selecting, active, changed-anchor, and cleared states;
- persistent anchor identity in the existing sticky menu context.

### Useful result

Exact price deltas clearly reduce arithmetic.

With `山椒烤雞半隻` at NT$520 as anchor:

```text
紹興奶油蝦             少 NT$40
蒜酥椒鹽軟殼蟹         少 NT$60
豆豉蒸鱸魚             多 NT$40
宮保杏鮑菇             少 NT$180
季節時蔬豆腐煲         少 NT$140
```

This is stronger evidence than Prototype A's price scale because the diner no longer subtracts each visible price manually.

### Decisive failure

The single semantic-token rule hides other trusted differences.

The formal shared-dish data says the anchor is `slow`. The prawns, seabass, mushroom, and tofu pot are `normal`, and the crab is `fast`. Every alternative with trusted preparation data is therefore faster than the anchor.

Visible B output shows:

```text
紹興奶油蝦             份量較小
蒜酥椒鹽軟殼蟹         較快
豆豉蒸鱸魚             份量未知
宮保杏鮑菇             份量較小
季節時蔬豆腐煲         份量較小
```

An unfamiliar diner can reasonably conclude that only the crab is faster. The interface shows the strongest preparation difference but silently suppresses four other true preparation differences.

This triggers the documented failure signal:

> deterministic token selection hides useful evidence.

The problem is structural rather than a priority-order bug. Any automatically selected single semantic token can make omission indistinguishable from equality.

The relation column also mixes dimensions across rows:

```text
row A → portion
row B → preparation
row C → uncertainty
```

It is neither one shared coordinate axis nor a complete relative profile.

### Task disposition

- exact lower, higher, and equal price deltas: **pass**;
- explicit unknown portion: **pass**;
- stable anchor identity and geometry: **pass**;
- structural separation from Candidate and order state: **proxy pass**;
- complete and truthful semantic comparison: **fail**;
- reliable reduction of semantic remembering and backtracking: **insufficient**.

The full matrix is recorded in `docs/prototype-b-anchor-plan.md`.

## Prototype C and later work

Prototype C is not automatically authorized by A and B being useful. Both experiments produced useful but insufficient evidence, and B exposed a truthfulness problem that must not be hidden by simply combining interfaces.

A new hypothesis requires a separately reviewed plan that explains:

- whether all known dimensions are exposed;
- whether omission can be distinguished from equality;
- how mobile density remains readable;
- why the result is not a disguised comparison destination;
- how the experiment can be evaluated independently.

Until that plan is explicitly authorized, the following remain blocked:

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

## Constraints

- no backend, database, authentication, payment, POS, or KDS integration;
- no conventional baseline;
- no Quick, Shared-table, or Featured lens implementation;
- no merchant CMS;
- no remote analytics;
- no generic state-machine, repository, plugin, animation, or design-system framework;
- no abstractions for deferred Candidate or order work;
- preserve canonical product and category order;
- preserve `Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound`;
- do not count desktop layout or visual polish as proof.

## Contract impact

None.

The product contract already requires complete-menu access, browsing distinct from ordering, preserved browsing context, comparison support, and explicit uncertainty. Prototype B changes the experimental evidence; it does not change the requirements or authorize deferred states.
