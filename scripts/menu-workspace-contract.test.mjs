import { existsSync, readFileSync } from "node:fs";

const normalized = (path) => readFileSync(new URL(path, import.meta.url), "utf8")
  .replace(/\s+/g, " ")
  .trim();

const css = normalized("../src/styles/menu-workspace.css");
const appSource = normalized("../src/app/App.ts");
const categorySource = normalized("../src/app/menu-category.ts");
const overviewSource = normalized("../src/app/menu-overview.ts");

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
  throw new Error("CND1 must not create a second sticky Candidate surface");
}
if (css.includes('.product-row[data-candidate="true"] .product-row__name')) {
  throw new Error("Candidate membership must not change Product-name metrics or wrapping");
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
  ".category-anchor-axis-control__group { display: flex; flex-wrap: nowrap;",
  "semantic-axis buttons must not wrap",
);
assertIncludes(
  css,
  ".candidate-summary { display: block; block-size: 1.5rem;",
  "Candidate count must reserve one fixed noninteractive summary line",
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
  ".product-row__index, .product-row__name, .product-row__cues, .product-row__price { padding: 0.52rem 0.25rem; vertical-align: top; }",
  "product ledger cells must share top alignment",
);
assertIncludes(
  css,
  ".product-row__relation { display: block; block-size: var(--relation-lane-height); line-height: var(--relation-lane-height); overflow: hidden; }",
  "the relation lane must reserve one fixed line box",
);
assertIncludes(
  css,
  ".product-row__candidate { display: flex; align-items: center; gap: 0.25rem; block-size: var(--candidate-lane-height);",
  "each row must reserve one fixed Candidate and status lane",
);
assertIncludes(
  css,
  ".candidate-toggle { inline-size: 3.4rem; block-size: 1.35rem;",
  "Candidate off and on labels must share fixed button dimensions",
);
assertIncludes(
  css,
  '.candidate-toggle[aria-pressed="true"] {',
  "Candidate membership must have a visible pressed treatment",
);
assertIncludes(
  css,
  ".product-row__relation-text { display: block; block-size: 100%; overflow: hidden; font-size: 0.62rem; line-height: inherit; text-overflow: ellipsis; white-space: nowrap; }",
  "active relations must remain one stable line",
);
assertIncludes(
  categorySource,
  '["index", "name", "cue", "price"].forEach((column) => {',
  "CND1 must keep the existing four-column ledger",
);
assertIncludes(
  categorySource,
  "category.anchorAxisRelations[activeAnchorId]?.[semanticAxis]?.[product.id]",
  "every active row must project from one explicit shared semantic axis",
);
assertIncludes(
  categorySource,
  "const candidateButtons = new Map<ProductId, HTMLButtonElement>();",
  "Candidate controls must be persistent per canonical Product row",
);
assertIncludes(
  categorySource,
  'button.setAttribute("aria-pressed", "false");',
  "Candidate controls must expose initial membership state",
);
assertIncludes(
  categorySource,
  "button.addEventListener(\"click\", () => onToggleCandidate(product.id));",
  "Candidate membership must change only through an explicit row button",
);
assertIncludes(
  categorySource,
  'button.setAttribute("aria-pressed", String(isMarked));',
  "Candidate toggling must update the existing button instead of replacing it",
);
assertIncludes(
  categorySource,
  "button.textContent = isMarked ? \"考慮中\" : \"考慮\";",
  "Candidate button must use explicit reversible language",
);
assertIncludes(
  categorySource,
  "revealInner.append(anchorControl.element, axisControl.element, ledger);",
  "Candidate marks must remain attached to the canonical ledger",
);
assertIncludes(
  categorySource,
  "relation.tabIndex = -1;",
  "each canonical relation lane must accept programmatic focus after its selection button is replaced",
);
assertIncludes(
  categorySource,
  'target.setAttribute("aria-label", relation.accessibleLabel);',
  "the focused active relation lane must expose the complete anchor-relative phrase",
);
assertIncludes(
  categorySource,
  "focusProductRelation: (productId) => relationTargets.get(productId)?.focus({ preventScroll: true }),",
  "category focus restoration must stay on the chosen canonical row without moving the viewport",
);
assertIncludes(
  overviewSource,
  'candidateSummary.setAttribute("aria-live", "polite");',
  "CND1 must announce count changes through one bounded status region",
);
assertIncludes(
  overviewSource,
  'candidateSummary.textContent = candidateCount === 0 ? "尚無考慮項目 · 不影響點餐" : `考慮中 ${candidateCount} 道 · 尚未點餐`;',
  "Candidate summary must state the non-order boundary",
);
assertIncludes(
  overviewSource,
  "const candidateIds = new Set(candidateState.productIds);",
  "one Candidate membership set must drive all attached row marks",
);
assertIncludes(
  overviewSource,
  "? `${axisLabels[state.semanticAxis]}｜${anchorName}${candidateContext}`",
  "the existing sticky context may append Candidate count without creating another surface",
);
assertIncludes(
  overviewSource,
  'contextLabel.title = contextLabel.textContent ?? "";',
  "truncated sticky context must retain its full text",
);
assertIncludes(
  overviewSource,
  "focusProductRelation: (categoryId, productId) =>",
  "the overview must expose row-local focus restoration",
);
assertIncludes(
  appSource,
  "let state: MenuAppState = createInitialMenuAppState(menu);",
  "Candidate state must remain separate from reading state in one app wrapper",
);
assertIncludes(
  appSource,
  "state = toggleAppCandidate(state, menu, productId);",
  "Candidate toggling must use the bounded pure state operation",
);
assertIncludes(
  appSource,
  "overview.focusProductRelation(categoryId, productId);",
  "selecting an anchor must retain visible focus on the chosen row instead of moving focus offscreen",
);
assertIncludes(
  appSource,
  "const cancelAnchor = (returnFocusProductId: ProductId | null = null): void =>",
  "anchor cancellation must distinguish a top-control action from an Escape action inside a row",
);
assertIncludes(
  appSource,
  "if (returnFocusProductId) overview.focusProductRelation(categoryId, returnFocusProductId);",
  "Escape cancellation inside a row must retain visible focus on that canonical row",
);
assertIncludes(
  appSource,
  "cancelAnchor(focusedProductId());",
  "the Escape handler must capture the currently focused product before replacing row buttons",
);

[
  "category-reading-control",
  "menu-anchor-relations",
  "anchorRelations",
  ".tokens",
  "row.addEventListener(\"click\"",
  "getBoundingClientRect",
  "scrollIntoView",
  "window.scroll",
  "candidate-list",
  "candidate-workspace",
  "candidate-rail",
  "candidate-modal",
  "candidate-sheet",
  "candidate-footer",
].forEach((forbidden) => {
  if (categorySource.includes(forbidden) || overviewSource.includes(forbidden)) {
    throw new Error(`CND1 must not contain ${forbidden}`);
  }
});

console.log("✓ Prototype C + CND1 menu workspace contract");
