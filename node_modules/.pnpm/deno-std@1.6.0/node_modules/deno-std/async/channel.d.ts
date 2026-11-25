/**
 * Error thrown when operating on a closed channel. When thrown from
 * {@linkcode Channel.send}, the `value` property carries the unsent value
 * for recovery.
 *
 * @example Usage
 * ```ts
 * import { Channel, ChannelClosedError } from "channel.ts";
 * import { assertInstanceOf } from "../assert/mod.ts";
 *
 * const ch = new Channel<number>();
 * ch.close();
 * try {
 *   await ch.send(42);
 * } catch (e) {
 *   assertInstanceOf(e, ChannelClosedError);
 * }
 * ```
 */
export declare class ChannelClosedError extends Error {
  /**
   * The unsent value, present only when the error originates from a send
   * operation.
   *
   * @example Usage
   * ```ts
   * import { Channel, ChannelClosedError } from "channel.ts";
   * import { assertEquals, assertInstanceOf } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>();
   * ch.close();
   * try {
   *   await ch.send(42);
   * } catch (e) {
   *   assertInstanceOf(e, ChannelClosedError);
   *   assertEquals(e.value, 42);
   * }
   * ```
   */
  readonly value?: unknown;
  /**
   * Constructs a new {@linkcode ChannelClosedError} instance.
   *
   * @param message The error message.
   * @param rest If provided, the first element is attached as the
   *   non-writable {@linkcode ChannelClosedError.value} property.
   */
  constructor(message: string, ...rest: [value: unknown] | []);
}
/**
 * Result of a non-blocking {@linkcode Channel.tryReceive} call. Discriminate
 * on the `state` field:
 *
 * - `"ok"` — a value was available and is provided in `value`.
 * - `"empty"` — the channel is open but no value is immediately available.
 * - `"closed"` — the channel has been closed and no buffered values remain.
 *
 * @typeParam T The type of the value received from the channel.
 */
export type ChannelReceiveResult<T> = {
  state: "ok";
  value: T;
} | {
  state: "empty";
} | {
  state: "closed";
};
/**
 * Options for the {@linkcode Channel} constructor.
 */
export interface ChannelOptions {
  /**
   * Buffer size. `0` creates an unbuffered (rendezvous) channel where
   * {@linkcode Channel.send} blocks until a receiver is waiting.
   *
   * Must be a non-negative integer.
   *
   * @default {0}
   */
  capacity?: number;
}
/**
 * Options for {@linkcode Channel.send}.
 */
export interface ChannelSendOptions {
  /**
   * An {@linkcode AbortSignal} to cancel a pending `send`. When the signal
   * is aborted, the operation rejects with the signal's
   * {@linkcode AbortSignal.reason}. If the value is delivered synchronously
   * (buffered or handed to a waiting receiver), the signal is ignored.
   */
  signal?: AbortSignal;
}
/**
 * Options for {@linkcode Channel.receive}.
 */
export interface ChannelReceiveOptions {
  /**
   * An {@linkcode AbortSignal} to cancel a pending `receive`. When the
   * signal is aborted, the operation rejects with the signal's
   * {@linkcode AbortSignal.reason}. If a value is available synchronously,
   * the signal is ignored.
   */
  signal?: AbortSignal;
}
/**
 * An async channel for communicating between concurrent tasks with optional
 * bounded buffering and backpressure.
 *
 * - **FIFO order:** values are received in the order they were sent. When
 *   multiple senders or receivers are suspended, they are served in the order
 *   they arrived.
 * - **Backpressure:** {@linkcode Channel.send} suspends when the buffer is
 *   full (or always, when unbuffered) until a receiver consumes a value.
 * - **Close asymmetry:** {@linkcode Channel.close} accepts an optional
 *   reason. Pending and future {@linkcode Channel.receive} calls reject
 *   with that reason (or a fresh {@linkcode ChannelClosedError} when no
 *   reason was supplied). Pending {@linkcode Channel.send} calls **always**
 *   reject with a {@linkcode ChannelClosedError} carrying the unsent value,
 *   regardless of the close reason.
 * - **`undefined` values:** `undefined` is a valid channel value, so
 *   non-blocking receives use the {@linkcode ChannelReceiveResult}
 *   discriminated union rather than `T | undefined`.
 * - **Multiple consumers:** concurrent {@linkcode Channel.receive} calls
 *   and multiple {@linkcode Channel.toReadableStream} instances each
 *   consume values FIFO; every value is delivered to exactly one consumer.
 *
 * @example Basic producer/consumer
 * ```ts
 * import { Channel } from "channel.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const ch = new Channel<number>({ capacity: 4 });
 *
 * await ch.send(1);
 * await ch.send(2);
 * ch.close();
 *
 * const values: number[] = [];
 * for await (const v of ch) {
 *   values.push(v);
 * }
 * assertEquals(values, [1, 2]);
 * ```
 *
 * @example Using `await using` for automatic cleanup
 * ```ts
 * import { Channel } from "channel.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * let ref: Channel<string>;
 * {
 *   await using ch = new Channel<string>({ capacity: 8 });
 *   ref = ch;
 *   await ch.send("hello");
 * }
 * assert(ref.closed);
 * ```
 *
 * @typeParam T The type of values sent through the channel.
 */
