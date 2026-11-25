import type { Comparator, SemVer } from "./types.ts";
export declare function testComparatorSet(
  version: SemVer,
  set: Comparator[],
): boolean;
