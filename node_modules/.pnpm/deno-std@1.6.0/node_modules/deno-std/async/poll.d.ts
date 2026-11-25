/** Options for {@linkcode poll}. */
export interface PollOptions {
  /** Signal used to abort the polling. */
  signal?: AbortSignal;
  /**
   * The interval in milliseconds between each poll.
   *
   * @default {1000}
   */
  interval?: number;
}
/**
 * Repeatedly calls a function until a condition is met, then returns the result.
 *
 * This is useful for polling external APIs that don't provide push notifications.
 * The function is called repeatedly with `interval` milliseconds between each call
 * until `isDone` returns `true`, at which point the result is returned.
 *
 * @example Polling a payment status with {@linkcode deadline}
 * ```ts ignore
 * import { poll } from "poll.ts";
 * import { deadline } from "deadline.ts";
 *
 * async function getPaymentStatus(id: string): Promise<{ status: string }> {
 *   // Fetch payment status from API
 *   return { status: "pending" };
 * }
 *
 * const result = await deadline(
 *   poll(
 *     () => getPaymentStatus("payment-123"),
 *     (payment) => payment.status !== "pending",
 *     { interval: 1000 },
 *   ),
 *   30_000, // 30 second timeout
 * );
 * ```
 *
 * @example Using AbortSignal for timeout
 * ```ts ignore
 * import { poll } from "poll.ts";
 *
 * const result = await poll(
 *   () => fetch("https://api.example.com/status").then((r) => r.json()),
 *   (data) => data.completed === true,
 *   { signal: AbortSignal.timeout(30_000) },
 * );
 * ```
 *
 * @throws {RangeError} If `interval` is negative, `NaN`, or not finite.
 * @throws {DOMException & { name: "AbortError" }} If the optional signal is
 * aborted with the default `reason`.
 * @throws {AbortSignal["reason"]} If the optional signal is aborted with a
 * custom `reason`.
 * @throws If `fn` throws, that error propagates up immediately.
 * @throws If `isDone` throws, that error propagates up immediately.
 * @typeParam T The return type of the function being polled.
 * @param fn The function to poll. Can be sync or async.
 * @param isDone A predicate that returns `true` when polling should stop.
 * @param options Additional options.
 * @returns The result of `fn` when `isDone` returns `true`.
 */
export declare function poll<T>(
  fn: () => T,
  isDone: (result: Awaited<T>) => boolean,
  options?: PollOptions,
): Promise<Awaited<T>>;
