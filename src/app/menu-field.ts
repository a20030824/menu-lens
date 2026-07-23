import type { CategoryId } from "../domain/menu-types.js";
import type { CompleteMenuModel } from "../customer/menu-reading.js";

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

const visuallyHiddenText = (text: string): HTMLSpanElement => {
  const span = element("span", "visually-hidden", text);
  return span;
};

export type MenuFieldView = Readonly<{
  element: HTMLElement;
  sections: ReadonlyMap<CategoryId, HTMLElement>;
}>;

export const createMenuField = (model: CompleteMenuModel): MenuFieldView => {
  const sections = new Map<CategoryId, HTMLElement>();
  const menu = element("section", "menu-field");
  menu.id = "complete-menu";
  menu.setAttribute("aria-labelledby", "complete-menu-title");
  menu.setAttribute("tabindex", "-1");

  const heading = element("div", "menu-field__heading");
  const title = element(
    "h2",
    "menu-field__title",
    `${model.productCount} 道料理，共享同一份完整菜單`,
  );
  title.id = "complete-menu-title";
  heading.append(
    element("p", "eyebrow", "完整菜單"),
    title,
    element(
      "p",
      "menu-field__hint",
      "商品依固定分類與原始順序排列；區域不會因目前位置而被隱藏。",
    ),
  );
  menu.append(heading);

  model.categories.forEach((category) => {
    const section = element("section", "menu-category");
    section.id = `category-${category.id}`;
    section.setAttribute("tabindex", "-1");
    section.setAttribute("aria-labelledby", `category-title-${category.id}`);
    sections.set(category.id, section);

    const header = element("header", "menu-category__header");
    const copy = element("div", "menu-category__copy");
    const categoryTitle = element("h2", "menu-category__title", category.name);
    categoryTitle.id = `category-title-${category.id}`;
    copy.append(
      categoryTitle,
      element("p", "menu-category__summary", category.structuralSummary),
    );
    const metrics = element("p", "menu-category__metrics");
    metrics.append(
      element("strong", undefined, `${category.productCount} 道`),
      document.createTextNode(` · ${category.priceRange}`),
    );
    header.append(copy, metrics);

    const productList = element("ul", "product-grid");
    category.products.forEach((product) => {
      const item = element(
        "li",
        product.isSoldOut ? "product-node product-node--sold-out" : "product-node",
      );
      item.dataset.productId = product.id;
      const top = element("div", "product-node__top");
      const name = element("h3", "product-node__name", product.name);
      const price = element("p", "product-node__price", product.price);
      top.append(name, price);

      const cues = element("p", "product-node__cues");
      if (product.primaryCue) cues.append(element("span", undefined, product.primaryCue));
      if (product.secondaryCue) {
        cues.append(document.createTextNode(" · "), element("span", undefined, product.secondaryCue));
      }
      if (!product.primaryCue && !product.secondaryCue) {
        cues.append(element("span", "product-node__cue-placeholder", "基本商品資訊"));
      }

      const signals = element("p", "product-node__signals");
      if (product.isSoldOut) {
        signals.append(element("span", "status status--sold-out", product.availabilityLabel));
      } else {
        signals.append(visuallyHiddenText(product.availabilityLabel));
      }
      if (product.metadataCompleteness === "partial") {
        signals.append(element("span", "metadata-signal", "部分比較資訊"));
      }

      item.append(top, cues, signals);
      productList.append(item);
    });

    section.append(header, productList);
    menu.append(section);
  });

  return { element: menu, sections };
};
