/** The environment variable used for setting diff context length. */
export const DIFF_CONTEXT_LENGTH = "DIFF_CONTEXT_LENGTH";
/**
 * Get the truncation context length from the `DIFF_CONTEXT_LENGTH`
 * environment variable.
 * @returns The truncation context length, or `null` if not set or invalid.
 *
 * @example Usage
 * ```ts no-assert ignore
 * Deno.env.set("DIFF_CONTEXT_LENGTH", "10");
 * getTruncationContextLengthFromEnv(); // 10
 * ```
 */
export function getTruncationContextLengthFromEnv() {
  const envVar = getTruncationEnvVar();
  if (!envVar) {
    return null;
  }
  const truncationContextLength = parseInt(envVar);
  return Number.isFinite(truncationContextLength) &&
      truncationContextLength >= 0
    ? truncationContextLength
    : null;
}
function getTruncationEnvVar() {
  // deno-lint-ignore no-explicit-any
  const { Deno, process } = globalThis;
  if (typeof Deno === "object") {
    const permissionStatus = Deno.permissions.querySync({
      name: "env",
      variable: DIFF_CONTEXT_LENGTH,
    }).state ?? "granted";
    return permissionStatus === "granted"
      ? Deno.env.get(DIFF_CONTEXT_LENGTH) ?? null
      : null;
  }
  const nodeEnv = process?.getBuiltinModule?.("node:process")?.env;
  return typeof nodeEnv === "object"
    ? nodeEnv[DIFF_CONTEXT_LENGTH] ?? null
    : null;
}
/**
 * Truncates a diff result by consolidating unchanged lines.
 *
 * @param diffResult The diff result to truncate.
 * @param stringDiff Whether the diff is for strings.
 * @param contextLength The number of unchanged context lines to show around
 * each changed part of the diff. If not provided, it will be read from the
 * `DIFF_CONTEXT_LENGTH` environment variable. If that is not set or invalid,
 * no truncation will be performed.
 *
 * @returns The truncated diff result.
 *
 * @example Usage
 * ```ts no-assert ignore
 * truncateDiff(diffResult, false, 2);
 * ```
 */
export function truncateDiff(diffResult, stringDiff, contextLength) {
  contextLength ??= getTruncationContextLengthFromEnv();
  if (contextLength == null) {
    return diffResult;
  }
  const messages = [];
  const commons = [];
  for (let i = 0; i < diffResult.length; ++i) {
    const result = diffResult[i];
    if (result.type === "common") {
      commons.push(result);
    } else {
      messages.push(
        ...consolidateCommon(
          commons,
          commons.length === i ? "start" : "middle",
          stringDiff,
          contextLength,
        ),
      );
      commons.length = 0;
      messages.push(result);
    }
  }
  messages.push(
    ...consolidateCommon(commons, "end", stringDiff, contextLength),
  );
  return messages;
}
/**
 * Consolidates a sequence of common diff results by truncating unchanged lines.
 *
 * @param commons The sequence of common diff results to consolidate.
 * @param location The location of the common sequence in the overall diff:
 * "start", "middle", or "end".
 * @param stringDiff Whether the diff is for strings.
 * @param contextLength The number of unchanged context lines to show around
 * each changed part of the diff.
 * @returns The consolidated sequence of common diff results.
 *
 * @example Usage
 * ```ts no-assert ignore
 * consolidateCommon(commons, "middle", false, 2);
 * ```
 */
export function consolidateCommon(
  commons,
  location,
  stringDiff,
  contextLength,
) {
  const beforeLength = location === "start" ? 1 : contextLength;
  const afterLength = location === "end" ? 1 : contextLength;
  const omitLength = commons.length - beforeLength - afterLength;
  if (omitLength <= 1) {
    return commons;
  }
  const before = commons[beforeLength - 1]?.value ?? "";
  const after = commons[commons.length - afterLength]?.value ?? before;
  const lineEnd = stringDiff ? "\n" : "";
  const indent = location === "start"
    ? getIndent(after)
    : location === "end"
    ? getIndent(before)
    : commonIndent(before, after);
  const value = `${indent}... ${omitLength} unchanged lines ...${lineEnd}`;
  return [
    ...commons.slice(0, beforeLength),
    { type: "truncation", value },
    ...commons.slice(commons.length - afterLength),
  ];
}
function commonIndent(line1, line2) {
  const indent1 = getIndent(line1);
  const indent2 = getIndent(line2);
  return indent1.startsWith(indent2)
    ? indent2
    : indent2.startsWith(indent1)
    ? indent1
    : "";
}
function getIndent(line) {
  return line.match(/^\s+/g)?.[0] ?? "";
}
