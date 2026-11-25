// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
// Ported from unicode_width rust crate, Copyright (c) 2015 The Rust Project Developers. MIT license.
import data from "./_data.json" with { type: "json" };
import { runLengthDecode } from "./_run-length.js";
let tables = null;
function lookupWidth(cp) {
  if (!tables) {
    tables = data.tables.map(runLengthDecode);
  }
  const t1Offset = tables[0][(cp >> 13) & 0xff];
  const t2Offset = tables[1][128 * t1Offset + ((cp >> 6) & 0x7f)];
  const packedWidths = tables[2][16 * t2Offset + ((cp >> 2) & 0xf)];
  const width = (packedWidths >> (2 * (cp & 0b11))) & 0b11;
  return width === 3 ? 1 : width;
}
const cache = new Map();
function charWidth(char) {
  if (cache.has(char)) {
    return cache.get(char);
  }
  const codePoint = char.codePointAt(0);
  let width = null;
  if (codePoint < 0x7f) {
    width = codePoint >= 0x20 ? 1 : codePoint === 0 ? 0 : null;
  } else if (codePoint >= 0xa0) {
    width = lookupWidth(codePoint);
  } else {
    width = null;
  }
  cache.set(char, width);
  return width;
}
/**
 * Calculate the physical width of a string in a TTY-like environment. This is
 * useful for cases such as calculating where a line-wrap will occur and
 * underlining strings.
 *
 * The physical width is given by the number of columns required to display
 * the string. The number of columns a given unicode character occupies can
 * vary depending on the character itself.
 *
 * @param str The string to measure.
 * @returns The unicode width of the string.
 *
 * @example Calculating the unicode width of a string
 * ```ts
 * import { unicodeWidth } from "unicode-width.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(unicodeWidth("hello world"), 11);
 * assertEquals(unicodeWidth("天地玄黃宇宙洪荒"), 16);
 * assertEquals(unicodeWidth("ｆｕｌｌｗｉｄｔｈ"), 18);
 * ```
 *
 * @example Calculating the unicode width of a color-encoded string
 * ```ts
 * import { unicodeWidth } from "unicode-width.ts";
 * import { stripAnsiCode } from "../fmt/colors.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(unicodeWidth(stripAnsiCode("\x1b[36mголубой\x1b[39m")), 7);
 * assertEquals(unicodeWidth(stripAnsiCode("\x1b[31m紅色\x1b[39m")), 4);
 * assertEquals(unicodeWidth(stripAnsiCode("\x1B]8;;https://deno.land\x07🦕\x1B]8;;\x07")), 2);
 * ```
 *
 * Use
 * {@linkcode https://jsr.io/@std/fmt/doc/colors/~/stripAnsiCode | stripAnsiCode}
 * to remove ANSI escape codes from a string before passing it to
 * {@linkcode unicodeWidth}.
 */
export function unicodeWidth(str) {
  return [...str].map((ch) => charWidth(ch) ?? 0).reduce((a, b) => a + b, 0);
}
