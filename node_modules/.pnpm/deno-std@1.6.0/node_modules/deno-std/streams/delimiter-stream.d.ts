/** Disposition of the delimiter for {@linkcode DelimiterStreamOptions}. */
export type DelimiterDisposition =
  /** Include delimiter in the found chunk. */
  | "suffix"
  /** Include delimiter in the subsequent chunk. */
  | "prefix"
  /** Discard the delimiter. */
  | "discard";
/** Options for {@linkcode DelimiterStream}. */
export interface DelimiterStreamOptions {
  /**
   * Disposition of the delimiter.
   *
   * @default {"discard"}
   */
  disposition?: DelimiterDisposition;
}
/**
 * Divide a stream into chunks delimited by a given byte sequence.
 *
 * If you are working with a stream of `string`, consider using {@linkcode TextDelimiterStream}.
 *
 * @example
 * Divide a CSV stream by commas, discarding the commas:
 * ```ts
 * import { DelimiterStream } from "delimiter-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const inputStream = ReadableStream.from(["foo,bar", ",baz"]);
 *
 * const transformed = inputStream.pipeThrough(new TextEncoderStream())
 *   .pipeThrough(new DelimiterStream(new TextEncoder().encode(",")))
 *   .pipeThrough(new TextDecoderStream());
 *
 * assertEquals(await Array.fromAsync(transformed), ["foo", "bar", "baz"]);
 * ```
 *
 * @example
 * Divide a stream after semi-colons, keeping the semicolons in the output:
 * ```ts
 * import { DelimiterStream } from "delimiter-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const inputStream = ReadableStream.from(["foo;", "bar;baz", ";"]);
 *
 * const transformed = inputStream.pipeThrough(new TextEncoderStream())
 *   .pipeThrough(
 *     new DelimiterStream(new TextEncoder().encode(";"), {
 *       disposition: "suffix",
 *     }),
 *   ).pipeThrough(new TextDecoderStream());
 *
 * assertEquals(await Array.fromAsync(transformed), ["foo;", "bar;", "baz;"]);
 * ```
 */
export declare class DelimiterStream
  extends TransformStream<Uint8Array, Uint8Array> {
  #private;
  /**
   * Constructs a new instance.
   *
   * @param delimiter A delimiter to split the stream by.
   * @param options Options for the delimiter stream.
   */
  constructor(delimiter: Uint8Array, options?: DelimiterStreamOptions);
}
