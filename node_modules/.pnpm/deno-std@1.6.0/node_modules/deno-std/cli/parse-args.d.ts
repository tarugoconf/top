/**
 * Command line arguments parser based on
 * {@link https://github.com/minimistjs/minimist | minimist}.
 *
 * See {@linkcode parseArgs} for more information.
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
 *
 * @module
 */
/** Combines recursively all intersection types and returns a new single type.
 * @internal
 */
type Id<TRecord> = TRecord extends Record<string, unknown>
  ? TRecord extends infer InferredRecord ? {
      [Key in keyof InferredRecord]: Id<InferredRecord[Key]>;
    }
  : never
  : TRecord;
/** Converts a union type `A | B | C` into an intersection type `A & B & C`.
 * @internal
 */
type UnionToIntersection<TValue> =
  (TValue extends unknown ? (args: TValue) => unknown : never) extends
    (args: infer R) => unknown ? R extends Record<string, unknown> ? R : never
    : never;
/** @internal */
type BooleanType = boolean | string | undefined;
/** @internal */
type StringType = string | undefined;
/** @internal */
type ArgType = StringType | BooleanType;
/** @internal */
type Collectable = string | undefined;
/** @internal */
type Negatable = string | undefined;
type UseTypes<
  TBooleans extends BooleanType,
  TStrings extends StringType,
  TCollectable extends Collectable,
> = undefined extends
  ((false extends TBooleans ? undefined : TBooleans) & TCollectable & TStrings)
  ? false
  : true;
/**
 * Creates a record with all available flags with the corresponding type and
 * default type.
 * @internal
 */
type Values<
  TBooleans extends BooleanType,
  TStrings extends StringType,
  TCollectable extends Collectable,
  TNegatable extends Negatable,
  TDefault extends Record<string, unknown> | undefined,
  TAliases extends Aliases | undefined,
> = UseTypes<TBooleans, TStrings, TCollectable> extends true ?
    & Record<string, unknown>
    & AddAliases<
      SpreadDefaults<
        & CollectValues<TStrings, string, TCollectable, TNegatable>
        & RecursiveRequired<CollectValues<TBooleans, boolean, TCollectable>>
        & CollectUnknownValues<TBooleans, TStrings, TCollectable, TNegatable>,
        DedotRecord<TDefault>
      >,
      TAliases
    >
  : Record<string, any>;
/** @internal */
type Aliases<TArgNames = string, TAliasNames extends string = string> = Partial<
  Record<Extract<TArgNames, string>, TAliasNames | ReadonlyArray<TAliasNames>>
>;
type AddAliases<TArgs, TAliases extends Aliases | undefined> = {
  [TArgName in keyof TArgs as AliasNames<TArgName, TAliases>]: TArgs[TArgName];
};
type AliasNames<TArgName, TAliases extends Aliases | undefined> =
  TArgName extends keyof TAliases ? string extends TAliases[TArgName] ? TArgName
    : TAliases[TArgName] extends string ? TArgName | TAliases[TArgName]
    : TAliases[TArgName] extends Array<string>
      ? TArgName | TAliases[TArgName][number]
    : TArgName
    : TArgName;
/**
 * Spreads all default values of Record `TDefaults` into Record `TArgs`
 * and makes default values required.
 *
 * **Example:**
 * `SpreadValues<{ foo?: boolean, bar?: number }, { foo: number }>`
 *
 * **Result:** `{ foo: boolean | number, bar?: number }`
 */
type SpreadDefaults<TArgs, TDefaults> = TDefaults extends undefined ? TArgs
  : TArgs extends Record<string, unknown> ?
      & Omit<TArgs, keyof TDefaults>
      & {
        [Default in keyof TDefaults]: Default extends keyof TArgs
          ? ((TArgs[Default] & TDefaults[Default]) | TDefaults[Default]) extends
            Record<string, unknown>
            ? NonNullable<SpreadDefaults<TArgs[Default], TDefaults[Default]>>
          : TDefaults[Default] | NonNullable<TArgs[Default]>
          : unknown;
      }
  : never;
/**
 * Defines the Record for the `default` option to add
 * auto-suggestion support for IDE's.
 * @internal
 */
