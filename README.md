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
- A candidate is not an order item.
- Product details should not destroy browsing position or spatial memory.
- Required configuration begins after explicit purchase intent.
- Lenses are views over one canonical menu, not separately maintained catalogs.
- Switching views must preserve candidates, order state, constraints, and browsing context.
- Merchant data supports progressive enhancement.
- Missing semantic metadata should degrade enhanced features without breaking complete-menu browsing.
- Wrong operational information is worse than absent information.

The authoritative version of these rules is [`docs/product-contract.md`](docs/product-contract.md).

## First research questions

The initial implementation investigates only three primary questions:

1. Can a dense, stable full-menu view establish overview without making users fear that products are hidden?
2. Does separating candidates from order items support genuine consideration without using the cart as a bookmark?
3. Can relational reading, detail, and preserved browsing context improve comparison without destroying spatial memory?

A conventional comparison interface is deliberately parked. The project should first make the Menu Lens interaction internally coherent and observable before deciding whether a formal baseline is useful.

## Initial demo scope

### Product-level decision spine

```text
full menu
→ relational reading
→ reversible consideration
→ bounded comparison
→ explicit decision
→ required configuration
→ current order
```

The exact interaction route remains under investigation. The current branch is testing whether product relationships can appear on the stable menu surface before Candidate or transaction work begins.

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
- [`docs/interaction-model.md`](docs/interaction-model.md) — menu map, candidate workspace, lens behavior, table state, and reversibility
- [`docs/relational-menu-research.md`](docs/relational-menu-research.md) — failed menu-reading hypotheses and relational prototype evidence
- [`docs/prototype-b-anchor-plan.md`](docs/prototype-b-anchor-plan.md) — Prototype B implementation, task matrix, reverse review, and disposition
- [`docs/merchant-data-strategy.md`](docs/merchant-data-strategy.md) — progressive metadata, category defaults, confidence, governance, and graceful degradation
- [`docs/demo-scope.md`](docs/demo-scope.md) — reference restaurant, primary flow, exclusions, and build sequence
- [`docs/evaluation-plan.md`](docs/evaluation-plan.md) — formative tasks, observations, local events, and falsification signals

## Current status

The foundation, domain schema, reference dataset, and formative evaluation protocol are complete.

The customer decision spine is active on Draft PR #4. Current evidence is:

```text
[passed] M1 compressed overview + shared ledger
→ [rejected] M2 modal product detail
→ [rejected, removed] C1 fixed product focus rail
→ [useful but insufficient] Prototype A — Axis-only score
→ [useful but insufficient] Prototype B — Anchor-only relation
→ [blocked] Prototype C — Combined relational score
→ [blocked] Candidate / Comparison / Decision / Configuration / Current order
```

Prototype A proved that one shared dimension can make several products simultaneously comparable, but it retained cross-axis memory work and its price scale had weak independent value.

Prototype B proved that exact anchor-relative price deltas remove mental subtraction while preserving canonical order, stable geometry, explicit uncertainty, and complete-menu credibility. However, the automatically selected semantic token varies by row and silently suppresses other trusted differences. In the formal shared-dish fixture, several dishes are faster than the slow anchor, but only the soft-shell crab displays `較快`; the surface can therefore imply false exclusivity.

Prototype B is retained as useful research evidence rather than treated as a passed feature. The designer reverse review does not replace unfamiliar-participant evidence. Prototype C and all later decision and transaction states remain blocked.

See [`docs/workstreams.md`](docs/workstreams.md), [`docs/relational-menu-research.md`](docs/relational-menu-research.md), and [`docs/prototype-b-anchor-plan.md`](docs/prototype-b-anchor-plan.md) for the sequence and evidence record.
