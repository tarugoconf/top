/**
 * A priority queue implemented with a binary heap. The heap is in descending
 * order by default, using JavaScript's built-in comparison operators to sort
 * the values.
 *
 * | Method      | Average Case | Worst Case |
 * | ----------- | ------------ | ---------- |
 * | peek()      | O(1)         | O(1)       |
 * | pop()       | O(log n)     | O(log n)   |
 * | push(value) | O(1)         | O(log n)   |
 *
 * @example Usage
 * ```ts
 * import {
 *   ascend,
 *   BinaryHeap,
 *   descend,
 * } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const maxHeap = new BinaryHeap<number>();
 * maxHeap.push(4, 1, 3, 5, 2);
 * assertEquals(maxHeap.peek(), 5);
 * assertEquals(maxHeap.pop(), 5);
 * assertEquals([...maxHeap], [4, 3, 2, 1]);
 * assertEquals([...maxHeap], []);
 *
 * const minHeap = new BinaryHeap<number>(ascend);
 * minHeap.push(4, 1, 3, 5, 2);
 * assertEquals(minHeap.peek(), 1);
 * assertEquals(minHeap.pop(), 1);
 * assertEquals([...minHeap], [2, 3, 4, 5]);
 * assertEquals([...minHeap], []);
 *
 * const words = new BinaryHeap<string>((a, b) => descend(a.length, b.length));
 * words.push("truck", "car", "helicopter", "tank");
 * assertEquals(words.peek(), "helicopter");
 * assertEquals(words.pop(), "helicopter");
 * assertEquals([...words], ["truck", "tank", "car"]);
 * assertEquals([...words], []);
 * ```
 *
 * @typeparam T The type of the values stored in the binary heap.
 */
