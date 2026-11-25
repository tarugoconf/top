/**
 * Converts a string into kebab-case.
 *
 * @example Usage
 * ```ts
 * import { toKebabCase } from "to-kebab-case.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(toKebabCase("deno is awesome"), "deno-is-awesome");
 * ```
 *
 * @param input The string that is going to be converted into kebab-case
 * @returns The string as kebab-case
 */
export declare function toKebabCase(input: string): string;
