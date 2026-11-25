// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Provide helpers with asynchronous tasks, like {@linkcode delay},
 * {@linkcode debounce}, {@linkcode retry}, or
 * {@linkcode pooledMap}.
 *
 * ```ts no-assert
 * import { delay } from "delay.ts";
 *
 * await delay(100); // waits for 100 milliseconds
 * ```
 *
 * @module
 */
export * from "./abortable.js";
export * from "./channel.js";
export * from "./deadline.js";
export * from "./debounce.js";
export * from "./delay.js";
export * from "./mux-async-iterator.js";
export * from "./poll.js";
export * from "./pool.js";
export * from "./tee.js";
export * from "./retry.js";
export * from "./all-keyed.js";
export * from "./lazy.js";
