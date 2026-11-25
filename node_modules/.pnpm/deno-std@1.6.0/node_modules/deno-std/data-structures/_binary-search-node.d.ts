export type Direction = "left" | "right";
export declare class BinarySearchNode<T> {
  left: BinarySearchNode<T> | null;
  right: BinarySearchNode<T> | null;
  parent: BinarySearchNode<T> | null;
  value: T;
  constructor(parent: BinarySearchNode<T> | null, value: T);
  static from<T>(node: BinarySearchNode<T>): BinarySearchNode<T>;
  directionFromParent(): Direction | null;
  findMinNode(): BinarySearchNode<T>;
  findMaxNode(): BinarySearchNode<T>;
  findSuccessorNode(): BinarySearchNode<T> | null;
}
