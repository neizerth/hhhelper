import type { IFormControl } from "../../model";
import { Field } from "../Field";

export type CheckboxElement = HTMLInputElement & {
  type: "checkbox";
};

export class Checkbox
  extends Field<CheckboxElement>
  implements IFormControl<CheckboxElement, boolean>
{
  static selector = "input[type='checkbox']";

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
