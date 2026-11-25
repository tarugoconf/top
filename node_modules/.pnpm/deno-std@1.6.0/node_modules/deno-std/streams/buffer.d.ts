/** Options for {@linkcode Buffer.bytes}. */
export interface BufferBytesOptions {
  /**
   * If true, {@linkcode Buffer.bytes} will return a copy of the buffered data.
   *
   * If false, it will return a slice to the buffer's data.
   *
   * @default {true}
   */
  copy?: boolean;
}
/**
 * A variable-sized buffer of bytes with `readable` and `writable` getters that
 * allows you to work with {@link https://developer.mozilla.org/en-US/docs/Web/API/Streams_API | Web Streams API}.
 *
 * Buffer is almost always used with some I/O like files and sockets. It allows
 * one to buffer up a download from a socket. Buffer grows and shrinks as
 * necessary.
 *
 * Buffer is NOT the same thing as Node's Buffer. Node's Buffer was created in
 * 2009 before JavaScript had the concept of ArrayBuffers. It's simply a
 * non-standard ArrayBuffer.
 *
 * ArrayBuffer is a fixed memory allocation. Buffer is implemented on top of
 * ArrayBuffer.
 *
 * Based on {@link https://golang.org/pkg/bytes/#Buffer | Go Buffer}.
 *
 * @example Buffer input bytes and convert it to a string
 * ```ts
 * import { Buffer } from "buffer.ts";
 * import { toText } from "to-text.ts";
 * import { assert } from "../assert/mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * // Create a new buffer
 * const buf = new Buffer();
 * assertEquals(buf.capacity, 0);
 * assertEquals(buf.length, 0);
 *
 * // Dummy input stream
 * const inputStream = ReadableStream.from([
 *   "hello, ",
 *   "world",
 *   "!",
 * ]);
 *
 * // Pipe the input stream to the buffer
 * await inputStream.pipeThrough(new TextEncoderStream()).pipeTo(buf.writable);
 * assert(buf.capacity > 0);
 * assert(buf.length > 0);
 *
 * // Convert the buffered bytes to a string
 * const result = await toText(buf.readable);
 * assertEquals(result, "hello, world!");
 * assert(buf.empty());
 * ```
 */
