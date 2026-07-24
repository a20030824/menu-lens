import type { CategoryId, Menu, ProductId } from "../domain/menu-types.js";
import type { SemanticAxis } from "../customer/menu-anchor-axis.js";
import {
  beginAnchorSelection,
  cancelAnchorSelection,
  categoryScrollBehavior,
  clearAnchor,
  createCompleteMenuModel,
  createInitialMenuReadingState,
  focusCategory,
  isAnchorSelectionCancelKey,
  selectAnchor,
  setActiveCategory,
  setSemanticAxis,
  showAllCategories,
  showMenuOverview,
  type MenuReadingState,
} from "../customer/menu-reading.js";
import { createMenuOverview, type MenuOverviewView } from "./menu-overview.js";

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

const reducedMotion = (): boolean =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const mountMenuApp = (root: HTMLElement, menu: Menu): void => {
  const model = createCompleteMenuModel(menu);
  let state: MenuReadingState = createInitialMenuReadingState(menu);
  let overview: MenuOverviewView;

  const render = (): void => overview.render(state);

  const selectCategory = (categoryId: CategoryId): void => {
    const isSameFocusedCategory =
      state.expansion.kind === "category" && state.expansion.categoryId === categoryId;
    state = isSameFocusedCategory
      ? showMenuOverview(state)
      : focusCategory(state, menu, categoryId);
    render();
  };

  const beginAnchor = (): void => {
    state = beginAnchorSelection(state);
    render();
  };

  const cancelAnchor = (): void => {
    const categoryId = state.expansion.kind === "category" ? state.expansion.categoryId : null;
    state = cancelAnchorSelection(state);
    render();
    if (categoryId) overview.focusAnchorControl(categoryId);
  };

  const chooseAnchor = (productId: ProductId): void => {
    const categoryId = state.expansion.kind === "category" ? state.expansion.categoryId : null;
    state = selectAnchor(state, menu, productId);
    render();
    if (categoryId && state.anchorReading.kind === "active") {
      overview.focusProductRelation(categoryId, productId);
    }
  };

  const clearCurrentAnchor = (): void => {
    const categoryId = state.expansion.kind === "category" ? state.expansion.categoryId : null;
    state = clearAnchor(state);
    render();
    if (categoryId) overview.focusAnchorControl(categoryId);
  };

  const chooseSemanticAxis = (axis: SemanticAxis): void => {
    state = setSemanticAxis(state, menu, axis);
    render();
  };

  const showOverviewFromContext = (): void => {
    state = showMenuOverview(state);
    render();
    overview.element.scrollIntoView({
      block: "start",
      behavior: categoryScrollBehavior(reducedMotion()),
    });
  };

  const showAll = (): void => {
    state = showAllCategories(state);
    render();
  };

  overview = createMenuOverview(
    model,
    selectCategory,
    beginAnchor,
    cancelAnchor,
    chooseAnchor,
    clearCurrentAnchor,
    chooseSemanticAxis,
    showOverviewFromContext,
    showAll,
  );

  const shell = element("div", "menu-shell");
  const header = element("header", "restaurant-summary");
  const headerInner = element("div", "restaurant-summary__inner");
  const summaryCopy = element("div", "restaurant-summary__copy");
  summaryCopy.append(
    element("p", "eyebrow", "完整菜單"),
    element("h1", "restaurant-title", model.restaurantName),
    element("p", "restaurant-description", model.restaurantDescription),
  );

  const metrics = element("dl", "menu-metrics");
  const metricValues = [
    ["品項", `${model.productCount} 道`],
    ["區域", `${model.categoryCount} 類`],
    ["價位", model.priceRange],
  ] as const;
  metricValues.forEach(([label, value]) => {
    const item = element("div", "menu-metric");
    item.append(
      element("dt", "menu-metric__label", label),
      element("dd", "menu-metric__value", value),
    );
    metrics.append(item);
  });

  const workspace = element("div", "reading-workspace");
  workspace.id = "complete-menu";
  workspace.append(overview.element);
  headerInner.append(summaryCopy, metrics);
  header.append(headerInner);
  shell.append(header, workspace);
  root.replaceChildren(shell);
  render();

  document.addEventListener("keydown", (event) => {
    if (state.anchorReading.kind !== "selecting" || !isAnchorSelectionCancelKey(event.key)) return;
    event.preventDefault();
    cancelAnchor();
  });

  let scrollFrame: number | null = null;
  const syncAllModePosition = (): void => {
    scrollFrame = null;
    if (state.expansion.kind !== "all") return;
    const marker = window.innerHeight * 0.32;
    let activeCategoryId = model.categories[0]?.id ?? null;
    model.categories.forEach((category) => {
      const section = overview.sectionFor(category.id);
      if (section && section.getBoundingClientRect().top <= marker) {
        activeCategoryId = category.id;
      }
    });
    if (activeCategoryId && activeCategoryId !== state.activeCategoryId) {
      state = setActiveCategory(state, menu, activeCategoryId);
      render();
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(syncAllModePosition);
    },
    { passive: true },
  );
};
