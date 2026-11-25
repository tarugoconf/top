import type { Comparator, SemVer } from "./types.ts";
/**
 * ANY is a sentinel value used by some range calculations. It is not a valid
 * SemVer object and should not be used directly.
 */
export declare const ANY: SemVer;
/**
 * A comparator which will span all valid semantic versions
 */
export declare const ALL: Comparator;
export declare const OPERATORS: readonly [
  undefined,
  "=",
  "!=",
  ">",
  ">=",
  "<",
  "<=",
];
