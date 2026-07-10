import type { IFormControl } from "../../model";
import { Field } from "../Field";

export class Input
  extends Field<HTMLInputElement>
  implements IFormControl<HTMLInputElement, string>
{
  get value() {
    return this.node.value;
  }

  static is(node: Node): node is HTMLInputElement {
    return node instanceof HTMLInputElement && node.type === "text";
  }

  get label() {
    const id = this.node.getAttribute("aria-labelledby");
    if (!id) {
      return null;
    }
    const label = document.getElementById(id);
    return label?.textContent ?? null;
  }

  fill(value: string) {
    if (this.value === value) {
      return;
    }

    this.node.value = value;
    this.node.dispatchEvent(new InputEvent("input"));
  }
}
