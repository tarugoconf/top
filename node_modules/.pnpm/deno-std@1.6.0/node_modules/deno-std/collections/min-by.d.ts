/**
 * Returns the first element that is the smallest value of the given function or
 * undefined if there are no elements.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the minimum element in.
 * @param selector The function to get the value to compare from each element.
 * The function receives the element and its index.
 *
 * @returns The first element that is the smallest value of the given function
 * or undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { minBy } from "min-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { name: "Anna", age: 34 },
 *   { name: "Kim", age: 42 },
 *   { name: "John", age: 23 },
 * ];
 *
 * const personWithMinAge = minBy(people, (i) => i.age);
 *
 * assertEquals(personWithMinAge, { name: "John", age: 23 });
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { minBy } from "min-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const array = [4, 3, 2, 1];
 * const result = minBy(array, (_, index) => index);
 *
 * assertEquals(result, 4);
 * ```
 */
export declare function minBy<T>(
  array: Iterable<T>,
  selector: (el: T, index: number) => number,
): T | undefined;
/**
 * Returns the first element that is the smallest value of the given function or
 * undefined if there are no elements.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the minimum element in.
 * @param selector The function to get the value to compare from each element.
 * The function receives the element and its index.
 *
 * @returns The first element that is the smallest value of the given function
 * or undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { minBy } from "min-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { name: "Anna" },
 *   { name: "Kim" },
 *   { name: "John" },
 * ];
 *
 * const personWithMinName = minBy(people, (person) => person.name);
 *
 * assertEquals(personWithMinName, { name: "Anna" });
 * ```
 */
export declare function minBy<T>(
  array: Iterable<T>,
  selector: (el: T, index: number) => string,
): T | undefined;
/**
 * Returns the first element that is the smallest value of the given function or
 * undefined if there are no elements.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the minimum element in.
 * @param selector The function to get the value to compare from each element.
 * The function receives the element and its index.
 *
 * @returns The first element that is the smallest value of the given function
 * or undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { minBy } from "min-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { name: "Anna", age: 34n },
 *   { name: "Kim", age: 42n },
 *   { name: "John", age: 23n },
 * ];
 *
 * const personWithMinAge = minBy(people, (i) => i.age);
 *
 * assertEquals(personWithMinAge, { name: "John", age: 23n });
 * ```
 */
export declare function minBy<T>(
  array: Iterable<T>,
  selector: (el: T, index: number) => bigint,
): T | undefined;
/**
 * Returns the first element that is the smallest value of the given function or
 * undefined if there are no elements.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the minimum element in.
 * @param selector The function to get the value to compare from each element.
 * The function receives the element and its index.
 *
 * @returns The first element that is the smallest value of the given function
 * or undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { minBy } from "min-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { name: "Anna", startedAt: new Date("2020-01-01") },
 *   { name: "Kim", startedAt: new Date("2020-03-01") },
 *   { name: "John", startedAt: new Date("2019-01-01") },
 * ];
 *
 * const personWithMinStartedAt = minBy(people, (person) => person.startedAt);
 * ```
 */
export declare function minBy<T>(
  array: Iterable<T>,
  selector: (el: T, index: number) => Date,
): T | undefined;
