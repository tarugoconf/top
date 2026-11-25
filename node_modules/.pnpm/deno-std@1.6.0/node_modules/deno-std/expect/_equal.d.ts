import type { EqualOptions } from "./_types.ts";
/**
 * Deep equality comparison used in assertions
 * @param c actual value
 * @param d expected value
 * @param options for the equality check
 */
export declare function equal(
  c: unknown,
  d: unknown,
  options?: EqualOptions,
): boolean;
