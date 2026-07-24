# Menu Lens

Menu Lens is a decision-first restaurant menu prototype.

It explores a simple problem: most QR ordering interfaces begin with transaction mechanics—product cards, modifiers, cart, and checkout—before helping people understand the menu, compare possibilities, or coordinate a table.

Menu Lens separates three layers that are often collapsed into one:

1. **Menu map** — What does this restaurant offer? How large is the menu, how is it organized, and what is the price range?
2. **Decision workspace** — What am I considering? How do the options differ? What has the table already chosen, and what may still be missing?
3. **Transaction system** — Which specifications, quantities, order rounds, and payment actions are required to complete the order?

The first demo focuses on the space before the cart:

```text
browse → consider → compare → decide → configure → order
```

## Core hypothesis

A digital menu can preserve the overview, density, spatial memory, and editorial judgment of a good paper menu while adding reversible decision support and visible table state.

The experience should feel like **reading and arranging a meal**, not operating a miniature self-checkout terminal.

## Product invariants

- The full menu is a first-class experience, not a fallback.
- Browsing is not ordering.
- A Candidate is not an order item.
- Product details should not destroy browsing position or spatial memory.
- Required configuration begins after explicit purchase intent.
- Lenses are views over one canonical menu, not separately maintained catalogs.
- Switching views must preserve Candidates, order state, constraints, and browsing context.
- Merchant data supports progressive enhancement.
- Missing semantic metadata should degrade enhanced features without breaking complete-menu browsing.
- Wrong operational information is worse than absent information.

The authoritative version of these rules is [`docs/product-contract.md`](docs/product-contract.md).

## First research questions

The initial implementation investigates only three primary questions:

1. Can a dense, stable full-menu view establish overview without making users fear that Products are hidden?
2. Does separating Candidates from order items support genuine consideration without using the cart as a bookmark?
3. Can relational reading, detail, and preserved browsing context improve comparison without destroying spatial memory?

A conventional comparison interface is deliberately parked. The project should first make the Menu Lens interaction internally coherent and observable before deciding whether a formal baseline is useful.

## Initial demo scope

### Product-level decision spine

```text
full menu
→ relational reading
→ reversible consideration
→ Candidate review workspace
→ bounded comparison
→ explicit decision
→ required configuration
→ current order
```

Prototype C establishes the accepted relational-reading substrate. CND1 establishes reversible Candidate membership directly on canonical Product rows. CND2 now plans a derived Candidate review workspace that can retrieve, revisit, and dismiss Candidates while preserving the prior menu context and without creating comparison or order state.

### Later, only after the decision spine works

- preserved state across views
- submitted order rounds
- coarse table composition
- thin quick, shared-table, and featured lenses
- merchant category defaults and exception editing

### Explicitly out of scope

- payment
- authentication and membership
- POS or KDS integration
- live inventory and precise preparation-time prediction
- real-time multi-device collaboration
- opaque AI recommendations
- production restaurant operations
- a conventional comparison implementation in the first build

## Low-entropy implementation direction

The first coded version should remain easy to read, test, change, and delete:

- one client application
- one local canonical dataset
- one explicit application state model
- one bounded experimental slice at a time
- no backend
- no premature monorepo
- no generic plugin system
- no separate design-system package
- no abstraction justified only by hypothetical future scale
- failed interaction experiments should be removed or isolated rather than accumulated

See the detailed implementation contract in [`docs/product-contract.md`](docs/product-contract.md).

## Shared project memory

The repository, not chat history, is the shared memory across conversations.

Every workstream should begin with:

1. [`README.md`](README.md)
2. [`docs/product-contract.md`](docs/product-contract.md)
3. [`docs/glossary.md`](docs/glossary.md)
4. [`docs/workstreams.md`](docs/workstreams.md)
5. the documents directly related to its scope

Use [`docs/handoff.md`](docs/handoff.md) when opening or closing a separate workstream conversation.

## Core documents

