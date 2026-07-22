# Evaluation plan

## Evaluation goal

The first evaluation is formative, not comparative.

It should determine whether the Menu Lens interaction is understandable and internally coherent before time is spent building a conventional baseline.

The central questions are:

1. Can people establish a reliable overview of the complete menu?
2. Do people understand candidates as a reversible consideration state rather than a cart?
3. Can people compare, decide, configure, and return without losing browsing context?

A later comparative study remains possible, but it should be designed only after the Menu Lens condition is stable enough that its failures are not merely unfinished implementation.

## Current study boundary

The first study uses one Menu Lens prototype and one fictional restaurant dataset.

It does not attempt to prove that Menu Lens is faster or better than conventional QR ordering.

It should answer:

- which concepts are understood without explanation
- where state boundaries become ambiguous
- whether the full menu feels complete and reachable
- whether preserved context actually supports comparison
- which features should be simplified, redesigned, or removed

## Suggested participant tasks

### Task 1 — understand the restaurant

> You are visiting for the first time. Look through the menu and explain what kinds of food the restaurant mainly serves and the approximate price range.

Observe:

- time and actions needed to establish an overview
- accuracy of category and price understanding
- whether the participant believes they have access to the complete menu
- category backtracking or disorientation

### Task 2 — form candidates

> Find three main dishes you might genuinely order, but do not decide yet.

Observe:

- whether the participant discovers and understands candidates
- whether they expect configuration or quantity at this stage
- whether they revisit product details only to remember prior options
- whether adding a candidate feels like commitment

### Task 3 — compare and decide

> Compare the three dishes and decide which one you would order.

Observe:

- whether comparison attributes help or distract
- whether missing metadata is understood
- whether the participant can return to the menu without losing orientation
- confidence and reasons for the final decision

### Task 4 — configure after deciding

> Complete the required choices for the dish you decided to order.

Observe:

- whether the transition from decision to configuration is clear
- whether required choices appear at the expected moment
- whether cancellation preserves the prior candidate and browsing context
- whether the participant distinguishes the current order from candidates

### Task 5 — browse freely

> Continue browsing as you normally would and change your mind if you wish.

Observe:

- whether the interface supports slow exploration
- whether the participant feels pushed toward premature commitment
- whether state remains understandable after reversals
- whether the interface still feels like a menu rather than a sequence of forms

## Behavioral observations

### Orientation

- time to identify major categories
- ability to estimate price range
- incorrect assumptions about menu completeness
- repeated attempts to locate the complete menu
- loss of category or scroll position

### Consideration

- time to first serious candidate
- number of candidates formed
- repeated visits to the same product
- attempts to configure before deciding
- attempts to use the current order as temporary storage

### Decision

- use of comparison
- decision reversals
- ability to explain why one product was chosen
- confusion between candidate and order item
- cancellation or backtracking behavior

### Continuity

- restored scroll position after detail or configuration
- restored expanded-product or category context
- candidate loss
- browser-back use as recovery
- confusion after returning from another surface

### Completion quality

- task success
- accidental commitment
- duplicate items
- missed required configuration
- incorrect total expectations
- need for moderator explanation

## Subjective prompts

After the tasks, ask participants to respond to statements such as:

- I understood the overall menu before choosing.
- I could keep track of dishes I was considering.
- I knew when I had only considered an item versus committed to ordering it.
- I could return to where I was browsing.
- I felt free to continue looking after forming candidates.
- I understood what would happen before opening configuration.

The most revealing open question remains:

> Did this feel more like looking through a menu or operating an ordering system? Why?

## Interpretation cautions

### Faster is not automatically better

Longer browsing may indicate confusion, but it may also reflect useful or enjoyable exploration. Interpret time together with orientation, confidence, reversals, and participant explanation.

### Fewer taps is not automatically better

A visible, reversible comparison step may add actions while reducing memory burden and accidental commitment.

### More ordered items is not a success measure

Do not use basket size as evidence of a better decision experience. It may reflect manipulation rather than confidence.

### Feature use is not proof of value

A participant may use candidates or comparison because the interface presents them prominently. Ask whether the feature changed understanding or reduced memory work.

## Lightweight local events

The first coded demo may record a local, non-identifying event log:

```text
view_overview
jump_to_category
open_product_detail
close_product_detail
add_candidate
remove_candidate
open_comparison
close_comparison
decide_product
start_configuration
cancel_configuration
complete_configuration
add_draft_order_item
remove_draft_order_item
```

Include only context that is currently useful:

- category
- source surface
- previous and restored scroll position
- candidate count
- draft-order count
- whether compared metadata was complete

Do not add remote analytics, user identity, session infrastructure, or an event abstraction designed for hypothetical production needs.

## Initial success signals

The interaction is promising when participants can:

- describe the menu's broad shape and price range
- trust that the full menu remains available
- use candidates without treating them as order items
- compare without repeatedly reopening products from memory
- identify the moment of explicit decision
- encounter required configuration only after that decision
- return without losing orientation or candidates
- explain the difference between candidate and current-order states

## Evidence that should cause redesign

- users consistently interpret candidates as cart items
- adding a candidate feels like commitment
- the dense menu prevents overview rather than supporting it
- inline details disrupt position or make scanning harder
- comparison adds complexity without reducing memory work
- configuration appears too late, too early, or at an unclear boundary
- preserving multiple states creates more confusion than continuity
- incomplete metadata makes products seem defective or unavailable
- users cannot explain which items affect the order total

Treat these as falsification signals, not polish issues to hide with stronger visual styling.

## When to consider a conventional baseline

A comparative interface becomes worth building only when:

1. the decision spine works end to end
2. formative participants understand its state boundaries
3. major usability failures have been addressed
4. there is a specific comparative claim to test
5. the cost of building a credible baseline is justified by that claim

Until then, comparison work remains parked.