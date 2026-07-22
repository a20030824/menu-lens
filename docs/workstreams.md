# Workstreams

This file is the current coordination view for Menu Lens.

It exists to prevent parallel conversations from redefining the product, duplicating work, or expanding the demo before the decision spine is coherent.

## Coordination rules

- The core conversation owns product-contract changes and cross-workstream conflict resolution.
- Each implementation conversation should own one bounded outcome, not a collection of screens or technologies.
- Workstreams should modify only the files needed for their outcome.
- Cross-cutting discoveries should be recorded and returned to the core conversation rather than silently expanding scope.
- Conventional-interface comparison is parked until the Menu Lens interaction is coherent enough to evaluate on its own.
- Prefer fewer moving parts, fewer dependencies, and fewer abstractions while the product model is still being tested.

## Current sequence

```text
[complete] foundation memory
→ [complete] domain schema and reference dataset
→ [complete] formative evaluation protocol
→ [active] customer decision spine
    [complete] complete menu + inline detail
    → [next] Candidate + comparison
    → Decision + Configuration + Current order
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
| Formative evaluation | Complete | task scripts, observation notes, lightweight local events, falsification signals | product contract | protocol that shapes implementation |
| Customer decision spine | In progress | full menu → inline detail → candidates → comparison → decision → configuration → current order | domain dataset and formative protocol | one complete interactive flow |
| Continuity and table state | Deferred | scroll restoration, preserved candidates, submitted rounds, coarse table composition | customer decision spine | continuity behavior over the same state model |
| Alternative lenses | Deferred | thin quick, shared-table, and featured views | stable decision spine | views over the same canonical menu |
| Merchant authoring | Deferred | category defaults, exceptions, confidence, incomplete-data preview | proven useful semantic fields | small authoring test, not production CMS |
| Conventional baseline | Parked | credible conventional ordering flow using the same data | coherent Menu Lens demo and explicit study need | optional comparison condition |
| Production integration | Out of scope | payment, POS, KDS, inventory, auth, deployment operations | none in current demo | none |

## Completed foundation work

A new conversation can determine, without relying on chat history:

- what Menu Lens is investigating
- which states must remain distinct
- which terminology to use
- which workstream is currently allowed to proceed
- which work is deferred or out of scope
- how to report changes and unresolved questions

The authoritative entry points are:

- `docs/product-contract.md`
- `docs/glossary.md`
- `docs/workstreams.md`
- `docs/handoff.md`

The domain and reference-data workstream now provides:

- canonical TypeScript menu and order-state types
- runtime validation for the local dataset boundary
- one fictional restaurant with 30 products
- required and optional modifier examples
- personal and shared portion examples
- sold-out products that remain in the canonical collection
- intentionally incomplete semantic metadata
- metadata source and confidence representation
- focused compile-time and runtime invariant tests

The formative-evaluation workstream now provides:

- four moderated task scripts for overview, consideration, comparison, and Configuration
- neutral moderator and think-aloud guidance
- observable success, failure, and falsification signals
- a bounded local event vocabulary
- observation and session-summary templates
- explicit criteria for redesigning, simplifying, or removing a feature

The first customer-facing slice now provides:

- one static local client using the validated canonical menu
- restaurant overview and complete-menu trust cues
- all six categories and all 30 products in one stable document
- category navigation that moves without filtering or replacing products
- inline product detail resolved by stable `ProductId`
- sold-out and incomplete-metadata behavior
- keyboard open, Escape close, and focus return
- reduced-motion-aware category scrolling
- focused menu-reading tests and a static build path

## Active workstream: customer decision spine

### Goal

Implement one coherent mobile-first interaction using the canonical reference menu:

```text
complete menu
→ inline detail
→ Candidate
→ comparison
→ explicit Decision
→ Configuration
→ Current order
```

### Progress

```text
[complete] complete menu + inline detail
→ [next] Candidate + comparison
→ [pending] explicit Decision + Configuration + Current order
```

### Required outputs

- **Complete:** one client application
- **Complete:** complete-menu overview with stable category navigation
- **Complete:** inline product detail without losing browsing context
- **Next:** Candidate add, remove, and workspace behavior
- **Next:** comparison for genuine Candidate differences
- **Pending:** explicit transition from consideration to Decision
- **Pending:** Configuration only after Decision
- **Pending:** Current order clearly separated from Candidates
- **Pending:** local-only observation events aligned with `docs/evaluation-plan.md`
- focused tests for every implemented state transition and preserved invariant

### Constraints

- no backend, database, authentication, payment, POS, or KDS integration
- no conventional baseline
- no Quick, Shared-table, or Featured lens implementation
- no merchant CMS
- no remote analytics
- no generic state-machine, repository, plugin, or design-system framework
- do not add abstractions for deferred work
- preserve `Product ≠ Candidate ≠ DraftOrderItem ≠ ConfiguredOrderItem ≠ SubmittedOrderRound`

## Next implementation slice: Candidate and comparison

### Goal

Extend the existing complete-menu client from reading into reversible consideration:

```text
Product
→ Candidate
→ Candidate workspace
→ comparison
```

### Required behavior

- add an available Product as a Candidate using stable `ProductId`
- remove a Candidate without affecting the canonical menu
- keep Candidate separate from Current order and purchase commitment
- do not request quantity or modifiers when adding a Candidate
- keep browsing context while opening and closing the Candidate workspace
- compare a small set of genuine Candidate differences using only supported metadata
- omit unsupported comparison fields instead of guessing
- return from comparison without clearing Candidates or changing the complete menu
- add the bounded local events already defined for Candidate and comparison observation
- add focused state and interaction tests

### Explicit exclusions

- no `DraftOrderItem` creation
- no Configuration form
- no quantity controls
- no modifier selection
- no order total
- no Current order
- no submitted rounds
- no persistence, URL state, router, backend, or remote analytics
- no alternative lenses

### Completion gate

The next slice is complete when a tester can:

1. preserve two or more possible products as Candidates
2. continue browsing the same complete menu
3. open a clearly separate Candidate workspace
4. compare supported differences without seeing invented metadata
5. remove or retain Candidates reversibly
6. return to the original browsing context
7. avoid interpreting Candidate as a placed order

It does not need Decision, Configuration, Current order, continuity persistence, alternative lenses, merchant tooling, production integration, or a baseline comparison before completion.
