// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
// A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
// on npm.
// This code is vendored from `fmt/colors.ts`.
// deno-lint-ignore no-explicit-any
const { Deno } = globalThis;
const noColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : false;
const enabled = !noColor;
function code(open, close) {
  return {
    open: `\x1b[${open.join(";")}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
  };
}
function run(str, code) {
  return enabled
    ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
    : str;
}
/**
 * Sets the style of text to be printed to bold.
 *
 * Disable by setting the `NO_COLOR` environmental variable.
 *
 * @param str Text to make bold
 *
 * @returns Bold text for printing
 *
 * @example Usage
 * ```ts no-assert
 * import { bold } from "styles.ts";
 *
 * console.log(bold("Hello, world!")); // Prints "Hello, world!" in bold
 * ```
 */
export function bold(str) {
  return run(str, code([1], 22));
}
/**
 * Sets the color of text to be printed to red.
 *
 * Disable by setting the `NO_COLOR` environmental variable.
 *
 * @param str Text to make red
 *
 * @returns Red text for printing
 *
 * @example Usage
 * ```ts no-assert
 * import { red } from "styles.ts";
 *
 * console.log(red("Hello, world!")); // Prints "Hello, world!" in red
 * ```
 */
export function red(str) {
  return run(str, code([31], 39));
}
/**
 * Sets the color of text to be printed to green.
 *
 * Disable by setting the `NO_COLOR` environmental variable.
 *
 * @param str Text to make green
 *
 * @returns Green text for print
 *
 * @example Usage
 * ```ts no-assert
 * import { green } from "styles.ts";
 *
 * console.log(green("Hello, world!")); // Prints "Hello, world!" in green
 * ```
 */
export function green(str) {
  return run(str, code([32], 39));
}
/**
 * Sets the color of text to be printed to yellow.
 *
 * Disable by setting the `NO_COLOR` environmental variable.
 *
 * @param str Text to make yellow
 *
 * @returns Yellow text for print
 *
 * @example Usage
 * ```ts no-assert
 * import { yellow } from "styles.ts";
 *
 * console.log(yellow("Hello, world!")); // Prints "Hello, world!" in yellow
 * ```
 */
export function yellow(str) {
  return run(str, code([33], 39));
}
/**
 * Sets the color of text to be printed to white.
 *
 * @param str Text to make white
 *
 * @returns White text for print
 *
 * @example Usage
 * ```ts no-assert
 * import { white } from "styles.ts";
 *
 * console.log(white("Hello, world!")); // Prints "Hello, world!" in white
 * ```
 */
export function white(str) {
  return run(str, code([37], 39));
}
/**
 * Sets the color of text to be printed to gray.
 *
 * @param str Text to make gray
 *
 * @returns Gray text for print
 *
 * @example Usage
 * ```ts no-assert
 * import { gray } from "styles.ts";
 *
 * console.log(gray("Hello, world!")); // Prints "Hello, world!" in gray
 * ```
 */
export function gray(str) {
  return brightBlack(str);
}
/**
 * Sets the color of text to be printed to bright-black.
 *
 * @param str Text to make bright-black
 *
 * @returns Bright-black text for print
 *
 * @example Usage
 * ```ts no-assert
 * import { brightBlack } from "styles.ts";
 *
 * console.log(brightBlack("Hello, world!")); // Prints "Hello, world!" in bright-black
 * ```
 */
export function brightBlack(str) {
  return run(str, code([90], 39));
}
/**
 * Sets the background color of text to be printed to red.
 *
 * @param str Text to make its background red
 *
 * @returns Red background text for print
 *
 * @example Usage
 * ```ts no-assert
 * import { bgRed } from "styles.ts";
 *
 * console.log(bgRed("Hello, world!")); // Prints "Hello, world!" with red background
 * ```
 */
export function bgRed(str) {
  return run(str, code([41], 49));
}
/**
 * Sets the background color of text to be printed to green.
 *
 * @param str Text to make its background green
 *
 * @returns Green background text for print
 *
 * @example Usage
 * ```ts no-assert
 * import { bgGreen } from "styles.ts";
 *
 * console.log(bgGreen("Hello, world!")); // Prints "Hello, world!" with green background
 * ```
 */
export function bgGreen(str) {
  return run(str, code([42], 49));
}
// https://github.com/chalk/ansi-regex/blob/02fa893d619d3da85411acc8fd4e2eea0e95a9d9/index.js
const ANSI_REGEXP = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))",
  ].join("|"),
  "g",
);
/**
 * Remove ANSI escape codes from the string.
 *
 * @param string Text to remove ANSI escape codes from
 *
 * @returns Text without ANSI escape codes
 *
 * @example Usage
 * ```ts no-assert
 * import { red, stripAnsiCode } from "styles.ts";
 *
 * console.log(stripAnsiCode(red("Hello, world!"))); // Prints "Hello, world!"
 * ```
 */
export function stripAnsiCode(string) {
  return string.replace(ANSI_REGEXP, "");
}