- [`docs/product-contract.md`](docs/product-contract.md) — authoritative product invariants, first research questions, state boundaries, and low-entropy implementation contract
- [`docs/glossary.md`](docs/glossary.md) — shared terminology for documents, data, code, issues, and conversations
- [`docs/workstreams.md`](docs/workstreams.md) — current sequencing, active scope, parked work, and entry criteria
- [`docs/handoff.md`](docs/handoff.md) — required reading, opening prompt, escalation rules, and closing report
- [`docs/problem-framing.md`](docs/problem-framing.md) — why current QR ordering often feels harder to read than paper
- [`docs/interaction-model.md`](docs/interaction-model.md) — menu map, Candidate workspace, lens behavior, table state, and reversibility
- [`docs/relational-menu-research.md`](docs/relational-menu-research.md) — failed menu-reading hypotheses and relational prototype evidence
- [`docs/prototype-b-anchor-plan.md`](docs/prototype-b-anchor-plan.md) — Prototype B implementation, task matrix, reverse review, and disposition
- [`docs/prototype-c-anchor-axis-plan.md`](docs/prototype-c-anchor-axis-plan.md) — Prototype C implementation, evidence, accepted limitations, and final current-scope disposition
- [`docs/candidate-marks-plan.md`](docs/candidate-marks-plan.md) — CND1 implementation, final re-review corrections, narrow-screen evidence, and accepted disposition
- [`docs/candidate-workspace-plan.md`](docs/candidate-workspace-plan.md) — planned CND2 derived workspace, return-context contract, removal behavior, tests, and scope gates
- [`docs/merchant-data-strategy.md`](docs/merchant-data-strategy.md) — progressive metadata, category defaults, confidence, governance, and graceful degradation
- [`docs/demo-scope.md`](docs/demo-scope.md) — reference restaurant, primary flow, exclusions, and build sequence
- [`docs/evaluation-plan.md`](docs/evaluation-plan.md) — formative tasks, observations, local events, and falsification signals

## Current status

The foundation, domain schema, reference dataset, and formative evaluation protocol are complete.

The customer decision spine is active on Draft PR #4:

```text
[passed] M1 compressed overview + shared ledger
→ [rejected] M2 modal product detail
→ [rejected, removed] C1 fixed Product focus rail
→ [useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [passed for current scope] Prototype C — Anchor + explicit shared axis
→ [passed for current scope] CND1 — Attached Candidate marks
→ [planned, implementation not started] CND2 — Candidate review workspace
→ [blocked] Candidate comparison / Decision / Configuration / Current order
```

Prototype A showed that one shared dimension can support simultaneous multi-Product reading, but retained cross-axis memory work and a weak price axis.

Prototype B showed that exact Anchor-relative price deltas remove arithmetic while preserving the canonical menu, but its automatically selected semantic token mixed dimensions and could imply false exclusivity.

Prototype C corrects that failure with one Anchor, persistent exact price deltas, and one explicit category-wide `份量` or `準備` axis. Formal projection tests, state tests, designer reverse review, focus re-review, narrow-screen proxies, and CI pass. It is accepted for the current scope by product-owner decision. No unfamiliar-participant evidence or measured usability claim is made.

CND1 adds identity-only Candidate membership beside reading state. Available Product rows expose persistent `考慮` toggle buttons whose membership is communicated through `aria-pressed`; sold-out rows remain visible but cannot be newly marked. Candidate membership survives every category, overview, all-expanded, Anchor, and semantic-axis transition while preserving canonical order, four columns, focus, and fixed row geometry.

The final CND1 re-review corrected stale-ID counting, Candidate-dependent Product typography, repeated live-region announcements, changing toggle labels, an unused row-wide state mirror, and a premature detached-list projection. A 320px/390px Chromium proxy reports zero Candidate on/off geometry differences and no overflow. Typecheck, Candidate domain tests, app-state continuity tests, structure contracts, and the static build pass.

CND2 is now the active plan-review-gated slice. It authorizes only a canonical derived Candidate review view with explicit menu return, Product locator, and Candidate removal. Comparison, Decision, Configuration, Current order, transaction state, ranking, and recommendation remain blocked.

See [`docs/workstreams.md`](docs/workstreams.md), [`docs/candidate-marks-plan.md`](docs/candidate-marks-plan.md), and [`docs/candidate-workspace-plan.md`](docs/candidate-workspace-plan.md) for the active sequence and evidence.