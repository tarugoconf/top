/**
 * Deep equality comparison used in assertions.
 *
 * This function is based on value equality, but for some cases (such as data
 * that can only be read asynchronously or function properties) value equality
 * is not possible to determine. In such cases, reference equality is used
 * instead, which may cause false negatives for objects such as `Blob`s or
 * `Request`s.
 *
 * @param a The actual value
 * @param b The expected value
 * @returns `true` if the values are deeply equal, `false` otherwise
 *
 * @throws {TypeError} If either value is a `WeakMap` or `WeakSet`.
 *
 * @example Usage
 * ```ts
 * import { equal } from "equal.ts";
 *
 * equal({ foo: "bar" }, { foo: "bar" }); // Returns `true`
 * equal({ foo: "bar" }, { foo: "baz" }); // Returns `false`
 * ```
 */
export declare function equal(a: unknown, b: unknown): boolean;
