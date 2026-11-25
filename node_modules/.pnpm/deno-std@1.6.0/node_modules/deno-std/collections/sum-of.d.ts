/**
 * Applies the given selector to all elements in the given collection and
 * calculates the sum of the results.
 *
 * @typeParam T The type of the array elements.
 *
 * @param array The array to calculate the sum of.
 * @param selector The selector function to get the value to sum. The function
 * receives the element and its index.
 *
 * @returns The sum of all elements in the collection.
 *
 * @example Basic usage
 * ```ts
 * import { sumOf } from "sum-of.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { name: "Anna", age: 34 },
 *   { name: "Kim", age: 42 },
 *   { name: "John", age: 23 },
 * ];
 *
 * const totalAge = sumOf(people, (person) => person.age);
 *
 * assertEquals(totalAge, 99);
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { sumOf } from "sum-of.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const array = [1, 2, 3];
 * const result = sumOf(array, (_, index) => index);
 *
 * assertEquals(result, 3);
 * ```
 */
export declare function sumOf<T>(
  array: Iterable<T>,
  selector: (el: T, index: number) => number,
): number;
