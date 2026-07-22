# Merchant data strategy

## Why merchant cost is part of the product

A customer-facing prototype can appear convincing while quietly depending on metadata that restaurants do not currently own or cannot maintain.

Menu Lens therefore treats merchant authoring cost, data ownership, confidence, and graceful degradation as core design constraints.

The main cost is not initial data entry alone. It is continued semantic maintenance across menu changes, branches, shifts, availability, staff roles, and operational systems.

## Progressive enhancement model

### Tier 1 — basic transactional data

Usually already available from a menu or POS system:

- product ID
- name
- price
- category
- availability
- description or image when available
- required modifier groups
- legally or operationally required dietary and allergen information

Tier 1 should already support:

- category overview
- category counts and price ranges
- stable dense browsing
- inline details
- candidate workspace
- separation between browsing and ordering

A restaurant must not be punished with a broken experience because richer semantic fields are absent.

### Tier 2 — coarse semantic data

Enables decision lenses and table composition support:

- meal role
- portion class
- preparation class
- shareability
- flavor traits
- editorial featured status

These values should be intentionally coarse. The purpose is to support understandable distinctions, not to model food with false precision.

Example types:

```ts
type ProductSemantics = {
  role:
    | "personal_main"
    | "shared_main"
    | "side"
    | "staple"
    | "drink"
    | "dessert";
  portion:
    | "small"
    | "one_person"
    | "two_to_three"
    | "large_shared";
  preparation: "fast" | "normal" | "slow";
  shareable: boolean;
  traits: Array<"light" | "rich" | "spicy" | "vegetarian">;
  featured: boolean;
};
```

### Tier 3 — dynamic operational data

Potentially enables live status:

- stock and sold-out state
- kitchen load
- workstation queue
- recent preparation-time range
- synchronized serving constraints
- order fulfillment state

Tier 3 should come from operational integrations such as POS, KDS, or inventory systems. It should not be maintained manually at product level during service.

When precise live information is not trustworthy, prefer coarse and honest status:

- `炸物類目前等待較久`

rather than:

- `預計 11 分鐘`

## Authoring model

### Category defaults, product exceptions

The merchant should assign broad defaults to a category, then edit exceptions.

Example:

```text
Category: 飯類

Default role: personal main
Default portion: one person
Default preparation: normal
Shareable: no

Apply to 14 products
```

The system can then surface likely exceptions such as a two-person set or children's meal.

This is preferable to asking the merchant to complete a long form for every product.

### Suggested, not silently inferred

Rules or AI may propose draft values based on:

- category
- product name
- description
- existing modifiers
- neighboring products

The merchant should confirm or reject suggestions when the value affects customer decisions.

Automation must not independently declare:

- allergens
- exact ingredients
- vegan or religious dietary compliance
- exact preparation time
- legal nutrition information

### Confidence and source

Semantic fields should retain source and confidence.

```ts
type MetadataSource =
  | "merchant_confirmed"
  | "category_default"
  | "system_suggested"
  | "operational_integration"
  | "recent_order_estimate";

type MetadataValue<T> = {
  value: T;
  source: MetadataSource;
  updatedAt?: string;
};
```

The customer interface may alter language according to source:

- merchant-confirmed: `適合 2–3 人分享`
- category default: `通常作為共享料理`
- recent estimate: `近期通常需要較久等待`

Unconfirmed values should never be presented with the same authority as verified facts.

## Graceful degradation

Products with only Tier 1 data remain visible and orderable in the complete menu.

Missing Tier 2 data may mean that a product:

- is not used in a narrow quick-decision result
- appears with fewer comparison dimensions
- does not contribute to portion or composition guidance
- displays `份量資訊尚未提供`

The item should not silently disappear from the complete menu.

For the demo, approximately 20% of products should intentionally have incomplete semantic metadata. This verifies that the architecture does not require full annotation to remain coherent.

## Governance

Different fields may have different authorities:

- owner or headquarters: name, pricing policy, brand description
- branch manager: local availability and branch overrides
- kitchen: portion and preparation class
- front of house: common customer questions and shareability guidance
- marketing: featured story and imagery
- POS/KDS integration: live stock and order state

Every maintained field should have a plausible answer to:

1. Who is allowed to set it?
2. Who is expected to update it?
3. What happens when it becomes stale?
4. Which source wins when values conflict?

## Merchant tooling requirements

A production path would eventually require:

- bulk editing
- category defaults and inheritance
- exception highlighting
- multi-store shared definitions
- branch overrides
- scheduled menu states
- draft preview
- change history
- rollback
- stale-data indicators

The first demo needs only enough tooling to test whether category defaults and exception editing make semantic annotation acceptable.

## Merchant-side research questions

- Which fields can staff answer confidently?
- Which terms are misunderstood or require examples?
- How many products can be handled by category defaults?
- How many exceptions require manual correction?
- Which metadata changes frequently enough to become burdensome?
- Which values should come from operations rather than authoring?
- Does the customer benefit justify each additional field?

A field should not enter the permanent model merely because it makes a prototype look richer.
