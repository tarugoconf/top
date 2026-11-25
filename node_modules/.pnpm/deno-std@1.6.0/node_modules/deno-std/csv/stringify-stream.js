// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { stringify } from "./stringify.js";
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
export class CsvStringifyStream extends TransformStream {
  /**
   * Construct a new instance.
   *
   * @param options Options for the stream.
   */
  constructor(options) {
    const { separator, columns = [] } = options ?? {};
    super({
      start(controller) {
        if (columns && columns.length > 0) {
          try {
            controller.enqueue(
              stringify(
                [columns],
                separator !== undefined
                  ? { separator, headers: false }
                  : { headers: false },
              ),
            );
          } catch (error) {
            controller.error(error);
          }
        }
      },
      transform(chunk, controller) {
        try {
          controller.enqueue(
            stringify(
              [chunk],
              separator !== undefined
                ? { separator, headers: false, columns }
                : { headers: false, columns },
            ),
          );
        } catch (error) {
          controller.error(error);
        }
      },
    });
  }
}
