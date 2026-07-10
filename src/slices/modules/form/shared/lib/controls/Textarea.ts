import type { IFormControl } from "../../model";
import { Field } from "../Field";

export class TextArea
  extends Field<HTMLTextAreaElement>
  implements IFormControl<HTMLTextAreaElement, string>
{
  get value() {
    return this.node.value;
  }

  static is(node: Node): node is HTMLTextAreaElement {
    return node instanceof HTMLTextAreaElement;
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
