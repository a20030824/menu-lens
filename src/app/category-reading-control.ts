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

const options: ReadonlyArray<Readonly<{ value: MenuReadingAxis; label: string }>> = [
  { value: "default", label: "一般" },
  { value: "price", label: "價格" },
  { value: "portion", label: "份量" },
  { value: "role", label: "餐點角色" },
  { value: "preparation", label: "準備節奏" },
];

export type CategoryReadingControl = Readonly<{
  element: HTMLElement;
  setState: (axis: MenuReadingAxis, visible: boolean) => void;
}>;

export const createCategoryReadingControl = (
  categoryId: string,
  onChange: (axis: MenuReadingAxis) => void,
): CategoryReadingControl => {
  const root = element("div", "category-reading-control");
  root.hidden = true;

  const selectId = `reading-axis-${categoryId}`;
  const label = element("label", "category-reading-control__label", "閱讀方式：");
  label.htmlFor = selectId;
  const select = element("select", "category-reading-control__select") as HTMLSelectElement;
  select.id = selectId;
  options.forEach((entry) => {
    const option = element("option", undefined, entry.label) as HTMLOptionElement;
    option.value = entry.value;
    select.append(option);
  });
  select.addEventListener("change", () => onChange(select.value as MenuReadingAxis));
  root.append(label, select);

  return {
    element: root,
    setState: (axis, visible) => {
      root.hidden = !visible;
      if (select.value !== axis) select.value = axis;
    },
  };
};
