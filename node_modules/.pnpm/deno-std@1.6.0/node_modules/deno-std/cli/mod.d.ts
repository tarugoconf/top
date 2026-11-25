/**
 * Tools for creating interactive command line tools.
 *
 * ```ts
 * import { parseArgs } from "parse-args.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * // Same as running `deno run example.ts --foo --bar=baz ./quux.txt`
 * const args = parseArgs(["--foo", "--bar=baz", "./quux.txt"]);
 * assertEquals(args, { foo: true, bar: "baz", _: ["./quux.txt"] });
 * ```
 *
 * @module
 */
export * from "./parse-args.ts";
export * from "./prompt-secret.ts";
export * from "./unicode-width.ts";
