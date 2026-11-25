// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { _format, assertArg } from "../_common/format.js";
/**
 * Generate a path from `ParsedPath` object.
 *
 * @example Usage
 * ```ts
 * import { format } from "format.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * const path = format({
 *   root: "C:\\",
 *   dir: "C:\\path\\dir",
 *   base: "file.txt",
 *   ext: ".txt",
 *   name: "file"
 * });
 * assertEquals(path, "C:\\path\\dir\\file.txt");
 * ```
 *
 * @param pathObject The path object to format.
 * @returns The formatted path.
 */
export function format(pathObject) {
  assertArg(pathObject);
  return _format("\\", pathObject);
}
