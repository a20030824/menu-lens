import type { Menu, ProductId } from "../domain/menu-types.js";

export type CandidateState = Readonly<{
  productIds: ReadonlyArray<ProductId>;
}>;

export const createEmptyCandidateState = (): CandidateState => ({ productIds: [] });

export const isCandidate = (state: CandidateState, productId: ProductId): boolean =>
  state.productIds.includes(productId);

export const candidateCount = (menu: Menu, state: CandidateState): number => {
  const membership = new Set(state.productIds);
  return menu.products.filter((product) => membership.has(product.id)).length;
};

const availableProductExists = (menu: Menu, productId: ProductId): boolean =>
  menu.products.some(
    (product) => product.id === productId && product.availability === "available",
  );

export const addCandidate = (
  state: CandidateState,
  menu: Menu,
  productId: ProductId,
): CandidateState => {
  if (isCandidate(state, productId) || !availableProductExists(menu, productId)) return state;
  return { productIds: [...state.productIds, productId] };
};

export const removeCandidate = (
  state: CandidateState,
  productId: ProductId,
): CandidateState => {
  if (!isCandidate(state, productId)) return state;
  return { productIds: state.productIds.filter((entry) => entry !== productId) };
};

export const toggleCandidate = (
  state: CandidateState,
  menu: Menu,
  productId: ProductId,
): CandidateState =>
  isCandidate(state, productId)
    ? removeCandidate(state, productId)
    : addCandidate(state, menu, productId);
