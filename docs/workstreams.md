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
        → [planned, implementation not started] Prototype C — Anchor + explicit shared axis
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
| Relational menu research | Active, C-plan-review-gated | stable ledger, Axis-only evidence, Anchor-only evidence, explicit-anchor-axis hypothesis | M1 shared ledger | reviewed plan or rejection of the next relational hypothesis |
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
- `docs/prototype-c-anchor-axis-plan.md`

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

## Prototype C — Anchor + explicit shared axis

Status:

```text
[planned, implementation not started]
```

Prototype C is a separately testable correction rather than a direct accumulation of A and B interfaces.

Question:

> Can one temporary anchor preserve exact price deltas while one explicit category-wide semantic axis keeps every row answering the same question, so no trusted difference is silently suppressed?

Selected low-fidelity direction:

```text
anchor
+ exact price delta on every alternative
+ one explicit category-wide semantic axis
```

Shared-dish portion mode:

```text
比較基準：山椒烤雞半隻               更換  清除
比較內容： [份量] [準備]
──────────────────────────────────────────
山椒烤雞半隻           基準 · 多人            NT$520
紹興奶油蝦             少 NT$40 · 2–3 人      NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 2–3 人      NT$460
豆豉蒸鱸魚             多 NT$40 · 未提供      NT$560
```

Preparation mode changes every row together:

```text
山椒烤雞半隻           基準 · 慢              NT$520
紹興奶油蝦             少 NT$40 · 一般        NT$480
蒜酥椒鹽軟殼蟹         少 NT$60 · 快          NT$460
豆豉蒸鱸魚             多 NT$40 · 一般        NT$560
```

### Corrective properties

- no row-level heuristic chooses between portion and preparation;
- every row shows the same active axis;
- every active-axis cell contains a trusted absolute label or `未提供`;
- equality appears as matching visible labels rather than blank output;
- the non-active axis remains visible in the axis control;
- exact price delta remains present while switching semantic axes;
- changing anchor preserves the selected semantic axis;
- one-line relation geometry remains the planned mobile constraint;
- the existing sticky context remains the only sticky orientation surface and must expose both axis and anchor.

### Planned axis eligibility

Axes are bounded to:

```text
portion
preparation
```

Price is persistent evidence rather than an axis option. Meal role remains excluded because the current formal data makes it category-redundant.

Eligibility is category-level and stable across anchor changes. An axis appears only when the category has at least three products and at least two trusted or explicit-unknown visible states.

Expected current data:

```text
個人主餐       準備
飯麵類         準備
分享料理       份量 / 準備
小食           準備
飲料           no C control
甜點           no C control
```

### Planning gate

Before implementation, the plan must be reviewed for:

- truthful complete projection of the active axis;
- visible distinction between equality, unknown, and non-active dimensions;
- mobile phrase width and reading size at 320 px;
- fixed two-row control geometry;
- sticky visibility of axis and anchor;
- absence of a second comparison destination;
- independent evaluation tasks and failure signals.

The full contract is in `docs/prototype-c-anchor-axis-plan.md`.

## Blocked later work

Prototype C planning does not authorize implementation automatically.

Until the C plan is explicitly reviewed and implementation is separately started, the following remain blocked:

- Prototype C application code;
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

The product contract already requires complete-menu access, browsing distinct from ordering, preserved browsing context, comparison support, and explicit uncertainty. Prototype C changes the planned experimental route; it does not change the requirements or authorize deferred states.