type Defaults<TBooleans extends BooleanType, TStrings extends StringType> = Id<
  UnionToIntersection<
    & Record<string, unknown>
    & MapTypes<TStrings, unknown>
    & MapTypes<TBooleans, unknown>
    & MapDefaults<TBooleans>
    & MapDefaults<TStrings>
  >
>;
type MapDefaults<TArgNames extends ArgType> = Partial<
  Record<TArgNames extends string ? TArgNames : string, unknown>
>;
type RecursiveRequired<TRecord> = TRecord extends Record<string, unknown> ? {
    [Key in keyof TRecord]-?: RecursiveRequired<TRecord[Key]>;
  }
  : TRecord;
/** Same as `MapTypes` but also supports collectable options. */
type CollectValues<
  TArgNames extends ArgType,
  TType,
  TCollectable extends Collectable,
  TNegatable extends Negatable = undefined,
> = UnionToIntersection<
  Extract<TArgNames, TCollectable> extends string ?
      & (Exclude<TArgNames, TCollectable> extends never ? Record<never, never>
        : MapTypes<Exclude<TArgNames, TCollectable>, TType, TNegatable>)
      & (Extract<TArgNames, TCollectable> extends never ? Record<never, never>
        : RecursiveRequired<
          MapTypes<Extract<TArgNames, TCollectable>, Array<TType>, TNegatable>
        >)
    : MapTypes<TArgNames, TType, TNegatable>
>;
/** Same as `Record` but also supports dotted and negatable options. */
type MapTypes<
  TArgNames extends ArgType,
  TType,
  TNegatable extends Negatable = undefined,
> = undefined extends TArgNames ? Record<never, never>
  : TArgNames extends `${infer Name}.${infer Rest}` ? {
      [Key in Name]?: MapTypes<
        Rest,
        TType,
        TNegatable extends `${Name}.${infer Negate}` ? Negate : undefined
      >;
    }
  : TArgNames extends string ? Partial<
      Record<TArgNames, TNegatable extends TArgNames ? TType | false : TType>
    >
  : Record<never, never>;
type CollectUnknownValues<
  TBooleans extends BooleanType,
  TStrings extends StringType,
  TCollectable extends Collectable,
  TNegatable extends Negatable,
> = UnionToIntersection<
  TCollectable extends TBooleans & TStrings ? Record<never, never>
    : DedotRecord<
      & Record<
        Exclude<
          Extract<Exclude<TCollectable, TNegatable>, string>,
          Extract<TStrings | TBooleans, string>
        >,
        Array<unknown>
      >
      & Record<
        Exclude<
          Extract<Extract<TCollectable, TNegatable>, string>,
          Extract<TStrings | TBooleans, string>
        >,
        Array<unknown> | false
      >
    >
>;
/** Converts `{ "foo.bar.baz": unknown }` into `{ foo: { bar: { baz: unknown } } }`. */
type DedotRecord<TRecord> = Record<string, unknown> extends TRecord ? TRecord
  : TRecord extends Record<string, unknown> ? UnionToIntersection<
      ValueOf<
        {
          [Key in keyof TRecord]: Key extends string ? Dedot<Key, TRecord[Key]>
            : never;
        }
      >
    >
  : TRecord;
type Dedot<TKey extends string, TValue> = TKey extends
  `${infer Name}.${infer Rest}` ? {
    [Key in Name]: Dedot<Rest, TValue>;
  }
  : {
    [Key in TKey]: TValue;
  };
type ValueOf<TValue> = TValue[keyof TValue];
/** The value returned from {@linkcode parseArgs}. */
export type Args<
  TArgs extends Record<string, unknown> = Record<string, any>,
  TDoubleDash extends boolean | undefined = undefined,
> = Id<
  & TArgs
  & {
    /** Contains all the arguments that didn't have an option associated with
     * them. */
    _: Array<string | number>;
  }
  & (boolean extends TDoubleDash ? DoubleDash
    : true extends TDoubleDash ? Required<DoubleDash>
    : Record<never, never>)
