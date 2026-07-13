import { containsIgnoreCase, waitFor } from "@/slices/shared/util";
import { Checkbox } from "../../../shared/lib/controls";
import type { CheckboxElement } from "../../../shared/lib/controls/Checkbox";
import { Field } from "../../../shared/lib/Field";
import { getTriggerLabel } from "../../../shared/lib/getTriggerLabel";
import { fillTextControlValue } from "../../../shared/lib/value";
import type { IFormControl } from "../../../shared/model";

const DIALOG_SELECTOR = "[role='dialog']";
const SEARCH_INPUT_SELECTOR = "input[data-qa='tree-selector-search-input']";
const TREE_SELECTOR = "[role='tree']";
const SAVE_BUTTON_SELECTOR = "[data-qa='primary-actions'] button";

const findCheckbox = (dialog: Element, value: string) => {
  const tree = dialog.querySelector(TREE_SELECTOR);
  if (!tree) {
    return null;
  }

  const node = Array.from(
    tree.querySelectorAll<CheckboxElement>(Checkbox.selector),
  ).find((input) => {
    const label = new Checkbox(input).label;
    return label && containsIgnoreCase(label, value);
  });

  return node ? new Checkbox(node) : null;
};

export class CompanyScopeSelect
  extends Field<HTMLElement>
  implements IFormControl<HTMLElement, string>
{
  #label: string | null = null;
  static selector = "[data-qa='trigger-root']";

  get label() {
    if (this.#label) {
      return this.#label;
    }

    this.#label = getTriggerLabel(this.node);
    return this.#label;
  }

  async fill(value: string) {
    if (this.node.getAttribute("aria-expanded") !== "true") {
      this.node.click();
    }

    const dialog = await waitFor(() =>
      document.querySelector<HTMLElement>(DIALOG_SELECTOR),
    );
    if (!dialog) {
      return;
    }

    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    for (const item of items) {
      const searchInput = dialog.querySelector<HTMLInputElement>(
        SEARCH_INPUT_SELECTOR,
      );
      if (searchInput) {
        fillTextControlValue(searchInput, item);
      }

      const checkbox = await waitFor(() => findCheckbox(dialog, item), {
        timeout: 5000,
      });

      checkbox?.fill(true);
    }

    dialog.querySelector<HTMLButtonElement>(SAVE_BUTTON_SELECTOR)?.click();
  }
}
