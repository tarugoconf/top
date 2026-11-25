// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
class Queue {
  #source;
  #queue;
  head;
  done;
  constructor(iterable) {
    this.#source = iterable[Symbol.asyncIterator]();
    this.#queue = {
      value: undefined,
      next: undefined,
    };
    this.head = this.#queue;
    this.done = false;
  }
  async next() {
    const result = await this.#source.next();
    if (!result.done) {
      const nextNode = {
        value: result.value,
        next: undefined,
      };
      this.#queue.next = nextNode;
      this.#queue = nextNode;
    } else {
      this.done = true;
    }
  }
}
/**
 * Branches the given async iterable into the `n` branches.
 *
 * @example Usage
 * ```ts
 * import { tee } from "tee.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const gen = async function* gen() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * };
 *
 * const [branch1, branch2] = tee(gen());
 *
 * const result1 = await Array.fromAsync(branch1);
 * assertEquals(result1, [1, 2, 3]);
 *
 * const result2 = await Array.fromAsync(branch2);
 * assertEquals(result2, [1, 2, 3]);
 * ```
 *
 * @typeParam T The type of the provided async iterable and the returned async iterables.
 * @typeParam N The amount of branches to tee into.
 * @param iterable The iterable to tee.
 * @param n The amount of branches to tee into.
 * @returns The tuple where each element is an async iterable.
 */
export function tee(iterable, n = 2) {
  const queue = new Queue(iterable);
  async function* generator() {
    let buffer = queue.head;
    while (true) {
      if (buffer.next) {
        buffer = buffer.next;
        yield buffer.value;
      } else if (queue.done) {
        return;
      } else {
        await queue.next();
      }
    }
  }
  return Array.from({ length: n }).map(() => generator());
}
