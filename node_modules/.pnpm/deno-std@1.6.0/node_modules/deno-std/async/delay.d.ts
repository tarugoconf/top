/** Options for {@linkcode delay}. */
export interface DelayOptions {
  /** Signal used to abort the delay. */
  signal?: AbortSignal;
  /** Indicates whether the process should continue to run as long as the timer exists.
   *
   * @default {true}
   */
  persistent?: boolean;
}
/**
 * Resolve a {@linkcode Promise} after a given amount of milliseconds.
 *
 * If the optional signal is aborted before the delay duration, the returned
 * promise rejects with the signal's reason. If no reason is provided to
 * `abort()`, the browser's default `DOMException` with name `"AbortError"` is used.
 *
 * @param ms Duration in milliseconds for how long the delay should last.
 * @param options Additional options.
 *
 * @example Basic usage
 * ```ts no-assert
 * import { delay } from "delay.ts";
 *
 * // ...
 * const delayedPromise = delay(100);
 * const result = await delayedPromise;
 * // ...
 * ```
 *
 * @example Disable persistence
 *
 * Setting `persistent` to `false` will allow the process to continue to run as
 * long as the timer exists.
 *
 * ```ts no-assert ignore
 * import { delay } from "delay.ts";
 *
 * // ...
 * await delay(100, { persistent: false });
 * // ...
 * ```
 */
export declare function delay(
  ms: number,
  options?: DelayOptions,
): Promise<void>;
