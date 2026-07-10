import type { IFormControl } from "../../model";
import { Field } from "../Field";

export type CheckNode = HTMLInputElement & { type: "checkbox" | "radio" };

export class Checkbox
  extends Field<CheckNode>
  implements IFormControl<CheckNode, boolean>
{
  get checked() {
    return this.node.checked;
  }

  get label() {
    const label = this.node.closest("label");
    return label?.textContent ?? null;
  }

  static is(node: Node): node is CheckNode {
    return node instanceof HTMLInputElement && node.type === "checkbox";
  }

  fill(value: boolean) {
    if (this.checked === value) {
      return;
    }

    this.node.click();
  }
}
