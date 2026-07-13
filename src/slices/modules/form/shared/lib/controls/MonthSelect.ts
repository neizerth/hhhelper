import { equalsIgnoreCase, waitFor } from "@/slices/shared/util";
import type { IFormControl } from "../../model";
import { Field } from "../Field";
import { Radio } from "./Radio";

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
      .map((node) => new Radio(node))
      .find((radio) => radio.label && equalsIgnoreCase(radio.label, value));

    option?.fill(true);
  }
}
