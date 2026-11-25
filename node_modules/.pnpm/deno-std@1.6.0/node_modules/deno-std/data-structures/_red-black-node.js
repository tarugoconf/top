// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { BinarySearchNode } from "./_binary-search-node.js";
export class RedBlackNode extends BinarySearchNode {
  red;
  constructor(parent, value) {
    super(parent, value);
    this.red = true;
  }
  static from(node) {
    const copy = new RedBlackNode(node.parent, node.value);
    copy.left = node.left;
    copy.right = node.right;
    copy.red = node.red;
    return copy;
  }
}
