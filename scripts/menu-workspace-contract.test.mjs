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
  throw new Error("product ledger cells must not use baseline alignment across relation renderers");
}
if (css.includes(".category-anchor-control { position: sticky")) {
  throw new Error("Prototype B must not create a second sticky comparison rail");
}

assertIncludes(
  css,
  ".menu-context { position: sticky;",
  "the existing menu context must remain the only sticky orientation surface",
);
assertIncludes(
  css,
  ".category-anchor-control { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 0.45rem; min-height: 2.6rem; block-size: 2.6rem;",
  "idle, selecting, and active anchor controls must share one fixed block size",
);
assertIncludes(
  css,
  ".category-anchor-control__label { min-width: 0; margin: 0; overflow: hidden;",
  "anchor names must truncate instead of wrapping the control row",
);
assertIncludes(
  css,
  ".product-row__index, .product-row__name, .product-row__cues, .product-row__price { padding: 0.52rem 0.25rem; vertical-align: top; }",
  "product ledger cells must share top alignment",
);
assertIncludes(
  css,
  ".product-row__relation { display: block; block-size: var(--relation-lane-height); line-height: var(--relation-lane-height); overflow: hidden; }",
  "the relation lane must reserve one fixed line box in every anchor state",
);
assertIncludes(
  css,
  ".anchor-select-button { display: block; width: 100%; block-size: 100%;",
  "the explicit anchor action must fit inside the existing relation lane",
);
assertIncludes(
  css,
  ".product-row__relation-text { display: block; block-size: 100%; line-height: inherit; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",
  "relative evidence must truncate instead of increasing row height",
);
assertIncludes(
  css,
  ".product-ledger__heading { padding: 0.38rem 0.25rem 0.34rem; border-bottom: 1px solid var(--line-strong); color: var(--ink-soft); font-size: 0.55rem; font-weight: 850; letter-spacing: 0.06em; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",
  "relation headings must remain a single stable table-header line",
);
assertIncludes(
  categorySource,
  '["index", "name", "cue", "price"].forEach((column) => {',
  "Prototype B must keep the existing four-column ledger",
);
assertIncludes(
  overviewSource,
  "? `　基準：${anchorName}`",
  "the existing sticky menu context must keep the active anchor name visible after its row scrolls away",
);
assertIncludes(
  overviewSource,
  'contextLabel.title = contextLabel.textContent ?? "";',
  "truncated sticky anchor context must retain its full text",
);

[
  "category-reading-control",
  "onSelectAxis",
  "row.addEventListener(\"click\"",
  "getBoundingClientRect",
  "scrollIntoView",
  "window.scroll",
].forEach((forbidden) => {
  if (categorySource.includes(forbidden)) {
    throw new Error(`Prototype B menu rows must not contain ${forbidden}`);
  }
});

console.log("✓ Prototype B menu workspace contract");