export declare class Buffer {
  #private;
  /**
   * Getter returning the instance's {@linkcode ReadableStream}.
   *
   * @returns A `ReadableStream` of the buffer.
   *
   * @example Read the content out of the buffer to stdout
   * ```ts ignore
   * import { Buffer } from "buffer.ts";
   *
   * const buf = new Buffer();
   * await buf.readable.pipeTo(Deno.stdout.writable);
   * ```
   */
  get readable(): ReadableStream<Uint8Array>;
  /**
   * Getter returning the instance's {@linkcode WritableStream}.
   *
   * @returns A `WritableStream` of the buffer.
   *
   * @example Write the data from stdin to the buffer
   * ```ts ignore
   * import { Buffer } from "buffer.ts";
   *
   * const buf = new Buffer();
   * await Deno.stdin.readable.pipeTo(buf.writable);
   * ```
   */
  get writable(): WritableStream<Uint8Array>;
  /**
   * Constructs a new instance.
   *
   * @param ab An optional buffer to use as the initial buffer.
   */
  constructor(ab?: ArrayBufferLike | ArrayLike<number>);
  /**
   * Returns a slice holding the unread portion of the buffer.
   *
   * The slice is valid for use only until the next buffer modification (that
   * is, only until the next call to a method that mutates or consumes the
   * buffer, like reading data out via `readable`, `reset()`, or `truncate()`).
   *
   * If `options.copy` is false the slice aliases the buffer content at least
   * until the next buffer modification, so immediate changes to the slice will
   * affect the result of future reads. If `options` is not provided,
   * `options.copy` defaults to `true`.
   *
   * @param options Options for the bytes method.
   * @returns A copy or a slice of the buffer.
   *
   * @example Copy the buffer
   * ```ts
   * import { assertEquals } from "../assert/mod.ts";
   * import { assertNotEquals } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const array = new Uint8Array([0, 1, 2]);
   * const buf = new Buffer(array.buffer);
   * const copied = buf.bytes();
   * assertEquals(copied.length, array.length);
   *
   * // Modify an element in the original array
   * array[1] = 99;
   * assertEquals(copied[0], array[0]);
   * // The copied buffer is not affected by the modification
   * assertNotEquals(copied[1], array[1]);
   * assertEquals(copied[2], array[2]);
   * ```
   *
   * @example Get a slice to the buffer
   * ```ts
   * import { assertEquals } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const array = new Uint8Array([0, 1, 2]);
   * const buf = new Buffer(array.buffer);
   * const slice = buf.bytes({ copy: false });
   * assertEquals(slice.length, array.length);
   *
   * // Modify an element in the original array
   * array[1] = 99;
   * assertEquals(slice[0], array[0]);
   * // The slice _is_ affected by the modification
   * assertEquals(slice[1], array[1]);
   * assertEquals(slice[2], array[2]);
   * ```
   */
  bytes(options?: BufferBytesOptions): Uint8Array;
  /**
   * Returns whether the unread portion of the buffer is empty.
   *
   * @returns Whether the buffer is empty.
   *
   * @example Empty buffer
   * ```ts
   * import { assert } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const buf = new Buffer();
   * assert(buf.empty());
   * ```
   *
   * @example Non-empty buffer
   * ```ts
   * import { assert } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const array = new Uint8Array([42]);
   * const buf = new Buffer(array.buffer);
   * assert(!buf.empty());
   * ```
   *
   * @example Non-empty, but the content was already read
   * ```ts ignore
   * import { assert } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const array = new Uint8Array([42]);
   * const buf = new Buffer(array.buffer);
   * assert(!buf.empty());
   * // Read the content out of the buffer
   * await buf.readable.pipeTo(Deno.stdout.writable);
   * // The buffer is now empty
   * assert(buf.empty());
   * ```
   */
  empty(): boolean;
  /**
   * A read only number of bytes of the unread portion of the buffer.
   *
   * @returns The number of bytes in the unread portion of the buffer.
   *
   * @example Basic usage
   * ```ts
   * import { assertEquals } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const array = new Uint8Array([0, 1, 2]);
   * const buf = new Buffer(array.buffer);
   * assertEquals(buf.length, 3);
   * ```
   *
   * @example Length becomes 0 after the content is read
   * ```ts ignore
   * import { assertEquals } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const array = new Uint8Array([42]);
   * const buf = new Buffer(array.buffer);
   * assertEquals(buf.length, 1);
   * // Read the content out of the buffer
   * await buf.readable.pipeTo(Deno.stdout.writable);
   * // The length is now 0
   * assertEquals(buf.length, 0);
   * ```
   */
  get length(): number;
  /**
   * The read only capacity of the buffer's underlying byte slice, that is,
   * the total space allocated for the buffer's data.
   *
   * @returns The number of allocated bytes for the buffer.
   *
   * @example Basic usage
   * ```ts
   * import { assertEquals } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const arrayBuffer = new ArrayBuffer(256);
   * const buf = new Buffer(arrayBuffer);
   * assertEquals(buf.capacity, 256);
   * ```
   */
  get capacity(): number;
  /**
   * Discards all but the first `n` unread bytes from the buffer but
   * continues to use the same allocated storage. It throws if `n` is
   * negative or greater than the length of the buffer.
   *
   * @param n The number of bytes to keep.
   *
   * @example Basic usage
   * ```ts
   * import { assertEquals } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const array = new Uint8Array([0, 1, 2]);
   * const buf = new Buffer(array.buffer);
   * assertEquals(buf.bytes(), array);
   *
   * // Discard all but the first 2 bytes
   * buf.truncate(2);
   * assertEquals(buf.bytes(), array.slice(0, 2));
   * ```
   */
  truncate(n: number): void;
  /**
   * Resets to an empty buffer.
   *
   * @example Basic usage
   * ```ts
   * import { assert } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const array = new Uint8Array([0, 1, 2]);
   * const buf = new Buffer(array.buffer);
   * assert(!buf.empty());
   *
   * // Reset
   * buf.reset();
   * assert(buf.empty());
   * ```
   */
  reset(): void;
  /**
   * Grows the buffer's capacity, if necessary, to guarantee space for
   * another `n` bytes. After `.grow(n)`, at least `n` bytes can be written to
   * the buffer without another allocation. If `n` is negative, `.grow()` will
   * throw. If the buffer can't grow it will throw an error.
   *
   * @param n The number of bytes to grow the buffer by.
   *
   * Based on Go Lang's
   * {@link https://golang.org/pkg/bytes/#Buffer.Grow | Buffer.Grow}.
   *
   * @example Basic usage
   * ```ts
   * import { assert } from "../assert/mod.ts";
   * import { assertEquals } from "../assert/mod.ts";
   * import { Buffer } from "buffer.ts";
   *
   * const buf = new Buffer();
   * assertEquals(buf.capacity, 0);
   *
   * buf.grow(200);
   * assert(buf.capacity >= 200);
   * ```
   */
  grow(n: number): void;
}
