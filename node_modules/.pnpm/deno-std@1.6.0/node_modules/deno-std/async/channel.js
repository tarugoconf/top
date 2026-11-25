// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { Deque } from "../data-structures/deque.js";
const RESOLVED = Promise.resolve();
const EMPTY_RESULT = Object.freeze({
  state: "empty",
});
const CLOSED_RESULT = Object.freeze({
  state: "closed",
});
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
export class ChannelClosedError extends Error {
  /**
   * Constructs a new {@linkcode ChannelClosedError} instance.
   *
   * @param message The error message.
   * @param rest If provided, the first element is attached as the
   *   non-writable {@linkcode ChannelClosedError.value} property.
   */
  constructor(message, ...rest) {
    super(message);
    this.name = "ChannelClosedError";
    if (rest.length > 0) {
      Object.defineProperty(this, "value", {
        value: rest[0],
        writable: false,
        enumerable: true,
        configurable: false,
      });
    }
  }
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
export class Channel {
  #capacity;
  #buffer;
  #closed = false;
  #closeReason = undefined;
  #hasCloseReason = false;
  #receiveClosedError;
  #senders;
  #receivers;
  /**
   * Creates a new channel.
   *
   * @param options Channel options. Defaults to an unbuffered (rendezvous)
   *   channel with capacity `0`.
   * @throws {RangeError} If `options.capacity` is not a non-negative integer.
   */
  constructor(options = {}) {
    const { capacity = 0 } = options;
    if (!Number.isInteger(capacity) || capacity < 0) {
      throw new RangeError(
        `Cannot create channel: capacity must be a non-negative integer, received ${capacity}`,
      );
    }
    this.#capacity = capacity;
    this.#buffer = new Deque();
    this.#senders = new Deque();
    this.#receivers = new Deque();
  }
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
  send(value, options) {
    if (this.#closed) {
      return Promise.reject(
        new ChannelClosedError("Cannot send to a closed channel", value),
      );
    }
    if (this.#deliverToReceiver(value)) {
      return RESOLVED;
    }
    if (this.#buffer.length < this.#capacity) {
      this.#buffer.pushBack(value);
      return RESOLVED;
    }
    if (options?.signal?.aborted) {
      return Promise.reject(options.signal.reason);
    }
    return new Promise((res, rej) => {
      const node = { value, res, rej };
      this.#senders.pushBack(node);
      const signal = options?.signal;
      if (signal) {
        const onAbort = () => {
          if (this.#senders.peekFront() === node) {
            this.#senders.popFront();
          } else {
            this.#senders.removeFirst((n) => n === node);
          }
          node.rej(signal.reason);
        };
        signal.addEventListener("abort", onAbort, { once: true });
        node.res = () => {
          signal.removeEventListener("abort", onAbort);
          res();
        };
        node.rej = (reason) => {
          signal.removeEventListener("abort", onAbort);
          rej(reason);
        };
      }
    });
  }
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
  receive(options) {
    if (this.#buffer.length > 0) {
      return Promise.resolve(this.#dequeue());
    }
    const sender = this.#nextSender();
    if (sender) {
      sender.res();
      return Promise.resolve(sender.value);
    }
    if (this.#closed) {
      return Promise.reject(this.#receiveError());
    }
    if (options?.signal?.aborted) {
      return Promise.reject(options.signal.reason);
    }
    return new Promise((res, rej) => {
      const node = { res, rej };
      this.#receivers.pushBack(node);
      const signal = options?.signal;
      if (signal) {
        const onAbort = () => {
          if (this.#receivers.peekFront() === node) {
            this.#receivers.popFront();
          } else {
            this.#receivers.removeFirst((n) => n === node);
          }
          node.rej(signal.reason);
        };
        signal.addEventListener("abort", onAbort, { once: true });
        node.res = (value) => {
          signal.removeEventListener("abort", onAbort);
          res(value);
        };
        node.rej = (reason) => {
          signal.removeEventListener("abort", onAbort);
          rej(reason);
        };
      }
    });
  }
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
  trySend(value) {
    if (this.#closed) {
      return false;
    }
    if (this.#deliverToReceiver(value)) {
      return true;
    }
    if (this.#buffer.length >= this.#capacity) {
      return false;
    }
    this.#buffer.pushBack(value);
    return true;
  }
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
  tryReceive() {
    if (this.#buffer.length > 0) {
      return { state: "ok", value: this.#dequeue() };
    }
    const sender = this.#nextSender();
    if (sender) {
      sender.res();
      return { state: "ok", value: sender.value };
    }
    if (this.#closed) {
      return CLOSED_RESULT;
    }
    return EMPTY_RESULT;
  }
  close(...args) {
    if (this.#closed) {
      return;
    }
    this.#closed = true;
    if (args.length > 0) {
      this.#closeReason = args[0];
      this.#hasCloseReason = true;
    }
    let sender;
    while ((sender = this.#senders.popFront()) !== undefined) {
      sender.rej(
        new ChannelClosedError("Cannot send to a closed channel", sender.value),
      );
    }
    let receiver;
    while ((receiver = this.#receivers.popFront()) !== undefined) {
      receiver.rej(this.#receiveError());
    }
  }
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
  get closed() {
    return this.#closed;
  }
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
  get size() {
    return this.#buffer.length;
  }
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
  get capacity() {
    return this.#capacity;
  }
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
  async *[Symbol.asyncIterator]() {
    while (true) {
      try {
        yield await this.receive();
      } catch (e) {
        if (e instanceof ChannelClosedError && !this.#hasCloseReason) {
          return;
        }
        throw e;
      }
    }
  }
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
  toReadableStream() {
    return new ReadableStream({
      pull: async (controller) => {
        try {
          controller.enqueue(await this.receive());
        } catch (e) {
          if (e instanceof ChannelClosedError && !this.#hasCloseReason) {
            controller.close();
          } else {
            controller.error(e);
          }
        }
      },
      cancel: (reason) => {
        if (reason === undefined) {
          this.close();
        } else {
          this.close(reason);
        }
      },
    });
  }
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
  [Symbol.dispose]() {
    this.close();
  }
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
  [Symbol.asyncDispose]() {
    this.close();
    return RESOLVED;
  }
  /** Pops the next sender from the queue. */
  #nextSender() {
    return this.#senders.popFront();
  }
  /** Hands `value` to the next waiting receiver, if any. */
  #deliverToReceiver(value) {
    const receiver = this.#receivers.popFront();
    if (!receiver) {
      return false;
    }
    receiver.res(value);
    return true;
  }
  /**
   * Pops the head value from the ring buffer. If a sender is waiting, its
   * value is promoted into the freed slot.
   */
  #dequeue() {
    const value = this.#buffer.popFront();
    const sender = this.#nextSender();
    if (sender) {
      this.#buffer.pushBack(sender.value);
      sender.res();
    }
    return value;
  }
  #receiveError() {
    if (this.#hasCloseReason) {
      return this.#closeReason;
    }
    this.#receiveClosedError ??= new ChannelClosedError(
      "Cannot receive from a closed channel",
    );
    return this.#receiveClosedError;
  }
}
