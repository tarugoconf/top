// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import {
  COMPARATOR_REGEXP,
  OPERATOR_XRANGE_REGEXP,
  parseBuild,
  parsePrerelease,
  XRANGE,
} from "./_shared.js";
import { ALL, ANY } from "./_constants.js";
function parseComparator(comparator) {
  const match = comparator.match(COMPARATOR_REGEXP);
  const groups = match?.groups;
  if (!groups) {
    return null;
  }
  const { operator } = groups;
  return { operator: operator || undefined, ...ANY };
}
function isWildcard(id) {
  return !id || id.toLowerCase() === "x" || id === "*";
}
function handleLeftHyphenRangeGroups(leftGroup) {
  if (isWildcard(leftGroup.major)) {
    return;
  }
  if (isWildcard(leftGroup.minor)) {
    return {
      operator: ">=",
      major: +leftGroup.major,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: [],
    };
  }
  if (isWildcard(leftGroup.patch)) {
    return {
      operator: ">=",
      major: +leftGroup.major,
      minor: +leftGroup.minor,
      patch: 0,
      prerelease: [],
      build: [],
    };
  }
  return {
    operator: ">=",
    major: +leftGroup.major,
    minor: +leftGroup.minor,
    patch: +leftGroup.patch,
    prerelease: leftGroup.prerelease
      ? parsePrerelease(leftGroup.prerelease)
      : [],
    build: [],
  };
}
function handleRightHyphenRangeGroups(rightGroups) {
  if (isWildcard(rightGroups.major)) {
    return;
  }
  if (isWildcard(rightGroups.minor)) {
    return {
      operator: "<",
      major: +rightGroups.major + 1,
      minor: 0,
      patch: 0,
      prerelease: [],
      build: [],
    };
  }
  if (isWildcard(rightGroups.patch)) {
    return {
      operator: "<",
      major: +rightGroups.major,
      minor: +rightGroups.minor + 1,
      patch: 0,
      prerelease: [],
      build: [],
    };
  }
  if (rightGroups.prerelease) {
    return {
      operator: "<=",
      major: +rightGroups.major,
      minor: +rightGroups.minor,
      patch: +rightGroups.patch,
      prerelease: parsePrerelease(rightGroups.prerelease),
      build: [],
    };
  }
  return {
    operator: "<=",
    major: +rightGroups.major,
    minor: +rightGroups.minor,
    patch: +rightGroups.patch,
    prerelease: [],
    build: [],
  };
}
function parseHyphenRange(range) {
  const leftMatch = range.match(new RegExp(`^${XRANGE}`));
  const leftGroup = leftMatch?.groups;
  if (!leftGroup) {
    return null;
  }
  const leftLength = leftMatch[0].length;
  const hyphenMatch = range.slice(leftLength).match(/^\s+-\s+/);
  if (!hyphenMatch) {
    return null;
  }
  const hyphenLength = hyphenMatch[0].length;
  const rightMatch = range.slice(leftLength + hyphenLength).match(
    new RegExp(`^${XRANGE}\\s*$`),
  );
  const rightGroups = rightMatch?.groups;
  const from = handleLeftHyphenRangeGroups(leftGroup);
  const to = handleRightHyphenRangeGroups(rightGroups);
  return [from, to].filter(Boolean);
}
function handleCaretOperator(groups) {
  const majorIsWildcard = isWildcard(groups.major);
  const minorIsWildcard = isWildcard(groups.minor);
  const patchIsWildcard = isWildcard(groups.patch);
  const major = +groups.major;
  const minor = +groups.minor;
  const patch = +groups.patch;
  if (majorIsWildcard) {
    return [ALL];
  }
  if (minorIsWildcard) {
    return [
      { operator: ">=", major, minor: 0, patch: 0 },
      { operator: "<", major: major + 1, minor: 0, patch: 0 },
    ];
  }
  if (patchIsWildcard) {
    if (major === 0) {
      return [
        { operator: ">=", major, minor, patch: 0 },
        { operator: "<", major, minor: minor + 1, patch: 0 },
      ];
    }
    return [
      { operator: ">=", major, minor, patch: 0 },
      { operator: "<", major: major + 1, minor: 0, patch: 0 },
    ];
  }
  const prerelease = parsePrerelease(groups.prerelease ?? "");
  if (major === 0) {
    if (minor === 0) {
      return [
        { operator: ">=", major, minor, patch, prerelease },
        { operator: "<", major, minor, patch: patch + 1 },
      ];
    }
    return [
      { operator: ">=", major, minor, patch, prerelease },
      { operator: "<", major, minor: minor + 1, patch: 0 },
    ];
  }
  return [
    { operator: ">=", major, minor, patch, prerelease },
    { operator: "<", major: major + 1, minor: 0, patch: 0 },
  ];
}
function handleTildeOperator(groups) {
  const majorIsWildcard = isWildcard(groups.major);
  const minorIsWildcard = isWildcard(groups.minor);
  const patchIsWildcard = isWildcard(groups.patch);
  const major = +groups.major;
  const minor = +groups.minor;
  const patch = +groups.patch;
  if (majorIsWildcard) {
    return [ALL];
  }
  if (minorIsWildcard) {
    return [
      { operator: ">=", major, minor: 0, patch: 0 },
      { operator: "<", major: major + 1, minor: 0, patch: 0 },
    ];
  }
  if (patchIsWildcard) {
    return [
      { operator: ">=", major, minor, patch: 0 },
      { operator: "<", major, minor: minor + 1, patch: 0 },
    ];
  }
  const prerelease = parsePrerelease(groups.prerelease ?? "");
  return [
    { operator: ">=", major, minor, patch, prerelease },
    { operator: "<", major, minor: minor + 1, patch: 0 },
  ];
}
function handleLessThanOperator(groups) {
  const majorIsWildcard = isWildcard(groups.major);
  const minorIsWildcard = isWildcard(groups.minor);
  const patchIsWildcard = isWildcard(groups.patch);
  const major = +groups.major;
  const minor = +groups.minor;
  const patch = +groups.patch;
  if (majorIsWildcard) {
    return [{ operator: "<", major: 0, minor: 0, patch: 0 }];
  }
  if (minorIsWildcard) {
    if (patchIsWildcard) {
      return [{ operator: "<", major, minor: 0, patch: 0 }];
    }
    return [{ operator: "<", major, minor: 0, patch: 0 }];
  }
  if (patchIsWildcard) {
    return [{ operator: "<", major, minor, patch: 0 }];
  }
  const prerelease = parsePrerelease(groups.prerelease ?? "");
  const build = parseBuild(groups.build ?? "");
  return [{ operator: "<", major, minor, patch, prerelease, build }];
}
function handleLessThanOrEqualOperator(groups) {
  const minorIsWildcard = isWildcard(groups.minor);
  const patchIsWildcard = isWildcard(groups.patch);
  const major = +groups.major;
  const minor = +groups.minor;
  const patch = +groups.patch;
  if (minorIsWildcard) {
    return [{ operator: "<", major: major + 1, minor: 0, patch: 0 }];
  }
  if (patchIsWildcard) {
    return [{ operator: "<", major, minor: minor + 1, patch: 0 }];
  }
  const prerelease = parsePrerelease(groups.prerelease ?? "");
  const build = parseBuild(groups.build ?? "");
  return [{ operator: "<=", major, minor, patch, prerelease, build }];
}
function handleGreaterThanOperator(groups) {
  const majorIsWildcard = isWildcard(groups.major);
  const minorIsWildcard = isWildcard(groups.minor);
  const patchIsWildcard = isWildcard(groups.patch);
  const major = +groups.major;
  const minor = +groups.minor;
  const patch = +groups.patch;
  if (majorIsWildcard) {
    return [{ operator: "<", major: 0, minor: 0, patch: 0 }];
  }
  if (minorIsWildcard) {
    return [{ operator: ">=", major: major + 1, minor: 0, patch: 0 }];
  }
  if (patchIsWildcard) {
    return [{ operator: ">=", major, minor: minor + 1, patch: 0 }];
  }
  const prerelease = parsePrerelease(groups.prerelease ?? "");
  const build = parseBuild(groups.build ?? "");
  return [{ operator: ">", major, minor, patch, prerelease, build }];
}
function handleGreaterOrEqualOperator(groups) {
  const majorIsWildcard = isWildcard(groups.major);
  const minorIsWildcard = isWildcard(groups.minor);
  const patchIsWildcard = isWildcard(groups.patch);
  const major = +groups.major;
  const minor = +groups.minor;
  const patch = +groups.patch;
  if (majorIsWildcard) {
    return [ALL];
  }
  if (minorIsWildcard) {
    return [{ operator: ">=", major, minor: 0, patch: 0 }];
  }
  if (patchIsWildcard) {
    return [{ operator: ">=", major, minor, patch: 0 }];
  }
  const prerelease = parsePrerelease(groups.prerelease ?? "");
  const build = parseBuild(groups.build ?? "");
  return [{ operator: ">=", major, minor, patch, prerelease, build }];
}
function handleEqualOperator(groups) {
  const majorIsWildcard = isWildcard(groups.major);
  const minorIsWildcard = isWildcard(groups.minor);
  const patchIsWildcard = isWildcard(groups.patch);
  const major = +groups.major;
  const minor = +groups.minor;
  const patch = +groups.patch;
  if (majorIsWildcard) {
    return [ALL];
  }
  if (minorIsWildcard) {
    return [
      { operator: ">=", major, minor: 0, patch: 0 },
      { operator: "<", major: major + 1, minor: 0, patch: 0 },
    ];
  }
  if (patchIsWildcard) {
    return [
      { operator: ">=", major, minor, patch: 0 },
      { operator: "<", major, minor: minor + 1, patch: 0 },
    ];
  }
  const prerelease = parsePrerelease(groups.prerelease ?? "");
  const build = parseBuild(groups.build ?? "");
  return [{
    operator: groups.operator === "=" ? "=" : undefined,
    major,
    minor,
    patch,
    prerelease,
    build,
  }];
}
function parseOperatorRange(string) {
  const groups = string.match(OPERATOR_XRANGE_REGEXP)
    ?.groups;
  if (!groups) {
    return parseComparator(string);
  }
  switch (groups.operator) {
    case "^":
      return handleCaretOperator(groups);
    case "~":
    case "~>":
      return handleTildeOperator(groups);
    case "<":
      return handleLessThanOperator(groups);
    case "<=":
      return handleLessThanOrEqualOperator(groups);
    case ">":
      return handleGreaterThanOperator(groups);
    case ">=":
      return handleGreaterOrEqualOperator(groups);
    default:
      return handleEqualOperator(groups);
  }
}
function parseOperatorRanges(string) {
  return string.split(/\s+/).flatMap(parseOperatorRange);
}
/**
 * Parses a range string into a {@linkcode Range} object.
 *
 * @example Usage
 * ```ts
 * import { parseRange } from "parse-range.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const range = parseRange(">=1.0.0 <2.0.0 || >=3.0.0");
 * assertEquals(range, [
 *   [
 *     { operator: ">=", major: 1, minor: 0, patch: 0, prerelease: [], build: [] },
 *     { operator: "<", major: 2, minor: 0, patch: 0, prerelease: [], build: [] },
 *   ],
 *   [
 *     { operator: ">=", major: 3, minor: 0, patch: 0, prerelease: [], build: [] },
 *   ]
 * ]);
 * ```
 *
 * @throws {TypeError} If the input range is invalid.
 * @param value The range set string
 * @returns A valid SemVer range
 */
export function parseRange(value) {
  const result = value
    // remove spaces between operators and versions
    .replaceAll(/(?<=[<>=~^])(\s+)/g, "")
    .split(/\s*\|\|\s*/)
    .map((string) => parseHyphenRange(string) || parseOperatorRanges(string));
  if (result.some((r) => r.includes(null))) {
    throw new TypeError(
      `Cannot parse version range: range "${value}" is invalid`,
    );
  }
  return result;
}
