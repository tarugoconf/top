/**
 * Converts a string into PascalCase.
 *
 * @example Usage
 * ```ts
 * import { toPascalCase } from "to-pascal-case.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(toPascalCase("deno is awesome"), "DenoIsAwesome");
 * ```
 *
 * @param input The string that is going to be converted into PascalCase
 * @returns The string as PascalCase
 */
export declare function toPascalCase(input: string): string;
