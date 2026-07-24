import type { MenuReadingAxis } from "../customer/menu-relations.js";

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

const optionLabels: Readonly<Record<MenuReadingAxis, string>> = {
  default: "一般",
  price: "價格",
  portion: "份量",
  role: "餐點角色",
  preparation: "準備節奏",
};

export type CategoryReadingControl = Readonly<{
  element: HTMLElement;
  setState: (axis: MenuReadingAxis, visible: boolean) => void;
}>;

export const createCategoryReadingControl = (
  categoryId: string,
  availableAxes: ReadonlyArray<MenuReadingAxis>,
  onChange: (axis: MenuReadingAxis) => void,
): CategoryReadingControl => {
  const root = element("div", "category-reading-control");
  root.hidden = true;

  const selectId = `reading-axis-${categoryId}`;
  const label = element("label", "category-reading-control__label", "閱讀方式：");
  label.htmlFor = selectId;
  const select = element("select", "category-reading-control__select") as HTMLSelectElement;
  select.id = selectId;
  availableAxes.forEach((axis) => {
    const option = element("option", undefined, optionLabels[axis]) as HTMLOptionElement;
    option.value = axis;
    select.append(option);
  });
  select.addEventListener("change", () => onChange(select.value as MenuReadingAxis));
  root.append(label, select);

  const hasRelationalAxis = availableAxes.some((axis) => axis !== "default");

  return {
    element: root,
    setState: (axis, visible) => {
      root.hidden = !visible || !hasRelationalAxis;
      const resolvedAxis = availableAxes.includes(axis) ? axis : "default";
      if (select.value !== resolvedAxis) select.value = resolvedAxis;
    },
  };
};
