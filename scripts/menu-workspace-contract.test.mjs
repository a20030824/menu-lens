import { readFileSync } from "node:fs";

const normalized = (path) => readFileSync(new URL(path, import.meta.url), "utf8")
  .replace(/\s+/g, " ")
  .trim();

const css = normalized("../src/styles/menu-workspace.css");
const categorySource = normalized("../src/app/menu-category.ts");
const overviewSource = normalized("../src/app/menu-overview.ts");

const assertIncludes = (source, fragment, message) => {
  if (!source.includes(fragment.replace(/\s+/g, " ").trim())) {
    throw new Error(message);
  }
};

if (css.includes("vertical-align: baseline")) {
  throw new Error("product ledger cells must not use baseline alignment across renderers");
}
if (css.includes(".category-anchor-control { position: sticky")) {
  throw new Error("Prototype C must not create a sticky anchor rail");
}
if (css.includes(".category-anchor-axis-control { position: sticky")) {
  throw new Error("Prototype C must not create a second sticky axis surface");
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
  ".product-ledger__col--cue { width: 7.2rem; }",
  "the mobile relation lane must reserve the Prototype C baseline width",
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
  ".product-row__relation-text { display: block; block-size: 100%; overflow: hidden; font-size: 0.62rem; line-height: inherit; text-overflow: ellipsis; white-space: nowrap; }",
  "active relations must remain one stable line",
);
assertIncludes(
  categorySource,
  '["index", "name", "cue", "price"].forEach((column) => {',
  "Prototype C must keep the existing four-column ledger",
);
assertIncludes(
  categorySource,
  "category.anchorAxisRelations[anchorReading.productId]?.[semanticAxis]?.[product.id]",
  "every active row must project from one explicit shared semantic axis",
);
assertIncludes(
  categorySource,
  "revealInner.append(anchorControl.element, axisControl.element, ledger);",
  "the fixed axis row must remain attached to the canonical ledger",
);
assertIncludes(
  overviewSource,
  "? `${axisLabels[state.semanticAxis]}｜${anchorName}`",
  "the existing sticky context must lead with active axis and anchor identity",
);
assertIncludes(
  overviewSource,
  'contextLabel.title = contextLabel.textContent ?? "";',
  "truncated sticky context must retain its full text",
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
].forEach((forbidden) => {
  if (categorySource.includes(forbidden)) {
    throw new Error(`Prototype C menu rows must not contain ${forbidden}`);
  }
});

console.log("✓ Prototype C menu workspace contract");
