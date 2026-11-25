// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
const FLAG_REGEXP =
  /^(?:-(?:(?<doubleDash>-)(?<negated>no-)?)?)(?<key>.+?)(?:=(?<value>.*))?$/s;
const LETTER_REGEXP = /[A-Za-z]/;
const NUMBER_REGEXP = /-?\d+(\.\d*)?(e-?\d+)?$/;
const HYPHEN_REGEXP = /^(-|--)[^-]/;
const VALUE_REGEXP = /=(?<value>.+)/;
const FLAG_NAME_REGEXP = /^--[^=]+$/;
const SPECIAL_CHAR_REGEXP = /\W/;
const NON_WHITESPACE_REGEXP = /\S/;
function isNumber(string) {
  return NON_WHITESPACE_REGEXP.test(string) && Number.isFinite(Number(string));
}
function isConstructorOrProto(obj, key) {
  return (key === "constructor" && typeof obj[key] === "function") ||
    key === "__proto__";
}
function setNested(object, keys, value, collect = false) {
  keys = [...keys];
  const key = keys.pop();
  for (const k of keys) {
    if (isConstructorOrProto(object, k)) {
      return;
    }
    object = object[k] ??= {};
  }
  if (isConstructorOrProto(object, key)) {
    return;
  }
  if (collect) {
    const v = object[key];
    if (Array.isArray(v)) {
      v.push(value);
      return;
    }
    value = v ? [v, value] : [value];
  }
  object[key] = value;
}
function hasNested(object, keys) {
  for (const key of keys) {
    const value = object[key];
    if (!Object.hasOwn(object, key)) {
      return false;
    }
    object = value;
  }
  return true;
}
function aliasIsBoolean(aliasMap, booleanSet, key) {
  const set = aliasMap.get(key);
  if (set === undefined) {
    return false;
  }
  for (const alias of set) {
    if (booleanSet.has(alias)) {
      return true;
    }
  }
  return false;
}
function isBooleanString(value) {
  return value === "true" || value === "false";
}
function parseBooleanString(value) {
  return value !== "false";
}
/**
 * Take a set of command line arguments, optionally with a set of options, and
 * return an object representing the flags found in the passed arguments.
 *
 * By default, any arguments starting with `-` or `--` are considered boolean
 * flags. If the argument name is followed by an equal sign (`=`) it is
 * considered a key-value pair. Any arguments which could not be parsed are
 * available in the `_` property of the returned object.
 *
 * By default, this module tries to determine the type of all arguments
 * automatically and the return type of this function will have an index
 * signature with `any` as value (`{ [x: string]: any }`).
 *
 * If the `string`, `boolean` or `collect` option is set, the return value of
 * this function will be fully typed and the index signature of the return
 * type will change to `{ [x: string]: unknown }`.
 *
 * Any arguments after `'--'` will not be parsed and will end up in `parsedArgs._`.
 *
 * Numeric-looking arguments will be returned as numbers unless `options.string`
 * or `options.boolean` is set for that argument name.
 *
 * See {@linkcode ParseOptions} for more information.
 *
 * @param args An array of command line arguments.
 * @param options Options for the parse function.
 *
 * @typeParam TArgs Type of result.
 * @typeParam TDoubleDash Used by `TArgs` for the result.
 * @typeParam TBooleans Used by `TArgs` for the result.
 * @typeParam TStrings Used by `TArgs` for the result.
 * @typeParam TCollectable Used by `TArgs` for the result.
 * @typeParam TNegatable Used by `TArgs` for the result.
 * @typeParam TDefaults Used by `TArgs` for the result.
 * @typeParam TAliases Used by `TArgs` for the result.
 * @typeParam TAliasArgNames Used by `TArgs` for the result.
 * @typeParam TAliasNames Used by `TArgs` for the result.
 *
 * @return The parsed arguments.
 *
 * @example Usage
 * ```ts
 * import { parseArgs } from "parse-args.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * // For proper use, one should use `parseArgs(Deno.args)`
 * assertEquals(parseArgs(["--foo", "--bar=baz", "./quux.txt"]), {
 *   foo: true,
 *   bar: "baz",
 *   _: ["./quux.txt"],
 * });
 * ```
 *
 * @example `string` and `boolean` options
 *
 * Use `string` and `boolean` options to specify the type of the argument.
 *
 * ```ts
 * import { parseArgs } from "parse-args.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const args = parseArgs(["--foo", "--bar", "baz"], {
 *   boolean: ["foo"],
 *   string: ["bar"],
 * });
 *
 * assertEquals(args, { foo: true, bar: "baz", _: [] });
 * ```
 *
 * @example `collect` option
 *
 * `collect` option tells the parser to treat the option as an array. All
 * values will be collected into one array. If a non-collectable option is used
 * multiple times, the last value is used.
 *
 * ```ts
 * import { parseArgs } from "parse-args.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const args = parseArgs(["--foo", "bar", "--foo", "baz"], {
 *  collect: ["foo"],
 * });
 *
 * assertEquals(args, { foo: ["bar", "baz"], _: [] });
 * ```
 *
 * @example `negatable` option
 *
 * `negatable` option tells the parser to treat the option can be negated by
 * prefixing them with `--no-`, like `--no-config`.
 *
 * ```ts
 * import { parseArgs } from "parse-args.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const args = parseArgs(["--no-foo"], {
 *   boolean: ["foo"],
 *   negatable: ["foo"],
 * });
 *
 * assertEquals(args, { foo: false, _: [] });
 * ```
 */
