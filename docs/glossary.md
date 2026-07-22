# Shared glossary

Use these terms consistently across documents, data, code, issues, and conversations.

## Product terms

### Menu map

The overview layer that communicates menu scope, category structure, item counts, price ranges, and where a user can begin.

It is not a recommendation screen and not a checkout screen.

### Product

The canonical menu item as maintained by the restaurant.

A product owns stable identity and base commercial data such as name, category, price, availability, description, and available configuration.

Preferred code term: `Product`.

### Lens

A way of viewing the same canonical menu for a particular decision context.

Examples include full-menu, quick, shared-table, and featured lenses.

A lens may group, sort, annotate, or filter products. It must not create a separately maintained catalog.

Preferred code term: `Lens`.

### Full-menu lens

The complete, stable, directly accessible reading experience.

It is the baseline product experience, not an escape hatch from recommendations.

Preferred code value: `"full-menu"`.

### Candidate

A product the user is seriously considering but has not committed to ordering.

A candidate:

- has no required configuration
- has no quantity
- does not affect the order total
- may participate in comparison
- may be removed without changing the order

Preferred code term: `Candidate` or a `ProductId` stored in `candidates`.

Do not use `selected item`, `cart item`, or `draft order` as synonyms.

### Candidate workspace

The persistent decision area containing considered products and actions such as remove, compare, or decide to order.

It is not a renamed cart.

### Comparison

A temporary decision aid over two or more candidates, limited to attributes that materially affect choice.

Comparison does not create copies of products and does not imply commitment.

### Decision

An explicit transition from considering a product to intending to order it.

A decision may start required configuration. It is stronger than selection or opening detail, but remains reversible until submission.

Preferred event term: `decide_product`.

### Configuration

Required or optional ordering choices attached after explicit decision, such as size, spice level, quantity, or add-ons.

Preferred code term: `Configuration`.

Avoid `modifier flow` when discussing the broader product boundary; modifiers are one implementation of configuration.

### Draft order item

A product the user has decided to order and is currently configuring or reviewing before submission.

It is distinct from both a candidate and a submitted item.

Preferred code term: `DraftOrderItem`.

### Current order

The collection of configured draft order items that may be submitted together.

The current order may be shown alongside candidates, but the two collections must remain distinct.

### Submitted order round

A batch of order items formally submitted at one moment.

Submitted rounds remain visible so a table can understand what has already been ordered and continue with later rounds.

Preferred code term: `SubmittedOrderRound`.

### Table state

A visible summary of candidates, current order, submitted rounds, total, party size, and coarse meal composition.

Table state is broader than the cart.

### Browsing context

The user's current orientation within the menu, including category, scroll position, expanded product, and active lens.

Preferred code term: `BrowsingContext`.

### Decision constraints

Explicit conditions used to narrow or explain a view, such as budget, coarse preparation class, dietary fit, or party size.

Preferred code term: `DecisionConstraints`.

## Merchant-data terms

### Basic product data

Data required for complete-menu browsing and ordinary ordering, such as product identity, name, price, category, availability, and required configuration.

### Semantic metadata

Decision-support information such as meal role, portion class, flavor traits, sharing suitability, or coarse preparation class.

Semantic metadata enhances the experience but must not be required for a product to appear in the complete menu.

### Category default

A semantic value applied to products in a category unless a product has an intentional override.

### Product override

An explicit exception to a category default for one product.

### Metadata source

Where a value came from, for example merchant-confirmed, imported, inferred, or estimated.

### Metadata confidence

How strongly the interface may present a value based on its source and confirmation state.

Confidence affects wording and eligibility for guidance; it must not rewrite the underlying product identity.

### Graceful degradation

The behavior where missing semantic metadata removes only the enhanced feature that depends on it while preserving complete-menu visibility and ordinary ordering.

## Terms to avoid

Avoid these ambiguous terms unless they are carefully qualified:

- `selected` — may mean focused, checked, considered, or committed
- `chosen` — unclear whether configuration has begun
- `added` — unclear whether added to candidates or order
- `cart item` — should refer only to a conventional cart model, not Menu Lens candidates
- `recommendation` — use only when the source and reason are visible
- `smart` — does not describe behavior or evidence
- `AI-generated` — does not establish authority, confidence, or correctness