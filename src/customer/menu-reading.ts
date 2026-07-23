import type {
  Category,
  CategoryId,
  CoarseTrait,
  MealRole,
  Menu,
  MetadataConfidence,
  PortionClass,
  Product,
  ProductId,
} from "../domain/menu-types.js";
import {
  hasCompleteComparisonSemantics,
  resolveProductSemantics,
} from "../domain/menu-validation.js";

export type MenuExpansion =
  | Readonly<{ kind: "overview" }>
  | Readonly<{ kind: "category"; categoryId: CategoryId }>
  | Readonly<{ kind: "all" }>;

export type MenuReadingState = Readonly<{
  activeCategoryId: CategoryId | null;
  expansion: MenuExpansion;
}>;

export type ProductNodeModel = Readonly<{
  id: ProductId;
  categoryId: CategoryId;
  name: string;
  price: string;
  availabilityLabel: "供應中" | "已售完";
  isSoldOut: boolean;
  primaryCue: string | null;
  secondaryCue: string | null;
  metadataCompleteness: "complete" | "partial";
}>;

export type CategoryReadingModel = Readonly<{
  id: CategoryId;
  name: string;
  productCount: number;
  availableCount: number;
  soldOutCount: number;
  partialMetadataCount: number;
  priceRange: string;
  structuralSummary: string;
  relativeCount: number;
  previewProductNames: ReadonlyArray<string>;
  products: ReadonlyArray<ProductNodeModel>;
}>;

export type CompleteMenuModel = Readonly<{
  restaurantName: string;
  restaurantDescription: string;
  productCount: number;
  categoryCount: number;
  priceRange: string;
  categories: ReadonlyArray<CategoryReadingModel>;
}>;

const moneyFormatter = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0,
});

const roleLabels: Record<MealRole, string> = {
  personal_main: "個人主餐",
  shared_main: "分享主菜",
  side: "小食或配菜",
  staple: "飯麵主食",
  drink: "飲品",
  dessert: "甜點",
};

const portionLabels: Record<PortionClass, string> = {
  small: "小份",
  one_person: "一人份",
  two_to_three: "約 2–3 人",
  large_shared: "多人分享",
};

const traitLabels: Record<CoarseTrait, string> = {
  light: "清爽",
  rich: "濃郁",
  spicy: "辣味",
  vegetarian: "素食",
};

export const formatPrice = (price: number): string => moneyFormatter.format(price);

const categoryProducts = (menu: Menu, categoryId: CategoryId): ReadonlyArray<Product> =>
  menu.products.filter((product) => product.categoryId === categoryId);

const priceRange = (products: ReadonlyArray<Product>): string => {
  if (products.length === 0) return "—";
  const prices = products.map((product) => product.price);
  const minimum = Math.min(...prices);
  const maximum = Math.max(...prices);
  return minimum === maximum
    ? formatPrice(minimum)
    : `${formatPrice(minimum)}–${formatPrice(maximum)}`;
};

const isTrusted = (confidence: MetadataConfidence): boolean => confidence !== "low";

const metadataCompleteness = (
  menu: Menu,
  product: Product,
): ProductNodeModel["metadataCompleteness"] =>
  hasCompleteComparisonSemantics(resolveProductSemantics(menu, product)) ? "complete" : "partial";

const roleIsRedundantWithPortion = (
  role: MealRole | undefined,
  portion: PortionClass | undefined,
): boolean =>
  (role === "personal_main" && portion === "one_person") ||
  (role === "shared_main" && (portion === "two_to_three" || portion === "large_shared"));

const productCues = (
  menu: Menu,
  product: Product,
): Readonly<{ primaryCue: string | null; secondaryCue: string | null }> => {
  const semantics = resolveProductSemantics(menu, product);
  const trustedPortion =
    semantics.portionClass && isTrusted(semantics.portionClass.confidence)
      ? semantics.portionClass.value
      : undefined;
  const trustedRole =
    semantics.mealRole && isTrusted(semantics.mealRole.confidence)
      ? semantics.mealRole.value
      : undefined;
  const trustedTrait =
    semantics.traits && isTrusted(semantics.traits.confidence)
      ? semantics.traits.value[0]
      : undefined;

  const portionCue = trustedPortion ? portionLabels[trustedPortion] : null;
  const roleCue = trustedRole ? roleLabels[trustedRole] : null;
  const traitCue = trustedTrait ? traitLabels[trustedTrait] : null;
  const primaryCue = portionCue ?? roleCue ?? traitCue;

  if (traitCue && traitCue !== primaryCue) {
    return { primaryCue, secondaryCue: traitCue };
  }
  if (
    roleCue &&
    roleCue !== primaryCue &&
    !roleIsRedundantWithPortion(trustedRole, trustedPortion)
  ) {
    return { primaryCue, secondaryCue: roleCue };
  }
  return { primaryCue, secondaryCue: null };
};

