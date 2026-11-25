import type { EqualOptions, EqualOptionUtil } from "./_types.ts";
import type { Tester } from "./_types.ts";
export declare function buildEqualOptions(
  options: EqualOptionUtil,
): EqualOptions;
export declare function isPromiseLike(
  value: unknown,
): value is PromiseLike<unknown>;
export declare function hasIterator(object: any): boolean;
export declare function isA<T>(typeName: string, value: unknown): value is T;
export declare function iterableEquality(
  a: any,
  b: any,
  customTesters?: Tester[],
  aStack?: unknown[],
  bStack?: unknown[],
): boolean | undefined;
export declare function subsetEquality(
  object: unknown,
  subset: unknown,
  customTesters?: Tester[],
): boolean | undefined;
export declare function getObjectSubset(
  object: unknown,
  subset: unknown,
  customTesters?: Tester[],
  seenReferences?: WeakMap<object, boolean>,
): unknown;
