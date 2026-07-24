import type {
  MealRole,
  Menu,
  MetadataConfidence,
  PortionClass,
  PreparationClass,
  Product,
} from "../domain/menu-types.js";
import { resolveProductSemantics } from "../domain/menu-validation.js";

export type MenuReadingAxis =
  | "default"
  | "price"
  | "portion"
  | "role"
  | "preparation";

export type PricePosition = Readonly<{
  position: number;
  minimum: number;
  maximum: number;
  scale: "range" | "single";
}>;

export type AxisValue =
  | Readonly<{ kind: "default" }>
  | Readonly<{
      kind: "price";
      label: string;
      position: number;
      scale: "range" | "single";
    }>
  | Readonly<{
      kind: "text";
      label: string;
      status: "known" | "unknown";
    }>;

const relationalAxes = ["price", "portion", "role", "preparation"] as const;

const portionLabels: Record<PortionClass, string> = {
  small: "小份",
  one_person: "一人份",
  two_to_three: "約 2–3 人",
  large_shared: "多人分享",
};

const roleLabels: Record<MealRole, string> = {
  personal_main: "個人主餐",
  shared_main: "分享主菜",
  side: "小食或配菜",
  staple: "飯麵主食",
  drink: "飲品",
  dessert: "甜點",
};

const preparationLabels: Record<PreparationClass, string> = {
  fast: "較快",
  normal: "一般準備",
  slow: "需要較久",
};

const isTrusted = (confidence: MetadataConfidence): boolean => confidence !== "low";

export const pricePositionFor = (
  product: Product,
  categoryProducts: ReadonlyArray<Product>,
): PricePosition => {
  const prices = categoryProducts.map((entry) => entry.price);
  const minimum = prices.length > 0 ? Math.min(...prices) : product.price;
  const maximum = prices.length > 0 ? Math.max(...prices) : product.price;

  if (minimum === maximum) {
    return { position: 0.5, minimum, maximum, scale: "single" };
  }

  return {
    position: Math.min(1, Math.max(0, (product.price - minimum) / (maximum - minimum))),
    minimum,
    maximum,
    scale: "range",
  };
};

const trustedLabel = <T>(
  entry: Readonly<{ value: T; confidence: MetadataConfidence }> | undefined,
  labels: Readonly<Record<string, string>>,
): AxisValue => {
  if (!entry || !isTrusted(entry.confidence)) {
    return { kind: "text", label: "未提供", status: "unknown" };
  }
  return {
    kind: "text",
    label: labels[String(entry.value)] ?? "未提供",
    status: labels[String(entry.value)] ? "known" : "unknown",
  };
};

export const axisValueFor = (
  menu: Menu,
  product: Product,
  categoryProducts: ReadonlyArray<Product>,
  axis: MenuReadingAxis,
): AxisValue => {
  if (axis === "default") return { kind: "default" };

  if (axis === "price") {
    const projection = pricePositionFor(product, categoryProducts);
    return {
      kind: "price",
      position: projection.position,
      scale: projection.scale,
      label:
        projection.scale === "single"
          ? "同類商品價格相同"
          : `同類價格刻度 ${Math.round(projection.position * 100)}%`,
    };
  }

  const semantics = resolveProductSemantics(menu, product);
  if (axis === "portion") return trustedLabel(semantics.portionClass, portionLabels);
  if (axis === "role") return trustedLabel(semantics.mealRole, roleLabels);
  return trustedLabel(semantics.preparationClass, preparationLabels);
};

const comparisonKeyFor = (
  menu: Menu,
  product: Product,
  categoryProducts: ReadonlyArray<Product>,
  axis: Exclude<MenuReadingAxis, "default">,
): string => {
  if (axis === "price") return `price:${product.price}`;
  const value = axisValueFor(menu, product, categoryProducts, axis);
  if (value.kind !== "text") return value.kind;
  return `${value.status}:${value.label}`;
};

export const availableReadingAxesFor = (
  menu: Menu,
  categoryProducts: ReadonlyArray<Product>,
): ReadonlyArray<MenuReadingAxis> => {
  const available: MenuReadingAxis[] = ["default"];
  if (categoryProducts.length < 3) return available;

  relationalAxes.forEach((axis) => {
    const distinctValues = new Set(
      categoryProducts.map((product) => comparisonKeyFor(menu, product, categoryProducts, axis)),
    );
    if (distinctValues.size > 1) available.push(axis);
  });

  return available;
};
