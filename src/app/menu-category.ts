import type { CategoryId, ProductId } from "../domain/menu-types.js";
import type { AnchorRelation } from "../customer/menu-anchor-relations.js";
import type {
  AnchorReading,
  CategoryReadingModel,
  ProductNodeModel,
} from "../customer/menu-reading.js";
import { createCategoryAnchorControl } from "./category-anchor-control.js";

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

const defaultCueText = (product: ProductNodeModel): string =>
  [product.primaryCue, product.secondaryCue]
    .filter((cue): cue is string => cue !== null)
    .join(" · ");

const renderDefaultRelation = (target: HTMLElement, product: ProductNodeModel): void => {
  target.dataset.anchorMode = "idle";
  target.replaceChildren();
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
};

const renderSelectingRelation = (
  target: HTMLElement,
  product: ProductNodeModel,
  onSelectAnchor: (productId: ProductId) => void,
): void => {
  target.dataset.anchorMode = "selecting";
  target.replaceChildren();
  const button = element("button", "anchor-select-button", "作為基準") as HTMLButtonElement;
  button.type = "button";
  button.setAttribute("aria-label", `將「${product.name}」設為比較基準`);
  button.addEventListener("click", () => onSelectAnchor(product.id));
  target.append(button);
};

const renderActiveRelation = (
  target: HTMLElement,
  relation: AnchorRelation | undefined,
): void => {
  target.dataset.anchorMode = "active";
  target.replaceChildren();
  if (!relation) {
    target.append(visuallyHiddenText("無法建立相對關係"), element("span", "product-row__cue-empty", "—"));
    return;
  }

  const hasUnknown = relation.kind === "relative" && relation.tokens.some((token) => token.status === "unknown");
  const className = relation.kind === "anchor"
    ? "product-row__relation-text product-row__relation-text--anchor"
    : hasUnknown
      ? "product-row__relation-text product-row__relation-text--unknown"
      : "product-row__relation-text";
  const text = element("span", className, relation.label);
  text.title = relation.label;
  text.setAttribute("aria-label", relation.accessibleLabel);
  target.append(text);
};

export type MenuCategorySection = Readonly<{
  element: HTMLElement;
  categoryId: CategoryId;
  setState: (
    expanded: boolean,
    current: boolean,
    anchorReading: AnchorReading,
    anchorControlVisible: boolean,
  ) => void;
  focusAnchorControl: () => void;
}>;

export const createMenuCategorySection = (
  category: CategoryReadingModel,
  index: number,
  onSelectCategory: (categoryId: CategoryId) => void,
  onBeginAnchorSelection: () => void,
  onCancelAnchorSelection: () => void,
  onSelectAnchor: (productId: ProductId) => void,
  onClearAnchor: () => void,
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
  const anchorControl = createCategoryAnchorControl(
    category.id,
    onBeginAnchorSelection,
    onCancelAnchorSelection,
    onClearAnchor,
  );

  const ledger = element("table", "product-ledger");
  const caption = element("caption", "visually-hidden", `${category.name}商品列表`);
  const columns = element("colgroup");
  ["index", "name", "cue", "price"].forEach((column) => {
    columns.append(element("col", `product-ledger__col product-ledger__col--${column}`));
  });

  const ledgerHead = element("thead");
  const ledgerHeadRow = element("tr");
  const headings = [
    ["序", "product-ledger__heading product-ledger__heading--index"],
    ["菜名", "product-ledger__heading product-ledger__heading--name"],
  ] as const;
  headings.forEach(([label, className]) => {
    const heading = element("th", className, label);
    heading.scope = "col";
    ledgerHeadRow.append(heading);
  });
  const cueHeading = element(
    "th",
    "product-ledger__heading product-ledger__heading--cue",
    "閱讀線索",
  );
  cueHeading.scope = "col";
  cueHeading.title = "閱讀線索";
  ledgerHeadRow.append(cueHeading);
  const priceHeading = element(
    "th",
    "product-ledger__heading product-ledger__heading--price",
    "價格",
  );
  priceHeading.scope = "col";
  ledgerHeadRow.append(priceHeading);
  ledgerHead.append(ledgerHeadRow);

  const relationTargets = new Map<ProductId, HTMLElement>();
  const rows = new Map<ProductId, HTMLTableRowElement>();
  const ledgerBody = element("tbody");
  category.products.forEach((product, productIndex) => {
    const row = element(
      "tr",
      product.isSoldOut ? "product-row product-row--sold-out" : "product-row",
    ) as HTMLTableRowElement;
    row.dataset.productId = product.id;
    row.dataset.anchor = "false";

    const indexCell = element(
      "td",
      "product-row__index",
      String(productIndex + 1).padStart(2, "0"),
    );
    const nameCell = element("th", "product-row__name", product.name);
    nameCell.scope = "row";

    const cueCell = element("td", "product-row__cues");
    const relation = element("span", "product-row__relation");
    renderDefaultRelation(relation, product);
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
    rows.set(product.id, row);
  });

  ledger.append(caption, columns, ledgerHead, ledgerBody);
  revealInner.append(anchorControl.element, ledger);
  reveal.append(revealInner);
  section.append(band, reveal);

  let renderedState = "";
  const setState = (
    expanded: boolean,
    current: boolean,
    anchorReading: AnchorReading,
    anchorControlVisible: boolean,
  ): void => {
    section.dataset.expanded = String(expanded);
    section.dataset.current = String(current);
    band.setAttribute("aria-expanded", String(expanded));
    if (current) band.setAttribute("aria-current", "true");
    else band.removeAttribute("aria-current");
    reveal.setAttribute("aria-hidden", String(!expanded));
    if (expanded) reveal.removeAttribute("inert");
    else reveal.setAttribute("inert", "");

    const anchorProduct = anchorReading.kind === "active"
      ? category.products.find((product) => product.id === anchorReading.productId)
      : undefined;
    anchorControl.setState(
      anchorReading,
      anchorProduct?.name ?? null,
      anchorControlVisible && category.productCount >= 3,
    );

    const nextRenderedState = anchorReading.kind === "active"
      ? `active:${anchorReading.productId}`
      : anchorReading.kind;
    if (renderedState === nextRenderedState) return;

    category.products.forEach((product) => {
      const target = relationTargets.get(product.id);
      const row = rows.get(product.id);
      if (!target || !row) return;
      row.dataset.anchor = String(
        anchorReading.kind === "active" && product.id === anchorReading.productId,
      );
      if (anchorReading.kind === "selecting") {
        renderSelectingRelation(target, product, onSelectAnchor);
      } else if (anchorReading.kind === "active") {
        renderActiveRelation(target, category.anchorRelations[anchorReading.productId]?.[product.id]);
      } else {
        renderDefaultRelation(target, product);
      }
    });

    const heading = anchorReading.kind === "selecting"
      ? "選擇基準"
      : anchorReading.kind === "active"
        ? "相對基準"
        : "閱讀線索";
    cueHeading.textContent = heading;
    cueHeading.title = heading;
    renderedState = nextRenderedState;
  };

  return {
    element: section,
    categoryId: category.id,
    setState,
    focusAnchorControl: anchorControl.focusAction,
  };
};
