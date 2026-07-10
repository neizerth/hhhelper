export interface IFormControl<N extends Node, Value> {
  node: N;
  fill(value: Value): void;
  get label(): string | null;
}

export type IFormControlValidator<T extends Node> = (node: T) => boolean;

export type HTMLFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
