export interface IFormControl<N extends Node, Value> {
  node: N;
  fill(value: Value): void | Promise<void>;
  label: string | null;
}

export interface IFormControlConstructor<N extends Node, Value> {
  new (node: N): IFormControl<N, Value>;
  selector: string;
}

export type IFormControlValidator<T extends Node> = (node: T) => boolean;

export type ControlValueType = "boolean" | "text";

export type HTMLFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
