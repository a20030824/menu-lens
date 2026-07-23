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

export type CategoryInspectorView = Readonly<{
  element: HTMLElement;
  render: (category: CategoryReadingModel) => void;
}>;

export const createCategoryInspector = (): CategoryInspectorView => {
  const inspector = element("aside", "reading-inspector");
  inspector.setAttribute("aria-label", "目前菜單區域摘要");
  const content = element("div", "reading-inspector__content");
  inspector.append(content);

  const render = (category: CategoryReadingModel): void => {
    const heading = element("div", "reading-inspector__heading");
    heading.append(
      element("p", "eyebrow", "目前區域"),
      element("h2", "reading-inspector__title", category.name),
      element("p", "reading-inspector__summary", category.structuralSummary),
    );

    const facts = element("dl", "reading-inspector__facts");
    const entries = [
      ["品項", `${category.productCount} 道`],
      ["價格", category.priceRange],
      ["供應", `${category.availableCount} 道供應中`],
    ] as const;
    entries.forEach(([label, value]) => {
      const row = element("div", "reading-inspector__fact");
      row.append(element("dt", undefined, label), element("dd", undefined, value));
      facts.append(row);
    });

    const signals = element("div", "reading-inspector__signals");
    if (category.soldOutCount > 0) {
      signals.append(element("p", undefined, `${category.soldOutCount} 道目前售完`));
    }
    if (category.partialMetadataCount > 0) {
      signals.append(
        element("p", undefined, `${category.partialMetadataCount} 道只有部分比較資訊`),
      );
    }
    if (signals.childElementCount === 0) {
      signals.append(element("p", undefined, "本區商品皆有完整基本比較資訊"));
    }

    content.replaceChildren(heading, facts, signals);
  };

  return { element: inspector, render };
};
