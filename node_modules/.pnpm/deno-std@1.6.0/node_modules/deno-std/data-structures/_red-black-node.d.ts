import { BinarySearchNode, type Direction } from "./_binary-search-node.ts";
export type { Direction };
export declare class RedBlackNode<T> extends BinarySearchNode<T> {
  parent: RedBlackNode<T> | null;
  left: RedBlackNode<T> | null;
  right: RedBlackNode<T> | null;
  red: boolean;
  constructor(parent: RedBlackNode<T> | null, value: T);
  static from<T>(node: RedBlackNode<T>): RedBlackNode<T>;
}
