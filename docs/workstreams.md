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
foundation memory
→ domain schema and reference dataset
→ formative evaluation protocol
→ customer decision spine
→ continuity and table state
→ thin alternative lenses
→ merchant-authoring test
→ decide whether a conventional baseline is useful
```

## Workstream status

| Workstream | Status | Scope | Depends on | Primary output |
|---|---|---|---|---|
| Foundation memory | Active | product contract, glossary, workstream boundaries, handoff protocol | existing design core | stable cross-conversation reference |
| Domain and reference data | Next | types, validation, 30-product fictional menu, incomplete metadata cases | product contract | local typed dataset and tests |
| Formative evaluation | Next | task scripts, observation notes, lightweight local events, falsification signals | product contract | protocol that can shape implementation |
| Customer decision spine | Blocked | full menu → inline detail → candidates → comparison → decision → configuration → current order | domain dataset | one complete interactive flow |
| Continuity and table state | Deferred | scroll restoration, preserved candidates, submitted rounds, coarse table composition | customer decision spine | continuity behavior over the same state model |
| Alternative lenses | Deferred | thin quick, shared-table, and featured views | stable decision spine | views over the same canonical menu |
| Merchant authoring | Deferred | category defaults, exceptions, confidence, incomplete-data preview | proven useful semantic fields | small authoring test, not production CMS |
| Conventional baseline | Parked | credible conventional ordering flow using the same data | coherent Menu Lens demo and explicit study need | optional comparison condition |
| Production integration | Out of scope | payment, POS, KDS, inventory, auth, deployment operations | none in current demo | none |

## Foundation completion criteria

Foundation memory is complete when a new conversation can determine, without relying on chat history:

- what Menu Lens is investigating
- which states must remain distinct
- which terminology to use
- which workstream is currently allowed to proceed
- which work is deferred or out of scope
- how to report changes and unresolved questions

## Next workstream: domain and reference data

### Goal

Create the smallest credible typed dataset that supports the primary decision spine.

### Required outputs

- TypeScript product and menu types
- runtime validation for local data
- one fictional restaurant with approximately 30 products
- required modifier examples
- personal and shared portion examples
- availability examples, including sold-out items
- approximately 20% incomplete semantic metadata
- metadata source or confidence representation where needed by the first flow
- focused tests for invariants and malformed data

### Constraints

- no UI implementation
- no API layer
- no database
- no generic schema framework unless a concrete validation need justifies it
- no data fields added solely for a deferred lens
- no inferred medical, allergy, or legal claims

## Parallel workstream: formative evaluation

### Goal

Define how the first interaction will be inspected before a formal comparative study exists.

### Required outputs

- a small set of task scripts for overview, consideration, comparison, and commitment
- observable failure signals
- a compact local event vocabulary
- a note-taking template
- explicit criteria for redesigning or removing a feature

### Constraints

- no conventional baseline yet
- no claims of superiority
- no remote analytics requirement
- no optimization around average basket size or speed alone

## Opening implementation work

The customer decision-spine workstream may begin when:

1. the canonical product identity and state terms are stable
2. the reference dataset supports the complete flow
3. required configuration examples exist
4. incomplete metadata behavior is known
5. the formative protocol identifies what should be observable

It does not need alternative lenses, merchant tooling, or a baseline comparison before starting.