export class Field<N extends Node> {
  constructor(public readonly node: N) {}

  static of<N extends Node>(node: N) {
    return new this(node);
  }
}
