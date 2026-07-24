import type { Category, Menu, Product } from "../domain/menu-types.js";
import type { CandidateState } from "./menu-candidates.js";

export type CandidateWorkspaceGroup = Readonly<{
  category: Category;
  products: ReadonlyArray<Product>;
}>;

export type CandidateWorkspaceModel = Readonly<{
  groups: ReadonlyArray<CandidateWorkspaceGroup>;
  count: number;
}>;

export const createCandidateWorkspaceModel = (
  menu: Menu,
  state: CandidateState,
): CandidateWorkspaceModel => {
  const membership = new Set(state.productIds);
  const groups = menu.categories.map((category) => {
    const products = menu.products.filter(
      (product) => product.categoryId === category.id && membership.has(product.id),
    );
    return { category, products };
  }).filter((group) => group.products.length > 0);

  return {
    groups,
    count: groups.reduce((total, group) => total + group.products.length, 0),
  };
};
