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
} from "../domain/menu-types.js";
import {
  hasCompleteComparisonSemantics,
  productRequiresConfiguration,
  resolveProductSemantics,
} from "../domain/menu-validation.js";

export type MenuReadingState = Readonly<{
  expandedProductId: ProductId | null;
  activeCategoryId: CategoryId | null;
}>;

export type AtlasRegionSize = "small" | "medium" | "large";

export type CategoryAtlasModel = Readonly<{
  id: CategoryId;
  name: string;
  productCount: number;
  availableCount: number;
  soldOutCount: number;
  partialMetadataCount: number;
  priceRange: string;
  size: AtlasRegionSize;
  structuralSummary: string;
  representativeProducts: ReadonlyArray<string>;
}>;

export type CategoryReadingModel = Readonly<{
  id: CategoryId;
  name: string;
  description: string | null;
  productCount: number;
  priceRange: string;
  products: ReadonlyArray<ProductReadingModel>;
}>;

export type ProductReadingModel = Readonly<{
  id: ProductId;
  categoryId: CategoryId;
  name: string;
  description: string;
  price: string;
  availabilityLabel: "供應中" | "已售完";
  isSoldOut: boolean;
  traits: ReadonlyArray<string>;
  metadataCompleteness: "complete" | "partial";
}>;

export type DetailFact = Readonly<{
  label: string;
  value: string;
  evidence: string;
}>;

export type ProductDetailModel = Readonly<{
  productId: ProductId;
  title: string;
  description: string;
  price: string;
  availabilityLabel: "供應中" | "已售完";
  facts: ReadonlyArray<DetailFact>;
  metadataNotice: string | null;
  configurationNotice: string | null;
}>;

export type CompleteMenuModel = Readonly<{
  restaurantName: string;
  restaurantDescription: string;
  productCount: number;
  categoryCount: number;
  priceRange: string;
  atlasCategories: ReadonlyArray<CategoryAtlasModel>;
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
  two_to_three: "約 2–3 人分享",
  large_shared: "多人分享份量",
};

const preparationLabels: Record<PreparationClass, string> = {
  fast: "出餐較快",
  normal: "一般準備節奏",
  slow: "需要較多準備時間",
};

const traitLabels: Record<CoarseTrait, string> = {
  light: "清爽",
  rich: "濃郁",
  spicy: "辣味",
  vegetarian: "素食",
};

const sourceLabels: Record<MetadataSource, string> = {
  merchant_confirmed: "餐廳確認",
  category_default: "依類別提供",
};

const confidenceLabels: Record<MetadataConfidence, string> = {
  high: "高可信度",
  medium: "一般可信度",
  low: "低可信度",
};

export const formatPrice = (price: number): string => moneyFormatter.format(price);

const formatEvidence = (source: MetadataSource, confidence: MetadataConfidence): string =>
  `${sourceLabels[source]} · ${confidenceLabels[confidence]}`;

const productTraits = (menu: Menu, product: Product): ReadonlyArray<string> =>
  (resolveProductSemantics(menu, product).traits?.value ?? []).map((trait) => traitLabels[trait]);

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

const metadataCompleteness = (
  menu: Menu,
  product: Product,
): ProductReadingModel["metadataCompleteness"] =>
  hasCompleteComparisonSemantics(resolveProductSemantics(menu, product)) ? "complete" : "partial";

export const categoryAtlasSize = (productCount: number): AtlasRegionSize => {
  if (productCount >= 7) return "large";
  if (productCount >= 4) return "medium";
  return "small";
};

