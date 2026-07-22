# Evaluation plan

## Evaluation goal

The first study should compare decision quality and interaction continuity, not merely visual preference or checkout speed.

The central question is:

> Does Menu Lens help people build a reliable understanding of a menu, form and revise candidates, and coordinate a meal before transaction mechanics begin?

A second question is equally important:

> Can merchants provide and maintain the metadata required for that experience at acceptable cost?

## Comparison setup

Use the same fictional restaurant, products, prices, availability, descriptions, and modifiers in two interfaces.

### Menu Lens condition

- menu overview
- dense complete menu
- inline product details
- candidate workspace
- comparison
- configuration after explicit decision
- visible table composition

### Conventional condition

- horizontal category tabs
- large product cards
- separate product detail page
- modifiers before adding
- conventional cart

The conventional version must be usable and visually competent. The study should not manufacture an easy victory by making the baseline poor.

## Suggested participant tasks

### Task 1 — understand the restaurant

> You are visiting for the first time. Look through the menu and explain what kinds of food the restaurant mainly serves and the approximate price range.

Observes:

- time to establish an overview
- accuracy of category and price understanding
- whether participants feel they have seen the whole menu

### Task 2 — make a quick individual choice

> You have about 15 minutes and want a complete individual meal under NT$300.

Observes:

- ability to apply time and budget constraints
- trust in surfaced results
- attempts to return to the full menu
- whether hidden alternatives create anxiety

### Task 3 — compare uncertain choices

> Find three main dishes you might genuinely order, compare them, and choose one.

Observes:

- use of memory, tabs, cart, or candidates as temporary storage
- repeated detail-page visits
- scroll and category recovery
- confidence at final decision

### Task 4 — arrange a shared meal

> Three people are dining together. Choose two staple or personal dishes, one meat dish, and one vegetable dish while keeping the total under NT$1,000.

Observes:

- awareness of table composition
- duplicate or omitted roles
- use of portion information
- corrective actions after reviewing the cart or table state

### Task 5 — browse freely

> There are no special constraints. Browse as you normally would and choose what you actually want to eat.

Observes:

- whether the interface supports slow exploration
- whether participants feel pushed into premature decisions
- appetite formation and use of images or descriptions
- natural use of candidates versus the cart

## Behavioral measures

### Orientation

- time to identify major categories
- time to estimate price range
- incorrect assumptions about menu completeness
- category backtracking
- attempts to locate the complete menu

### Decision process

- time to first serious candidate
- number of candidates considered
- repeated visits to the same product
- add-then-delete actions in the cart
- modifier abandonment
- comparison use
- decision reversals

### Continuity

- loss of scroll position
- failure to return to a previous category
- lost candidates after lens changes
- confusion between candidate, decided, and submitted states
- attempts to use browser back as navigation recovery

### Table reasoning

- missing or duplicated meal roles
- awareness of personal versus shared items
- portion-related corrections
- time spent reconstructing what the table has already chosen
- changes after seeing table composition

### Completion quality

- task success
- constraint violations
- accidental duplicate items
- final total accuracy
- need for moderator clarification

## Subjective measures

After each condition, ask participants to rate or discuss:

- I understood the overall menu before choosing.
- I could keep track of dishes I was considering.
- I knew when I had merely considered an item versus committed to it.
- I could return to where I was browsing.
- I trusted why filtered or recommended dishes appeared.
- I felt free to browse the complete menu.
- I understood what the table had chosen.
- I felt rushed into configuring or ordering.

The most revealing open question may be:

> Did this feel more like looking through a menu or operating an ordering system? Why?

## Interpretation cautions

### Faster is not always better

Longer time may indicate confusion, but it may also reflect enjoyable exploration. Interpret completion time alongside confidence, reversals, and observed behavior.

### More items is not always better

A larger order can result from confidence or manipulative upselling. Do not use average basket size as the primary success metric.

### Fewer taps is not always better

A visible, reversible comparison step may add taps while reducing uncertainty and post-order correction.

### Recommendation acceptance is not proof

Participants may accept plausible recommendations without understanding the menu. Measure whether they know what was excluded and can access the full menu.

## Merchant authoring study

Give restaurant operators or proxy participants a 30-product dataset and ask them to:

1. review imported basic data
2. assign category defaults
3. correct product exceptions
4. confirm or reject suggested semantic values
5. preview the customer experience
6. mark one item sold out
7. change one category-level default without overwriting intentional exceptions

Measure:

- total actions and elapsed time
- percentage covered by category defaults
- number of exceptions
- uncertainty by field
- mistakes caused by terminology
- willingness to maintain each field
- perceived responsibility for each field

Ask explicitly:

- Which values would become stale first?
- Which values should come from the kitchen or POS instead?
- Which fields would you refuse to maintain?
- Which customer benefit would justify the work?

## Instrumentation for the coded demo

Record local, non-identifying events such as:

```text
view_overview
jump_to_category
open_product_detail
close_product_detail
add_candidate
remove_candidate
open_comparison
decide_product
start_configuration
cancel_configuration
add_decided_item
change_lens
open_table_workspace
submit_order_round
```

Include context needed to understand continuity:

- source lens
- category
- previous and restored scroll position
- candidate count
- decided-item count
- whether metadata was complete

The first demo does not require remote analytics. Exporting a local event log after a session is sufficient.

## Initial success signals

Menu Lens is promising when participants:

- form an accurate overview earlier
- use candidates without treating the cart as a bookmark
- revisit fewer product details solely to remember differences
- preserve orientation after opening details or changing lenses
- distinguish consideration, decision, and submission
- compose shared meals with fewer corrective actions
- retain confidence that the full menu remains accessible

The merchant model is promising when:

- category defaults cover most products
- exceptions remain manageable
- uncertain values are clearly identified
- incomplete metadata degrades features without breaking ordering
- merchants can explain who owns each maintained field

## Evidence that should cause redesign

- users ignore or misunderstand the candidate workspace
- lenses make users fear that products are hidden
- stable full-menu browsing is slower without improving confidence
- table guidance is interpreted as prescriptive upselling
- product semantics require extensive item-by-item maintenance
- participants cannot distinguish inferred from merchant-confirmed information
- preserving multiple states creates more confusion than continuity

The project should treat these as falsification signals, not usability polish to be hidden by visual refinement.
