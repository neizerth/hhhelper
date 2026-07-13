import { equalsIgnoreCase, waitFor } from "@/slices/shared/util";
import { Field } from "../../../shared/lib/Field";
import { Radio } from "../../../shared/lib/controls/Radio";
import type { IFormControl } from "../../../shared/model";

export class MonthSelect
  extends Field<HTMLElement>
  implements IFormControl<HTMLElement, string>
{
  #label: string | null = null;
  static selector = "[role='combobox'][data-qa='magritte-select-activator']";

  get label() {
    if (this.#label) {
      return this.#label;
    }

    this.#label = this.node.textContent?.replace(/\s+/g, " ").trim() ?? null;
    return this.#label;
  }

  async fill(value: string) {
    const listboxId = this.node.getAttribute("aria-controls");
    if (!listboxId) {
      return;
    }

    if (this.node.getAttribute("aria-expanded") !== "true") {
      this.node.click();
    }

    const listbox = await waitFor(() => document.getElementById(listboxId));
    if (!listbox) {
      return;
    }

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

    option?.fill(true);
  }
}
