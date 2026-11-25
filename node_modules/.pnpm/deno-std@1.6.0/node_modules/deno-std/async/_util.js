// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
export function exponentialBackoffWithJitter(
  cap,
  base,
  attempt,
  multiplier,
  jitter,
) {
  const exp = Math.min(cap, base * multiplier ** attempt);
  return (1 - jitter * Math.random()) * exp;
}
