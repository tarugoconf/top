/** Options for {@linkcode slidingWindows}. */
export interface SlidingWindowsOptions {
  /**
   * If step is set, each window will start that many elements after the last
   * window's start.
   *
   * @default {1}
   */
  step?: number;
  /**
   * If partial is set, windows will be generated for the last elements of the
   * collection, resulting in some undefined values if size is greater than 1.
   *
   * @default {false}
   */
  partial?: boolean;
}
/**
 * Generates sliding views of the given iterable of the given size and returns an
 * array containing all of them.
 *
 * If step is set, each window will start that many elements after the last
 * window's start. (Default: 1)
 *
 * If partial is set, windows will be generated for the last elements of the
 * collection, resulting in some undefined values if size is greater than 1.
 *
 * @typeParam T The type of the array elements.
 *
 * @param iterable The iterable to generate sliding windows from.
 * @param size The size of the sliding windows.
 * @param options The options for generating sliding windows.
 *
 * @returns An array containing all sliding windows of the given size.
 *
 * @example Usage
 * ```ts
 * import { slidingWindows } from "sliding-windows.ts";
 * import { assertEquals } from "../assert/mod.ts";
 * const numbers = [1, 2, 3, 4, 5];
 *
 * const windows = slidingWindows(numbers, 3);
 * assertEquals(windows, [
 *   [1, 2, 3],
 *   [2, 3, 4],
 *   [3, 4, 5],
 * ]);
 *
 * const windowsWithStep = slidingWindows(numbers, 3, { step: 2 });
 * assertEquals(windowsWithStep, [
 *   [1, 2, 3],
 *   [3, 4, 5],
 * ]);
 *
 * const windowsWithPartial = slidingWindows(numbers, 3, { partial: true });
 * assertEquals(windowsWithPartial, [
 *   [1, 2, 3],
 *   [2, 3, 4],
 *   [3, 4, 5],
 *   [4, 5],
 *   [5],
 * ]);
 * ```
 */
export declare function slidingWindows<T>(
  iterable: Iterable<T>,
  size: number,
  options?: SlidingWindowsOptions,
): T[][];
