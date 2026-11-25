// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
export function minOf(array, selector) {
  if (Array.isArray(array)) {
    const length = array.length;
    if (length === 0) {
      return undefined;
    }
    let min = selector(array[0], 0);
    if (Number.isNaN(min)) {
      return min;
    }
    for (let i = 1; i < length; i++) {
      const currentValue = selector(array[i], i);
      if (currentValue < min) {
        min = currentValue;
      } else if (Number.isNaN(currentValue)) {
        return currentValue;
      }
    }
    return min;
  }
  let index = 0;
  const iter = array[Symbol.iterator]();
  const first = iter.next();
  if (first.done) {
    return undefined;
  }
  let min = selector(first.value, index++);
  if (Number.isNaN(min)) {
    return min;
  }
  let next = iter.next();
  while (!next.done) {
    const currentValue = selector(next.value, index++);
    if (currentValue < min) {
      min = currentValue;
    } else if (Number.isNaN(currentValue)) {
      return currentValue;
    }
    next = iter.next();
  }
  return min;
}
