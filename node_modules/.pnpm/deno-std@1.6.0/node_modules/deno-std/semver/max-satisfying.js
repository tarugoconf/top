import { satisfies } from "./satisfies.js";
import { greaterThan } from "./greater-than.js";
/**
 * Returns the highest SemVer in the list that satisfies the range, or `undefined`
 * if none of them do.
 *
 * @example Usage
 * ```ts
 * import { parse, parseRange, maxSatisfying } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const versions = ["1.2.3", "1.2.4", "1.3.0", "2.0.0", "2.1.0"].map(parse);
 * const range = parseRange(">=1.0.0 <2.0.0");
 *
 * assertEquals(maxSatisfying(versions, range), parse("1.3.0"));
 * ```
 *
 * @param versions The versions to check.
 * @param range The range of possible versions to compare to.
 * @returns The highest version in versions that satisfies the range.
 */
export function maxSatisfying(versions, range) {
  let max;
  for (const version of versions) {
    if (!satisfies(version, range)) {
      continue;
    }
    max = max && greaterThan(max, version) ? max : version;
  }
  return max;
}
