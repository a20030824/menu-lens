# Problem framing

## The observed problem

QR ordering has existed long enough that many implementations are technically competent but still feel harder to read than paper menus.

The problem is not primarily visual quality. It is a mismatch between the structure of restaurant decision-making and the structure exposed by commerce software.

A typical implementation renders the operational data model directly:

```text
category → product → modifier group → modifier → cart → checkout
```

That model is useful to POS and fulfillment systems, but it omits several forms of editorial and social work that a good paper menu performs:

- establishing the scale and structure of the menu
- grouping dishes into meaningful families
- showing price ranges and relative differences
- preserving nearby alternatives in view
- helping a table compose a meal rather than accumulate products
- separating curiosity from commitment

The result is often a product-card waterfall followed by a sequence of forms. The interface asks users to transact before they have formed a stable understanding of the menu.

## The missing layer

Menu Lens proposes a decision layer between browsing and transaction.

```text
menu map
    ↓
decision workspace
    ↓
transaction system
```

### Menu map

Answers:

- What kind of restaurant is this?
- What categories exist?
- How many choices are there?
- What are the approximate price ranges?
- Where should I begin, and can I still see everything?

### Decision workspace

Answers:

- Which dishes am I considering?
- How do they differ in ways that matter?
- Which items have I actually decided to order?
- What has the table already chosen?
- Is the meal composition unbalanced or incomplete?

### Transaction system

Answers:

- Which required modifiers must be selected?
- What quantity is needed?
- Which order round is being sent?
- What is the total?
- How is the order submitted and paid?

Most existing systems begin at the third layer and simulate the first two with category tabs, large photos, popularity labels, and a cart.

## Core claims to test

1. **Overview before detail reduces orientation cost.**
   Users should be able to understand the menu's scale, categories, and price range before opening individual products.

2. **Browsing and commitment are distinct states.**
   A person can seriously consider an item without choosing modifiers or adding it to the order.

3. **Stable spatial context supports memory.**
   Product details should open without losing the user's position in the menu.

4. **A table is not merely a shared cart.**
   People reason about roles, portions, variety, ownership, and order rounds—not only line items and totals.

5. **Different intentions should be lenses over one source of truth.**
   Quick selection, shared-table planning, editorial highlights, and full browsing should not create independent catalogs.

6. **Merchant cost determines whether richer interaction is viable.**
   A design that requires extensive manual semantic annotation is not successful, even if the customer prototype looks persuasive.

## What this project is not claiming

Menu Lens does not assume that every customer wants recommendations, that every meal should be optimized, or that paper menus should be copied literally.

It also does not claim that speed is always the objective. Slow exploration, curiosity, appetite formation, and conversation are legitimate parts of ordering.

The aim is to support several styles of decision-making without forcing users into a questionnaire or hiding the full menu.

## Product risks

- turning the landing screen into an intake form
- allowing modes to become separate and inconsistent catalogs
- dynamically reordering products and destroying spatial memory
- using the candidate list as another name for the cart
- making recommendations opaque or overly authoritative
- requiring precise metadata that merchants cannot maintain
- optimizing only conversion rate, average ticket size, or completion time
- presenting inferred allergens, dietary status, or preparation times as facts
- designing only for a single diner and ignoring table ownership and order rounds

## Working success criterion

A successful demo should make users say that they were **looking through a menu and arranging a meal**, while still allowing them to complete an order with less confusion and fewer corrective actions.
