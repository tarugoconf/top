// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
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
export * from "./aggregate-groups.js";
export * from "./associate-by.js";
export * from "./associate-with.js";
export * from "./chunk.js";
export * from "./deep-merge.js";
export * from "./distinct.js";
export * from "./distinct-by.js";
export * from "./drop-last-while.js";
export * from "./drop-while.js";
export * from "./filter-entries.js";
export * from "./filter-keys.js";
export * from "./filter-values.js";
export * from "./find-single.js";
export * from "./first-not-nullish-of.js";
export * from "./includes-value.js";
export * from "./interleave.js";
export * from "./intersect.js";
export * from "./invert-by.js";
export * from "./invert.js";
export * from "./join-to-string.js";
export * from "./map-entries.js";
export * from "./map-keys.js";
export * from "./map-not-nullish.js";
export * from "./map-values.js";
export * from "./max-by.js";
export * from "./max-of.js";
export * from "./max-with.js";
export * from "./min-by.js";
export * from "./min-of.js";
export * from "./min-with.js";
export * from "./omit.js";
export * from "./partition.js";
export * from "./partition-entries.js";
export * from "./permutations.js";
export * from "./pick.js";
export * from "./reduce-groups.js";
export * from "./running-reduce.js";
export * from "./sample.js";
export * from "./sliding-windows.js";
export * from "./sort-by.js";
export * from "./sum-of.js";
export * from "./take-last-while.js";
export * from "./take-while.js";
export * from "./union.js";
export * from "./unzip.js";
export * from "./without-all.js";
export * from "./zip.js";
