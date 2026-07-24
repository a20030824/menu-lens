import type { Menu, ProductId } from "../domain/menu-types.js";
import {
  createEmptyCandidateState,
  toggleCandidate,
  type CandidateState,
} from "./menu-candidates.js";
import {
  createInitialMenuReadingState,
  type MenuReadingState,
} from "./menu-reading.js";

export type MenuAppState = Readonly<{
  reading: MenuReadingState;
  candidates: CandidateState;
}>;

export const createInitialMenuAppState = (menu: Menu): MenuAppState => ({
  reading: createInitialMenuReadingState(menu),
  candidates: createEmptyCandidateState(),
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
