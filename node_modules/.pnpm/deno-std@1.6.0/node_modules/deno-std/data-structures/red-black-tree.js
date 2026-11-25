// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { ascend } from "./comparators.js";
import { BinarySearchTree } from "./binary-search-tree.js";
import { RedBlackNode } from "./_red-black-node.js";
import { internals } from "./_binary-search-tree-internals.js";
const {
  getRoot,
  setRoot,
  getCompare,
  findNode,
  rotateNode,
  insertNode,
  removeNode,
  setSize,
} = internals;
/**
 * A red-black tree. This is a kind of self-balancing binary search tree,
 * extending {@linkcode BinarySearchTree}. The values are in ascending order by
 * default, using JavaScript's built-in comparison operators to sort the
 * values.
 *
 * Unlike {@linkcode BinarySearchTree}, which degrades to linear time on
 * already-ordered input, a red-black tree rebalances itself on every insertion
 * and removal, so every lookup, insertion, and removal is logarithmic in the
 * worst case and not just on average.
 *
 * Values are unique under the comparator: inserting a value that compares
 * equal to one already in the tree leaves the tree unchanged.
 *
 * Iterating with `for...of` or the spread operator yields values in-order
 * (ascending under the default comparator) without modifying the tree. The
 * traversal methods inherited from {@linkcode BinarySearchTree} expose the
 * other orders.
 *
 * The following bounds are worst-case, where n is the number of values in the
 * tree (or input collection for `from()`). Traversal bounds cover consuming the
 * entire iterator; comparison and mapping functions are assumed to take O(1).
 *
 * | Method              | Time complexity             |
 * | ------------------- | --------------------------- |
 * | find(value)         | O(log n)                    |
 * | insert(value)       | O(log n)                    |
 * | remove(value)       | O(log n)                    |
 * | min()               | O(log n)                    |
 * | max()               | O(log n)                    |
 * | size                | O(1)                        |
 * | isEmpty()           | O(1)                        |
 * | clear()             | O(1)                        |
 * | lnrValues()         | O(n)                        |
 * | rnlValues()         | O(n)                        |
 * | nlrValues()         | O(n)                        |
 * | lrnValues()         | O(n)                        |
 * | lvlValues()         | O(n)                        |
 * | [Symbol.iterator]() | O(n)                        |
 * | RedBlackTree()      | O(1)                        |
 * | RedBlackTree.from() | O(n) or O(n log n)          |
 *
 * `RedBlackTree.from()` takes O(n) when copying a {@linkcode RedBlackTree}
 * without a `compare` or `map` option, and O(n log n) otherwise.
 *
 * @example Usage
 * ```ts
 * import { RedBlackTree } from "red-black-tree.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const tree = RedBlackTree.from([3, 10, 13, 4, 6, 7, 1, 14]);
 * assertEquals([...tree], [1, 3, 4, 6, 7, 10, 13, 14]);
 * assertEquals(tree.min(), 1);
 * assertEquals(tree.max(), 14);
 * assertEquals(tree.find(7), 7);
 * assertEquals(tree.find(42), null);
 * assertEquals(tree.remove(7), true);
 * assertEquals([...tree], [1, 3, 4, 6, 10, 13, 14]);
 * ```
 *
 * @example Ordering with a custom comparison function
 * ```ts
 * import { RedBlackTree } from "red-black-tree.ts";
 * import { ascend } from "comparators.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * // Shortest first, alphabetically within a length
 * const words = new RedBlackTree<string>((a, b) =>
 *   ascend(a.length, b.length) || ascend(a, b)
 * );
 * ["truck", "car", "helicopter", "van"].forEach((word) => words.insert(word));
 * assertEquals([...words], ["car", "van", "truck", "helicopter"]);
 * ```
 *
 * @typeParam T The type of the values being stored in the tree.
 */
