import type { CategoryId, Menu } from "../domain/menu-types.js";
import {
  categoryScrollBehavior,
  createCompleteMenuModel,
  createInitialMenuReadingState,
  setActiveCategory,
  type MenuReadingState,
} from "../customer/menu-reading.js";
import { createMenuField } from "./menu-field.js";
import {
  createMenuStructureViews,
  updateMenuStructureActive,
} from "./menu-structure.js";
import { createCategoryInspector } from "./product-inspector.js";

const element = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

export const mountMenuApp = (root: HTMLElement, menu: Menu): void => {
  const model = createCompleteMenuModel(menu);
  let state: MenuReadingState = createInitialMenuReadingState(menu);
  const field = createMenuField(model);
  const inspector = createCategoryInspector();

  let structureViews: ReturnType<typeof createMenuStructureViews>;

  const updateActiveCategory = (categoryId: CategoryId): void => {
    state = setActiveCategory(state, categoryId);
    updateMenuStructureActive(structureViews.controls, categoryId);
    const category = model.categories.find((entry) => entry.id === categoryId);
    if (category) inspector.render(category);
  };

  const moveToCategory = (categoryId: CategoryId): void => {
    const section = field.sections.get(categoryId);
    if (!section) return;
    updateActiveCategory(categoryId);
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.focus({ preventScroll: true });
    section.scrollIntoView({
      block: "start",
      behavior: categoryScrollBehavior(prefersReducedMotion),
    });
  };

  structureViews = createMenuStructureViews(model.categories, moveToCategory);

  const shell = element("div", "menu-shell");
  const header = element("header", "restaurant-summary");
  const headerInner = element("div", "restaurant-summary__inner");
  const summaryCopy = element("div", "restaurant-summary__copy");
  summaryCopy.append(
    element("p", "eyebrow", "完整菜單閱讀工作區"),
    element("h1", "restaurant-title", model.restaurantName),
    element("p", "restaurant-description", model.restaurantDescription),
  );

  const metrics = element("dl", "menu-metrics");
  const metricValues = [
    ["菜單品項", `${model.productCount} 道`],
    ["分類", `${model.categoryCount} 類`],
    ["價格範圍", model.priceRange],
  ] as const;
  metricValues.forEach(([label, value]) => {
    const item = element("div", "menu-metric");
    item.append(
      element("dt", "menu-metric__label", label),
      element("dd", "menu-metric__value", value),
    );
    metrics.append(item);
  });
  headerInner.append(summaryCopy, metrics);
  header.append(headerInner);

  const workspace = element("div", "menu-workspace");
  workspace.append(structureViews.desktop, field.element, inspector.element);
  shell.append(header, structureViews.mobile, workspace);
  root.replaceChildren(shell);

  const initialCategoryId = state.activeCategoryId ?? model.categories[0]?.id;
  if (initialCategoryId) updateActiveCategory(initialCategoryId);

  let categoryScrollFrame: number | null = null;
  const syncActiveCategoryToScroll = (): void => {
    categoryScrollFrame = null;
    const marker = window.innerHeight * 0.3;
    let activeCategoryId = model.categories[0]?.id ?? null;

    field.sections.forEach((section, categoryId) => {
      if (section.getBoundingClientRect().top <= marker) activeCategoryId = categoryId;
    });

    const atDocumentEnd =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (atDocumentEnd) {
      activeCategoryId = model.categories.at(-1)?.id ?? activeCategoryId;
    }
    if (activeCategoryId && activeCategoryId !== state.activeCategoryId) {
      updateActiveCategory(activeCategoryId);
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      if (categoryScrollFrame !== null) return;
      categoryScrollFrame = window.requestAnimationFrame(syncActiveCategoryToScroll);
    },
    { passive: true },
  );
};
