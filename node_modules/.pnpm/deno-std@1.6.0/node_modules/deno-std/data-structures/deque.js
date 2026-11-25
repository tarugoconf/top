// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
var _a;
const MIN_CAPACITY = 8;
const MIN_SHRINK_CAPACITY = 64;
/** Round up to the smallest power of two >= n (at least {@linkcode MIN_CAPACITY}). */
function nextPowerOfTwo(n) {
  if (n <= MIN_CAPACITY) {
    return MIN_CAPACITY;
  }
  n--;
  n |= n >>> 1;
  n |= n >>> 2;
  n |= n >>> 4;
  n |= n >>> 8;
  n |= n >>> 16;
  return n + 1;
}
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
export class Deque {
  #buffer;
  #head;
  #length;
  /** Always `#capacity - 1`. Used to wrap indices via `& #mask`. */
  #mask;
  get #capacity() {
    return this.#mask + 1;
  }
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
  constructor(source) {
    if (source === undefined || source === null) {
      this.#buffer = new Array(MIN_CAPACITY);
      this.#head = 0;
      this.#length = 0;
      this.#mask = MIN_CAPACITY - 1;
      return;
    }
    if (source instanceof _a) {
      const capacity = nextPowerOfTwo(source.#length);
      this.#buffer = _a.#copyBuffer(source, capacity);
      this.#head = 0;
      this.#length = source.#length;
      this.#mask = capacity - 1;
      return;
    }
    if (
      typeof source !== "object" && typeof source !== "string" ||
      !(Symbol.iterator in Object(source))
    ) {
      throw new TypeError(
        "Cannot construct a Deque: the 'source' parameter is not iterable, did you mean to call Deque.from?",
      );
    }
    // Fast path: copy array directly without iterator protocol overhead
    if (Array.isArray(source)) {
      const len = source.length;
      const capacity = nextPowerOfTwo(len);
      const buffer = new Array(capacity);
      for (let i = 0; i < len; i++) {
        buffer[i] = source[i];
      }
      this.#buffer = buffer;
      this.#head = 0;
      this.#length = len;
      this.#mask = capacity - 1;
      return;
    }
    const items = [...source];
    const capacity = nextPowerOfTwo(items.length);
    this.#buffer = new Array(capacity);
    for (let i = 0; i < items.length; i++) {
      this.#buffer[i] = items[i];
    }
    this.#head = 0;
    this.#length = items.length;
    this.#mask = capacity - 1;
  }
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
  get length() {
    return this.#length;
  }
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
  isEmpty() {
    return this.#length === 0;
  }
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
  pushBack(value, ...rest) {
    this.#maybeGrow();
    this.#buffer[(this.#head + this.#length) & this.#mask] = value;
    this.#length++;
    for (let i = 0; i < rest.length; i++) {
      this.#maybeGrow();
      this.#buffer[(this.#head + this.#length) & this.#mask] = rest[i];
      this.#length++;
    }
    return this.#length;
  }
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
  pushFront(value, ...rest) {
    for (let i = rest.length - 1; i >= 0; i--) {
      this.#maybeGrow();
      this.#head = (this.#head - 1) & this.#mask;
      this.#buffer[this.#head] = rest[i];
      this.#length++;
    }
    this.#maybeGrow();
    this.#head = (this.#head - 1) & this.#mask;
    this.#buffer[this.#head] = value;
    this.#length++;
    return this.#length;
  }
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
  popBack() {
    if (this.#length === 0) {
      return undefined;
    }
    this.#length--;
    const index = (this.#head + this.#length) & this.#mask;
    const value = this.#buffer[index];
    this.#buffer[index] = undefined;
    this.#maybeShrink();
    return value;
  }
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
  popFront() {
    if (this.#length === 0) {
      return undefined;
    }
    const value = this.#buffer[this.#head];
    this.#buffer[this.#head] = undefined;
    this.#head = (this.#head + 1) & this.#mask;
    this.#length--;
    this.#maybeShrink();
    return value;
  }
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
  removeFirst(predicate) {
    const i = this.#findIndex(predicate);
    if (i === -1) {
      return undefined;
    }
    return this.#removeAtUnchecked(i);
  }
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
  removeAt(index) {
    if (index < 0) {
      index += this.#length;
    }
    if (index < 0 || index >= this.#length) {
      return undefined;
    }
    return this.#removeAtUnchecked(index);
  }
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
  find(predicate) {
    const i = this.#findIndex(predicate);
    if (i === -1) {
      return undefined;
    }
    return this.#buffer[(this.#head + i) & this.#mask];
  }
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
  findIndex(predicate) {
    return this.#findIndex(predicate);
  }
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
  peekFront() {
    if (this.#length === 0) {
      return undefined;
    }
    return this.#buffer[this.#head];
  }
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
  peekBack() {
    if (this.#length === 0) {
      return undefined;
    }
    return this.#buffer[(this.#head + this.#length - 1) & this.#mask];
  }
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
  at(index) {
    if (index < 0) {
      index += this.#length;
    }
    if (index < 0 || index >= this.#length) {
      return undefined;
    }
    return this.#buffer[(this.#head + index) & this.#mask];
  }
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
  includes(value) {
    const buf = this.#buffer;
    const head = this.#head;
    const len = this.#length;
    const cap = this.#mask + 1;
    const firstLen = Math.min(len, cap - head);
    // SameValueZero: === for everything except NaN
    for (let i = 0; i < firstLen; i++) {
      const el = buf[head + i];
      if (el === value || (el !== el && value !== value)) {
        return true;
      }
    }
    const rem = len - firstLen;
    for (let i = 0; i < rem; i++) {
      const el = buf[i];
      if (el === value || (el !== el && value !== value)) {
        return true;
      }
    }
    return false;
  }
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
  clear() {
    this.#buffer = new Array(MIN_CAPACITY);
    this.#head = 0;
    this.#length = 0;
    this.#mask = MIN_CAPACITY - 1;
  }
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
  retain(predicate) {
    let write = 0;
    for (let read = 0; read < this.#length; read++) {
      const val = this.#buffer[(this.#head + read) & this.#mask];
      if (!predicate(val, read)) {
        continue;
      }
      if (write !== read) {
        this.#buffer[(this.#head + write) & this.#mask] = val;
      }
      write++;
    }
    for (let i = write; i < this.#length; i++) {
      this.#buffer[(this.#head + i) & this.#mask] = undefined;
    }
    this.#length = write;
    this.#maybeShrink();
  }
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
  toArray() {
    const buf = this.#buffer;
    const head = this.#head;
    const len = this.#length;
    const cap = this.#mask + 1;
    const result = new Array(len);
    const firstLen = Math.min(len, cap - head);
    for (let i = 0; i < firstLen; i++) {
      result[i] = buf[head + i];
    }
    const rem = len - firstLen;
    for (let i = 0; i < rem; i++) {
      result[firstLen + i] = buf[i];
    }
    return result;
  }
  static from(collection, options) {
    if (
      collection === null || collection === undefined ||
      typeof collection !== "object" && typeof collection !== "string" ||
      !(Symbol.iterator in Object(collection) ||
        "length" in Object(collection))
    ) {
      throw new TypeError(
        "Cannot create a Deque: the 'collection' parameter is not iterable or array-like",
      );
    }
    const result = new _a();
    let unmappedValues;
    if (collection instanceof _a) {
      if (!options?.map) {
        const capacity = nextPowerOfTwo(collection.#length);
        result.#buffer = _a.#copyBuffer(collection, capacity);
        result.#head = 0;
        result.#length = collection.#length;
        result.#mask = capacity - 1;
        return result;
      }
      unmappedValues = collection.toArray();
    } else {
      unmappedValues = collection;
    }
    const mapped = options?.map
      ? Array.from(unmappedValues, options.map, options.thisArg)
      : Array.from(unmappedValues);
    const capacity = nextPowerOfTwo(mapped.length);
    result.#buffer = new Array(capacity);
    for (let i = 0; i < mapped.length; i++) {
      result.#buffer[i] = mapped[i];
    }
    result.#head = 0;
    result.#length = mapped.length;
    result.#mask = capacity - 1;
    return result;
  }
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
  *[Symbol.iterator]() {
    for (let i = 0; i < this.#length; i++) {
      yield this.#buffer[(this.#head + i) & this.#mask];
    }
  }
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
  *reversed() {
    for (let i = this.#length - 1; i >= 0; i--) {
      yield this.#buffer[(this.#head + i) & this.#mask];
    }
  }
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
  [Symbol.toStringTag] = "Deque";
  static #copyBuffer(source, capacity) {
    const buffer = new Array(capacity);
    const src = source.#buffer;
    const head = source.#head;
    const len = source.#length;
    const srcCap = source.#mask + 1;
    const firstLen = Math.min(len, srcCap - head);
    for (let i = 0; i < firstLen; i++) {
      buffer[i] = src[head + i];
    }
    const rem = len - firstLen;
    for (let i = 0; i < rem; i++) {
      buffer[firstLen + i] = src[i];
    }
    return buffer;
  }
  #realloc(newCapacity) {
    this.#buffer = _a.#copyBuffer(this, newCapacity);
    this.#head = 0;
    this.#mask = newCapacity - 1;
  }
  #findIndex(predicate) {
    for (let i = 0; i < this.#length; i++) {
      if (predicate(this.#buffer[(this.#head + i) & this.#mask], i)) {
        return i;
      }
    }
    return -1;
  }
  /** Extract value, close the gap, update length, and optionally shrink. */
  #removeAtUnchecked(index) {
    const val = this.#buffer[(this.#head + index) & this.#mask];
    if (index < this.#length - index - 1) {
      this.#closeGapFromFront(index);
    } else {
      this.#closeGapFromBack(index);
    }
    this.#length--;
    this.#maybeShrink();
    return val;
  }
  /** Close the gap at `i` by shifting elements before it one slot toward the back. */
  #closeGapFromFront(i) {
    for (let j = i; j > 0; j--) {
      const dst = (this.#head + j) & this.#mask;
      const src = (this.#head + j - 1) & this.#mask;
      this.#buffer[dst] = this.#buffer[src];
    }
    this.#buffer[this.#head] = undefined;
    this.#head = (this.#head + 1) & this.#mask;
  }
  /** Close the gap at `i` by shifting elements after it one slot toward the front. */
  #closeGapFromBack(i) {
    for (let j = i; j < this.#length - 1; j++) {
      const dst = (this.#head + j) & this.#mask;
      const src = (this.#head + j + 1) & this.#mask;
      this.#buffer[dst] = this.#buffer[src];
    }
    this.#buffer[(this.#head + this.#length - 1) & this.#mask] = undefined;
  }
  #maybeGrow() {
    if (this.#length < this.#capacity) {
      return;
    }
    if (this.#head === 0) {
      this.#growWithoutCopying();
    } else {
      this.#grow();
    }
  }
  #grow() {
    this.#realloc(this.#capacity * 2);
  }
  /** Only valid when head is 0 (elements are already packed at the start). */
  #growWithoutCopying() {
    this.#buffer.length = this.#capacity * 2;
    this.#mask = this.#buffer.length - 1;
  }
  #maybeShrink() {
    const capacity = this.#capacity;
    if (capacity > MIN_SHRINK_CAPACITY && this.#length < capacity / 4) {
      this.#realloc(capacity / 2);
    }
  }
}
_a = Deque;
