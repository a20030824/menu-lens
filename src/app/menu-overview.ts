import type { CategoryId, ProductId } from "../domain/menu-types.js";
import {
  categoryIsExpanded,
  type CompleteMenuModel,
  type MenuReadingState,
} from "../customer/menu-reading.js";
import { createMenuCategorySection } from "./menu-category.js";

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

export type MenuOverviewView = Readonly<{
  element: HTMLElement;
  render: (state: MenuReadingState) => void;
  sectionFor: (categoryId: CategoryId) => HTMLElement | null;
  focusAnchorControl: (categoryId: CategoryId) => void;
}>;

export const createMenuOverview = (
  model: CompleteMenuModel,
  onSelectCategory: (categoryId: CategoryId) => void,
  onBeginAnchorSelection: () => void,
  onCancelAnchorSelection: () => void,
  onSelectAnchor: (productId: ProductId) => void,
  onClearAnchor: () => void,
  onShowOverview: () => void,
  onShowAll: () => void,
): MenuOverviewView => {
  const root = element("main", "menu-map");
  root.id = "menu-map";
  root.dataset.mode = "overview";

  const context = element("div", "menu-context");
  context.hidden = true;
  const overviewButton = element("button", "menu-context__back", "菜單全貌") as HTMLButtonElement;
  overviewButton.type = "button";
  overviewButton.addEventListener("click", onShowOverview);
  const contextLabel = element("p", "menu-context__label");
  const showAllButton = element("button", "menu-context__all", "展開全部") as HTMLButtonElement;
  showAllButton.type = "button";
  showAllButton.addEventListener("click", onShowAll);
  context.append(overviewButton, contextLabel, showAllButton);

  const intro = element("header", "menu-map__heading");
  const title = element("h2", "menu-map__title", "整張菜單先縮成六個區域");
  title.id = "menu-map-title";
  intro.append(
    element("p", "eyebrow", "菜單全貌"),
    title,
    element(
      "p",
      "menu-map__hint",
      "先看每區的份量、價位與代表菜名；點一區會在原位置展開，其他區域仍留在整張菜單裡。",
    ),
  );

  const stack = element("div", "category-stack");
  const sections = model.categories.map((category, index) =>
    createMenuCategorySection(
      category,
      index,
      onSelectCategory,
      onBeginAnchorSelection,
      onCancelAnchorSelection,
      onSelectAnchor,
      onClearAnchor,
    ),
  );
  sections.forEach((section) => stack.append(section.element));

  const footer = element("div", "menu-map__footer");
  const footerAllButton = element(
    "button",
    "menu-map__all-button",
    `展開全部 ${model.productCount} 道`,
  ) as HTMLButtonElement;
  footerAllButton.type = "button";
  footerAllButton.addEventListener("click", onShowAll);
  footer.append(footerAllButton);

  root.append(context, intro, stack, footer);

  const render = (state: MenuReadingState): void => {
    root.dataset.mode = state.expansion.kind;
    context.hidden = state.expansion.kind === "overview";
    footer.hidden = state.expansion.kind === "all";
    showAllButton.hidden = state.expansion.kind === "all";

    const activeIndex = model.categories.findIndex(
      (category) => category.id === state.activeCategoryId,
    );
    const activeCategory = activeIndex >= 0 ? model.categories[activeIndex] : undefined;

    if (state.expansion.kind === "category") {
      const categoryContext = activeCategory
        ? `${activeIndex + 1} / ${model.categoryCount}　${activeCategory.name}　${activeCategory.productCount} 道`
        : "分類聚焦";
      const anchorProductId = state.anchorReading.kind === "active"
        ? state.anchorReading.productId
        : null;
      const anchorName = anchorProductId
        ? activeCategory?.products.find((product) => product.id === anchorProductId)?.name
        : null;
      contextLabel.textContent = anchorName
        ? `基準：${anchorName}　${activeCategory?.name ?? "分類聚焦"}`
        : state.anchorReading.kind === "selecting"
          ? `選擇比較基準　${activeCategory?.name ?? "分類聚焦"}`
          : categoryContext;
    } else if (state.expansion.kind === "all") {
      contextLabel.textContent = activeCategory
        ? `全部 ${model.productCount} 道　${activeIndex + 1} / ${model.categoryCount}　${activeCategory.name}`
        : `全部 ${model.productCount} 道`;
    } else {
      contextLabel.textContent = "";
    }
    contextLabel.title = contextLabel.textContent ?? "";

    sections.forEach((section) => {
      const isCurrent = state.expansion.kind !== "overview" && state.activeCategoryId === section.categoryId;
      section.setState(
        categoryIsExpanded(state, section.categoryId),
        isCurrent,
        state.expansion.kind === "category" && isCurrent
          ? state.anchorReading
          : { kind: "idle" },
        state.expansion.kind === "category" && isCurrent,
      );
    });
  };

  return {
    element: root,
    render,
    sectionFor: (categoryId) =>
      sections.find((section) => section.categoryId === categoryId)?.element ?? null,
    focusAnchorControl: (categoryId) =>
      sections.find((section) => section.categoryId === categoryId)?.focusAnchorControl(),
  };
};