export declare class BinaryHeap<T> implements Iterable<T> {
  #private;
  /**
   * Construct an empty binary heap.
   *
   * @param compare A custom comparison function to sort the values in the heap. By default, the values are sorted in descending order.
   */
  constructor(compare?: (a: T, b: T) => number);
  /**
   * Returns the underlying cloned array in arbitrary order without sorting.
   *
   * @example Getting the underlying array
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2]);
   *
   * assertEquals(heap.toArray(), [ 5, 4, 3, 1, 2 ]);
   * ```
   *
   * @returns An array containing the values in the binary heap.
   */
  toArray(): T[];
  /**
   * Creates a new binary heap from an array like, an iterable object, or an
   * existing binary heap.
   *
   * A custom comparison function can be provided to sort the values in a
   * specific order. By default, the values are sorted in descending order,
   * unless a {@link BinaryHeap} is passed, in which case the comparison
   * function is copied from the input heap.
   *
   * @example Creating a binary heap from an array like
   * ```ts no-assert
   * import { BinaryHeap } from "mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2]);
   * ```
   *
   * @example Creating a binary heap from an iterable object
   * ```ts no-assert
   * import { BinaryHeap } from "mod.ts";
   *
   * const heap = BinaryHeap.from((function*() { yield* [4, 1, 3, 5, 2]; })());
   * ```
   *
   * @example Creating a binary heap from an existing binary heap
   * ```ts no-assert
   * import { BinaryHeap } from "mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2]);
   * const copy = BinaryHeap.from(heap);
   * ```
   *
   * @example Creating a binary heap from an array like with a custom comparison function
   * ```ts no-assert
   * import { BinaryHeap, ascend } from "mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2], { compare: ascend });
   * ```
   *
   * @typeparam T The type of the values stored in the binary heap.
   * @param collection An array like, an iterable object, or an existing binary heap.
   * @param options An optional options object to customize the comparison function.
   * @returns A new binary heap containing the values from the passed collection.
   */
  static from<T>(
    collection: ArrayLike<T> | Iterable<T> | BinaryHeap<T>,
    options?: {
      compare?: (a: T, b: T) => number;
    },
  ): BinaryHeap<T>;
  /**
   * Creates a new binary heap from an array like, an iterable object, or an
   * existing binary heap.
   *
   * A custom mapping function can be provided to transform the values before
   * inserting them into the heap.
   *
   * A custom comparison function can be provided to sort the values in a
   * specific order. By default, the values are sorted in descending order,
   * unless a {@link BinaryHeap} is passed, in which case the comparison
   * function is copied from the input heap. The comparison operator is used to
   * sort the values in the heap after mapping the values.
   *
   * @example Creating a binary heap from an array like with a custom mapping function
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2], { map: (value) => value * 2 });
   *
   * assertEquals(heap.peek(), 10);
   * ```
   *
   * @typeparam T The type of the values in the passed collection.
   * @typeparam U The type of the values stored in the binary heap.
   * @typeparam V The type of the `this` value when calling the mapping function. Defaults to `undefined`.
   * @param collection An array like, an iterable object, or an existing binary heap.
   * @param options The options object to customize the mapping and comparison functions. The `thisArg` property can be used to set the `this` value when calling the mapping function.
   * @returns A new binary heap containing the mapped values from the passed collection.
   */
  static from<T, U, V = undefined>(
    collection: ArrayLike<T> | Iterable<T> | BinaryHeap<T>,
    options: {
      compare?: (a: U, b: U) => number;
      map: (value: T, index: number) => U;
      thisArg?: V;
    },
  ): BinaryHeap<U>;
  /**
   * The count of values stored in the binary heap.
   *
   * The complexity of this operation is O(1).
   *
   * @example Getting the length of the binary heap
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2]);
   *
   * assertEquals(heap.length, 5);
   * ```
   *
   * @returns The count of values stored in the binary heap.
   */
  get length(): number;
  /**
   * Get the greatest value from the binary heap without removing it, or
   * undefined if the heap is empty.
   *
   * The complexity of this operation is O(1).
   *
   * @example Getting the greatest value from the binary heap
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2]);
   *
   * assertEquals(heap.peek(), 5);
   * ```
   *
   * @example Getting the greatest value from an empty binary heap
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = new BinaryHeap<number>();
   *
   * assertEquals(heap.peek(), undefined);
   * ```
   *
   * @returns The greatest value from the binary heap, or undefined if it is empty.
   */
  peek(): T | undefined;
  /**
   * Remove the greatest value from the binary heap and return it, or return
   * undefined if the heap is empty.
   *
   * @example Removing the greatest value from the binary heap
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2]);
   *
   * assertEquals(heap.pop(), 5);
   * assertEquals([...heap], [4, 3, 2, 1]);
   * ```
   *
   * The complexity of this operation is on average and worst case O(log n),
   * where n is the count of values stored in the binary heap.
   *
   * @example Removing the greatest value from an empty binary heap
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = new BinaryHeap<number>();
   *
   * assertEquals(heap.pop(), undefined);
   * ```
   *
   * @returns The greatest value from the binary heap, or undefined if the heap is empty.
   */
  pop(): T | undefined;
  /**
   * Add one or more values to the binary heap, returning the new length of the
   * heap.
   *
   * The complexity of this operation is O(1) on average and O(log n) in the
   * worst case, where n is the count of values stored in the binary heap.
   *
   * @example Adding values to the binary heap
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 2]);
   * heap.push(5);
   *
   * assertEquals([...heap], [5, 4, 3, 2, 1]);
   * ```
   *
   * @param values The values to add to the binary heap.
   * @returns The new length of the binary heap.
   */
  push(...values: T[]): number;
  /**
   * Remove all values from the binary heap.
   *
   * @example Clearing the binary heap
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2]);
   * heap.clear();
   *
   * assertEquals([...heap], []);
   * ```
   */
  clear(): void;
  /**
   * Check if the binary heap is empty.
   *
   * @example Checking if the binary heap is empty
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = new BinaryHeap<number>();
   *
   * assertEquals(heap.isEmpty(), true);
   *
   * heap.push(42);
   *
   * assertEquals(heap.isEmpty(), false);
   * ```
   *
   * @returns true if the binary heap is empty, otherwise false.
   */
  isEmpty(): boolean;
  /**
   * Create an iterator that retrieves values from the binary heap in order
   * from greatest to least. The binary heap is drained in the process.
   *
   * To avoid draining the binary heap, create a copy using
   * {@link BinaryHeap.from} and then call {@link BinaryHeap.prototype.drain}
   * on the copy.
   *
   * @example Draining the binary heap
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2]);
   *
   * assertEquals([...heap.drain()], [ 5, 4, 3, 2, 1 ]);
   * assertEquals([...heap.drain()], []);
   * ```
   *
   * @returns An iterator for retrieving and removing values from the binary heap.
   */
  drain(): IterableIterator<T>;
  /**
   * Create an iterator that retrieves values from the binary heap in order
   * from greatest to least. The binary heap is drained in the process.
   *
   * @example Getting an iterator for the binary heap
   * ```ts
   * import { BinaryHeap } from "mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const heap = BinaryHeap.from([4, 1, 3, 5, 2]);
   *
   * assertEquals([...heap], [ 5, 4, 3, 2, 1 ]);
   * assertEquals([...heap], []);
   * ```
   *
   * @returns An iterator for retrieving and removing values from the binary heap.
   */
  [Symbol.iterator](): IterableIterator<T>;
}
