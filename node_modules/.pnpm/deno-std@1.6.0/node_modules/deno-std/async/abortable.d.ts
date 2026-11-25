/**
 * Make a {@linkcode Promise} abortable with the given signal.
 *
 * @throws {DOMException} If the signal is already aborted and `signal.reason`
 * is undefined. Otherwise, throws `signal.reason`.
 * @typeParam T The type of the provided and returned promise.
 * @param p The promise to make abortable.
 * @param signal The signal to abort the promise with.
 * @returns A promise that can be aborted.
 *
 * @example Error-handling a timeout
 * ```ts
 * import { abortable, delay } from "mod.ts";
 * import { assertRejects, assertEquals } from "../assert/mod.ts";
 *
 * const promise = delay(1_000);
 *
 * // Rejects with `DOMException` (name `"TimeoutError"`) after 100 ms
 * const error = await assertRejects(
 *   () => abortable(promise, AbortSignal.timeout(100)),
 *   DOMException,
 * );
 * assertEquals(error.name, "TimeoutError");
 * ```
 *
 * @example Error-handling an abort
 * ```ts
 * import { abortable, delay } from "mod.ts";
 * import { assertRejects, assertEquals } from "../assert/mod.ts";
 *
 * const promise = delay(1_000);
 * const controller = new AbortController();
 * controller.abort(new Error("This is my reason"));
 *
 * // Rejects with `DOMException` immediately
 * await assertRejects(
 *   () => abortable(promise, controller.signal),
 *   Error,
 *   "This is my reason"
 * );
 * ```
 */
export declare function abortable<T>(
  p: Promise<T>,
  signal: AbortSignal,
): Promise<T>;
/**
 * Make an {@linkcode AsyncIterable} abortable with the given signal.
 *
 * @throws {DOMException} If the signal is already aborted and `signal.reason`
 * is undefined. Otherwise, throws `signal.reason`.
 * @typeParam T The type of the provided and returned async iterable.
 * @param p The async iterable to make abortable.
 * @param signal The signal to abort the promise with.
 * @returns An async iterable that can be aborted.
 *
 * @example Error-handling a timeout
 * ```ts
 * import { abortable, delay } from "mod.ts";
 * import { assertRejects, assertEquals } from "../assert/mod.ts";
 *
 * const asyncIter = async function* () {
 *   yield "Hello";
 *   await delay(1_000);
 *   yield "World";
 * };
 *
 * const items: string[] = [];
 * // Below throws `DOMException` (name `"TimeoutError"`) after 100 ms and items
 * // become `["Hello"]`
 * const error = await assertRejects(
 *   async () => {
 *     for await (const item of abortable(asyncIter(), AbortSignal.timeout(100))) {
 *       items.push(item);
 *     }
 *   },
 *   DOMException,
 * );
 * assertEquals(error.name, "TimeoutError");
 * assertEquals(items, ["Hello"]);
 * ```
 *
 * @example Error-handling an abort
 * ```ts
 * import { abortable, delay } from "mod.ts";
 * import { assertRejects, assertEquals } from "../assert/mod.ts";
 *
 * const asyncIter = async function* () {
 *   yield "Hello";
 *   await delay(1_000);
 *   yield "World";
 * };
 * const controller = new AbortController();
 * controller.abort(new Error("This is my reason"));
 *
 * const items: string[] = [];
 * // Below throws `DOMException` immediately
 * await assertRejects(
 *   async () => {
 *     for await (const item of abortable(asyncIter(), controller.signal)) {
 *       items.push(item);
 *     }
 *   },
 *   Error,
 *   "This is my reason"
 * );
 * assertEquals(items, []);
 * ```
 */
export declare function abortable<T>(
  p: AsyncIterable<T>,
  signal: AbortSignal,
): AsyncGenerator<T>;
