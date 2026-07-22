export type ProductId = string;
export type CategoryId = string;
export type ModifierGroupId = string;
export type ModifierOptionId = string;
export type DraftOrderItemId = string;
export type ConfiguredOrderItemId = string;
export type OrderRoundId = string;

export type Availability = "available" | "sold_out";
export type MealRole =
  | "personal_main"
  | "shared_main"
  | "side"
  | "staple"
  | "drink"
  | "dessert";
export type PortionClass =
  | "small"
  | "one_person"
  | "two_to_three"
  | "large_shared";
export type PreparationClass = "fast" | "normal" | "slow";
export type CoarseTrait = "light" | "rich" | "spicy" | "vegetarian";
export type MetadataSource = "merchant_confirmed" | "category_default";
export type MetadataConfidence = "high" | "medium" | "low";

export type MetadataValue<T> = Readonly<{
  value: T;
  source: MetadataSource;
  confidence: MetadataConfidence;
}>;

export type ProductSemantics = Readonly<{
  mealRole?: MetadataValue<MealRole>;
  portionClass?: MetadataValue<PortionClass>;
  preparationClass?: MetadataValue<PreparationClass>;
  shareable?: MetadataValue<boolean>;
  traits?: MetadataValue<ReadonlyArray<CoarseTrait>>;
}>;

export type Category = Readonly<{
  id: CategoryId;
  name: string;
  description?: string;
  semanticDefaults?: ProductSemantics;
}>;

export type ModifierOption = Readonly<{
  id: ModifierOptionId;
  name: string;
  priceDelta: number;
}>;

export type ModifierGroup = Readonly<{
  id: ModifierGroupId;
  name: string;
  required: boolean;
  minimumSelections: number;
  maximumSelections: number;
  options: ReadonlyArray<ModifierOption>;
  defaultOptionIds?: ReadonlyArray<ModifierOptionId>;
}>;

export type EditorialFeature = Readonly<{
  note: string;
  source: "merchant_confirmed";
}>;

export type Product = Readonly<{
  id: ProductId;
  name: string;
  description: string;
  price: number;
  categoryId: CategoryId;
  availability: Availability;
  modifierGroupIds?: ReadonlyArray<ModifierGroupId>;
  semanticOverrides?: ProductSemantics;
  featured?: EditorialFeature;
}>;

export type Restaurant = Readonly<{
  id: string;
  name: string;
  description: string;
  currency: "TWD";
}>;

export type Menu = Readonly<{
  restaurant: Restaurant;
  categories: ReadonlyArray<Category>;
  modifierGroups: ReadonlyArray<ModifierGroup>;
  products: ReadonlyArray<Product>;
}>;

export type Candidate = Readonly<{
  productId: ProductId;
  quantity?: never;
  configuration?: never;
  selections?: never;
}>;

export type ModifierSelection = Readonly<{
  modifierGroupId: ModifierGroupId;
  optionIds: ReadonlyArray<ModifierOptionId>;
}>;

export type DraftOrderItem = Readonly<{
  state: "draft";
  id: DraftOrderItemId;
  productId: ProductId;
  quantity: number;
  selections?: never;
  configuration?: never;
}>;

export type Configuration = Readonly<{
  selections: ReadonlyArray<ModifierSelection>;
}>;

export type ConfiguredOrderItem = Readonly<{
  state: "configured";
  id: ConfiguredOrderItemId;
  productId: ProductId;
  quantity: number;
  configuration: Configuration;
}>;

export type SubmittedOrderRound = Readonly<{
  state: "submitted";
  id: OrderRoundId;
  submittedAt: string;
  items: ReadonlyArray<ConfiguredOrderItem>;
}>;
