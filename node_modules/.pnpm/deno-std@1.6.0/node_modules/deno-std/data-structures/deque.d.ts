/**
 * Read-only view of a {@linkcode Deque}. Strips all mutation methods,
 * following the `ReadonlyArray` / `ReadonlyMap` / `ReadonlySet` pattern.
 * A `Deque<T>` is directly assignable to `ReadonlyDeque<T>`.
 *
 * @typeParam T The type of the values stored in the deque.
 */
export type ReadonlyDeque<T> = Pick<
  Deque<T>,
  | "length"
  | "isEmpty"
  | "peekFront"
  | "peekBack"
  | "at"
  | "includes"
  | "find"
  | "findIndex"
  | "toArray"
  | typeof Symbol.iterator
  | "reversed"
  | typeof Symbol.toStringTag
>;
/**
 * A double-ended queue backed by a ring buffer. Pushing, popping, and indexed
 * access stay fast as the deque grows.
 *
 * | Method        | Average Case | Worst Case  |
 * | ------------- | ------------ | ----------- |
 * | pushBack()    | O(1)         | O(n) amort. |
 * | pushFront()   | O(1)         | O(n) amort. |
 * | popBack()     | O(1)         | O(1)        |
 * | popFront()    | O(1)         | O(1)        |
 * | peekFront()   | O(1)         | O(1)        |
 * | peekBack()    | O(1)         | O(1)        |
 * | at()          | O(1)         | O(1)        |
 * | isEmpty()     | O(1)         | O(1)        |
 * | clear()       | O(1)         | O(1)        |
 * | removeAt()    | O(n)         | O(n)        |
 * | removeFirst() | O(n)         | O(n)        |
 * | includes()    | O(n)         | O(n)        |
 * | find()        | O(n)         | O(n)        |
 * | findIndex()   | O(n)         | O(n)        |
 * | retain()      | O(n)         | O(n)        |
 * | toArray()     | O(n)         | O(n)        |
 * | Deque.from()  | O(n)         | O(n)        |
 *
 * @example Usage
 * ```ts
 * import { Deque } from "deque.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const deque = new Deque<number>();
 * deque.pushBack(1, 2, 3);
 * assertEquals(deque.popFront(), 1);
 * assertEquals(deque.length, 2);
 * assertEquals([...deque], [2, 3]);
 * ```
 *
 * @typeParam T The type of the values stored in the deque.
 */