export function parseArgs(args, options) {
  const {
    "--": doubleDash = false,
    alias = {},
    boolean = false,
    default: defaults = {},
    stopEarly = false,
    string = [],
    collect = [],
    negatable = [],
    unknown: unknownFn = (i) => i,
  } = options ?? {};
  const aliasMap = new Map();
  const booleanSet = new Set();
  const stringSet = new Set();
  const collectSet = new Set();
  const negatableSet = new Set();
  let allBools = false;
  if (alias) {
    for (const [key, value] of Object.entries(alias)) {
      if (value === undefined) {
        throw new TypeError("Alias value must be defined");
      }
      const aliases = Array.isArray(value) ? value : [value];
      aliasMap.set(key, new Set(aliases));
      aliases.forEach((alias) =>
        aliasMap.set(
          alias,
          new Set([key, ...aliases.filter((it) => it !== alias)]),
        )
      );
    }
  }
  if (boolean) {
    if (typeof boolean === "boolean") {
      allBools = boolean;
    } else {
      const booleanArgs = Array.isArray(boolean) ? boolean : [boolean];
      for (const key of booleanArgs.filter(Boolean)) {
        booleanSet.add(key);
        aliasMap.get(key)?.forEach((al) => {
          booleanSet.add(al);
        });
      }
    }
  }
  if (string) {
    const stringArgs = Array.isArray(string) ? string : [string];
    for (const key of stringArgs.filter(Boolean)) {
      stringSet.add(key);
      aliasMap.get(key)?.forEach((al) => stringSet.add(al));
    }
  }
  if (collect) {
    const collectArgs = Array.isArray(collect) ? collect : [collect];
    for (const key of collectArgs.filter(Boolean)) {
      collectSet.add(key);
      aliasMap.get(key)?.forEach((al) => collectSet.add(al));
    }
  }
  if (negatable) {
    const negatableArgs = Array.isArray(negatable) ? negatable : [negatable];
    for (const key of negatableArgs.filter(Boolean)) {
      negatableSet.add(key);
      aliasMap.get(key)?.forEach((alias) => negatableSet.add(alias));
    }
  }
  const argv = { _: [] };
  function setArgument(key, value, arg, collect) {
    if (
      !booleanSet.has(key) &&
      !stringSet.has(key) &&
      !aliasMap.has(key) &&
      !collectSet.has(key) &&
      !(allBools && FLAG_NAME_REGEXP.test(arg)) &&
      unknownFn?.(arg, key, value) === false
    ) {
      return;
    }
    if (typeof value === "string" && !stringSet.has(key)) {
      value = isNumber(value) ? Number(value) : value;
    }
    const collectable = collect && collectSet.has(key);
    setNested(argv, key.split("."), value, collectable);
    aliasMap.get(key)?.forEach((key) => {
      setNested(argv, key.split("."), value, collectable);
    });
  }
  let notFlags = [];
  // all args after "--" are not parsed
  const index = args.indexOf("--");
  if (index !== -1) {
    notFlags = args.slice(index + 1);
    args = args.slice(0, index);
  }
  argsLoop: for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const groups = arg.match(FLAG_REGEXP)?.groups;
    if (groups) {
      const { doubleDash, negated } = groups;
      let key = groups.key;
      let value = groups.value;
      if (doubleDash) {
        if (value != null) {
          if (booleanSet.has(key)) {
            value = parseBooleanString(value);
          }
          setArgument(key, value, arg, true);
          continue;
        }
        if (negated) {
          if (negatableSet.has(key)) {
            setArgument(key, false, arg, false);
            continue;
          }
          key = `no-${key}`;
        }
        const next = args[i + 1];
        if (next) {
          if (
            !booleanSet.has(key) &&
            !allBools &&
            !next.startsWith("-") &&
            (!aliasMap.has(key) || !aliasIsBoolean(aliasMap, booleanSet, key))
          ) {
            value = next;
            i++;
            setArgument(key, value, arg, true);
            continue;
          }
          if (isBooleanString(next)) {
            value = parseBooleanString(next);
            i++;
            setArgument(key, value, arg, true);
            continue;
          }
        }
        value = stringSet.has(key) ? "" : true;
        setArgument(key, value, arg, true);
        continue;
      }
      const letters = arg.slice(1, -1).split("");
      for (const [j, letter] of letters.entries()) {
        const next = arg.slice(j + 2);
        if (next === "-") {
          setArgument(letter, next, arg, true);
          continue;
        }
        if (next === "=") {
          setArgument(letter, "", arg, true);
          continue argsLoop;
        }
        if (LETTER_REGEXP.test(letter)) {
          const groups = VALUE_REGEXP.exec(next)?.groups;
          if (groups) {
            setArgument(letter, groups.value, arg, true);
            continue argsLoop;
          }
          if (NUMBER_REGEXP.test(next)) {
            setArgument(letter, next, arg, true);
            continue argsLoop;
          }
        }
        if (letters[j + 1]?.match(SPECIAL_CHAR_REGEXP)) {
          setArgument(letter, arg.slice(j + 2), arg, true);
          continue argsLoop;
        }
        setArgument(letter, stringSet.has(letter) ? "" : true, arg, true);
      }
      key = arg.slice(-1);
      if (key === "-") {
        continue;
      }
      const nextArg = args[i + 1];
      if (nextArg) {
        if (
          !HYPHEN_REGEXP.test(nextArg) &&
          !booleanSet.has(key) &&
          (!aliasMap.has(key) || !aliasIsBoolean(aliasMap, booleanSet, key))
        ) {
          setArgument(key, nextArg, arg, true);
          i++;
          continue;
        }
        if (isBooleanString(nextArg)) {
          const value = parseBooleanString(nextArg);
          setArgument(key, value, arg, true);
          i++;
          continue;
        }
      }
      setArgument(key, stringSet.has(key) ? "" : true, arg, true);
      continue;
    }
    if (unknownFn?.(arg) !== false) {
      argv._.push(stringSet.has("_") || !isNumber(arg) ? arg : Number(arg));
    }
    if (stopEarly) {
      argv._.push(...args.slice(i + 1));
      break;
    }
  }
  for (const [key, value] of Object.entries(defaults)) {
    const keys = key.split(".");
    if (!hasNested(argv, keys)) {
      setNested(argv, keys, value);
      aliasMap.get(key)?.forEach((key) =>
        setNested(argv, key.split("."), value)
      );
    }
  }
  for (const key of booleanSet.keys()) {
    const keys = key.split(".");
    if (!hasNested(argv, keys)) {
      const value = collectSet.has(key) ? [] : false;
      setNested(argv, keys, value);
    }
  }
  for (const key of stringSet.keys()) {
    const keys = key.split(".");
    if (!hasNested(argv, keys) && collectSet.has(key)) {
      setNested(argv, keys, []);
    }
  }
  if (doubleDash) {
    argv["--"] = notFlags;
  } else {
    argv._.push(...notFlags);
  }
  return argv;
}
