/**
 * Returns the first element that is the largest value of the given function or
 * undefined if there are no elements.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the maximum element in.
 * @param selector The function to get the value to compare from each element.
 * The function receives the element and its index.
 *
 * @returns The first element that is the largest value of the given function or
 * undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { maxBy } from "max-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { name: "Anna", age: 34 },
 *   { name: "Kim", age: 42 },
 *   { name: "John", age: 23 },
 * ];
 *
 * const personWithMaxAge = maxBy(people, (person) => person.age);
 *
 * assertEquals(personWithMaxAge, { name: "Kim", age: 42 });
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { maxBy } from "max-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const array = [4, 3, 2, 1];
 * const result = maxBy(array, (_, index) => index);
 *
 * assertEquals(result, 1);
 * ```
 */
export declare function maxBy<T>(
  array: Iterable<T>,
  selector: (el: T, index: number) => number,
): T | undefined;
/**
 * Returns the first element that is the largest value of the given function or
 * undefined if there are no elements.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the maximum element in.
 * @param selector The function to get the value to compare from each element.
 * The function receives the element and its index.
 *
 * @returns The first element that is the largest value of the given function or
 * undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { maxBy } from "max-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { name: "Anna" },
 *   { name: "Kim" },
 *   { name: "John" },
 * ];
 *
 * const personWithMaxName = maxBy(people, (person) => person.name);
 *
 * assertEquals(personWithMaxName, { name: "Kim" });
 * ```
 */
export declare function maxBy<T>(
  array: Iterable<T>,
  selector: (el: T, index: number) => string,
): T | undefined;
/**
 * Returns the first element that is the largest value of the given function or
 * undefined if there are no elements.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the maximum element in.
 * @param selector The function to get the value to compare from each element.
 * The function receives the element and its index.
 *
 * @returns The first element that is the largest value of the given function or
 * undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { maxBy } from "max-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { name: "Anna", age: 34n },
 *   { name: "Kim", age: 42n },
 *   { name: "John", age: 23n },
 * ];
 *
 * const personWithMaxAge = maxBy(people, (person) => person.age);
 *
 * assertEquals(personWithMaxAge, { name: "Kim", age: 42n });
 * ```
 */
export declare function maxBy<T>(
  array: Iterable<T>,
  selector: (el: T, index: number) => bigint,
): T | undefined;
/**
 * Returns the first element that is the largest value of the given function or
 * undefined if there are no elements.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the maximum element in.
 * @param selector The function to get the value to compare from each element.
 * The function receives the element and its index.
 *
 * @returns The first element that is the largest value of the given function or
 * undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { maxBy } from "max-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { name: "Anna", startedAt: new Date("2020-01-01") },
 *   { name: "Kim", startedAt: new Date("2021-03-01") },
 *   { name: "John", startedAt: new Date("2020-03-01") },
 * ];
 *
 * const personWithLastStartedAt = maxBy(people, (person) => person.startedAt);
 *
 * assertEquals(personWithLastStartedAt, { name: "Kim", startedAt: new Date("2021-03-01") });
 * ```
 */
export declare function maxBy<T>(
  array: Iterable<T>,
  selector: (el: T, index: number) => Date,
): T | undefined;
