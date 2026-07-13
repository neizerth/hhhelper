import { equalsIgnoreCase, waitFor } from "@/slices/shared/util";
import { Checkbox } from "../../../shared/lib/controls";
import type { CheckboxElement } from "../../../shared/lib/controls/Checkbox";
import { Field } from "../../../shared/lib/Field";
import type { IFormControl } from "../../../shared/model";

const FIXED_LABEL = "Резюме";
const CHECKBOX_SELECTOR = "input[type='checkbox'][aria-label]";
const EXPAND_BUTTON_LABEL = "Развернуть";
const TOGGLE_BUTTON_LABELS = new Set(["Развернуть", "Свернуть"]);
const MAX_CONTAINER_HOPS = 8;

const hasToggleButton = (el: Element) =>
  Array.from(el.querySelectorAll("button")).some((button) =>
    TOGGLE_BUTTON_LABELS.has(button.textContent?.trim() ?? ""),
  );

const findListContainer = (node: Element): Element | null => {
  let current: Element | null = node;

  while (current) {
    if (current.querySelector(CHECKBOX_SELECTOR)) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
};

const findContainer = (node: Element): Element | null => {
  const listContainer = findListContainer(node);
  if (!listContainer) {
    return null;
  }

  let current: Element | null = listContainer;
  for (let i = 0; current && i < MAX_CONTAINER_HOPS; i++) {
    if (hasToggleButton(current)) {
      return current;
    }
    current = current.parentElement;
  }

  return listContainer;
};

const findExpandButton = (container: Element) => {
  return Array.from(container.querySelectorAll("button")).find(
    (button) => button.textContent?.trim() === EXPAND_BUTTON_LABEL,
  );
};

export class CVSelect
  extends Field<HTMLElement>
  implements IFormControl<HTMLElement, string>
{
  #container: Element | null | undefined;
  static selector = "[data-qa='title']";

  private get container() {
    if (this.#container === undefined) {
      this.#container = findContainer(this.node);
    }
    return this.#container;
  }

  get label() {
    return this.container ? FIXED_LABEL : null;
  }

  async fill(value: string) {
    const container = this.container;
    if (!container) {
      return;
    }

    const expandButton = findExpandButton(container);
    if (expandButton) {
      const countBefore = container.querySelectorAll(CHECKBOX_SELECTOR).length;
      expandButton.click();
      await waitFor(
        () =>
          container.querySelectorAll(CHECKBOX_SELECTOR).length > countBefore
            ? true
            : null,
        { timeout: 1000 },
      );
    }

    const wanted = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const checkboxes = Array.from(
      container.querySelectorAll<CheckboxElement>(CHECKBOX_SELECTOR),
    );

    for (const node of checkboxes) {
      const label = node.getAttribute("aria-label");
      const shouldCheck = Boolean(
        label && wanted.some((item) => equalsIgnoreCase(label, item)),
      );

      new Checkbox(node).fill(shouldCheck);
    }
  }
}
