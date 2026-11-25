/**
 * Executes a function, expecting it to throw. If it does not, then it
 * throws.
 *
 * To assert that an asynchronous function rejects, use
 * {@linkcode assertRejects}.
 *
 * @example Usage
 * ```ts ignore
 * import { assertThrows } from "mod.ts";
 *
 * assertThrows(() => { throw new TypeError("hello world!"); }); // Doesn't throw
 * assertThrows(() => console.log("hello world!")); // Throws
 * ```
 *
 * @param fn The function to execute.
 * @param msg The optional message to display if the assertion fails.
 * @returns The error that was thrown.
 */
export declare function assertThrows(fn: () => unknown, msg?: string): unknown;
/**
 * Executes a function, expecting it to throw. If it does not, then it
 * throws. An error class and a string that should be included in the
 * error message can also be asserted.
 *
 * To assert that an asynchronous function rejects, use
 * {@linkcode assertRejects}.
 *
 * @example Usage
 * ```ts ignore
 * import { assertThrows } from "mod.ts";
 *
 * assertThrows(() => { throw new TypeError("hello world!"); }, TypeError); // Doesn't throw
 * assertThrows(() => { throw new TypeError("hello world!"); }, RangeError); // Throws
 * ```
 *
 * @typeParam E The error class to assert.
 * @param fn The function to execute.
 * @param ErrorClass The error class to assert.
 * @param msgIncludes The string that should be included in the error message.
 * @param msg The optional message to display if the assertion fails.
 * @returns The error that was thrown.
 */
export declare function assertThrows<E extends Error = Error>(
  fn: () => unknown,
  ErrorClass: abstract new (...args: any[]) => E,
  msgIncludes?: string,
  msg?: string,
): E;