const dominantMealRole = (
  menu: Menu,
  products: ReadonlyArray<Product>,
): MealRole | null => {
  const availableProducts = products.filter((product) => product.availability === "available");
  const counts = new Map<MealRole, number>();

  availableProducts.forEach((product) => {
    const mealRole = resolveProductSemantics(menu, product).mealRole;
    if (!mealRole || mealRole.confidence === "low") return;
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

  const availableCount = products.filter((product) => product.availability === "available").length;
  return `${availableCount} 道目前供應`;
};

const createCategoryAtlasModel = (
  menu: Menu,
  category: Category,
  products: ReadonlyArray<Product>,
): CategoryAtlasModel => {
  const availableProducts = products.filter((product) => product.availability === "available");
  const representativeSource = availableProducts.length > 0 ? availableProducts : products;

  return {
    id: category.id,
    name: category.name,
    productCount: products.length,
    availableCount: availableProducts.length,
    soldOutCount: products.length - availableProducts.length,
    partialMetadataCount: products.filter(
      (product) => metadataCompleteness(menu, product) === "partial",
    ).length,
    priceRange: priceRange(products),
    size: categoryAtlasSize(products.length),
    structuralSummary: categoryStructuralSummary(menu, category, products),
    representativeProducts: representativeSource.slice(0, 3).map((product) => product.name),
  };
};

const createProductReadingModel = (
  menu: Menu,
  product: Product,
): ProductReadingModel => ({
  id: product.id,
  categoryId: product.categoryId,
  name: product.name,
  description: product.description,
  price: formatPrice(product.price),
  availabilityLabel: product.availability === "sold_out" ? "已售完" : "供應中",
  isSoldOut: product.availability === "sold_out",
  traits: productTraits(menu, product),
  metadataCompleteness: metadataCompleteness(menu, product),
});

export const createInitialMenuReadingState = (menu: Menu): MenuReadingState => ({
  expandedProductId: null,
  activeCategoryId: menu.categories[0]?.id ?? null,
});

export const openProduct = (
  state: MenuReadingState,
  productId: ProductId,
): MenuReadingState => ({
  ...state,
  expandedProductId: productId,
});

export const closeProduct = (
  state: MenuReadingState,
): Readonly<{ state: MenuReadingState; focusProductId: ProductId | null }> => ({
  state: { ...state, expandedProductId: null },
  focusProductId: state.expandedProductId,
});

export const setActiveCategory = (
  state: MenuReadingState,
  categoryId: CategoryId,
): MenuReadingState => ({ ...state, activeCategoryId: categoryId });

export const categoryScrollBehavior = (prefersReducedMotion: boolean): ScrollBehavior =>
  prefersReducedMotion ? "auto" : "smooth";

export const isDetailCloseKey = (key: string): boolean => key === "Escape";

export const createCompleteMenuModel = (menu: Menu): CompleteMenuModel => {
  const categories = menu.categories.map((category) => {
    const products = categoryProducts(menu, category.id);
    return {
      id: category.id,
      name: category.name,
      description: category.description ?? null,
      productCount: products.length,
      priceRange: priceRange(products),
      products: products.map((product) => createProductReadingModel(menu, product)),
    };
  });

  return {
    restaurantName: menu.restaurant.name,
    restaurantDescription: menu.restaurant.description,
    productCount: menu.products.length,
    categoryCount: menu.categories.length,
    priceRange: priceRange(menu.products),
    atlasCategories: menu.categories.map((category) =>
      createCategoryAtlasModel(menu, category, categoryProducts(menu, category.id)),
    ),
    categories,
  };
};

export const createProductDetailModel = (
  menu: Menu,
  productId: ProductId,
): ProductDetailModel => {
  const product = menu.products.find((entry) => entry.id === productId);
  if (!product) throw new Error(`Unknown ProductId: ${productId}`);

  const semantics = resolveProductSemantics(menu, product);
  const facts: DetailFact[] = [];

  if (semantics.mealRole) {
    facts.push({
      label: "餐點角色",
      value: roleLabels[semantics.mealRole.value],
      evidence: formatEvidence(semantics.mealRole.source, semantics.mealRole.confidence),
    });
  }
  if (semantics.portionClass) {
    facts.push({
      label: "份量",
      value: portionLabels[semantics.portionClass.value],
      evidence: formatEvidence(semantics.portionClass.source, semantics.portionClass.confidence),
    });
  }
  if (semantics.preparationClass) {
    facts.push({
      label: "準備方式",
      value: preparationLabels[semantics.preparationClass.value],
      evidence: formatEvidence(
        semantics.preparationClass.source,
        semantics.preparationClass.confidence,
      ),
    });
  }
  if (semantics.shareable) {
    facts.push({
      label: "分享方式",
      value: semantics.shareable.value ? "適合分享" : "較適合一人享用",
      evidence: formatEvidence(semantics.shareable.source, semantics.shareable.confidence),
    });
  }
  if (semantics.traits) {
    facts.push({
      label: "風味特徵",
      value: semantics.traits.value.map((trait) => traitLabels[trait]).join("、"),
      evidence: formatEvidence(semantics.traits.source, semantics.traits.confidence),
    });
  }

  const requiredGroups = menu.modifierGroups.filter(
    (group) => group.required && product.modifierGroupIds?.includes(group.id),
  );

  return {
    productId: product.id,
    title: product.name,
    description: product.description,
    price: formatPrice(product.price),
    availabilityLabel: product.availability === "sold_out" ? "已售完" : "供應中",
    facts,
    metadataNotice: hasCompleteComparisonSemantics(semantics)
      ? null
      : "部分份量或料理資訊未提供；未提供的內容不作推測。",
    configurationNotice: productRequiresConfiguration(menu, product)
      ? `正式決定點餐後，需要選擇：${requiredGroups.map((group) => group.name).join("、")}。`
      : null,
  };
};
