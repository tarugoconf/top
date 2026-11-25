// Copyright 2018-2026 the Deno authors. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
import { CHAR_FORWARD_SLASH } from "../_common/constants.js";
export function isPosixPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH;
}
