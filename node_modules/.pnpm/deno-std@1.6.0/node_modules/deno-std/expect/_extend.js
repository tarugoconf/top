// Copyright 2018-2026 the Deno authors. MIT license.
let extendMatchers = {};
export function getExtendMatchers() {
  return extendMatchers;
}
export function setExtendMatchers(newExtendMatchers) {
  extendMatchers = {
    ...extendMatchers,
    ...newExtendMatchers,
  };
}
