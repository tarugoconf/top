// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Creates a debounced function that delays the given `func`
 * by a given `wait` time in milliseconds. If the method is called
 * again before the timeout expires, the previous call will be
 * aborted.
 *
 * If an {@linkcode AbortSignal} is provided via `options.signal`, aborting the
 * signal clears any pending debounce timeout, equivalent to calling
 * {@linkcode DebouncedFunction.clear}.
 *
 * @example Usage
 * ```ts ignore
 * import { debounce } from "debounce.ts";
 *
 * const log = debounce(
 *   (event: Deno.FsEvent) =>
 *     console.log("[%s] %s", event.kind, event.paths[0]),
 *   200,
 * );
 *
 * for await (const event of Deno.watchFs("./")) {
 *   log(event);
 * }
 * // wait 200ms ...
 * // output: [modify] /path/to/file
 * ```
 *
 * @example With AbortSignal
 * ```ts ignore
 * import { debounce } from "debounce.ts";
 *
 * const controller = new AbortController();
 * const log = debounce(
 *   (event: Deno.FsEvent) =>
 *     console.log("[%s] %s", event.kind, event.paths[0]),
 *   200,
 *   { signal: controller.signal },
 * );
 *
 * for await (const event of Deno.watchFs("./")) {
 *   log(event);
 * }
 *
 * // Abort clears any pending debounce
 * controller.abort();
 * ```
 *
 * @typeParam T The arguments of the provided function.
 * @param fn The function to debounce.
 * @param wait The time in milliseconds to delay the function.
 * Must be a positive integer.
 * @param options Optional parameters.
 * @throws {RangeError} If `wait` is not a non-negative integer.
 * @returns The debounced function.
 */
// deno-lint-ignore no-explicit-any
export function debounce(fn, wait, options) {
  if (!Number.isInteger(wait) || wait < 0) {
    throw new RangeError("'wait' must be a positive integer");
  }
  let timeout = null;
  let pendingFlush = null;
  const debounced = (...args) => {
    debounced.clear();
    pendingFlush = () => {
      debounced.clear();
      fn.call(debounced, ...args);
    };
    timeout = Number(setTimeout(pendingFlush, wait));
  };
  debounced.clear = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
      pendingFlush = null;
    }
  };
  debounced.flush = () => {
    pendingFlush?.();
  };
  Object.defineProperty(debounced, "pending", {
    get: () => timeout !== null,
  });
  const signal = options?.signal;
  if (signal) {
    signal.throwIfAborted();
    signal.addEventListener("abort", () => debounced.clear(), { once: true });
  }
  return debounced;
}
