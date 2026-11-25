/**
 * A record type where values can be promise-like (thenables) or plain values.
 *
 * @typeParam T The base record type with resolved value types.
 */
export type PromiseRecord<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T]: PromiseLike<T[K]> | T[K];
};
/**
 * A record type where values are {@linkcode PromiseSettledResult} objects.
 *
 * @typeParam T The base record type with resolved value types.
 */
export type SettledRecord<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T]: PromiseSettledResult<T[K]>;
};
/**
 * Resolves all values in a record of promises in parallel, returning a promise
 * that resolves to a record with the same keys and resolved values.
 *
 * This is similar to {@linkcode Promise.all}, but for records instead of arrays,
 * allowing you to use named keys instead of positional indices.
 *
 * If any promise rejects, the returned promise immediately rejects with the
 * first rejection reason. The result object has a null prototype, matching the
 * TC39 specification.
 *
 * This function implements the behavior proposed in the TC39
 * {@link https://github.com/tc39/proposal-await-dictionary | Await Dictionary}
 * proposal (`Promise.allKeyed`).
 *
 * @typeParam T The record shape with resolved (unwrapped) value types. For
 * example, if passing `{ foo: Promise<number> }`, `T` would be `{ foo: number }`.
 * @param record A record where values are promise-like (thenables) or plain values.
 * @returns A promise that resolves to a record with the same keys and resolved
 * values. The result has a null prototype.
 * @throws Rejects with the first rejection reason if any promise in the record
 * rejects.
 *
 * @example Basic usage
 * ```ts
 * import { allKeyed } from "all-keyed.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const result = await allKeyed({
 *   foo: Promise.resolve(1),
 *   bar: Promise.resolve("hello"),
 * });
 *
 * assertEquals(result, { foo: 1, bar: "hello" });
 * ```
 *
 * @example Parallel HTTP requests
 * ```ts no-assert ignore
 * import { allKeyed } from "all-keyed.ts";
 *
 * const { user, posts } = await allKeyed({
 *   user: fetch("/api/user").then((r) => r.json()),
 *   posts: fetch("/api/posts").then((r) => r.json()),
 * });
 * ```
 *
 * @example Mixed promises and plain values
 * ```ts
 * import { allKeyed } from "all-keyed.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const result = await allKeyed({
 *   promised: Promise.resolve(42),
 *   plain: "static",
 * });
 *
 * assertEquals(result, { promised: 42, plain: "static" });
 * ```
 */
export declare function allKeyed<T extends Record<PropertyKey, unknown>>(
  record: PromiseRecord<T>,
): Promise<T>;
/**
 * Resolves all values in a record of promises in parallel, returning a promise
 * that resolves to a record with the same keys and {@linkcode PromiseSettledResult}
 * objects as values.
 *
 * This is similar to {@linkcode Promise.allSettled}, but for records instead of
 * arrays, allowing you to use named keys instead of positional indices.
 *
 * Unlike {@linkcode allKeyed}, this function never rejects due to promise
 * rejections. Instead, each value in the result record is a
 * {@linkcode PromiseSettledResult} object indicating whether the corresponding
 * promise was fulfilled or rejected. The result object has a null prototype,
 * matching the TC39 specification.
 *
 * This function implements the behavior proposed in the TC39
 * {@link https://github.com/tc39/proposal-await-dictionary | Await Dictionary}
 * proposal (`Promise.allSettledKeyed`).
 *
 * @typeParam T The record shape with resolved (unwrapped) value types. For
 * example, if passing `{ foo: Promise<number> }`, `T` would be `{ foo: number }`.
 * @param record A record where values are promise-like (thenables) or plain values.
 * @returns A promise that resolves to a record with the same keys and
 * {@linkcode PromiseSettledResult} values. The result has a null prototype.
 *
 * @example Basic usage
 * ```ts
 * import { allSettledKeyed } from "all-keyed.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const settled = await allSettledKeyed({
 *   success: Promise.resolve(1),
 *   failure: Promise.reject(new Error("oops")),
 * });
 *
 * assertEquals(settled.success, { status: "fulfilled", value: 1 });
 * assertEquals(settled.failure.status, "rejected");
 * ```
 *
 * @example Error handling
 * ```ts
 * import { allSettledKeyed } from "all-keyed.ts";
 * import { assertEquals, assertExists } from "../assert/mod.ts";
 *
 * const settled = await allSettledKeyed({
 *   a: Promise.resolve("ok"),
 *   b: Promise.reject(new Error("fail")),
 *   c: Promise.resolve("also ok"),
 * });
 *
 * // Check individual results
 * if (settled.a.status === "fulfilled") {
 *   assertEquals(settled.a.value, "ok");
 * }
 * if (settled.b.status === "rejected") {
 *   assertExists(settled.b.reason);
 * }
 * ```
 */
export declare function allSettledKeyed<T extends Record<PropertyKey, unknown>>(
  record: PromiseRecord<T>,
): Promise<SettledRecord<T>>;
