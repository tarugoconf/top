/**
 * Executes a function which returns a promise, expecting it to reject.
 *
 * To assert that a synchronous function throws, use {@linkcode assertThrows}.
 *
 * @example Usage
 * ```ts ignore
 * import { assertRejects } from "mod.ts";
 *
 * await assertRejects(async () => Promise.reject(new Error())); // Doesn't throw
 * await assertRejects(async () => console.log("Hello world")); // Throws
 * ```
 *
 * @param fn The function to execute.
 * @param msg The optional message to display if the assertion fails.
 * @returns The promise which resolves to the thrown error.
 */
export declare function assertRejects(
  fn: () => PromiseLike<unknown>,
  msg?: string,
): Promise<unknown>;
/**
 * Executes a function which returns a promise, expecting it to reject.
 * If it does not, then it throws. An error class and a string that should be
 * included in the error message can also be asserted.
 *
 * To assert that a synchronous function throws, use {@linkcode assertThrows}.
 *
 * @example Usage
 * ```ts ignore
 * import { assertRejects } from "mod.ts";
 *
 * await assertRejects(async () => Promise.reject(new Error()), Error); // Doesn't throw
 * await assertRejects(async () => Promise.reject(new Error()), SyntaxError); // Throws
 * ```
 *
 * @typeParam E The error class to assert.
 * @param fn The function to execute.
 * @param ErrorClass The error class to assert.
 * @param msgIncludes The string that should be included in the error message.
 * @param msg The optional message to display if the assertion fails.
 * @returns The promise which resolves to the thrown error.
 */
export declare function assertRejects<E extends Error = Error>(
  fn: () => PromiseLike<unknown>,
  ErrorClass: abstract new (...args: any[]) => E,
  msgIncludes?: string,
  msg?: string,
): Promise<E>;
