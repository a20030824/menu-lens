import type { CategoryId, Menu, ProductId } from "../domain/menu-types.js";
import {
  categoryScrollBehavior,
  closeProductDetail,
  collapseProductDetail,
  createCompleteMenuModel,
  createInitialMenuReadingState,
  expandProductDetail,
  focusCategory,
  focusProduct,
  productDetailFor,
  setActiveCategory,
  showAllCategories,
  showMenuOverview,
  type MenuReadingState,
} from "../customer/menu-reading.js";
import { createMenuOverview, type MenuOverviewView } from "./menu-overview.js";
import { createProductDetailView, type ProductDetailView } from "./product-detail.js";

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
  let detailView: ProductDetailView;

  const render = (): void => {
    overview.render(state);
    detailView.render(productDetailFor(model, state.focusedProductId), state.detailLevel);
  };

  const closeDetail = (): void => {
    const result = closeProductDetail(state);
    const sourceButton = result.focusProductId
      ? overview.productButtonFor(result.focusProductId)
      : null;
    const sourceTop = sourceButton?.getBoundingClientRect().top ?? null;

    state = result.state;
    render();

    const focusProductId = result.focusProductId;
    if (focusProductId) {
      window.requestAnimationFrame(() => {
        const button = overview.productButtonFor(focusProductId);
        if (!button) return;

        if (sourceTop !== null) {
          const nextTop = button.getBoundingClientRect().top;
          const correction = nextTop - sourceTop;
          if (Math.abs(correction) > 0.5) {
            window.scrollBy({ top: correction, behavior: "auto" });
          }
        }

        button.focus({ preventScroll: true });
      });
    }
  };

  const selectCategory = (categoryId: CategoryId): void => {
    const isSameFocusedCategory =
      state.expansion.kind === "category" && state.expansion.categoryId === categoryId;
    state = isSameFocusedCategory ? showMenuOverview(state) : focusCategory(state, categoryId);
    render();
  };

  const selectProduct = (productId: ProductId): void => {
    state = focusProduct(state, productId);
    render();
  };

  const showOverviewFromContext = (): void => {
    state = showMenuOverview(state);
    render();
    window.requestAnimationFrame(() => {
      overview.element.scrollIntoView({
        block: "start",
        behavior: categoryScrollBehavior(reducedMotion()),
      });
    });
  };

  const showAll = (): void => {
    state = showAllCategories(state);
    render();
  };

  overview = createMenuOverview(
    model,
    selectCategory,
    selectProduct,
    showOverviewFromContext,
    showAll,
  );
  detailView = createProductDetailView(
    closeDetail,
    () => {
      state = expandProductDetail(state);
      render();
    },
    () => {
      state = collapseProductDetail(state);
      render();
    },
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
  workspace.append(overview.element, detailView.element);
  headerInner.append(summaryCopy, metrics);
  header.append(headerInner);
  shell.append(header, workspace);
  root.replaceChildren(shell);
  render();

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
      state = setActiveCategory(state, activeCategoryId);
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
