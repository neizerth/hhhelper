import type { IFormControl } from "../../model";
import { Field } from "../Field";
import { fillTextControlValue } from "../value";

export class Input
  extends Field<HTMLInputElement>
  implements IFormControl<HTMLInputElement, string>
{
  #label: string | null = null;
  static selector =
    "input[aria-labelledby]:not([type='checkbox']):not([type='radio'])";

  get value() {
    return this.node.value;
  }

  get label() {
    if (this.#label) {
      return this.#label;
    }
    const id = this.node.getAttribute("aria-labelledby");
    if (!id) {
      return null;
    }
    const label = document.getElementById(id);
    this.#label = label?.textContent?.replace(/\s+/g, " ").trim() ?? null;
    return this.#label;
  }

  fill(value: string) {
    return fillTextControlValue(this.node, value);
  }
}
