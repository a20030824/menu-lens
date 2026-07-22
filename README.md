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

## Design principles

- The full menu is a first-class experience, not a fallback.
- Browsing is not ordering.
- A candidate list is not a cart.
- Product details should not destroy browsing position or spatial memory.
- Modifiers should appear after explicit purchase intent.
- Quick, shared-table, and featured views are lenses over one menu—not separate catalogs.
- Switching lenses must preserve candidates, selected items, constraints, and browsing context.
- Recommendations must explain why an item is shown.
- Merchant data requirements should support progressive enhancement.
- Missing metadata should reduce features gracefully, not make products disappear.
- Wrong operational information is worse than absent information.

## Initial demo scope

### Customer experience

- menu overview and category map
- dense full-menu browsing
- inline product details
- candidate list separate from the cart
- meaningful comparison between candidates
- configuration only after deciding to order
- visible table composition and order state
- lightweight quick-decision, shared-table, and featured lenses

### Merchant experience

- imported basic product data
- category-level semantic defaults
- exception-based product editing
- confidence and source of metadata
- preview of how incomplete data affects the customer experience

### Explicitly out of scope

- payment
- authentication and membership
- POS or KDS integration
- live inventory and precise preparation-time prediction
- real-time multi-device collaboration
- opaque AI recommendations
- production restaurant operations

## Repository status

This repository begins as a design and research core. The product architecture will be added only after the primary interaction model and evaluation plan are clear.

See [`docs/`](docs/) for the problem framing, interaction model, merchant data strategy, demo scope, and evaluation plan.
