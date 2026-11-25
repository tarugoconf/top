// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
export function partition(array, predicate) {
  const matches = [];
  const rest = [];
  let index = 0;
  for (const element of array) {
    if (predicate(element, index++)) {
      matches.push(element);
    } else {
      rest.push(element);
    }
  }
  return [matches, rest];
}
