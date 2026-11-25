/**
 * Filters the given array, removing all elements that do not match the given predicate
 * **in place. This means `array` will be modified!**.
 */
export declare function filterInPlace<T>(
  array: Array<T>,
  predicate: (el: T) => boolean,
): Array<T>;
