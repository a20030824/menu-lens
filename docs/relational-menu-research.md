# Relational menu research

## Document status

This is an exploratory design record for the current Menu Lens menu-reading work.

It records observed failures, cross-domain design inspirations, competing hypotheses, prototype order, and falsification criteria. It is **not** a product-contract change and does not authorize Candidate, Comparison, Decision, Configuration, or order implementation.

Current implementation branch:

```text
agent/menu-map-atlas
```

Current Draft PR:

```text
#4 — Build menu reading workspace
```

## Why this record exists

The menu-reading work has produced one useful substrate and several failed interaction hypotheses.

```text
large category Atlas
→ rejected: a larger category selector over a conventional list

desktop-first static workspace
→ rejected: meaningful differences disappeared on mobile

M1 compressed overview
→ passed: the restaurant's six-region shape remained visible

M1 product-card expansion
→ rejected: ordinary feed rhythm remained

M1 shared ledger
→ passed as a stable coordinate plane

M2 modal product detail
→ rejected: source-row displacement and conventional single-product reading

C1 fixed product focus rail
→ rejected: severe perceived jumping and no meaningful reduction in linear comparison
```

The latest failures show that improving the transition into one product is not the same as helping users compare several products.

## Problem definition

"Linear menu" currently refers to three different problems.

### Navigation linearity

The user must move through categories and products as one long sequence.

M1 partly improved this by exposing the complete menu shape before category expansion.

### Comprehension linearity

The user must inspect one product, remember it, inspect another, reconstruct the first, and repeat.

This remains unresolved.

### Decision linearity

The user moves through a pipeline such as browse → save → comparison page → decide, while the original menu stops participating.

This may still occur even after Candidate or Comparison is added.

The immediate research target is **comprehension linearity**.

A successful next prototype should let one interaction expose relationships among several products without moving rows, opening a second product list, or requiring the user to retain the previous product in memory.

## Evidence from the failed detail experiments

The modal detail and fixed rail experiments failed for different visible reasons but shared the same deeper model:

```text
one current product
→ one separate information surface
→ replace it with the next product
```

The rail reduced modal interruption but did not change the information structure. It still represented only one current product, did not preserve a prior comparison context, and did not reveal relationships among nearby alternatives.

The scroll-restoration code also became compensatory choreography:

```text
measure a row
→ render or close a surface
→ wait for a frame
→ correct scroll
→ restore focus
```

Future prototypes should prefer structures that do not need scroll correction over increasingly complex restoration logic.

## Cross-domain design inspirations

These are design analogies, not adopted solutions.

### Distributed cognition and external representations

A useful interface should move comparison work out of memory and into visible structure.

The target is not merely to store product facts. It is to transform recall into direct visual discrimination.

### Flight progress strips

Operational state is written onto the original object rather than copied into a second list.

This suggests that later consideration marks should remain attached to canonical product rows.

### Musical notation

Several values become comparable because they share a coordinate system.

This suggests common scales or tracks for price, portion, role, or preparation rather than isolated product cards.

### Genome browsers

The same objects remain aligned while different levels of detail or tracks are shown.

This suggests that semantic zoom should add relational resolution without replacing the document or changing identity.

### Ecological interface design

Interfaces can expose constraints and relationships directly rather than requiring users to infer them from separate facts.

This is relevant to later table composition, but that work remains deferred.

### Brushing and linking

Selecting one object can cause related marks elsewhere to update.

For Menu Lens:

```text
source: selected product
link: price or semantic relationship
target: relation lane on other canonical rows
```

### Schematic transit maps

A useful abstraction may sacrifice literal presentation to clarify task-relevant relationships.

Novel appearance is not enough; performance on comparison and orientation tasks is the relevant evidence.

### Dynamic queries and faceted exploration

Changing a visible reading dimension can support exploration when feedback is immediate.

The first prototypes must change how the complete set is read, not silently filter, rank, or hide products.

### Fisheye and focus-plus-context

