import { existsSync, readFileSync } from "node:fs";

const normalized = (path) => readFileSync(new URL(path, import.meta.url), "utf8")
  .replace(/\s+/g, " ")
  .trim();

const css = normalized("../src/styles/menu-workspace.css");
const appSource = normalized("../src/app/App.ts");
const categorySource = normalized("../src/app/menu-category.ts");
const overviewSource = normalized("../src/app/menu-overview.ts");
const candidateSource = normalized("../src/customer/menu-candidates.ts");
const candidateWorkspaceSource = normalized("../src/customer/candidate-workspace.ts");
const candidateWorkspaceViewSource = normalized("../src/app/candidate-workspace.ts");

const assertIncludes = (source, fragment, message) => {
  if (!source.includes(fragment.replace(/\s+/g, " ").trim())) {
    throw new Error(message);
  }
};

if (existsSync(new URL("../src/app/category-reading-control.ts", import.meta.url))) {
  throw new Error("Prototype A's unused axis-selector UI must not remain in the active application tree");
}
if (css.includes("vertical-align: baseline")) {
  throw new Error("product ledger cells must not use baseline alignment across renderers");
}
if (css.includes(".category-anchor-control { position: sticky")) {
  throw new Error("Prototype C must not create a sticky anchor rail");
}
if (css.includes(".category-anchor-axis-control { position: sticky")) {
  throw new Error("Prototype C must not create a second sticky axis surface");
}
if (css.includes(".candidate-summary { position: sticky")) {
  throw new Error("Candidate state must not create a second sticky surface");
}
if (css.includes('.product-row[data-candidate="true"] .product-row__name')) {
  throw new Error("Candidate membership must not change Product-name metrics or wrapping");
}
if (categorySource.includes("button.textContent =") || categorySource.includes("移出考慮") || categorySource.includes("列入考慮")) {
  throw new Error("an aria-pressed Candidate toggle must keep one stable visible and accessible label");
}
if (categorySource.includes("data-candidate")) {
  throw new Error("Candidate membership must not be mirrored into an unused row-wide DOM state");
}

assertIncludes(
  css,
  ".menu-context { position: sticky;",
  "the existing menu context must remain the only sticky orientation surface",
);
assertIncludes(
  css,
  ".category-anchor-control { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 0.45rem; min-height: 2.6rem; block-size: 2.6rem;",
  "all anchor states must share one fixed control height",
);
assertIncludes(
  css,
  ".category-anchor-axis-control { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 0.45rem; min-height: 2.4rem; block-size: 2.4rem;",
  "idle, selecting, active, and switched-axis states must reserve one fixed axis row",
);
assertIncludes(
  css,
  ".candidate-summary-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; block-size: 2rem;",
  "zero and nonzero Candidate summary states must share one fixed heading geometry",
);
assertIncludes(
  css,
  '.candidate-summary__action[data-empty="true"] { visibility: hidden; }',
  "the zero-Candidate entry must stay out of interaction while preserving geometry",
);
assertIncludes(
  css,
  ".product-ledger { --relation-lane-height: 1.55rem; --candidate-lane-height: 1.55rem;",
  "relation and Candidate lanes must establish fixed row geometry",
);
assertIncludes(
  css,
  ".product-ledger__col--cue { width: 7.2rem; }",
  "the mobile relation and Candidate column must preserve the passed width",
);
assertIncludes(
  css,
  ".candidate-toggle { inline-size: 3.4rem; block-size: 1.35rem;",
  "Candidate off and on states must share fixed button dimensions",
);
assertIncludes(
  css,
  '.candidate-toggle[aria-pressed="true"] {',
  "Candidate membership must have a visible pressed treatment",
);
assertIncludes(
  css,
  ".candidate-workspace__actions { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);",
  "workspace row actions must share one bounded two-column mobile layout",
);
assertIncludes(
  css,
  ".candidate-workspace__row { padding: 0.72rem 0; border-top: 1px solid var(--line);",
  "workspace rows must remain compact document rows rather than cards",
);