export class RedBlackTree extends BinarySearchTree {
  /**
   * Creates an empty red-black tree.
   *
   * @param compare A custom comparison function for the values. Must be a
   * function; defaults to sorting in ascending order via {@linkcode ascend}.
   */
  constructor(compare = ascend) {
    if (typeof compare !== "function") {
      throw new TypeError(
        "Cannot construct a RedBlackTree: the 'compare' parameter is not a function, did you mean to call RedBlackTree.from?",
      );
    }
    super(compare);
  }
  static from(collection, options) {
    let result;
    let unmappedValues = [];
    if (collection instanceof RedBlackTree) {
      result = new RedBlackTree(
        options?.compare ??
          getCompare(collection),
      );
      if (options?.compare || options?.map) {
        unmappedValues = collection;
      } else {
        const nodes = [];
        const root = getRoot(collection);
        if (root) {
          const rootCopy = RedBlackNode.from(root);
          setRoot(result, rootCopy);
          nodes.push(rootCopy);
        }
        while (nodes.length) {
          const node = nodes.pop();
          const left = node.left ? RedBlackNode.from(node.left) : null;
          const right = node.right ? RedBlackNode.from(node.right) : null;
          node.left = left;
          node.right = right;
          if (left) {
            left.parent = node;
            nodes.push(left);
          }
          if (right) {
            right.parent = node;
            nodes.push(right);
          }
        }
        setSize(result, collection.size);
      }
    } else {
      result = options?.compare
        ? new RedBlackTree(options.compare)
        : new RedBlackTree();
      unmappedValues = collection;
    }
    const values = options?.map
      ? Array.from(unmappedValues, options.map, options.thisArg)
      : Array.from(unmappedValues);
    for (const value of values) {
      result.insert(value);
    }
    return result;
  }
  /**
   * Restores the black-height invariant after a black node has been removed.
   *
   * `current` is the node that took the removed node's place, so every path
   * through it is one black short. The loop moves that deficit up the tree
   * until it reaches a red node or the root, where recoloring absorbs it.
   */
  #removeFixup(parent, current) {
    while (parent && !current?.red) {
      const direction = parent.left === current ? "left" : "right";
      const siblingDirection = direction === "right" ? "left" : "right";
      let sibling = parent[siblingDirection];
      // Red sibling: rotate it above the parent so the deficit gets a black
      // sibling, which the cases below can handle.
      if (sibling?.red) {
        sibling.red = false;
        parent.red = true;
        rotateNode(this, parent, direction);
        sibling = parent[siblingDirection];
      }
      if (sibling) {
        // No red nephew: recoloring the sibling balances this subtree and
        // hands the deficit to the parent.
        if (!sibling.left?.red && !sibling.right?.red) {
          sibling.red = true;
          current = parent;
          parent = current.parent;
        } else {
          // Only the inner nephew is red: rotate it outward so the outer
          // case below applies.
          if (!sibling[siblingDirection]?.red) {
            sibling[direction].red = false;
            sibling.red = true;
            rotateNode(this, sibling, siblingDirection);
            sibling = parent[siblingDirection];
          }
          // Red outer nephew: one rotation restores the black height.
          sibling.red = parent.red;
          parent.red = false;
          sibling[siblingDirection].red = false;
          rotateNode(this, parent, direction);
          current = getRoot(this);
          parent = null;
        }
      }
    }
    if (current) {
      current.red = false;
    }
  }
  /**
   * Add a value to the red-black tree, unless a value that compares equal to
   * it is already present.
   *
   * The complexity of this operation is on average and at worst O(log n), where
   * n is the number of values in the tree.
   *
   * @example Inserting a value into the tree
   * ```ts
   * import { RedBlackTree } from "red-black-tree.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const tree = new RedBlackTree<number>();
   *
   * assertEquals(tree.insert(42), true);
   * assertEquals(tree.insert(42), false);
   * ```
   *
   * @param value The value to insert into the tree.
   * @returns `true` if the value was inserted, `false` if a value that compares equal to it already exists in the tree.
   */
  insert(value) {
    let node = insertNode(this, RedBlackNode, value);
    if (node) {
      // A red node cannot have a red parent. Repair that violation, which each
      // step either resolves or pushes two levels up the tree.
      while (node.parent?.red) {
        let parent = node.parent;
        const parentDirection = parent.directionFromParent();
        const uncleDirection = parentDirection === "right" ? "left" : "right";
        const uncle = parent.parent[uncleDirection] ??
          null;
        // Red uncle: recoloring both makes the grandparent red, moving the
        // violation up.
        if (uncle?.red) {
          parent.red = false;
          uncle.red = false;
          parent.parent.red = true;
          node = parent.parent;
        } else {
          // Black uncle: line the node up with its parent, if needed, then a
          // single rotation of the grandparent ends the loop.
          if (node === parent[uncleDirection]) {
            node = parent;
            rotateNode(this, node, parentDirection);
            parent = node.parent;
          }
          parent.red = false;
          parent.parent.red = true;
          rotateNode(this, parent.parent, uncleDirection);
        }
      }
      // The root is always black.
      getRoot(this).red = false;
    }
    return !!node;
  }
  /**
   * Remove the value that compares equal to the given value, if the tree holds
   * one.
   *
   * The complexity of this operation is on average and at worst O(log n), where
   * n is the number of values in the tree.
   *
   * @example Removing values from the tree
   * ```ts
   * import { RedBlackTree } from "red-black-tree.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const tree = RedBlackTree.from<number>([42]);
   *
   * assertEquals(tree.remove(42), true);
   * assertEquals(tree.remove(42), false);
   * ```
   *
   * @param value The value to remove from the tree.
   * @returns `true` if the value was found and removed, `false` if the value was not found in the tree.
   */
  remove(value) {
    const node = findNode(this, value);
    if (!node) {
      return false;
    }
    const removedNode = removeNode(this, node);
    if (removedNode && !removedNode.red) {
      this.#removeFixup(
        removedNode.parent,
        removedNode.left ?? removedNode.right,
      );
    }
    return true;
  }
}