export declare class Deque<T> implements Iterable<T>, ReadonlyDeque<T> {
  #private;
  /**
   * Creates an empty deque, optionally populated from an iterable.
   *
   * @example Creating an empty deque
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque<number>();
   * assertEquals(deque.length, 0);
   * ```
   *
   * @example Creating a deque from an iterable
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals([...deque], [1, 2, 3]);
   * ```
   *
   * @param source An optional iterable to populate the deque.
   */
  constructor(source?: Iterable<T>);
  /**
   * The number of elements in the deque.
   *
   * @example Getting the length
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals(deque.length, 3);
   * ```
   *
   * @returns The number of elements in the deque.
   */
  get length(): number;
  /**
   * Checks if the deque contains no elements.
   *
   * @example Checking if the deque is empty
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque<number>();
   * assertEquals(deque.isEmpty(), true);
   *
   * deque.pushBack(1);
   * assertEquals(deque.isEmpty(), false);
   * ```
   *
   * @returns `true` if the deque is empty, otherwise `false`.
   */
  isEmpty(): boolean;
  /**
   * Append one or more values to the back of the deque.
   *
   * @example Pushing values to the back
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque<number>();
   * deque.pushBack(1, 2, 3);
   * assertEquals([...deque], [1, 2, 3]);
   * ```
   *
   * @param value The first value to append.
   * @param rest Additional values to append.
   * @returns The new length of the deque.
   */
  pushBack(value: T, ...rest: T[]): number;
  /**
   * Prepend one or more values to the front of the deque. Values are inserted
   * in argument order, so `pushFront(1, 2, 3)` results in front-to-back order
   * `[1, 2, 3, ...existing]`.
   *
   * @example Pushing values to the front
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([4, 5]);
   * deque.pushFront(1, 2, 3);
   * assertEquals([...deque], [1, 2, 3, 4, 5]);
   * ```
   *
   * @param value The first value to prepend.
   * @param rest Additional values to prepend.
   * @returns The new length of the deque.
   */
  pushFront(value: T, ...rest: T[]): number;
  /**
   * Remove and return the back element, or `undefined` if the deque is empty.
   *
   * @example Popping from the back
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals(deque.popBack(), 3);
   * assertEquals([...deque], [1, 2]);
   * ```
   *
   * @returns The back element, or `undefined` if empty.
   */
  popBack(): T | undefined;
  /**
   * Remove and return the front element, or `undefined` if the deque is empty.
   *
   * @example Popping from the front
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals(deque.popFront(), 1);
   * assertEquals([...deque], [2, 3]);
   * ```
   *
   * @returns The front element, or `undefined` if empty.
   */
  popFront(): T | undefined;
  /**
   * Remove and return the first element matching the predicate, scanning from
   * front to back. The gap is closed by shifting whichever side (front or back)
   * has fewer elements to move, so removals near either end are fast.
   *
   * @example Removing the first even number
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3, 4]);
   * assertEquals(deque.removeFirst((v) => v % 2 === 0), 2);
   * assertEquals([...deque], [1, 3, 4]);
   * ```
   *
   * @param predicate A function called for each element with its index. The
   *   first element for which it returns `true` is removed and returned.
   * @returns The removed element, or `undefined` if no match was found.
   */
  removeFirst(predicate: (value: T, index: number) => boolean): T | undefined;
  /**
   * Remove and return the element at the given index (0-based from front).
   * Negative indices count from the back (`-1` is the last element). Returns
   * `undefined` for out-of-range indices. The gap is closed by shifting
   * whichever side (front or back) has fewer elements to move.
   *
   * @example Removing by index
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([10, 20, 30, 40]);
   * assertEquals(deque.removeAt(1), 20);
   * assertEquals([...deque], [10, 30, 40]);
   * ```
   *
   * @example Removing with a negative index
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([10, 20, 30, 40]);
   * assertEquals(deque.removeAt(-1), 40);
   * assertEquals([...deque], [10, 20, 30]);
   * ```
   *
   * @param index The zero-based index. Negative values count from the back.
   * @returns The removed element, or `undefined` if the index is out of range.
   */
  removeAt(index: number): T | undefined;
  /**
   * Return the first element matching the predicate, scanning from front to
   * back, without removing it. Returns `undefined` if no match is found.
   *
   * @example Finding the first even number
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3, 4]);
   * assertEquals(deque.find((v) => v % 2 === 0), 2);
   * assertEquals(deque.find((v) => v > 10), undefined);
   * ```
   *
   * @param predicate A function called for each element with its index. The
   *   first element for which it returns `true` is returned.
   * @returns The first matching element, or `undefined` if no match was found.
   */
  find(predicate: (value: T, index: number) => boolean): T | undefined;
  /**
   * Return the index of the first element matching the predicate, scanning
   * from front to back. Returns `-1` if no match is found.
   *
   * @example Finding the index of the first even number
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3, 4]);
   * assertEquals(deque.findIndex((v) => v % 2 === 0), 1);
   * assertEquals(deque.findIndex((v) => v > 10), -1);
   * ```
   *
   * @param predicate A function called for each element with its index. The
   *   index of the first element for which it returns `true` is returned.
   * @returns The index of the first matching element, or `-1` if not found.
   */
  findIndex(predicate: (value: T, index: number) => boolean): number;
  /**
   * Return the front element without removing it, or `undefined` if the deque
   * is empty.
   *
   * @example Peeking at the front
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals(deque.peekFront(), 1);
   * assertEquals(deque.length, 3);
   * ```
   *
   * @returns The front element, or `undefined` if empty.
   */
  peekFront(): T | undefined;
  /**
   * Return the back element without removing it, or `undefined` if the deque
   * is empty.
   *
   * @example Peeking at the back
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals(deque.peekBack(), 3);
   * assertEquals(deque.length, 3);
   * ```
   *
   * @returns The back element, or `undefined` if empty.
   */
  peekBack(): T | undefined;
  /**
   * Return the element at the given index (0-based from front). Negative
   * indices count from the back (`-1` is the last element). Returns `undefined`
   * for out-of-range indices.
   *
   * @example Accessing elements by index
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([10, 20, 30, 40]);
   * assertEquals(deque.at(0), 10);
   * assertEquals(deque.at(-1), 40);
   * assertEquals(deque.at(99), undefined);
   * ```
   *
   * @param index The zero-based index. Negative values count from the back.
   * @returns The element at the index, or `undefined` if out of range.
   */
  at(index: number): T | undefined;
  /**
   * Check whether the deque contains a value, using
   * {@link https://tc39.es/ecma262/#sec-samevaluezero | SameValueZero}
   * comparison (like {@linkcode Array.prototype.includes}).
   *
   * @example Checking for membership
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals(deque.includes(2), true);
   * assertEquals(deque.includes(99), false);
   * ```
   *
   * @example NaN is found (SameValueZero semantics)
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, NaN, 3]);
   * assertEquals(deque.includes(NaN), true);
   * ```
   *
   * @param value The value to search for.
   * @returns `true` if the deque contains the value, otherwise `false`.
   */
  includes(value: T): boolean;
  /**
   * Remove all elements and release the backing buffer.
   *
   * @example Clearing the deque
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * deque.clear();
   * assertEquals(deque.length, 0);
   * assertEquals(deque.isEmpty(), true);
   * ```
   */
  clear(): void;
  /**
   * Keep only the elements for which the predicate returns `true`, removing
   * the rest in place. Equivalent to an in-place
   * {@linkcode Array.prototype.filter}. The predicate is called once per
   * element in front-to-back order.
   *
   * @example Retaining only odd numbers
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3, 4, 5]);
   * deque.retain((v) => v % 2 !== 0);
   * assertEquals([...deque], [1, 3, 5]);
   * ```
   *
   * @param predicate A function called for each element with its index.
   *   Elements for which it returns `false` are removed.
   */
  retain(predicate: (value: T, index: number) => boolean): void;
  /**
   * Return a shallow copy of the deque's contents as an array, in
   * front-to-back order.
   *
   * @example Converting to an array
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals(deque.toArray(), [1, 2, 3]);
   * ```
   *
   * @returns An array containing the deque's elements in order.
   */
  toArray(): T[];
  /**
   * Create a new deque from an array-like, iterable, or existing deque.
   *
   * @example Creating a deque from an array
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = Deque.from([1, 2, 3]);
   * assertEquals([...deque], [1, 2, 3]);
   * ```
   *
   * @example Creating a deque from an existing deque
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const original = new Deque([1, 2, 3]);
   * const copy = Deque.from(original);
   * assertEquals([...copy], [1, 2, 3]);
   * ```
   *
   * @typeParam T The type of the values in the passed collection.
   * @param collection An array-like, iterable, or existing deque.
   * @returns A new deque containing the values from the collection.
   */
  static from<T>(collection: ArrayLike<T> | Iterable<T> | Deque<T>): Deque<T>;
  /**
   * Create a new deque from an array-like, iterable, or existing deque, with
   * a mapping function applied to each element.
   *
   * @example Creating a deque with a mapping function
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = Deque.from([1, 2, 3], { map: (v) => v * 10 });
   * assertEquals([...deque], [10, 20, 30]);
   * ```
   *
   * @typeParam T The type of the values in the passed collection.
   * @typeParam U The type of the values stored in the new deque.
   * @typeParam V The type of the `this` value when calling the mapping function. Defaults to `undefined`.
   * @param collection An array-like, iterable, or existing deque.
   * @param options Options with a map function and optional thisArg.
   * @returns A new deque containing the mapped values from the collection.
   */
  static from<T, U, V = undefined>(
    collection: ArrayLike<T> | Iterable<T> | Deque<T>,
    options: {
      map: (value: T, index: number) => U;
      thisArg?: V;
    },
  ): Deque<U>;
  /**
   * Iterate over the deque's elements from front to back. Non-destructive
   * (unlike {@linkcode BinaryHeap}).
   *
   * @example Iterating over the deque
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals([...deque], [1, 2, 3]);
   * ```
   *
   * @returns An iterator yielding elements from front to back.
   */
  [Symbol.iterator](): IterableIterator<T>;
  /**
   * Iterate over the deque's elements from back to front.
   *
   * @example Iterating in reverse
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque([1, 2, 3]);
   * assertEquals([...deque.reversed()], [3, 2, 1]);
   * ```
   *
   * @returns An iterator yielding elements from back to front.
   */
  reversed(): IterableIterator<T>;
  /**
   * The string tag used by `Object.prototype.toString`.
   *
   * @example Usage
   * ```ts
   * import { Deque } from "deque.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const deque = new Deque<number>();
   * assertEquals(deque[Symbol.toStringTag], "Deque");
   * ```
   */
  readonly [Symbol.toStringTag]: "Deque";
}
