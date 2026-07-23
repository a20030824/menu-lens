import type {
  Category,
  CategoryId,
  CoarseTrait,
  MealRole,
  Menu,
  MetadataConfidence,
  MetadataSource,
  PortionClass,
  PreparationClass,
  Product,
  ProductId,
  ProductSemantics,
} from "../domain/menu-types.js";
import {
  hasCompleteComparisonSemantics,
  productRequiresConfiguration,
  resolveProductSemantics,
} from "../domain/menu-validation.js";

export type MenuExpansion =
  | Readonly<{ kind: "overview" }>
  | Readonly<{ kind: "category"; categoryId: CategoryId }>
  | Readonly<{ kind: "all" }>;

export type ProductDetailLevel = "closed" | "summary" | "full";

export type MenuReadingState = Readonly<{
  activeCategoryId: CategoryId | null;
  expansion: MenuExpansion;
  focusedProductId: ProductId | null;
  detailLevel: ProductDetailLevel;
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

export type DetailFact = Readonly<{
  label: string;
  value: string;
}>;

export type EvidenceFact = Readonly<{
  label: string;
  value: string;
  sourceLabel: string;
  confidenceLabel: string;
}>;

export type ProductDetailModel = Readonly<{
  id: ProductId;
  categoryId: CategoryId;
  categoryName: string;
  name: string;
  description: string;
  price: string;
  availabilityLabel: "供應中" | "已售完";
  isSoldOut: boolean;
  summaryFacts: ReadonlyArray<DetailFact>;
  facts: ReadonlyArray<DetailFact>;
  evidenceFacts: ReadonlyArray<EvidenceFact>;
  featuredNote: string | null;
  metadataNotice: string | null;
  configurationNotice: string | null;
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
  productDetails: ReadonlyArray<ProductDetailModel>;
}>;

export type CloseProductDetailResult = Readonly<{
  state: MenuReadingState;
  focusProductId: ProductId | null;
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

const preparationLabels: Record<PreparationClass, string> = {
  fast: "較快",
  normal: "一般準備",
  slow: "需要較久",
};

const traitLabels: Record<CoarseTrait, string> = {
  light: "清爽",
  rich: "濃郁",
  spicy: "辣味",
  vegetarian: "素食",
};

const sourceLabels: Record<MetadataSource, string> = {
  merchant_confirmed: "餐廳確認",
  category_default: "分類預設",
};

const confidenceLabels: Record<MetadataConfidence, string> = {
  high: "高可信",
  medium: "中可信",
  low: "低可信",
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

  if (traitCue && traitCue !== primaryCue) return { primaryCue, secondaryCue: traitCue };
  if (roleCue && roleCue !== primaryCue && !roleIsRedundantWithPortion(trustedRole, trustedPortion)) {
    return { primaryCue, secondaryCue: roleCue };
  }
  return { primaryCue, secondaryCue: null };
};

const dominantMealRole = (menu: Menu, products: ReadonlyArray<Product>): MealRole | null => {
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

const semanticFacts = (semantics: ProductSemantics): ReadonlyArray<{
  fact: DetailFact;
  evidence: EvidenceFact;
  confidence: MetadataConfidence;
}> => {
  const facts: Array<{ fact: DetailFact; evidence: EvidenceFact; confidence: MetadataConfidence }> = [];
  const add = <T>(
    label: string,
    entry: { value: T; source: MetadataSource; confidence: MetadataConfidence } | undefined,
    format: (value: T) => string,
  ): void => {
    if (!entry) return;
    const value = format(entry.value);
    facts.push({
      fact: { label, value },
      evidence: {
        label,
        value,
        sourceLabel: sourceLabels[entry.source],
        confidenceLabel: confidenceLabels[entry.confidence],
      },
      confidence: entry.confidence,
    });
  };

  add("份量", semantics.portionClass, (value) => portionLabels[value]);
  add("餐點角色", semantics.mealRole, (value) => roleLabels[value]);
  add("特徵", semantics.traits, (value) => value.map((trait) => traitLabels[trait]).join("、"));
  add("準備節奏", semantics.preparationClass, (value) => preparationLabels[value]);
  add("分享方式", semantics.shareable, (value) => (value ? "適合分享" : "以個人食用為主"));
  return facts;
};

const createProductDetailModel = (
  menu: Menu,
  product: Product,
  categoryName: string,
): ProductDetailModel => {
  const semantics = resolveProductSemantics(menu, product);
  const semanticEntries = semanticFacts(semantics);
  const trustedFacts = semanticEntries
    .filter((entry) => isTrusted(entry.confidence))
    .map((entry) => entry.fact);
  const referencedGroups = menu.modifierGroups.filter((group) =>
    (product.modifierGroupIds ?? []).includes(group.id),
  );
  const configurationNotice = referencedGroups.length === 0
    ? null
    : productRequiresConfiguration(menu, product)
      ? "決定點餐後需要選擇規格；目前查看不會建立訂單。"
      : "決定點餐後可選擇額外規格；目前查看不會建立訂單。";

  return {
    id: product.id,
    categoryId: product.categoryId,
    categoryName,
    name: product.name,
    description: product.description,
    price: formatPrice(product.price),
    availabilityLabel: product.availability === "sold_out" ? "已售完" : "供應中",
    isSoldOut: product.availability === "sold_out",
    summaryFacts: trustedFacts.slice(0, 3),
    facts: trustedFacts,
    evidenceFacts: semanticEntries.map((entry) => entry.evidence),
    featuredNote: product.featured?.note ?? null,
    metadataNotice: hasCompleteComparisonSemantics(semantics)
      ? null
      : "部分比較資訊尚未提供；未顯示的欄位不作推測。",
    configurationNotice,
  };
};

export const clearProductFocus = (state: MenuReadingState): MenuReadingState => ({
  ...state,
  focusedProductId: null,
  detailLevel: "closed",
});

export const createInitialMenuReadingState = (menu: Menu): MenuReadingState => ({
  activeCategoryId: menu.categories[0]?.id ?? null,
  expansion: { kind: "overview" },
  focusedProductId: null,
  detailLevel: "closed",
});

export const focusCategory = (state: MenuReadingState, categoryId: CategoryId): MenuReadingState => ({
  ...clearProductFocus(state),
  activeCategoryId: categoryId,
  expansion: { kind: "category", categoryId },
});

export const showMenuOverview = (state: MenuReadingState): MenuReadingState => ({
  ...clearProductFocus(state),
  expansion: { kind: "overview" },
});

export const showAllCategories = (state: MenuReadingState): MenuReadingState => ({
  ...clearProductFocus(state),
  expansion: { kind: "all" },
});

export const setActiveCategory = (
  state: MenuReadingState,
  categoryId: CategoryId,
): MenuReadingState => ({ ...state, activeCategoryId: categoryId });

export const focusProduct = (
  state: MenuReadingState,
  productId: ProductId,
): MenuReadingState => ({
  ...state,
  focusedProductId: productId,
  detailLevel: "closed",
});

export const openProductDetail = (state: MenuReadingState): MenuReadingState =>
  state.focusedProductId ? { ...state, detailLevel: "summary" } : state;

export const expandProductDetail = (state: MenuReadingState): MenuReadingState =>
  state.focusedProductId && state.detailLevel !== "closed"
    ? { ...state, detailLevel: "full" }
    : state;

export const collapseProductDetail = (state: MenuReadingState): MenuReadingState =>
  state.focusedProductId && state.detailLevel === "full"
    ? { ...state, detailLevel: "summary" }
    : state;

export const closeProductDetail = (state: MenuReadingState): CloseProductDetailResult => ({
  state: { ...state, detailLevel: "closed" },
  focusProductId: state.focusedProductId,
});

export const categoryIsExpanded = (
  state: MenuReadingState,
  categoryId: CategoryId,
): boolean =>
  state.expansion.kind === "all" ||
  (state.expansion.kind === "category" && state.expansion.categoryId === categoryId);

export const categoryScrollBehavior = (prefersReducedMotion: boolean): ScrollBehavior =>
  prefersReducedMotion ? "auto" : "smooth";

export const productDetailFor = (
  model: CompleteMenuModel,
  productId: ProductId | null,
): ProductDetailModel | null =>
  productId ? model.productDetails.find((detail) => detail.id === productId) ?? null : null;

export const createCompleteMenuModel = (menu: Menu): CompleteMenuModel => {
  const productCounts = menu.categories.map((category) => categoryProducts(menu, category.id).length);
  const maximumProductCount = Math.max(0, ...productCounts);

  const categories = menu.categories.map((category) => {
    const products = categoryProducts(menu, category.id);
    const productModels = products.map((product) => createProductNodeModel(menu, product));
    const availableCount = products.filter((product) => product.availability === "available").length;
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

  const categoryNames = new Map(menu.categories.map((category) => [category.id, category.name]));
  return {
    restaurantName: menu.restaurant.name,
    restaurantDescription: menu.restaurant.description,
    productCount: menu.products.length,
    categoryCount: menu.categories.length,
    priceRange: priceRange(menu.products),
    categories,
    productDetails: menu.products.map((product) =>
      createProductDetailModel(menu, product, categoryNames.get(product.categoryId) ?? "未分類"),
    ),
  };
};
