import type { CategoryId } from "../domain/menu-types.js";
import type { CategoryReadingModel } from "../customer/menu-reading.js";

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

export type MenuStructureViews = Readonly<{
  desktop: HTMLElement;
  mobile: HTMLElement;
  controls: ReadonlyMap<CategoryId, ReadonlyArray<HTMLButtonElement>>;
}>;

export const createMenuStructureViews = (
  categories: ReadonlyArray<CategoryReadingModel>,
  onSelectCategory: (categoryId: CategoryId) => void,
): MenuStructureViews => {
  const controls = new Map<CategoryId, HTMLButtonElement[]>();
  const register = (categoryId: CategoryId, button: HTMLButtonElement): void => {
    const entries = controls.get(categoryId) ?? [];
    entries.push(button);
    controls.set(categoryId, entries);
  };

  const desktop = element("nav", "menu-structure");
  desktop.setAttribute("aria-label", "菜單結構與位置");
  const heading = element("div", "menu-structure__heading");
  heading.append(
    element("p", "eyebrow", "菜單結構"),
    element("h2", "menu-structure__title", "六個固定區域"),
    element("p", "menu-structure__hint", "長度表示各區品項比例；點選只會移動位置。"),
  );
  const list = element("div", "menu-structure__list");

  categories.forEach((category, index) => {
    const button = element("button", "structure-link") as HTMLButtonElement;
    button.type = "button";
    button.setAttribute("aria-controls", `category-${category.id}`);
    button.setAttribute(
      "aria-label",
      `${category.name}，${category.productCount} 道，${category.priceRange}，${category.structuralSummary}`,
    );
    const top = element("span", "structure-link__top");
    top.append(
      element("span", "structure-link__index", String(index + 1).padStart(2, "0")),
      element("span", "structure-link__name", category.name),
      element("span", "structure-link__count", String(category.productCount)),
    );
    const meta = element(
      "span",
      "structure-link__meta",
      `${category.priceRange} · ${category.structuralSummary}`,
    );
    const meter = element("span", "structure-link__meter");
    const fill = element("span", "structure-link__meter-fill");
    fill.style.inlineSize = `${Math.round(category.relativeCount * 100)}%`;
    meter.append(fill);
    button.append(top, meta, meter);
    button.addEventListener("click", () => onSelectCategory(category.id));
    register(category.id, button);
    list.append(button);
  });

  desktop.append(heading, list);

  const mobile = element("nav", "category-locator");
  mobile.setAttribute("aria-label", "目前菜單位置");
  const mobileList = element("div", "category-locator__list");
  categories.forEach((category) => {
    const button = element("button", "category-locator__link") as HTMLButtonElement;
    button.type = "button";
    button.setAttribute("aria-controls", `category-${category.id}`);
    button.append(
      element("span", "category-locator__name", category.name),
      element("span", "category-locator__count", String(category.productCount)),
    );
    button.addEventListener("click", () => onSelectCategory(category.id));
    register(category.id, button);
    mobileList.append(button);
  });
  mobile.append(mobileList);

  return { desktop, mobile, controls };
};

export const updateMenuStructureActive = (
  controls: ReadonlyMap<CategoryId, ReadonlyArray<HTMLButtonElement>>,
  categoryId: CategoryId,
): void => {
  controls.forEach((entries, id) => {
    entries.forEach((entry) => {
      if (id === categoryId) {
        entry.setAttribute("aria-current", "true");
        if (entry.classList.contains("category-locator__link")) {
          entry.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" });
        }
      } else {
        entry.removeAttribute("aria-current");
      }
    });
  });
};
