// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/** Default merging options - cached to avoid object allocation on each call */
const DEFAULT_OPTIONS = {
  arrays: "merge",
  sets: "merge",
  maps: "merge",
};
export function deepMerge(record, other, options) {
  return deepMergeInternal(
    record,
    other,
    new Set(),
    options ?? DEFAULT_OPTIONS,
  );
}
function deepMergeInternal(record, other, seen, options) {
  const result = {};
  const keys = new Set([
    ...getKeys(record),
    ...getKeys(other),
  ]);
  // Iterate through each key of other object and use correct merging strategy
  for (const key of keys) {
    // Skip to prevent Object.prototype.__proto__ accessor property calls on non-Deno platforms
    if (key === "__proto__") {
      continue;
    }
    const a = record[key];
    if (!Object.hasOwn(other, key)) {
      result[key] = a;
      continue;
    }
    const b = other[key];
    if (
      isNonNullObject(a) && isNonNullObject(b) && !seen.has(a) && !seen.has(b)
    ) {
      seen.add(a);
      seen.add(b);
      result[key] = mergeObjects(a, b, seen, options);
      continue;
    }
    // Override value
    result[key] = b;
  }
  return result;
}
function mergeObjects(left, right, seen, options) {
  // Recursively merge mergeable objects
  if (isMergeable(left) && isMergeable(right)) {
    return deepMergeInternal(left, right, seen, options);
  }
  if (isIterable(left) && isIterable(right)) {
    // Handle arrays
    if ((Array.isArray(left)) && (Array.isArray(right))) {
      if (options.arrays === "merge") {
        return left.concat(right);
      }
      return right;
    }
    // Handle maps
    if ((left instanceof Map) && (right instanceof Map)) {
      if (options.maps === "merge") {
        const result = new Map(left);
        for (const [k, v] of right) {
          result.set(k, v);
        }
        return result;
      }
      return right;
    }
    // Handle sets
    if ((left instanceof Set) && (right instanceof Set)) {
      if (options.sets === "merge") {
        const result = new Set(left);
        for (const v of right) {
          result.add(v);
        }
        return result;
      }
      return right;
    }
  }
  return right;
}
/**
 * Test whether a value is mergeable or not
 * Builtins that look like objects, null and user defined classes
 * are not considered mergeable (it means that reference will be copied)
 */
function isMergeable(value) {
  return Object.getPrototypeOf(value) === Object.prototype;
}
function isIterable(value) {
  return typeof value[Symbol.iterator] === "function";
}
function isNonNullObject(value) {
  return value !== null && typeof value === "object";
}
function getKeys(record) {
  const keys = Object.keys(record);
  const symbols = Object.getOwnPropertySymbols(record);
  // Fast path: most objects have no symbol keys
  if (symbols.length === 0) {
    return keys;
  }
  for (const sym of symbols) {
    if (Object.prototype.propertyIsEnumerable.call(record, sym)) {
      keys.push(sym);
    }
  }
  return keys;
}