assertIncludes(
  categorySource,
  '["index", "name", "cue", "price"].forEach((column) => {',
  "CND2 must keep the existing four-column canonical ledger",
);
assertIncludes(
  categorySource,
  "const candidateButtons = new Map<ProductId, HTMLButtonElement>();",
  "Candidate controls must remain persistent per canonical Product row",
);
assertIncludes(
  categorySource,
  'const button = element("button", "candidate-toggle", "考慮") as HTMLButtonElement;',
  "Candidate controls must keep one stable visible label",
);
assertIncludes(
  categorySource,
  'button.setAttribute("aria-label", `考慮「${product.name}」`);',
  "Candidate controls must keep one stable accessible name",
);
assertIncludes(
  categorySource,
  'button.setAttribute("aria-pressed", String(isMarked));',
  "Candidate toggling must update the existing button instead of replacing it",
);
assertIncludes(
  categorySource,
  "focusProductCandidate: (productId) => candidateButtons.get(productId)?.focus({ preventScroll: true }),",
  "the workspace locator must be able to restore focus to the canonical Candidate toggle",
);
assertIncludes(
  categorySource,
  "productRowFor: (productId) => rows.get(productId) ?? null,",
  "the workspace locator must resolve the canonical Product row without copying it",
);

assertIncludes(
  overviewSource,
  'const candidateSummary = element("p", "candidate-summary", "尚無考慮項目 · 不影響點餐");',
  "the Candidate summary must exist before the live region enters the document",
);
assertIncludes(
  overviewSource,
  'const candidateSummaryAction = element("button", "candidate-summary__action", "查看考慮項目") as HTMLButtonElement;',
  "CND2 must expose one explicit native workspace entry",
);
assertIncludes(
  overviewSource,
  'candidateSummaryAction.dataset.empty = String(candidateCount === 0);',
  "the workspace entry must expose its zero-state geometry without remaining interactive",
);
assertIncludes(
  overviewSource,
  'candidateSummaryAction.setAttribute("aria-label", candidateCount === 0 ? "尚無考慮項目" : `查看 ${candidateCount} 道考慮項目`);',
  "the workspace entry accessible name must include the canonical Candidate count",
);
assertIncludes(
  overviewSource,
  "if (renderedCandidateCount !== candidateCount) {",
  "unrelated reading renders must not reannounce Candidate count",
);
assertIncludes(
  overviewSource,
  "focusProductCandidate: (categoryId, productId) =>",
  "the overview must expose canonical Candidate-toggle focus",
);
assertIncludes(
  overviewSource,
  "productRowFor: (categoryId, productId) =>",
  "the overview must expose the canonical Product row for locator scrolling",
);
assertIncludes(
  overviewSource,
  "focusCandidateEntry: () => candidateSummaryAction.focus({ preventScroll: true }),",
  "ordinary workspace Back must restore focus to the entry without moving scroll",
);

assertIncludes(
  candidateWorkspaceSource,
  "export const createCandidateWorkspaceModel =",
  "CND2 must derive one explicit workspace model",
);
assertIncludes(
  candidateWorkspaceSource,
  "menu.categories.map((category) =>",
  "workspace groups must originate from canonical category order",
);
assertIncludes(
  candidateWorkspaceSource,
  "menu.products.filter(",
  "workspace rows must originate from canonical Product order",
);
assertIncludes(
  candidateWorkspaceSource,
  "products.length > 0",
  "empty canonical category groups must be omitted",
);

