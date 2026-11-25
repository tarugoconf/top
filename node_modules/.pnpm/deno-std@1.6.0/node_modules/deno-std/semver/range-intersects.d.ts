import type { Range } from "./types.ts";
/**
 * The ranges intersect every range of AND comparators intersects with a least
 * one range of OR ranges.
 *
 * @example Usage
 * ```ts
 * import { parseRange, rangeIntersects } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const range1 = parseRange(">=1.0.0 <2.0.0");
 * const range2 = parseRange(">=1.0.0 <1.2.3");
 * const range3 = parseRange(">=1.2.3 <2.0.0");
 *
 * assert(rangeIntersects(range1, range2));
 * assert(rangeIntersects(range1, range3));
 * assert(!rangeIntersects(range2, range3));
 * ```
 *
 * @param range1 range 0
 * @param range2 range 1
 * @returns returns true if the given ranges intersect, false otherwise
 */
export declare function rangeIntersects(range1: Range, range2: Range): boolean;