Local detail with compressed context is a valid general technique, but it changes geometry and is therefore excluded from the next prototype round.

## Design principles for the next round

### Stable substrate

- canonical row order remains unchanged
- row DOM identity remains unchanged
- column geometry remains unchanged
- interaction does not add inline expansion rows
- no fixed footer or rail is required
- no scroll-restoration choreography is required

### Shared coordinate system

At least one comparison dimension should use a common scale or consistent lane across all products in the category.

### Attached external state

A future anchor or consideration mark should remain attached to the original product row.

### Multiple simultaneous relationships

One interaction must make relationships among at least three products visible at the same time.

Without this property, the interface remains a single-product reader.

### Explicit uncertainty

Missing or low-confidence data must remain unknown. It must not be converted into a negative property, false equivalence, or inferred recommendation.

### No hidden recommendation

The prototype must not use:

- best
- recommended
- most suitable
- best value
- closest match
- automatic ranking

### Complete-menu credibility

Changing a reading mode must not make users believe products were filtered out or that the current view is only a recommendation subset.

## Design space

| Direction | Main mechanism | Potential value | Main risk | Current disposition |
|---|---|---|---|---|
| Menu score | aligned semantic tracks | simultaneous comparison on a shared scale | may resemble an analytics table | prototype |
| Anchor brush | one product becomes a comparison baseline | relationships appear across existing rows | baseline may be mistaken for selection or recommendation | prototype |
| Strip annotations | marks remain on original rows | externalizes consideration history | may become a renamed bookmark | later, only after relation value |
| Bifocal menu | local detail and compressed context | high density with focus and context | geometry change and renewed jumping | excluded for now |
| Schematic menu network | products appear on several semantic routes | strongly non-linear structure | likely to repeat the Atlas failure | paper exploration only |
| Ecological table field | current meal composition and constraints | may support arranging a meal | requires rules and broader table state | deferred |
| Spatial workbench | users spatially arrange options | externalizes personal reasoning | poor mobile and accessibility fit | not a mobile core |
| Small multiples | linked microviews for several dimensions | strong multi-dimensional comparison | dashboard-like and space-heavy | possible desktop supplement |

## Current convergence: Relational score

The strongest current hypothesis combines three ideas:

```text
shared semantic axis
＋ anchor-based relational reading
＋ later attached consideration marks
```

The intended layers are:

### Layer 1 — Menu structure

The existing M1 compressed overview and shared category ledger remain the substrate.

### Layer 2 — Shared axis

The user changes how every product row is read:

```text
default
price
portion
meal role
preparation
```

The complete product set remains visible and in canonical order.

### Layer 3 — Anchor brush

One product can become a comparison baseline. Other rows display bounded relationships to the anchor.

### Layer 4 — Attached consideration

Only after relational reading proves useful may two or three products be marked for continued comparison. Marks must remain on the original rows.

### Layer 5 — Evidence on demand

Description, metadata source, confidence, and configuration notices remain secondary evidence rather than the default product interaction.

## Prototype sequence

The next implementation should not modify the primary application immediately.

### Phase 0 — Remove the failed C1 experiment

Remove or isolate:

- `src/app/product-focus-rail.ts`
- fixed rail styles
- permanent rail bottom clearance
- rail focus restoration
- source-row scroll correction added only to support the rail or detail surface
- C1-specific success claims and tests

Retain:

- M1 overview and shared ledger
- canonical ordering
- sold-out and incomplete-data behavior
- pure product semantics
- evidence-detail data model where it remains independently useful

### Prototype A — Axis-only score

No anchor, Candidate, comparison page, or detail interaction.

The category ledger exposes one selected reading dimension.

Candidate axes:

```text
price
portion
meal role
preparation
```

Success evidence:

- users answer structure questions without opening individual products
- users do not think products were filtered or reordered
- switching axes causes no row movement
- missing data is recognized as unknown
- the result supports scanning rather than merely adding decoration

Failure evidence:

