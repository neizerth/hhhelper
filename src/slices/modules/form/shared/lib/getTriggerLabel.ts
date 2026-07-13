const VALUE_SELECTORS = [
  "[data-qa='trigger-values-wrapper']",
  "[data-qa='trigger-postfix-metric']",
].join(", ");

export const getTriggerLabel = (node: Element) => {
  const clone = node.cloneNode(true) as Element;
  clone.querySelectorAll(VALUE_SELECTORS).forEach((el) => {
    el.remove();
  });

  return clone.textContent?.replace(/\s+/g, " ").trim() ?? null;
};
