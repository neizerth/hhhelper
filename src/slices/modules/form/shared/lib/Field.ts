export class Field<N extends Node> {
  constructor(public readonly node: N) {}
  static selector: string;
}