export declare class Channel<T>
  implements AsyncIterable<T>, Disposable, AsyncDisposable {
  #private;
  /**
   * Calls {@linkcode Channel.close}. Enables `using` for automatic cleanup.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assert } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>();
   * ch[Symbol.dispose]();
   * assert(ch.closed);
   * ```
   */
  [Symbol.dispose]: () => void;
  /**
   * Calls {@linkcode Channel.close}. Enables `await using` for automatic
   * cleanup in async contexts.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assert } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>();
   * await ch[Symbol.asyncDispose]();
   * assert(ch.closed);
   * ```
   */
  [Symbol.asyncDispose]: () => Promise<void>;
  /**
   * Creates a new channel.
   *
   * @param options Channel options. Defaults to an unbuffered (rendezvous)
   *   channel with capacity `0`.
   * @throws {RangeError} If `options.capacity` is not a non-negative integer.
   */
  constructor(options?: ChannelOptions);
  /**
   * Sends a value into the channel. The returned promise resolves when the
   * value is buffered or handed to a waiting receiver. Suspends if the buffer
   * is full (or if unbuffered, suspends until a receiver calls
   * {@linkcode Channel.receive}).
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>({ capacity: 1 });
   * await ch.send(42);
   * assertEquals(ch.size, 1);
   * ch.close();
   * ```
   *
   * @example Cancelling with an AbortSignal
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertRejects } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>();
   * const controller = new AbortController();
   * const p = ch.send(42, { signal: controller.signal });
   * controller.abort(new Error("cancelled"));
   * await assertRejects(() => p, Error, "cancelled");
   * ```
   *
   * @param value The value to send into the channel.
   * @param options Optional settings for the send operation.
   * @returns A promise that resolves when the value has been accepted.
   * @throws {ChannelClosedError} If the channel is closed. The error's
   *   `value` property carries the unsent value for recovery.
   */
  send(value: T, options?: ChannelSendOptions): Promise<void>;
  /**
   * Receives a value from the channel. Suspends if the buffer is empty.
   * Multiple concurrent calls are supported; each value is delivered to
   * exactly one receiver in FIFO order.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>({ capacity: 1 });
   * await ch.send(42);
   * assertEquals(await ch.receive(), 42);
   * ch.close();
   * ```
   *
   * @example Cancelling with an AbortSignal
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertRejects } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>();
   * const controller = new AbortController();
   * const p = ch.receive({ signal: controller.signal });
   * controller.abort(new Error("cancelled"));
   * await assertRejects(() => p, Error, "cancelled");
   * ```
   *
   * @param options Optional settings for the receive operation.
   * @returns A promise that resolves with the next value from the channel.
   * @throws {ChannelClosedError} If the channel is closed and empty (no
   *   `value` property). If `close(reason)` was called, rejects with
   *   `reason` instead.
   */
  receive(options?: ChannelReceiveOptions): Promise<T>;
  /**
   * Non-blocking send. Does not throw.
   *
   * @param value The value to send.
   * @returns `true` if the value was delivered (buffered, or handed directly
   *   to a waiting receiver in the unbuffered case). `false` if the buffer is
   *   full, no receiver is waiting (unbuffered), or the channel is closed.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assert, assertFalse } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>({ capacity: 1 });
   * assert(ch.trySend(1));
   * assertFalse(ch.trySend(2));
   * ```
   */
  trySend(value: T): boolean;
  /**
   * Non-blocking receive. Discriminate on the `state` field to determine the
   * outcome without ambiguity, even when `T` itself can be `undefined`.
   *
   * @returns A {@linkcode ChannelReceiveResult} — `{ state: "ok", value }`
   *   if a value was available, `{ state: "empty" }` if the channel is open
   *   but no value is ready, or `{ state: "closed" }` if the channel has
   *   been closed and no buffered values remain.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>({ capacity: 1 });
   * await ch.send(42);
   * assertEquals(ch.tryReceive(), { state: "ok", value: 42 });
   * assertEquals(ch.tryReceive(), { state: "empty" });
   * ch.close();
   * assertEquals(ch.tryReceive(), { state: "closed" });
   * ```
   */
  tryReceive(): ChannelReceiveResult<T>;
  /**
   * Closes the channel. Idempotent — calling `close()` on an already-closed
   * channel is a no-op. Pending `send()` calls reject with
   * {@linkcode ChannelClosedError}. Pending `receive()` calls drain remaining
   * buffered values, then reject.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assert } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>();
   * ch.close();
   * assert(ch.closed);
   * ```
   */
  close(): void;
  /**
   * Closes the channel with a reason. All pending and future `receive()`
   * calls reject with `reason` after draining buffered values. Pending
   * `send()` calls reject with {@linkcode ChannelClosedError} (the reason is
   * intentionally not propagated to senders, so they can recover the unsent
   * value via {@linkcode ChannelClosedError.value}). Idempotent.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertRejects } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>();
   * ch.close(new Error("upstream failure"));
   * await assertRejects(() => ch.receive(), Error, "upstream failure");
   * ```
   *
   * @param reason The reason to reject pending and future receivers with.
   */
  close(reason: unknown): void;
  /**
   * Whether the channel has been closed.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assert, assertFalse } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>();
   * assertFalse(ch.closed);
   * ch.close();
   * assert(ch.closed);
   * ```
   *
   * @returns `true` if the channel is closed, `false` otherwise.
   */
  get closed(): boolean;
  /**
   * Number of values currently buffered. Informational only — the value is
   * inherently racy and should not be used for send/receive control flow.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>({ capacity: 4 });
   * await ch.send(1);
   * await ch.send(2);
   * assertEquals(ch.size, 2);
   * ch.close();
   * ```
   *
   * @returns The number of buffered values.
   */
  get size(): number;
  /**
   * Maximum buffer capacity (`0` for unbuffered).
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>({ capacity: 8 });
   * assertEquals(ch.capacity, 8);
   * ch.close();
   * ```
   *
   * @returns The maximum buffer capacity.
   */
  get capacity(): number;
  /**
   * Async iteration drains the channel until it is closed and empty.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>({ capacity: 4 });
   * await ch.send(1);
   * await ch.send(2);
   * ch.close();
   *
   * const values: number[] = [];
   * for await (const v of ch) {
   *   values.push(v);
   * }
   * assertEquals(values, [1, 2]);
   * ```
   *
   * @returns An async iterator that yields values from the channel.
   */
  [Symbol.asyncIterator](): AsyncIterableIterator<T>;
  /**
   * Creates a {@linkcode ReadableStream} that yields values from this
   * channel. The stream closes when the channel closes after draining
   * buffered values. If the channel was closed with a reason, the stream
   * errors with that reason. Cancelling the stream closes the channel; a
   * non-`undefined` cancel reason is forwarded to {@linkcode Channel.close}
   * so other consumers observe it.
   *
   * Each call returns an **independent consumer**. If multiple streams (or
   * streams alongside direct {@linkcode Channel.receive} calls or async
   * iteration) consume from the same channel concurrently, values are
   * distributed FIFO and each value is delivered to exactly one consumer.
   *
   * @example Usage
   * ```ts
   * import { Channel } from "channel.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const ch = new Channel<number>({ capacity: 4 });
   * await ch.send(1);
   * await ch.send(2);
   * ch.close();
   *
   * const values = await Array.fromAsync(ch.toReadableStream());
   * assertEquals(values, [1, 2]);
   * ```
   *
   * @returns A readable stream of channel values.
   */
  toReadableStream(): ReadableStream<T>;
}
