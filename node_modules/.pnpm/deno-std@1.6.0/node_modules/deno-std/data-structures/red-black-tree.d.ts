import { BinarySearchTree } from "./binary-search-tree.ts";
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
export declare class RedBlackTree<T> extends BinarySearchTree<T> {
  #private;
  /**
   * Creates an empty red-black tree.
   *
   * @param compare A custom comparison function for the values. Must be a
   * function; defaults to sorting in ascending order via {@linkcode ascend}.
   */
  constructor(compare?: (a: T, b: T) => number);
  /**
   * Create a new red-black tree from an array like, an iterable object, or
   * an existing red-black tree.
   *
   * A custom comparison function can be provided to sort the values in a
   * specific order. By default, the values are sorted in ascending order,
   * unless a {@linkcode RedBlackTree} is passed, in which case the comparison
   * function is copied from the input tree.
   *
   * Values that compare equal are inserted once, so the resulting tree can
   * hold fewer values than the passed collection.
   *
   * The complexity of this operation is O(n) when copying a
   * {@linkcode RedBlackTree} without a `compare` option, since the tree
   * structure is copied as is, and O(n log n) otherwise, where n is the number
   * of values in the passed collection.
   *
   * @example Creating a red-black tree from an array like
   * ```ts
   * import { RedBlackTree } from "red-black-tree.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const tree = RedBlackTree.from<number>([3, 10, 13, 4, 6, 7, 1, 14]);
   * assertEquals([...tree], [1, 3, 4, 6, 7, 10, 13, 14]);
   * ```
   *
   * @example Creating a red-black tree from an iterable object
   * ```ts
   * import { RedBlackTree } from "red-black-tree.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const tree = RedBlackTree.from<number>((function*() {
   *   yield 3;
   *   yield 10;
   *   yield 13;
   * })());
   * assertEquals([...tree], [3, 10, 13]);
   * ```
   *
   * @example Creating a red-black tree from an existing red-black tree
   * ```ts
   * import { RedBlackTree } from "red-black-tree.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const tree = RedBlackTree.from<number>([3, 10, 13, 4, 6, 7, 1, 14]);
   * const copy = RedBlackTree.from(tree);
   *
   * // The copy is independent of the original
   * copy.remove(3);
   * assertEquals([...copy], [1, 4, 6, 7, 10, 13, 14]);
   * assertEquals([...tree], [1, 3, 4, 6, 7, 10, 13, 14]);
   * ```
   *
   * @example Creating a red-black tree from an array like with a custom comparison function
   * ```ts
   * import { RedBlackTree } from "red-black-tree.ts";
   * import { descend } from "comparators.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const tree = RedBlackTree.from<number>([3, 10, 13, 4, 6, 7, 1, 14], {
   *   compare: descend,
   * });
   * assertEquals([...tree], [14, 13, 10, 7, 6, 4, 3, 1]);
   * ```
   *
   * @typeParam T The type of the values being stored in the tree.
   * @param collection An array like, an iterable, or existing red-black tree.
   * @param options An optional options object to customize the comparison function.
   * @returns A new red-black tree with the values from the passed collection.
   */
  static from<T>(
    collection: ArrayLike<T> | Iterable<T> | RedBlackTree<T>,
    options?: {
      compare?: (a: T, b: T) => number;
    },
  ): RedBlackTree<T>;
  /**
   * Create a new red-black tree from an array like, an iterable object, or
   * an existing red-black tree, transforming the values with a custom mapping
   * function before inserting them.
   *
   * A custom comparison function can be provided to sort the values in a
   * specific order. By default, the values are sorted in ascending order,
   * unless a {@linkcode RedBlackTree} is passed, in which case the comparison
   * function is copied from the input tree. The comparison function is applied
   * to the mapped values.
   *
   * Mapped values that compare equal are inserted once, so the resulting tree
   * can hold fewer values than the passed collection.
   *
   * The complexity of this operation is O(n log n), where n is the number of
   * values in the passed collection.
   *
   * @example Creating a red-black tree from an array like with a custom mapping function
   * ```ts
   * import { RedBlackTree } from "red-black-tree.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const tree = RedBlackTree.from<number, string>([3, 10, 13, 4, 6, 7, 1, 14], {
   *   map: (value) => value.toString(),
   * });
   * assertEquals([...tree], ["1", "10", "13", "14", "3", "4", "6", "7"]);
   * ```
   *
   * @typeParam T The type of the values in the passed collection.
   * @typeParam U The type of the values being stored in the red-black tree.
   * @typeParam V The type of the `this` context in the mapping function. Defaults to `undefined`.
   * @param collection An array like, an iterable, or existing red-black tree.
   * @param options The options object to customize the mapping and comparison functions. The `thisArg` property can be used to set the `this` value when calling the mapping function.
   * @returns A new red-black tree with the mapped values from the passed collection.
   */
  static from<T, U, V = undefined>(
    collection: ArrayLike<T> | Iterable<T> | RedBlackTree<T>,
    options: {
      compare?: (a: U, b: U) => number;
      map: (value: T, index: number) => U;
      thisArg?: V;
    },
  ): RedBlackTree<U>;
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
  insert(value: T): boolean;
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
  remove(value: T): boolean;
}