- axis control is understood as a filter
- users still read each item sequentially
- the interface only feels like a spreadsheet
- axis changes cause content reflow or orientation loss

### Prototype B — Anchor-only relation

The default ledger remains. Selecting one row sets an explicit comparison baseline.

Other rows show:

```text
price difference
＋ one bounded semantic relationship
```

No sorting, filtering, recommendation, rail, or modal is introduced.

Success evidence:

- users understand the baseline
- users compare at least three products without reopening detail
- changing the anchor preserves row geometry
- users do not interpret the anchor as ordered, recommended, or selected for purchase

Failure evidence:

- baseline meaning is unclear
- relation phrases add more reading work than they remove
- users still reconstruct each product from memory
- system-selected differences are perceived as recommendations

### Prototype C — Combined relational score

Only combine Axis and Anchor if both produce useful evidence independently.

Example:

```text
reading axis: preparation
baseline: Product A

Product B  -NT$60 · faster
Product C  +NT$20 · same preparation class
Product D  -NT$40 · unknown
```

The combined version becomes eligible for integration into the main application only after it passes the same mobile tasks.

## Evaluation tasks

Do not begin with preference questions.

### Axis task

Ask the participant to identify:

- lower-priced possibilities in one category
- products suitable for a shared portion
- products that may prepare more quickly
- products whose relevant information is missing

Observe whether the participant can answer from one stable ledger.

### Anchor task

Ask the participant to compare three named products and explain their main differences.

Observe:

- number of product-detail openings
- number of backtracks
- product relocation attempts
- whether price differences are remembered or reread
- whether semantic differences can be explained
- whether missing data is treated as uncertainty
- whether the baseline is mistaken for a recommendation or commitment

### Combined task

Ask the participant to change both the semantic axis and the anchor while preserving orientation.

## Measurement and falsification

Promising signals:

- one action reveals several product relationships
- fewer repeated product openings
- less recall language such as "I think the previous one was..."
- users can explain differences using currently visible evidence
- canonical order and complete-menu credibility remain intact
- no visible row jump

Failure signals:

- feedback remains limited to visual polish or ordinary convenience
- users still inspect one product at a time
- the interface creates another list or comparison destination
- relationship labels are slower to interpret than the original facts
- row content changes create perceived jumping even without scroll movement
- missing metadata produces false conclusions
- users believe items were filtered, ranked, recommended, or selected

## Implementation boundary

During the prototype round, permitted implementation concepts are:

- pure relation projection functions
- one category-level reading-axis state
- one same-category anchor product
- stable relation-lane rendering
- isolated prototype entry points
- focused tests for relation correctness and DOM invariants

Explicitly excluded:

- Candidate shelf
- comparison modal
- ranking or similarity scoring
- filtering
- automatic recommendation
- drag and drop
- two-dimensional product maps
- shared-table composition
- modifier, quantity, total, or order state
- animation or scroll compensation
- desktop-only proof of value

## Proposed modules

Potential pure-domain modules:

```text
src/customer/menu-relations.ts
src/customer/menu-relations.test.ts
```

Potential prototype UI modules:

```text
src/app/category-reading-control.ts
src/app/relational-ledger-prototype.ts
```

Names and paths remain provisional until the prototype is selected.

## Open questions

1. Does a common visual price scale outperform a compact numeric price column on a phone?
2. Which semantic axes remain useful when several products have incomplete metadata?
3. Should an anchor relation show a deterministic fixed pair of differences or one user-selected dimension?
4. Is "comparison baseline" understandable without teaching?
5. Can relation text remain bounded without row-height changes?
6. Does attached consideration add value after relational reading, or merely rename bookmarking?
7. Should cross-category relations remain forbidden in the first prototype?
8. Which parts of the existing evidence detail should survive after C1 removal?

## Contract impact

None yet.

The product contract already requires stable full-menu access, separation between browsing and ordering, preserved browsing context, and support for comparison. This record changes the experimental route used to investigate those requirements, not the requirements themselves.
