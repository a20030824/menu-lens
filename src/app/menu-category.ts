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

const visuallyHiddenText = (text: string): HTMLSpanElement =>
  element("span", "visually-hidden", text);

export type MenuCategorySection = Readonly<{
  element: HTMLElement;
  categoryId: CategoryId;
  setState: (expanded: boolean, current: boolean) => void;
}>;

export const createMenuCategorySection = (
  category: CategoryReadingModel,
  index: number,
  onSelect: (categoryId: CategoryId) => void,
): MenuCategorySection => {
  const section = element("section", "menu-category-zone");
  section.id = `category-${category.id}`;
  section.dataset.categoryId = category.id;
  section.dataset.expanded = "false";
  section.dataset.current = "false";

  const band = element("button", "category-band") as HTMLButtonElement;
  band.type = "button";
  band.setAttribute("aria-expanded", "false");
  band.setAttribute("aria-controls", `category-products-${category.id}`);
  band.setAttribute(
    "aria-label",
    `${category.name}，${category.productCount} 道，${category.priceRange}，${category.structuralSummary}`,
  );

  const top = element("span", "category-band__top");
  top.append(
    element("span", "category-band__index", String(index + 1).padStart(2, "0")),
    element("span", "category-band__name", category.name),
    element("span", "category-band__count", `${category.productCount} 道`),
  );

  const meta = element(
    "span",
    "category-band__meta",
    `${category.priceRange} · ${category.structuralSummary}`,
  );

  const previewRemainder = Math.max(0, category.productCount - category.previewProductNames.length);
  const previewParts = [...category.previewProductNames];
  if (previewRemainder > 0) previewParts.push(`另外 ${previewRemainder} 道`);
  const preview = element("span", "category-band__preview", previewParts.join(" · "));

  const meter = element("span", "category-band__meter");
  const meterFill = element("span", "category-band__meter-fill");
  meterFill.style.inlineSize = `${Math.round(category.relativeCount * 100)}%`;
  meter.append(meterFill);

  band.append(top, meta, preview, meter);
  band.addEventListener("click", () => onSelect(category.id));

  const reveal = element("div", "category-reveal");
  reveal.id = `category-products-${category.id}`;
  reveal.setAttribute("aria-hidden", "true");
  reveal.setAttribute("inert", "");
  const revealInner = element("div", "category-reveal__inner");
  const products = element("ul", "product-list");

  category.products.forEach((product) => {
    const item = element(
      "li",
      product.isSoldOut ? "product-row product-row--sold-out" : "product-row",
    );
    item.dataset.productId = product.id;

    const heading = element("div", "product-row__heading");
    heading.append(
      element("h3", "product-row__name", product.name),
      element("p", "product-row__price", product.price),
    );

    const cues = element("p", "product-row__cues");
    if (product.primaryCue) cues.append(element("span", undefined, product.primaryCue));
    if (product.secondaryCue) {
      cues.append(document.createTextNode(" · "), element("span", undefined, product.secondaryCue));
    }
    if (!product.primaryCue && !product.secondaryCue) {
      cues.append(element("span", "product-row__cue-placeholder", "基本商品資訊"));
    }

    const signals = element("p", "product-row__signals");
    if (product.isSoldOut) {
      signals.append(element("span", "status-text status-text--sold-out", product.availabilityLabel));
    } else {
      signals.append(visuallyHiddenText(product.availabilityLabel));
    }
    if (product.metadataCompleteness === "partial") {
      signals.append(element("span", "status-text", "部分比較資訊"));
    }

    item.append(heading, cues, signals);
    products.append(item);
  });

  revealInner.append(products);
  reveal.append(revealInner);
  section.append(band, reveal);

  const setState = (expanded: boolean, current: boolean): void => {
    section.dataset.expanded = String(expanded);
    section.dataset.current = String(current);
    band.setAttribute("aria-expanded", String(expanded));
    if (current) band.setAttribute("aria-current", "true");
    else band.removeAttribute("aria-current");
    reveal.setAttribute("aria-hidden", String(!expanded));
    if (expanded) reveal.removeAttribute("inert");
    else reveal.setAttribute("inert", "");
  };

  return { element: section, categoryId: category.id, setState };
};
