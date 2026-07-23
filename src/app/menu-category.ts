import type { CategoryId } from "../domain/menu-types.js";
import type { MenuReadingAxis } from "../customer/menu-relations.js";
import type {
  CategoryReadingModel,
  ProductNodeModel,
} from "../customer/menu-reading.js";
import { createCategoryReadingControl } from "./category-reading-control.js";

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

const axisHeading: Record<MenuReadingAxis, string> = {
  default: "閱讀線索",
  price: "同類價格",
  portion: "份量",
  role: "餐點角色",
  preparation: "準備節奏",
};

const defaultCueText = (product: ProductNodeModel): string =>
  [product.primaryCue, product.secondaryCue]
    .filter((cue): cue is string => cue !== null)
    .join(" · ");

const renderRelation = (
  target: HTMLElement,
  product: ProductNodeModel,
  axis: MenuReadingAxis,
): void => {
  target.dataset.axis = axis;
  target.replaceChildren();

  if (axis === "default") {
    const text = defaultCueText(product);
    if (text) {
      const cue = element("span", "product-row__relation-text", text);
      cue.title = text;
      target.append(cue);
    } else {
      target.append(
        visuallyHiddenText("無額外閱讀線索"),
        element("span", "product-row__cue-empty", "—"),
      );
    }
    return;
  }

  const value = product.axisValues[axis];
  if (value.kind === "default") {
    target.append(element("span", "product-row__cue-empty", "—"));
    return;
  }

  if (value.kind === "price") {
    const scale = element("span", "price-axis");
    scale.setAttribute("aria-label", value.label);
    const track = element("span", "price-axis__track");
    const marker = element("span", "price-axis__marker");
    marker.style.insetInlineStart = `${Math.round(value.position * 100)}%`;
    track.append(marker);
    scale.append(track, visuallyHiddenText(value.label));
    if (value.scale === "single") scale.dataset.scale = "single";
    target.append(scale);
    return;
  }

  const text = element(
    "span",
    value.status === "unknown"
      ? "product-row__relation-text product-row__relation-text--unknown"
      : "product-row__relation-text",
    value.label,
  );
  text.title = value.label;
  target.append(text);
};

export type MenuCategorySection = Readonly<{
  element: HTMLElement;
  categoryId: CategoryId;
  setState: (
    expanded: boolean,
    current: boolean,
    readingAxis: MenuReadingAxis,
    axisControlVisible: boolean,
  ) => void;
}>;

export const createMenuCategorySection = (
  category: CategoryReadingModel,
  index: number,
  onSelectCategory: (categoryId: CategoryId) => void,
  onSelectAxis: (axis: MenuReadingAxis) => void,
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
  band.addEventListener("click", () => onSelectCategory(category.id));

  const reveal = element("div", "category-reveal");
  reveal.id = `category-products-${category.id}`;
  reveal.setAttribute("aria-hidden", "true");
  reveal.setAttribute("inert", "");
  const revealInner = element("div", "category-reveal__inner");
  const readingControl = createCategoryReadingControl(category.id, onSelectAxis);
  const ledger = element("table", "product-ledger");
  const caption = element("caption", "visually-hidden", `${category.name}商品列表`);
  const columns = element("colgroup");
  ["index", "name", "cue", "price"].forEach((column) => {
    columns.append(element("col", `product-ledger__col product-ledger__col--${column}`));
  });

  const ledgerHead = element("thead");
  const ledgerHeadRow = element("tr");
  const cueHeading = element(
    "th",
    "product-ledger__heading product-ledger__heading--cue",
    axisHeading.default,
  );
  cueHeading.scope = "col";
  const headings = [
    ["序", "product-ledger__heading product-ledger__heading--index"],
    ["菜名", "product-ledger__heading product-ledger__heading--name"],
  ] as const;
  headings.forEach(([label, className]) => {
    const heading = element("th", className, label);
    heading.scope = "col";
    ledgerHeadRow.append(heading);
  });
  ledgerHeadRow.append(cueHeading);
  const priceHeading = element(
    "th",
    "product-ledger__heading product-ledger__heading--price",
    "價格",
  );
  priceHeading.scope = "col";
  ledgerHeadRow.append(priceHeading);
  ledgerHead.append(ledgerHeadRow);

  const relationTargets = new Map<string, HTMLElement>();
  const ledgerBody = element("tbody");
  category.products.forEach((product, productIndex) => {
    const row = element(
      "tr",
      product.isSoldOut ? "product-row product-row--sold-out" : "product-row",
    );
    row.dataset.productId = product.id;

    const indexCell = element(
      "td",
      "product-row__index",
      String(productIndex + 1).padStart(2, "0"),
    );
    const nameCell = element("th", "product-row__name", product.name);
    nameCell.scope = "row";

    const cueCell = element("td", "product-row__cues");
    const relation = element("span", "product-row__relation");
    renderRelation(relation, product, "default");
    cueCell.append(relation);

    const status = element("span", "product-row__status");
    if (product.isSoldOut) {
      status.append(element("span", "status-text status-text--sold-out", product.availabilityLabel));
    } else {
      status.append(visuallyHiddenText(product.availabilityLabel));
    }
    if (product.metadataCompleteness === "partial") {
      status.append(element("span", "status-text", "資訊有限"));
    }
    cueCell.append(status);

    const priceCell = element("td", "product-row__price", product.price);
    row.append(indexCell, nameCell, cueCell, priceCell);
    ledgerBody.append(row);
    relationTargets.set(product.id, relation);
  });

  ledger.append(caption, columns, ledgerHead, ledgerBody);
  revealInner.append(readingControl.element, ledger);
  reveal.append(revealInner);
  section.append(band, reveal);

  let renderedAxis: MenuReadingAxis = "default";
  const setState = (
    expanded: boolean,
    current: boolean,
    readingAxis: MenuReadingAxis,
    axisControlVisible: boolean,
  ): void => {
    section.dataset.expanded = String(expanded);
    section.dataset.current = String(current);
    band.setAttribute("aria-expanded", String(expanded));
    if (current) band.setAttribute("aria-current", "true");
    else band.removeAttribute("aria-current");
    reveal.setAttribute("aria-hidden", String(!expanded));
    if (expanded) reveal.removeAttribute("inert");
    else reveal.setAttribute("inert", "");
    readingControl.setState(readingAxis, axisControlVisible);

    if (renderedAxis !== readingAxis) {
      category.products.forEach((product) => {
        const target = relationTargets.get(product.id);
        if (target) renderRelation(target, product, readingAxis);
      });
      cueHeading.textContent = axisHeading[readingAxis];
      renderedAxis = readingAxis;
    }
  };

  return { element: section, categoryId: category.id, setState };
};
