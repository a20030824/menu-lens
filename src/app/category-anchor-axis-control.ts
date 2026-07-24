import type { SemanticAxis } from "../customer/menu-anchor-axis.js";

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

const axisLabels: Readonly<Record<SemanticAxis, string>> = {
  portion: "份量",
  preparation: "準備",
};

export type CategoryAnchorAxisControl = Readonly<{
  element: HTMLElement;
  setState: (
    availableAxes: ReadonlyArray<SemanticAxis>,
    semanticAxis: SemanticAxis | null,
    enabled: boolean,
    visible: boolean,
  ) => void;
}>;

export const createCategoryAnchorAxisControl = (
  categoryId: string,
  onSelectAxis: (axis: SemanticAxis) => void,
): CategoryAnchorAxisControl => {
  const root = element("div", "category-anchor-axis-control");
  root.hidden = true;

  const label = element("span", "category-anchor-axis-control__label", "比較內容");
  const group = element("div", "category-anchor-axis-control__group");
  group.setAttribute("role", "group");
  group.setAttribute("aria-label", "比較內容");
  group.setAttribute("aria-describedby", `anchor-context-${categoryId}`);

  const buttons = new Map<SemanticAxis, HTMLButtonElement>();
  (["portion", "preparation"] as const).forEach((axis) => {
    const button = element(
      "button",
      "category-anchor-axis-control__button",
      axisLabels[axis],
    ) as HTMLButtonElement;
    button.type = "button";
    button.dataset.axis = axis;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => onSelectAxis(axis));
    buttons.set(axis, button);
    group.append(button);
  });

  root.append(label, group);

  return {
    element: root,
    setState: (availableAxes, semanticAxis, enabled, visible) => {
      root.hidden = !visible;
      root.dataset.enabled = String(enabled);
      buttons.forEach((button, axis) => {
        const available = availableAxes.includes(axis);
        button.hidden = !available;
        button.disabled = !enabled;
        button.setAttribute("aria-pressed", String(available && semanticAxis === axis));
      });
    },
  };
};
