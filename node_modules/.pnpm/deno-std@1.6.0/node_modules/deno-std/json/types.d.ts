/** A primitive JSON value. */
export type JsonPrimitive = string | number | boolean | null;
/** The type of the result of parsing JSON. */
export type JsonValue =
  | {
    [key: string]: JsonValue | undefined;
  }
  | JsonValue[]
  | JsonPrimitive;
