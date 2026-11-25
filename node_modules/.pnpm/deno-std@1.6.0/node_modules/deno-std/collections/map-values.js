// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
export function mapValues(record, transformer) {
  // deno-lint-ignore no-explicit-any
  const result = {};
  const entries = Object.entries(record);
  for (const [key, value] of entries) {
    const mappedValue = transformer(value, key);
    result[key] = mappedValue;
  }
  return result;
}
