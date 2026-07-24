# Workstreams

This file is the current coordination view for Menu Lens.

It prevents parallel conversations from redefining the product, preserving failed interaction surfaces, or expanding the demo before the decision spine is coherent.

## Coordination rules

- The core conversation owns product-contract changes and cross-workstream conflict resolution.
- Each implementation conversation owns one bounded outcome.
- Cross-cutting discoveries must be recorded instead of silently expanding scope.
- A desktop-only difference does not count as a core product difference.
- Visual polish does not by itself prove a Menu Lens product difference.
- Failed interaction experiments should be removed or isolated.
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
        → [implemented, awaiting review] Prototype B — Anchor-only relation
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
| Domain and reference data | Complete | types, validation, 30-product fictional menu, incomplete metadata cases | product contract | local typed dataset and tests |
| Formative evaluation | Complete | tasks, observations, local events, falsification signals | product contract | protocol that shapes implementation |
| Customer decision spine | In progress | menu overview → relational reading → consideration → comparison → decision → configuration → order | domain dataset and formative protocol | one coherent mobile-first flow |
| Relational menu research | Active, B-review-gated | stable ledger, Axis-only evidence, Anchor-only evidence, failure gates | M1 shared ledger | evidence for or against relation-first menu reading |
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

## Completed foundation work

The domain and reference-data workstream provides:

- canonical TypeScript menu and order-state types;
- runtime validation at the local dataset boundary;
- one fictional restaurant with 30 products;
- required and optional modifier examples;
- personal and shared portion examples;
- two sold-out products retained in the canonical collection;
- six intentionally incomplete semantic metadata cases;
- metadata source and confidence representation;
- focused compile-time and runtime invariant tests.

The Prototype A corrective iteration added one low-confidence portion exception so explicit unknown evidence is executable in the live research dataset.

The formative-evaluation workstream provides:

- moderated task scripts;
- neutral moderator and think-aloud guidance;
- observable success, failure, and falsification signals;
- a bounded local event vocabulary;
- observation and session-summary templates;
- explicit criteria for redesigning, simplifying, or removing a feature.

## Menu-reading findings

### Rejected: large category Atlas

Large category regions still led into a conventional linear list. Size, counts, price ranges, and representative products did not create a different reading model.

### Rejected: desktop-first static workspace

The meaningful structure disappeared on mobile. Desktop-only layout was not accepted as product evidence.

### Passed substrate: M1 compressed overview + shared ledger

M1 preserved the six-region menu shape and established one stable table surface per category:

- sequence, dish name, bounded cue, and price use shared columns;
- sold-out and incomplete-data status remain visible;
- canonical order and one continuous reading order remain stable;
- individual products do not receive separate card surfaces.

The ledger is a passed coordinate plane, not a complete solution.

### Rejected: M2 modal product detail

The modal moved the source row and retained a conventional one-product-at-a-time model. It did not reduce repeated opening, memory work, or relocation.

### Rejected and removed: C1 fixed product focus rail

The fixed rail occupied the viewport, required compensatory scroll and focus choreography, and still represented only one current product. The rail module, DOM, CSS, state, restoration code, and C1-only tests were removed.

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

The prototype must replace that sequence with direct visible relationships.

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

Prototype A remains historical research evidence. Its selector is not active in the Prototype B evaluation path.

## Prototype B — Anchor-only relation

Status:

```text
[implemented, awaiting review]
```

Prototype B allows one temporary category-local reference product and projects each alternative onto the same stable ledger.

Implemented interaction:

```text
idle
→ selecting
→ active { productId }
→ change or clear
```

Implemented evidence:

```text
exact price difference
+ at most one bounded semantic difference
```

Examples:

```text
少 NT$40 · 份量較小
少 NT$60 · 較快
多 NT$40 · 份量未知
```

The semantic token is deterministic:

- explicit unknown remains unknown;
- the larger formal semantic difference is shown;
- a tied difference prefers portion;
- equal semantics leave price alone.

Prototype B preserves:

- the same table and canonical rows;
- the same four columns, prices, statuses, and order;
- sold-out and incomplete-data products;
- no sorting, filtering, hiding, dimming, copying, ranking, or recommendation;
- no detail, rail, modal, sheet, footer, Candidate, Comparison, or order state.

A fixed-height top context keeps the anchor name visible. Selection uses explicit native buttons in the existing relation lane; product rows and names are not click targets.

Automated safeguards cover:

- category-local single-anchor state and reset boundaries;
- exact price deltas;
- portion and preparation direction, equality, and unknown;
- bounded semantic selection;
- absence of recommendation language and deferred state;
- canonical product order;
- four-column DOM and fixed control/relation geometry.

A code-derived Chromium proxy at 320 px and 390 px reports zero state-change difference for row, table, control, and scroll geometry. Typecheck, tests, and static build pass.

These checks do not prove learnability or reduced comprehension work.

## Prototype B review gate

Use `分享料理` and begin with `山椒烤雞半隻` as the anchor.

Without teaching the interaction, ask the participant to identify:

1. alternatives that cost less or more and the exact differences;
2. the strongest faster-preparation difference;
3. the item with unknown portion comparison;
4. what `比較基準` means;
5. whether the action saved, ordered, recommended, filtered, ranked, or selected anything;
6. how evidence changes after switching anchors;
7. whether relative evidence reduced subtraction, remembering, and backtracking.

Pass only if:

- at least three alternatives are understood relative to one reference at the same time;
- exact price deltas remove mental subtraction;
- one semantic difference is understood without returning to A;
- anchor is not confused with Candidate, cart, favorite, recommendation, or order selection;
- unknown is understood as not confidently comparable;
- changing and clearing preserve orientation and complete-menu credibility;
- cross-axis remembering is lower than in Prototype A.

Fail if:

- anchor is interpreted as a saved or ordered product;
- participants expect detail from the action;
- the reference is forgotten after its row scrolls away;
- relative phrases are slower than original facts;
- deterministic selection hides useful evidence;
- participants still subtract prices manually;
- changing anchors moves rows, table, or scroll position;
- the interaction behaves like a disguised comparison destination.

## Prototype C and later work

Prototype C remains blocked until Axis-only and Anchor-only have separate dispositions. Candidate, Comparison, Decision, Configuration, Current order, quantity, modifiers, recommendation, ranking, filtering, product networks, scatterplots, shared-table composition, and checkout remain blocked.

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

The product contract already requires complete-menu access, browsing distinct from ordering, preserved browsing context, comparison support, and explicit uncertainty. Prototype B changes the experimental route used to investigate those requirements; it does not change the requirements or authorize deferred states.
