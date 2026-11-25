/**
 * Converts and formats a variable number of `args` as is specified by `format`.
 * `sprintf` returns the formatted string.
 *
 * See the module documentation for the available format strings.
 *
 * `%v`, `%i`, and `%I` are only supported in Deno runtime. Other formats are supported in
 * other major runtimes.
 *
 * @example Usage
 * ```ts
 * import { sprintf } from "printf.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(sprintf("%d", 9), "9");
 *
 * assertEquals(sprintf("%o", 9), "11");
 *
 * assertEquals(sprintf("%f", 4), "4.000000");
 *
 * assertEquals(sprintf("%.3f", 0.9999), "1.000");
 * ```
 *
 * @param format The format string to use
 * @param args The arguments to format
 * @returns The formatted string
 * @throws {Error} If an invalid argument type is provided for a format specifier.
 */
export declare function sprintf(format: string, ...args: unknown[]): string;
/**
 * Converts and formats a variable number of `args` as is specified by `format`.
 * `printf` writes the formatted string to standard output.
 *
 * See the module documentation for the available format strings.
 *
 * This API only supports Deno runtime.
 *
 * @example Usage
 * ```ts no-assert
 * import { printf } from "printf.ts";
 *
 * printf("%d", 9); // Prints "9"
 *
 * printf("%o", 9); // Prints "11"
 *
 * printf("%f", 4); // Prints "4.000000"
 *
 * printf("%.3f", 0.9999); // Prints "1.000"
 * ```
 *
 * @param format The format string to use
 * @param args The arguments to format
 * @throws {Error} If an invalid argument type is provided for a format specifier.
 */
export declare function printf(format: string, ...args: unknown[]): void;
