/**
 * Converts a string into camelCase.
 *
 * @example Usage
 * ```ts
 * import { toCamelCase } from "to-camel-case.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(toCamelCase("deno is awesome"),"denoIsAwesome");
 * ```
 *
 * @param input The string that is going to be converted into camelCase
 * @returns The string as camelCase
 */
export declare function toCamelCase(input: string): string;
