/**
 * Returns all distinct elements that appear in any of the given arrays.
 *
 * @typeParam T The type of the array elements.
 *
 * @param arrays The arrays to get the union of.
 *
 * @returns A new array containing all distinct elements from the given arrays.
 *
 * @example Basic usage
 * ```ts
 * import { union } from "union.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const soupIngredients = ["Pepper", "Carrots", "Leek"];
 * const saladIngredients = ["Carrots", "Radicchio", "Pepper"];
 *
 * const shoppingList = union(soupIngredients, saladIngredients);
 *
 * assertEquals(shoppingList, ["Pepper", "Carrots", "Leek", "Radicchio"]);
 * ```
 */
export declare function union<T>(...arrays: Iterable<T>[]): T[];
