// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * A lazy value that is initialized at most once, with built-in deduplication of
 * concurrent callers. Prevents the common race where two concurrent `get()` calls
 * both trigger the initializer; only one initialization runs and all callers share
 * the same promise.
 *
 * If the initializer rejects, the error is propagated to all concurrent callers
 * and the internal state is cleared — the next {@linkcode Lazy.prototype.get}
 * call will re-run the initializer. Compose with {@linkcode retry} for
 * automatic back-off on transient failures.
 *
 * @example Concurrent deduplication
 *
 * ```ts
 * import { Lazy } from "lazy.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * let initCount = 0;
 * const config = new Lazy<number>(async () => {
 *   initCount++;
 *   return 42;
 * });
 *
 * const [a, b] = await Promise.all([config.get(), config.get()]);
 * assertEquals(a, 42);
 * assertEquals(b, 42);
 * assertEquals(initCount, 1);
 * ```
 *
 * @example Composing with retry
 *
 * ```ts ignore
 * import { Lazy } from "lazy.ts";
 * import { retry } from "retry.ts";
 *
 * const db = new Lazy(() =>
 *   retry(() => connectDb(), { minTimeout: 100, maxAttempts: 3 })
 * );
 * await db.get();
 * ```
 *
 * @typeParam T The type of the lazily initialized value.
 */
export class Lazy {
  #init;
  #promise = undefined;
  #value = undefined;
  #settled = false;
  /**
   * Creates a new lazy value.
   *
   * @param init Initializer function, called at most once (until {@linkcode reset}).
   */
  constructor(init) {
    this.#init = init;
  }
  /**
   * Returns the cached value, initializing it on first call. Concurrent callers
   * share the same in-flight promise — the initializer is never invoked more
   * than once at a time.
   *
   * Always returns a promise, even when the initializer is synchronous.
   *
   * @example Usage
   * ```ts no-assert
   * import { Lazy } from "lazy.ts";
   *
   * const config = new Lazy(async () => ({ loaded: true }));
   * const value = await config.get();
   * ```
   *
   * @example Abort a slow initialization
   * ```ts
   * import { Lazy } from "lazy.ts";
   * import { assertRejects } from "../assert/mod.ts";
   *
   * const slow = new Lazy(() => new Promise<string>(() => {}));
   * const controller = new AbortController();
   * controller.abort(new Error("timed out"));
   * await assertRejects(
   *   () => slow.get({ signal: controller.signal }),
   *   Error,
   *   "timed out",
   * );
   * ```
   *
   * @param options Optional settings for this call.
   * @returns The cached or newly initialized value.
   */
  get(options) {
    if (this.#settled) {
      return Promise.resolve(this.#value);
    }
    const signal = options?.signal;
    if (signal?.aborted) {
      return Promise.reject(signal.reason);
    }
    if (this.#promise === undefined) {
      const p = new Promise((resolve, reject) => {
        Promise.resolve().then(() => this.#init()).then((value) => {
          if (this.#promise === p) {
            this.#value = value;
            this.#settled = true;
          }
          resolve(value);
        }, (err) => {
          if (this.#promise === p) {
            this.#promise = undefined;
          }
          reject(err);
        });
      });
      this.#promise = p;
    }
    if (!signal) {
      return this.#promise;
    }
    return new Promise((resolve, reject) => {
      const abort = () => reject(signal.reason);
      signal.addEventListener("abort", abort, { once: true });
      this.#promise.then((value) => {
        signal.removeEventListener("abort", abort);
        resolve(value);
      }, (err) => {
        signal.removeEventListener("abort", abort);
        reject(err);
      });
    });
  }
  /**
   * Whether the value has been successfully initialized.
   *
   * @example Check initialization state
   * ```ts
   * import { Lazy } from "lazy.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const lazy = new Lazy(() => 42);
   * assertEquals(lazy.initialized, false);
   * await lazy.get();
   * assertEquals(lazy.initialized, true);
   * ```
   *
   * @returns `true` if the value has been initialized, `false` otherwise.
   */
  get initialized() {
    return this.#settled;
  }
  /**
   * Returns the value if already resolved, or indicates that it is not yet
   * available. The discriminated union avoids ambiguity when `T` itself can
   * be `undefined`.
   *
   * @example Fast-path when already initialized
   * ```ts
   * import { Lazy } from "lazy.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const config = new Lazy(async () => ({ port: 8080 }));
   * await config.get();
   *
   * const result = config.peek();
   * assertEquals(result, { ok: true, value: { port: 8080 } });
   * ```
   *
   * @example Not yet initialized
   * ```ts
   * import { Lazy } from "lazy.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const lazy = new Lazy(() => 42);
   * assertEquals(lazy.peek(), { ok: false });
   * ```
   *
   * @returns `{ ok: true, value }` if the value has been initialized, or
   *   `{ ok: false }` if not yet initialized or still in-flight.
   */
  peek() {
    return this.#settled ? { ok: true, value: this.#value } : { ok: false };
  }
  /**
   * Resets the lazy so the next {@linkcode get} re-runs the initializer. Does
   * not cancel an in-flight initialization; callers that already have the
   * promise will still receive its result.
   *
   * @example Force reload
   * ```ts ignore
   * import { Lazy } from "lazy.ts";
   *
   * const config = new Lazy(async () => loadConfig());
   * await config.get();
   * config.reset();
   * const fresh = await config.get();
   * ```
   */
  reset() {
    this.#promise = undefined;
    this.#value = undefined;
    this.#settled = false;
  }
}
