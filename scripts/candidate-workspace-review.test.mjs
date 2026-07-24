import { readFileSync } from "node:fs";

const normalized = (path) => readFileSync(new URL(path, import.meta.url), "utf8")
  .replace(/\s+/g, " ")
  .trim();

const appSource = normalized("../src/app/App.ts");
const overviewSource = normalized("../src/app/menu-overview.ts");
const workspaceSource = normalized("../src/app/candidate-workspace.ts");

const assertIncludes = (source, fragment, message) => {
  if (!source.includes(fragment.replace(/\s+/g, " ").trim())) throw new Error(message);
};

if (workspaceSource.includes("statuses.hidden")) {
  throw new Error("empty Candidate status lanes must reserve geometry without relying on the hidden attribute");
}

assertIncludes(
  workspaceSource,
  "let renderedCandidateState: CandidateState | null = null;",
  "the hidden workspace must retain its DOM when Candidate state is referentially unchanged",
);
assertIncludes(
  workspaceSource,
  "if (renderedCandidateState === state) return;",
  "menu reading renders must not rebuild the hidden Candidate workspace",
);
assertIncludes(
  overviewSource,
  "candidateSummary.tabIndex = -1;",
  "the Candidate summary must be a stable fallback focus target when its entry becomes unavailable",
);
assertIncludes(
  overviewSource,
  "focusCandidateSummary: () => candidateSummary.focus({ preventScroll: true }),",
  "ordinary Back must have a stable noninteractive fallback focus target",
);
assertIncludes(
  appSource,
  "if (candidateCount(menu, state.candidates) === 0) overview.focusCandidateSummary();",
  "Back after final removal must not try to focus the disabled hidden entry button",
);
assertIncludes(
  appSource,
  'if (product.availability === "sold_out") overview.focusProductRelation(product.categoryId, productId);',
  "a sold-out Candidate locator must focus the canonical relation lane when no Candidate toggle exists",
);

console.log("✓ CND2 reverse-review focus and geometry contract");
