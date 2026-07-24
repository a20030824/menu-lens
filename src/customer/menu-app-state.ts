import type { Menu, ProductId } from "../domain/menu-types.js";
import {
  candidateCount,
  createEmptyCandidateState,
  isCandidate,
  removeCandidate,
  toggleCandidate,
  type CandidateState,
} from "./menu-candidates.js";
import {
  createInitialMenuReadingState,
  focusCategory,
  type MenuReadingState,
} from "./menu-reading.js";

export type MenuSurface =
  | Readonly<{ kind: "menu" }>
  | Readonly<{ kind: "candidates" }>;

export type MenuAppState = Readonly<{
  reading: MenuReadingState;
  candidates: CandidateState;
  surface: MenuSurface;
}>;

export const createInitialMenuAppState = (menu: Menu): MenuAppState => ({
  reading: createInitialMenuReadingState(menu),
  candidates: createEmptyCandidateState(),
  surface: { kind: "menu" },
});

export const updateAppReading = (
  state: MenuAppState,
  reading: MenuReadingState,
): MenuAppState =>
  reading === state.reading
    ? state
    : { ...state, reading };

export const toggleAppCandidate = (
  state: MenuAppState,
  menu: Menu,
  productId: ProductId,
): MenuAppState => {
  const candidates = toggleCandidate(state.candidates, menu, productId);
  return candidates === state.candidates
    ? state
    : { ...state, candidates };
};

export const removeAppCandidate = (
  state: MenuAppState,
  productId: ProductId,
): MenuAppState => {
  const candidates = removeCandidate(state.candidates, productId);
  return candidates === state.candidates
    ? state
    : { ...state, candidates };
};

export const openCandidateWorkspace = (
  state: MenuAppState,
  menu: Menu,
): MenuAppState =>
  state.surface.kind === "candidates" || candidateCount(menu, state.candidates) === 0
    ? state
    : { ...state, surface: { kind: "candidates" } };

export const closeCandidateWorkspace = (state: MenuAppState): MenuAppState =>
  state.surface.kind === "menu"
    ? state
    : { ...state, surface: { kind: "menu" } };

export const showCandidateInMenu = (
  state: MenuAppState,
  menu: Menu,
  productId: ProductId,
): MenuAppState => {
  if (!isCandidate(state.candidates, productId)) return state;
  const product = menu.products.find((entry) => entry.id === productId);
  if (!product) return state;
  return {
    ...state,
    reading: focusCategory(state.reading, menu, product.categoryId),
    surface: { kind: "menu" },
  };
};