assertIncludes(
  candidateWorkspaceViewSource,
  'const root = element("main", "candidate-workspace");',
  "CND2 must use one document main surface rather than a modal",
);
assertIncludes(
  candidateWorkspaceViewSource,
  'const backButton = element("button", "candidate-workspace__back", "回到完整菜單") as HTMLButtonElement;',
  "the workspace must expose one explicit in-app Back action",
);
assertIncludes(
  candidateWorkspaceViewSource,
  'const locateButton = element("button", "candidate-workspace__action", "在菜單中查看") as HTMLButtonElement;',
  "each Candidate must expose one canonical-menu locator",
);
assertIncludes(
  candidateWorkspaceViewSource,
  'const removeButton = element("button", "candidate-workspace__action", "移出考慮") as HTMLButtonElement;',
  "workspace removal must be an explicit non-toggle action",
);
assertIncludes(
  candidateWorkspaceViewSource,
  "removeButtons.set(product.id, removeButton);",
  "workspace removal focus recovery must target remaining canonical Candidate IDs",
);
assertIncludes(
  candidateWorkspaceViewSource,
  "focusRemoval: (productId) => removeButtons.get(productId)?.focus({ preventScroll: true }),",
  "workspace removal focus recovery must never fall to body or a detached node",
);

assertIncludes(
  appSource,
  "let state: MenuAppState = createInitialMenuAppState(menu);",
  "reading, Candidate, and surface state must stay in one explicit app wrapper",
);
assertIncludes(
  appSource,
  "let candidateReturnContext:",
  "browser scroll and focus return context must remain in the controller rather than pure domain state",
);
assertIncludes(
  appSource,
  "scrollY: window.scrollY,",
  "workspace entry must capture the exact previous menu scroll position",
);
assertIncludes(
  appSource,
  "state = openCandidateWorkspace(state, menu);",
  "workspace open must use the bounded pure surface transition",
);
assertIncludes(
  appSource,
  'overview.element.hidden = state.surface.kind !== "menu";',
  "the canonical menu must remain mounted while hidden",
);
assertIncludes(
  appSource,
  'candidateWorkspace.element.hidden = state.surface.kind !== "candidates";',
  "only the Candidate workspace may be visible while its surface is active",
);
assertIncludes(
  appSource,
  'overview.element.setAttribute("inert", "");',
  "the hidden canonical menu must be inert",
);
assertIncludes(
  appSource,
  'window.scrollTo({ top: returnContext.scrollY, behavior: "instant" });',
  "ordinary workspace Back must restore the exact menu scroll position without inheriting smooth scrolling",
);
assertIncludes(
  appSource,
  "returnContext.focusElement?.focus({ preventScroll: true });",
  "ordinary workspace Back must restore the previous focus origin without moving scroll",
);
assertIncludes(
  appSource,
  "const orderedProductIds = createCandidateWorkspaceModel(menu, state.candidates).groups.flatMap",
  "deterministic removal focus must derive from current canonical workspace order",
);
assertIncludes(
  appSource,
  "state = showCandidateInMenu(state, menu, productId);",
  "Product locator must reuse the pure category-focus transition",
);
assertIncludes(
  appSource,
  "row?.scrollIntoView({",
  "Product locator must reveal the existing canonical row",
);
assertIncludes(
  appSource,
  "overview.focusProductCandidate(product.categoryId, productId);",
  "Product locator must focus the canonical Candidate toggle",
);

[
  "dialog",
  "showModal",
  "candidate-rail",
  "candidate-modal",
  "candidate-sheet",
  "candidate-footer",
  "comparison-matrix",
  "candidate-rank",
  "candidate-score",
  "row.addEventListener(\"click\"",
].forEach((forbidden) => {
  if (
    candidateWorkspaceViewSource.includes(forbidden) ||
    appSource.includes(forbidden) ||
    overviewSource.includes(forbidden)
  ) {
    throw new Error(`CND2 must not contain ${forbidden}`);
  }
});

[
  "quantity",
  "modifier",
  "checkout",
  "current-order",
  "order-total",
  "decision-action",
  "comparison-action",
].forEach((forbidden) => {
  if (candidateWorkspaceSource.includes(forbidden) || candidateWorkspaceViewSource.includes(forbidden)) {
    throw new Error(`CND2 must not introduce ${forbidden}`);
  }
});

console.log("✓ Prototype C + CND1 + CND2 menu workspace contract");
