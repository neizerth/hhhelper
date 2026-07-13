import type { IFormControl } from "../../model";
import { Field } from "../Field";

export type RadioElement = HTMLInputElement & {
  type: "radio";
};

export class Radio
  extends Field<RadioElement>
  implements IFormControl<RadioElement, boolean>
{
  static selector = "input[type='radio']";

  get checked() {
    return this.node.checked;
  }

  get label() {
    const label = this.node.closest("label");
    return label?.textContent ?? null;
  }

  fill(value: boolean) {
    if (this.checked === value) {
      return;
    }

    this.node.click();
  }
}
