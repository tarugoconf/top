import type { Expected, Matchers } from "./_types.ts";
import * as asymmetricMatchers from "./_asymmetric-matchers.ts";
import type { SnapshotPlugin, Tester } from "./_types.ts";
import { type ExpectSnapshotState } from "./_snapshot-state.ts";
export type { AnyConstructor, Async, Expected } from "./_types.ts";
/**
 * **Note:** the documentation for this module is taken from [Jest](https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/ExpectAPI.md)
 * and the examples are updated for Deno.
 *
 * The `expect` function is used to test a value. You will use `expect` along with a
 * "matcher" function to assert something about a value.
 *
 * @example Usage
 * ```ts no-assert
 * import { expect } from "mod.ts";
 *
 * function bestLaCroixFlavor(): string {
 *  return "grapefruit";
 * }
 *
 * Deno.test("the best flavor is grapefruit", () => {
 *  expect(bestLaCroixFlavor()).toBe("grapefruit");
 * });
 * ```
 *
 * In this case, `toBe` is the matcher function. There are a lot of different
 * matcher functions, documented in the main module description.
 *
 * The argument to `expect` should be the value that your code produces, and any
 * argument to the matcher should be the correct value. If you mix them up, your
 * tests will still work, but the error messages on failing tests will look
 * strange.
 *
 * @param value The value to perform assertions on.
 * @param customMessage An optional custom message to include in the assertion error.
 * @returns An expected object that can be used to chain matchers.
 *
 * @typeParam T The interface used for `expect`. This is usually needed only if you want to use `expect.extend` to create custom matchers.
 */
export declare function expect<T extends Expected = Expected>(
  value: unknown,
  customMessage?: string,
): T;
export declare namespace expect {
  export var addEqualityTesters: (newTesters: Tester[]) => void;
  export var extend: (newExtendMatchers: Matchers) => void;
  export var anything: () => ReturnType<typeof asymmetricMatchers.anything>;
  export var any: (c: unknown) => ReturnType<typeof asymmetricMatchers.any>;
  export var arrayContaining: (
    c: any[],
  ) => ReturnType<typeof asymmetricMatchers.arrayContaining>;
  export var closeTo: (
    num: number,
    numDigits?: number,
  ) => ReturnType<typeof asymmetricMatchers.closeTo>;
  export var stringContaining: (
    str: string,
  ) => ReturnType<typeof asymmetricMatchers.stringContaining>;
  export var stringMatching: (
    pattern: string | RegExp,
  ) => ReturnType<typeof asymmetricMatchers.stringMatching>;
  var _a: () => void;
  export { _a as hasAssertions };
  export var _b: (num: number) => void;
  export { _b as assertions };
  export var objectContaining: (
    obj: Record<string, unknown>,
  ) => ReturnType<typeof asymmetricMatchers.objectContaining>;
  export var not: {
    arrayContaining: typeof asymmetricMatchers.arrayNotContaining;
    objectContaining: typeof asymmetricMatchers.objectNotContaining;
    stringContaining: typeof asymmetricMatchers.stringNotContaining;
    stringMatching: typeof asymmetricMatchers.stringNotMatching;
  };
  export var addSnapshotSerializer: (plugin: SnapshotPlugin) => void;
  export var setState: (state: Partial<ExpectSnapshotState>) => void;
  export var getState: () => ExpectSnapshotState;
}
