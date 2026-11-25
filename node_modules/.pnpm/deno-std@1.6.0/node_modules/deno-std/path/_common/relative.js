// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { assertPath } from "./assert-path.js";
export function assertArgs(from, to) {
  assertPath(from);
  assertPath(to);
  if (from === to) {
    return "";
  }
}
