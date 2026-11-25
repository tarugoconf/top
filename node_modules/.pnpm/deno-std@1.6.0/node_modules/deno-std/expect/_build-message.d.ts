import type { EqualOptions } from "./_types.ts";
type EqualErrorMessageOptions = Pick<EqualOptions, "formatter" | "msg"> & {
  /**
   * Overrides the default "Values are not equal." headline. Set by matchers
   * (such as toMatchObject) that don't actually test for equality and would
   * otherwise mislead the reader.
   */
  summary?: string;
};
export declare function buildEqualErrorMessage<T>(
  actual: T,
  expected: T,
  options?: EqualErrorMessageOptions,
): string;
export declare function buildNotEqualErrorMessage<T>(
  actual: T,
  expected: T,
  options?: EqualErrorMessageOptions,
): string;
export {};