>;
/** @internal */
type DoubleDash = {
  /** Contains all the arguments that appear after the double dash: "--". */
  "--"?: Array<string>;
};
/** Options for {@linkcode parseArgs}. */
export interface ParseOptions<
  TBooleans extends BooleanType = BooleanType,
  TStrings extends StringType = StringType,
  TCollectable extends Collectable = Collectable,
  TNegatable extends Negatable = Negatable,
  TDefault extends Record<string, unknown> | undefined =
    | Record<string, unknown>
    | undefined,
  TAliases extends Aliases | undefined = Aliases | undefined,
  TDoubleDash extends boolean | undefined = boolean | undefined,
> {
  /**
   * When `true`, populate the result `_` with everything before the `--` and
   * the result `['--']` with everything after the `--`.
   *
   * @default {false}
   *
   * @example Double dash option is false
   * ```ts
   * // $ deno run example.ts -- a arg1
   * import { parseArgs } from "parse-args.ts";
   * const args = parseArgs(Deno.args, { "--": false }); // args equals { _: [ "a", "arg1" ] }
   * ```
   *
   * @example Double dash option is true
   * ```ts
   * // $ deno run example.ts -- a arg1
   * import { parseArgs } from "parse-args.ts";
   * const args = parseArgs(Deno.args, { "--": true }); // args equals { _: [], --: [ "a", "arg1" ] }
   * ```
   */
  "--"?: TDoubleDash;
  /**
   * An object mapping string names to strings or arrays of string argument
   * names to use as aliases.
   *
   * @default {{}}
   */
  alias?: TAliases;
  /**
   * A boolean, string or array of strings to always treat as booleans. If
   * `true` will treat all double hyphenated arguments without equal signs as
   * `boolean` (e.g. affects `--foo`, not `-f` or `--foo=bar`).
   *  All `boolean` arguments will be set to `false` by default.
   *
   * @default {false}
   */
  boolean?: TBooleans | ReadonlyArray<Extract<TBooleans, string>>;
  /**
   * An object mapping string argument names to default values.
   *
   * @default {{}}
   */
  default?: TDefault & Defaults<TBooleans, TStrings>;
  /**
   * When `true`, populate the result `_` with everything after the first
   * non-option.
   *
   * @default {false}
   */
  stopEarly?: boolean;
  /**
   * A string or array of strings argument names to always treat as strings.
   *
   * @default {[]}
   */
  string?: TStrings | ReadonlyArray<Extract<TStrings, string>>;
  /**
   * A string or array of strings argument names to always treat as arrays.
   * Collectable options can be used multiple times. All values will be
   * collected into one array. If a non-collectable option is used multiple
   * times, the last value is used.
   *
   * @default {[]}
   */
  collect?: TCollectable | ReadonlyArray<Extract<TCollectable, string>>;
  /**
   * A string or array of strings argument names which can be negated
   * by prefixing them with `--no-`, like `--no-config`.
   *
   * @default {[]}
   */
  negatable?: TNegatable | ReadonlyArray<Extract<TNegatable, string>>;
  /**
   * A function which is invoked with a command line parameter not defined in
   * the `options` configuration object. If the function returns `false`, the
   * unknown option is not added to `parsedArgs`.
   *
   * @default {unknown}
   */
  unknown?: (arg: string, key?: string, value?: unknown) => unknown;
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
export declare function parseArgs<
  TArgs extends Values<
    TBooleans,
    TStrings,
    TCollectable,
    TNegatable,
    TDefaults,
    TAliases
  >,
  TDoubleDash extends boolean | undefined = undefined,
  TBooleans extends BooleanType = undefined,
  TStrings extends StringType = undefined,
  TCollectable extends Collectable = undefined,
  TNegatable extends Negatable = undefined,
  TDefaults extends Record<string, unknown> | undefined = undefined,
  TAliases extends Aliases<TAliasArgNames, TAliasNames> | undefined = undefined,
  TAliasArgNames extends string = string,
  TAliasNames extends string = string,
>(
  args: readonly string[],
  options?: ParseOptions<
    TBooleans,
    TStrings,
    TCollectable,
    TNegatable,
    TDefaults,
    TAliases,
    TDoubleDash
  >,
): Args<TArgs, TDoubleDash>;
export {};
