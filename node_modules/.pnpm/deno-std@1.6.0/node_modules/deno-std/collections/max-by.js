// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
export function maxBy(array, selector) {
  if (Array.isArray(array)) {
    const length = array.length;
    if (length === 0) {
      return undefined;
    }
    let max = array[0];
    let maxValue = selector(max, 0);
    for (let i = 1; i < length; i++) {
      const current = array[i];
      const currentValue = selector(current, i);
      if (currentValue > maxValue) {
        max = current;
        maxValue = currentValue;
      }
    }
    return max;
  }
  const iter = array[Symbol.iterator]();
  const first = iter.next();
  if (first.done) {
    return undefined;
  }
  let index = 0;
  let max = first.value;
  let maxValue = selector(max, index++);
  let next = iter.next();
  while (!next.done) {
    const currentValue = selector(next.value, index++);
    if (currentValue > maxValue) {
      max = next.value;
      maxValue = currentValue;
    }
    next = iter.next();
  }
  return max;
}
