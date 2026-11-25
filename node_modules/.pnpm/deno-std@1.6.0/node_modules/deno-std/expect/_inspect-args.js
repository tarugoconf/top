// Copyright 2018-2026 the Deno authors. MIT license.
// deno-lint-ignore-file
export function inspectArgs(args) {
  return args.map(inspectArg).join(", ");
}
export function inspectArg(arg) {
  const { Deno } = globalThis;
  return typeof Deno !== "undefined" && Deno.inspect
    ? Deno.inspect(arg)
    : String(arg);
}
