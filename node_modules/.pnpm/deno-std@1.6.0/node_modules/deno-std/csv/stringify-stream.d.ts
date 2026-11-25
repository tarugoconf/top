/** Options for {@linkcode CsvStringifyStream}. */
export interface CsvStringifyStreamOptions {
  /**
   * Delimiter used to separate values.
   *
   * @default {","}
   */
  readonly separator?: string;
  /**
   * A list of columns to be included in the output.
   *
   * If you want to stream objects, this option is required.
   *
   * @default {[]}
   */
  readonly columns?: Array<string>;
}
/**
 * Convert each chunk to a CSV record.
 *
 * @example Write CSV to a file
 * ```ts
 * import { CsvStringifyStream } from "stringify-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * async function writeCsvToTempFile(): Promise<string> {
 *   const path = await Deno.makeTempFile();
 *   using file = await Deno.open(path, { write: true });
 *
 *   const readable = ReadableStream.from([
 *     { id: 1, name: "one" },
 *     { id: 2, name: "two" },
 *     { id: 3, name: "three" },
 *   ]);
 *
 *   await readable
 *     .pipeThrough(new CsvStringifyStream({ columns: ["id", "name"] }))
 *     .pipeThrough(new TextEncoderStream())
 *     .pipeTo(file.writable);
 *
 *   return path;
 * }
 *
 * const path = await writeCsvToTempFile();
 * const content = await Deno.readTextFile(path);
 * assertEquals(content, "id,name\r\n1,one\r\n2,two\r\n3,three\r\n");
 * ```
 *
 * @example Write TSV to a file
 * ```ts
 * import { CsvStringifyStream } from "stringify-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * async function writeTsvToTempFile(): Promise<string> {
 *   const path = await Deno.makeTempFile();
 *   using file = await Deno.open(path, { write: true });
 *
 *   const readable = ReadableStream.from([
 *     { id: 1, name: "one" },
 *     { id: 2, name: "two" },
 *     { id: 3, name: "three" },
 *   ]);
 *
 *   await readable
 *     .pipeThrough(
 *       new CsvStringifyStream({
 *         columns: ["id", "name"],
 *         separator: "\t",
 *       }),
 *     )
 *     .pipeThrough(new TextEncoderStream())
 *     .pipeTo(file.writable);
 *
 *   return path;
 * }
 *
 * const path = await writeTsvToTempFile();
 * const content = await Deno.readTextFile(path);
 * assertEquals(content, "id\tname\r\n1\tone\r\n2\ttwo\r\n3\tthree\r\n");
 * ```
 *
 * @typeParam TOptions The type of options for the stream.
 */
export declare class CsvStringifyStream<
  TOptions extends CsvStringifyStreamOptions,
> extends TransformStream<
  TOptions["columns"] extends Array<string> ? Record<string, unknown>
    : Array<unknown>,
  string
> {
  /**
   * Construct a new instance.
   *
   * @param options Options for the stream.
   */
  constructor(options?: TOptions);
}
