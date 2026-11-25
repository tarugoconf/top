// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { parserFactory, toml } from "./_parser.js";
/**
 * Parses a {@link https://toml.io | TOML} string into an object.
 *
 * @example Usage
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const tomlString = `title = "TOML Example"
 * [owner]
 * name = "Alice"
 * bio = "Alice is a programmer."`;
 *
 * const obj = parse(tomlString);
 * assertEquals(obj, { title: "TOML Example", owner: { name: "Alice", bio: "Alice is a programmer." } });
 * ```
 * @param tomlString TOML string to be parsed.
 * @returns The parsed JS object.
 */
export function parse(tomlString) {
  return parserFactory(toml)(tomlString);
}
