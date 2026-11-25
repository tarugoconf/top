// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
export function minBy(array, selector) {
  if (Array.isArray(array)) {
    const length = array.length;
    if (length === 0) {
      return undefined;
    }
    let min = array[0];
    let minValue = selector(min, 0);
    for (let i = 1; i < length; i++) {
      const current = array[i];
      const currentValue = selector(current, i);
      if (currentValue < minValue) {
        min = current;
        minValue = currentValue;
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
  let min = first.value;
  let minValue = selector(min, index++);
  let next = iter.next();
  while (!next.done) {
    const currentValue = selector(next.value, index++);
    if (currentValue < minValue) {
      min = next.value;
      minValue = currentValue;
    }
    next = iter.next();
  }
  return min;
}
