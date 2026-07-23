import type {
  ProductDetailLevel,
  ProductDetailModel,
} from "../customer/menu-reading.js";

const element = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

export type ProductDetailView = Readonly<{
  element: HTMLElement;
  render: (detail: ProductDetailModel | null, level: ProductDetailLevel) => void;
}>;

export const createProductDetailView = (
  onClose: () => void,
  onExpand: () => void,
  onCollapse: () => void,
): ProductDetailView => {
  const host = element("div", "product-detail-host");
  host.dataset.open = "false";
  const dialog = element("dialog", "product-sheet") as HTMLDialogElement;
  const aside = element("aside", "product-inspector");
  aside.hidden = true;
  aside.setAttribute("aria-label", "商品資訊");
  host.append(dialog, aside);

  const desktopQuery = window.matchMedia("(min-width: 64rem)");
  let currentDetail: ProductDetailModel | null = null;
  let currentLevel: ProductDetailLevel = "closed";
  let lastPresentedProductId: string | null = null;

  const buildPanel = (
    detail: ProductDetailModel,
    level: Exclude<ProductDetailLevel, "closed">,
    presentation: "sheet" | "inspector",
  ): HTMLElement => {
    const panel = element("section", `product-detail product-detail--${presentation}`);
    const header = element("header", "product-detail__header");
    const closeButton = element("button", "product-detail__close", "關閉") as HTMLButtonElement;
    closeButton.type = "button";
    closeButton.addEventListener("click", onClose);

    const headingRow = element("div", "product-detail__heading-row");
    const headingCopy = element("div", "product-detail__heading-copy");
    headingCopy.append(
      element("p", "product-detail__breadcrumb", `${detail.categoryName} / 商品資訊`),
      element("h2", "product-detail__title", detail.name),
    );
    const price = element("p", "product-detail__price", detail.price);
    headingRow.append(headingCopy, price);
    header.append(closeButton, headingRow);

    const status = element(
      "p",
      detail.isSoldOut
        ? "product-detail__availability product-detail__availability--sold-out"
        : "product-detail__availability",
      detail.availabilityLabel,
    );
    const description = element("p", "product-detail__description", detail.description);

    const factsToShow = level === "summary" ? detail.summaryFacts : detail.facts;
    const facts = element("dl", "product-detail__facts");
    factsToShow.forEach((fact) => {
      const item = element("div", "product-detail__fact");
      item.append(
        element("dt", "product-detail__fact-label", fact.label),
        element("dd", "product-detail__fact-value", fact.value),
      );
      facts.append(item);
    });

    const notices = element("div", "product-detail__notices");
    if (detail.featuredNote) {
      notices.append(element("p", "product-detail__notice", detail.featuredNote));
    }
    if (detail.metadataNotice) {
      notices.append(element("p", "product-detail__notice", detail.metadataNotice));
    }
    if (detail.configurationNotice) {
      notices.append(element("p", "product-detail__notice", detail.configurationNotice));
    }

    panel.append(header, status, description);
    if (facts.childElementCount > 0) panel.append(facts);
    if (notices.childElementCount > 0) panel.append(notices);

    if (level === "full" && detail.evidenceFacts.length > 0) {
      const evidence = element("details", "product-detail__evidence");
      evidence.append(element("summary", "product-detail__evidence-summary", "資料來源與完整性"));
      const evidenceList = element("dl", "product-detail__evidence-list");
      detail.evidenceFacts.forEach((fact) => {
        const item = element("div", "product-detail__evidence-item");
        item.append(
          element("dt", "product-detail__evidence-label", fact.label),
          element(
            "dd",
            "product-detail__evidence-value",
            `${fact.value} · ${fact.sourceLabel} · ${fact.confidenceLabel}`,
          ),
        );
        evidenceList.append(item);
      });
      evidence.append(evidenceList);
      panel.append(evidence);
    }

    const actions = element("div", "product-detail__actions");
    const levelButton = element(
      "button",
      "product-detail__level",
      level === "summary" ? "查看完整資訊" : "收起完整資訊",
    ) as HTMLButtonElement;
    levelButton.type = "button";
    levelButton.addEventListener("click", level === "summary" ? onExpand : onCollapse);
    actions.append(levelButton);
    panel.append(actions);
    return panel;
  };

  const closeDialog = (): void => {
    if (dialog.open) dialog.close();
    else dialog.removeAttribute("open");
  };

  const present = (): void => {
    const detail = currentDetail;
    const level = currentLevel;
    if (!detail || level === "closed") {
      host.dataset.open = "false";
      closeDialog();
      aside.hidden = true;
      aside.replaceChildren();
      dialog.replaceChildren();
      lastPresentedProductId = null;
      return;
    }

    host.dataset.open = "true";
    const openedNewProduct = lastPresentedProductId !== detail.id;
    if (desktopQuery.matches) {
      closeDialog();
      aside.hidden = false;
      aside.replaceChildren(buildPanel(detail, level, "inspector"));
    } else {
      aside.hidden = true;
      aside.replaceChildren();
      dialog.replaceChildren(buildPanel(detail, level, "sheet"));
      dialog.setAttribute("aria-label", `${detail.name}商品資訊`);
      if (!dialog.open) {
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      }
    }

    if (openedNewProduct) {
      window.requestAnimationFrame(() => {
        const container = desktopQuery.matches ? aside : dialog;
        container.querySelector<HTMLButtonElement>(".product-detail__close")?.focus({
          preventScroll: true,
        });
      });
    }
    lastPresentedProductId = detail.id;
  };

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    onClose();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) onClose();
  });
  desktopQuery.addEventListener("change", present);

  return {
    element: host,
    render: (detail, level) => {
      currentDetail = detail;
      currentLevel = level;
      present();
    },
  };
};
