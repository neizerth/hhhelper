import { equalsIgnoreCase, waitFor } from "@/slices/shared/util";
import { Field } from "../../../shared/lib/Field";
import { Radio } from "../../../shared/lib/controls/Radio";
import { fillTextControlValue } from "../../../shared/lib/value";
import type { IFormControl } from "../../../shared/model";

const SEARCH_INPUT_SELECTOR = "input[data-qa='bottom-sheet-navigation-input']";
const LISTBOX_SELECTOR = "[role='listbox']";

const findOption = (value: string) => {
  for (const listbox of Array.from(
    document.querySelectorAll<HTMLElement>(LISTBOX_SELECTOR),
  )) {
    const option = Array.from(
      listbox.querySelectorAll<HTMLInputElement>(Radio.selector),
    )
      .map((node) => Radio.from(node))
      .find(
        (radio): radio is Radio =>
          radio !== null &&
          radio.label !== null &&
          equalsIgnoreCase(radio.label, value),
      );

    if (option) {
      return option;
    }
  }

  return null;
};

export class RegionSelect
  extends Field<HTMLElement>
  implements IFormControl<HTMLElement, string>
{
  #label: string | null = null;
  static selector = "[role='combobox'][aria-haspopup='dialog']";

  get label() {
    if (this.#label) {
      return this.#label;
    }

    this.#label = this.node.textContent?.replace(/\s+/g, " ").trim() ?? null;
    return this.#label;
  }

  async fill(value: string) {
    if (this.node.getAttribute("aria-expanded") !== "true") {
      this.node.click();
    }

    const directOption = await waitFor(() => findOption(value), {
      timeout: 500,
    });
    if (directOption) {
      directOption.fill(true);
      return;
    }

    const searchInput = await waitFor(() =>
      document.querySelector<HTMLInputElement>(SEARCH_INPUT_SELECTOR),
    );
    if (!searchInput) {
      return;
    }

    fillTextControlValue(searchInput, value);

    const option = await waitFor(() => findOption(value), { timeout: 5000 });
    option?.fill(true);
  }
}
