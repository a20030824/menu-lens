import type { ProductDetailModel } from "../customer/menu-reading.js";

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

export type ProductFocusRail = Readonly<{
  element: HTMLElement;
  render: (detail: ProductDetailModel | null) => void;
  focusMoreInfo: () => void;
}>;

export const createProductFocusRail = (
  onMoreInfo: () => void,
  onClear: () => void,
): ProductFocusRail => {
  const rail = element("aside", "product-focus-rail");
  rail.hidden = true;
  rail.dataset.open = "false";
  rail.setAttribute("aria-label", "目前查看的商品");
  rail.setAttribute("aria-live", "polite");

  const copy = element("div", "product-focus-rail__copy");
  const context = element("p", "product-focus-rail__context");
  const headingRow = element("div", "product-focus-rail__heading-row");
  const name = element("h2", "product-focus-rail__name");
  const price = element("p", "product-focus-rail__price");
  headingRow.append(name, price);
  const cues = element("p", "product-focus-rail__cues");
  copy.append(context, headingRow, cues);

  const actions = element("div", "product-focus-rail__actions");
  const moreInfoButton = element(
    "button",
    "product-focus-rail__more",
    "更多資訊",
  ) as HTMLButtonElement;
  moreInfoButton.type = "button";
  moreInfoButton.addEventListener("click", onMoreInfo);

  const clearButton = element(
    "button",
    "product-focus-rail__clear",
    "收起",
  ) as HTMLButtonElement;
  clearButton.type = "button";
  clearButton.addEventListener("click", onClear);
  actions.append(moreInfoButton, clearButton);
  rail.append(copy, actions);

  return {
    element: rail,
    render: (detail) => {
      const isOpen = detail !== null;
      rail.hidden = !isOpen;
      rail.dataset.open = String(isOpen);
      if (!detail) {
        context.textContent = "";
        name.textContent = "";
        price.textContent = "";
        cues.textContent = "";
        return;
      }

      context.textContent = `${detail.categoryName} · ${detail.availabilityLabel}`;
      name.textContent = detail.name;
      price.textContent = detail.price;
      const cueValues = detail.summaryFacts.slice(0, 2).map((fact) => fact.value);
      cues.textContent =
        cueValues.length > 0
          ? cueValues.join(" · ")
          : detail.metadataNotice ?? "尚無額外閱讀線索";
      moreInfoButton.setAttribute("aria-label", `查看 ${detail.name} 的更多資訊`);
      clearButton.setAttribute("aria-label", `收起 ${detail.name} 的商品聚焦`);
    },
    focusMoreInfo: () => {
      if (!rail.hidden) moreInfoButton.focus({ preventScroll: true });
    },
  };
};
