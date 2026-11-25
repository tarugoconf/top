function formatNumber(value) {
  return value.toFixed(0);
}
/**
 * Format a SemVer object into a string.
 *
 * @example Usage
 * ```ts
 * import { format } from "format.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const semver = {
 *   major: 1,
 *   minor: 2,
 *   patch: 3,
 * };
 * assertEquals(format(semver), "1.2.3");
 * ```
 *
 * @param version The SemVer to format
 * @returns The string representation of a semantic version.
 */
export function format(version) {
  const major = formatNumber(version.major);
  const minor = formatNumber(version.minor);
  const patch = formatNumber(version.patch);
  const pre = version.prerelease?.join(".") ?? "";
  const build = version.build?.join(".") ?? "";
  const primary = `${major}.${minor}.${patch}`;
  const release = [primary, pre].filter((v) => v).join("-");
  return [release, build].filter((v) => v).join("+");
}
