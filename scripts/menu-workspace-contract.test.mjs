import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/styles/menu-workspace.css", import.meta.url), "utf8")
  .replace(/\s+/g, " ")
  .trim();

const assertIncludes = (fragment, message) => {
  if (!css.includes(fragment.replace(/\s+/g, " ").trim())) {
    throw new Error(message);
  }
};

if (css.includes("vertical-align: baseline")) {
  throw new Error("product ledger cells must not use baseline alignment across mixed relation renderers");
}

assertIncludes(
  ".product-row__index, .product-row__name, .product-row__cues, .product-row__price { padding: 0.52rem 0.25rem; vertical-align: top; }",
  "product ledger cells must share top alignment so axis renderers cannot move row baselines",
);
assertIncludes(
  ".product-row__relation { display: block; block-size: var(--relation-lane-height); line-height: var(--relation-lane-height); overflow: hidden; }",
  "the relation lane must reserve one fixed line box in every reading mode",
);
assertIncludes(
  ".product-row__status { display: block; block-size: var(--status-lane-height);",
  "the status lane must reserve one fixed line box in every reading mode",
);
assertIncludes(
  ".price-axis { display: flex; align-items: center; block-size: 100%; padding: 0; }",
  "the price renderer must fit the same relation line box without its own baseline or padding",
);
assertIncludes(
  ".product-ledger__heading { padding: 0.38rem 0.25rem 0.34rem; border-bottom: 1px solid var(--line-strong); color: var(--ink-soft); font-size: 0.55rem; font-weight: 850; letter-spacing: 0.06em; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",
  "axis heading copy must remain a single stable table-header line",
);

console.log("✓ menu workspace geometry contract");
