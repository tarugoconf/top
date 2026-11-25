import type { JsonValue } from "../json/types.ts";
export type { JsonValue };
/**
 * Converts a JSON with Comments (JSONC) string into an object.
 *
 * @example Usage
 * ```ts
 * import { parse } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(parse('{"foo": "bar"}'), { foo: "bar" });
 * assertEquals(parse('{"foo": "bar", }'), { foo: "bar" });
 * assertEquals(parse('{"foo": "bar", } /* comment *\/'), { foo: "bar" });
 * ```
 *
 * @throws {SyntaxError} If the JSONC string is invalid.
 * @param text A valid JSONC string.
 * @returns The parsed JsonValue from the JSONC string.
 */
export declare function parse(text: string): JsonValue;