const dominantMealRole = (
  menu: Menu,
  products: ReadonlyArray<Product>,
): MealRole | null => {
  const availableProducts = products.filter((product) => product.availability === "available");
  const counts = new Map<MealRole, number>();

  availableProducts.forEach((product) => {
    const mealRole = resolveProductSemantics(menu, product).mealRole;
    if (!mealRole || !isTrusted(mealRole.confidence)) return;
    counts.set(mealRole.value, (counts.get(mealRole.value) ?? 0) + 1);
  });

  let strongestRole: MealRole | null = null;
  let strongestCount = 0;
  for (const [role, count] of counts) {
    if (count > strongestCount) {
      strongestRole = role;
      strongestCount = count;
    }
  }

  if (!strongestRole || availableProducts.length === 0) return null;
  return strongestCount >= Math.ceil(availableProducts.length / 2) ? strongestRole : null;
};

const categoryStructuralSummary = (
  menu: Menu,
  category: Category,
  products: ReadonlyArray<Product>,
): string => {
  const role = dominantMealRole(menu, products);
  if (role) return `以${roleLabels[role]}為主`;
  if (category.description) return category.description;
  return `${products.filter((product) => product.availability === "available").length} 道目前供應`;
};

const createProductNodeModel = (menu: Menu, product: Product): ProductNodeModel => ({
  id: product.id,
  categoryId: product.categoryId,
  name: product.name,
  price: formatPrice(product.price),
  availabilityLabel: product.availability === "sold_out" ? "已售完" : "供應中",
  isSoldOut: product.availability === "sold_out",
  ...productCues(menu, product),
  metadataCompleteness: metadataCompleteness(menu, product),
});

export const createInitialMenuReadingState = (menu: Menu): MenuReadingState => ({
  activeCategoryId: menu.categories[0]?.id ?? null,
  expansion: { kind: "overview" },
});

export const focusCategory = (
  state: MenuReadingState,
  categoryId: CategoryId,
): MenuReadingState => ({
  ...state,
  activeCategoryId: categoryId,
  expansion: { kind: "category", categoryId },
});

export const showMenuOverview = (state: MenuReadingState): MenuReadingState => ({
  ...state,
  expansion: { kind: "overview" },
});

export const showAllCategories = (state: MenuReadingState): MenuReadingState => ({
  ...state,
  expansion: { kind: "all" },
});

export const setActiveCategory = (
  state: MenuReadingState,
  categoryId: CategoryId,
): MenuReadingState => ({ ...state, activeCategoryId: categoryId });

export const categoryIsExpanded = (
  state: MenuReadingState,
  categoryId: CategoryId,
): boolean =>
  state.expansion.kind === "all" ||
  (state.expansion.kind === "category" && state.expansion.categoryId === categoryId);

export const categoryScrollBehavior = (prefersReducedMotion: boolean): ScrollBehavior =>
  prefersReducedMotion ? "auto" : "smooth";

export const createCompleteMenuModel = (menu: Menu): CompleteMenuModel => {
  const productCounts = menu.categories.map(
    (category) => categoryProducts(menu, category.id).length,
  );
  const maximumProductCount = Math.max(0, ...productCounts);

  const categories = menu.categories.map((category) => {
    const products = categoryProducts(menu, category.id);
    const productModels = products.map((product) => createProductNodeModel(menu, product));
    const availableCount = products.filter(
      (product) => product.availability === "available",
    ).length;

    return {
      id: category.id,
      name: category.name,
      productCount: products.length,
      availableCount,
      soldOutCount: products.length - availableCount,
      partialMetadataCount: products.filter(
        (product) => metadataCompleteness(menu, product) === "partial",
      ).length,
      priceRange: priceRange(products),
      structuralSummary: categoryStructuralSummary(menu, category, products),
      relativeCount: maximumProductCount > 0 ? products.length / maximumProductCount : 0,
      previewProductNames: productModels
        .filter((product) => !product.isSoldOut)
        .slice(0, 2)
        .map((product) => product.name),
      products: productModels,
    } satisfies CategoryReadingModel;
  });

  return {
    restaurantName: menu.restaurant.name,
    restaurantDescription: menu.restaurant.description,
    productCount: menu.products.length,
    categoryCount: menu.categories.length,
    priceRange: priceRange(menu.products),
    categories,
  };
};
