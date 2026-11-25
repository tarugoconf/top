// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
export class BinarySearchNode {
  left;
  right;
  parent;
  value;
  constructor(parent, value) {
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.value = value;
  }
  static from(node) {
    const copy = new BinarySearchNode(node.parent, node.value);
    copy.left = node.left;
    copy.right = node.right;
    return copy;
  }
  directionFromParent() {
    return this.parent === null
      ? null
      : this === this.parent.left
      ? "left"
      : this === this.parent.right
      ? "right"
      : null;
  }
  findMinNode() {
    let minNode = this.left;
    while (minNode?.left) {
      minNode = minNode.left;
    }
    return minNode ?? this;
  }
  findMaxNode() {
    let maxNode = this.right;
    while (maxNode?.right) {
      maxNode = maxNode.right;
    }
    return maxNode ?? this;
  }
  findSuccessorNode() {
    if (this.right !== null) {
      return this.right.findMinNode();
    }
    let parent = this.parent;
    let direction = this.directionFromParent();
    while (parent && direction === "right") {
      direction = parent.directionFromParent();
      parent = parent.parent;
    }
    return parent;
  }
}
