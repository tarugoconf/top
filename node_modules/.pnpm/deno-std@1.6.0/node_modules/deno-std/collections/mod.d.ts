/**
 * Pure functions for common tasks around collection types like arrays and
 * objects.
 *
 * Inspired by
 * {@link https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/ | Kotlin's Collections}
 * package and {@link https://lodash.com/ | Lodash}.
 *
 * ```ts
 * import { intersect, sample, pick } from "mod.ts";
 * import { assertEquals, assertArrayIncludes } from "../assert/mod.ts";
 *
 * const lisaInterests = ["Cooking", "Music", "Hiking"];
 * const kimInterests = ["Music", "Tennis", "Cooking"];
 *
 * assertEquals(intersect(lisaInterests, kimInterests), ["Cooking", "Music"]);
 *
 * assertArrayIncludes(lisaInterests, [sample(lisaInterests)]);
 *
 * const cat = { name: "Lulu", age: 3, breed: "Ragdoll" };
 *
 * assertEquals(pick(cat, ["name", "breed"]), { name: "Lulu", breed: "Ragdoll"});
 * ```
 *
 * @module
 */
export * from "./aggregate-groups.ts";
export * from "./associate-by.ts";
export * from "./associate-with.ts";
export * from "./chunk.ts";
export * from "./deep-merge.ts";
export * from "./distinct.ts";
export * from "./distinct-by.ts";
export * from "./drop-last-while.ts";
export * from "./drop-while.ts";
export * from "./filter-entries.ts";
export * from "./filter-keys.ts";
export * from "./filter-values.ts";
export * from "./find-single.ts";
export * from "./first-not-nullish-of.ts";
export * from "./includes-value.ts";
export * from "./interleave.ts";
export * from "./intersect.ts";
export * from "./invert-by.ts";
export * from "./invert.ts";
export * from "./join-to-string.ts";
export * from "./map-entries.ts";
export * from "./map-keys.ts";
export * from "./map-not-nullish.ts";
export * from "./map-values.ts";
export * from "./max-by.ts";
export * from "./max-of.ts";
export * from "./max-with.ts";
export * from "./min-by.ts";
export * from "./min-of.ts";
export * from "./min-with.ts";
export * from "./omit.ts";
export * from "./partition.ts";
export * from "./partition-entries.ts";
export * from "./permutations.ts";
export * from "./pick.ts";
export * from "./reduce-groups.ts";
export * from "./running-reduce.ts";
export * from "./sample.ts";
export * from "./sliding-windows.ts";
export * from "./sort-by.ts";
export * from "./sum-of.ts";
export * from "./take-last-while.ts";
export * from "./take-while.ts";
export * from "./union.ts";
export * from "./unzip.ts";
export * from "./without-all.ts";
export * from "./zip.ts";
