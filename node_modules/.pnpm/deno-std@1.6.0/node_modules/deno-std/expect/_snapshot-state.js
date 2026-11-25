// Copyright 2018-2026 the Deno authors. MIT license.
import { basename } from "../path/basename.js";
import { dirname } from "../path/dirname.js";
import { fromFileUrl } from "../path/from-file-url.js";
import { join } from "../path/join.js";
const SNAPSHOT_DIR = "__snapshots__";
const SNAPSHOT_EXT = "snap";
let expectState = {};
/**
 * Sets the expect state. Used by test runners to provide test context.
 *
 * @experimental
 */
export function setState(newState) {
  expectState = { ...expectState, ...newState };
}
/**
 * Gets the current expect state.
 *
 * @experimental
 */
export function getState() {
  return { ...expectState };
}
// --- V8 structured stack trace API ---
/**
 * Gets the test file path by walking up the call stack and finding the first
 * frame that isn't part of the expect module internals.
 */
export function getTestFileFromStack() {
  // deno-lint-ignore no-explicit-any
  const ErrorCtor = Error;
  const origPrepareStackTrace = ErrorCtor.prepareStackTrace;
  try {
    const obj = { stack: null };
    ErrorCtor.prepareStackTrace = (
      _err,
      // deno-lint-ignore no-explicit-any
      stack,
    ) => {
      for (const frame of stack) {
        if (frame.isEval()) {
          continue;
        }
        const fileName = frame.getFileName();
        if (fileName === null) {
          continue;
        }
        // Skip expect module internal files
        if (
          fileName.includes("/expect/_") ||
          fileName.includes("/expect/expect.ts")
        ) {
          continue;
        }
        return fileName;
      }
      return null;
    };
    ErrorCtor.captureStackTrace(obj);
    return obj.stack;
  } finally {
    ErrorCtor.prepareStackTrace = origPrepareStackTrace;
  }
}
// --- Serialization ---
/** Serializes a value for snapshot comparison using `Deno.inspect`. */
export function serialize(actual) {
  return Deno.inspect(actual, {
    depth: Infinity,
    sorted: true,
    trailingComma: true,
    compact: false,
    iterableLimit: Infinity,
    strAbbreviateSize: Infinity,
    breakLength: Infinity,
    escapeSequences: false,
  }).replaceAll("\r", "\\r");
}
// --- Snapshot string escaping ---
export function escapeStringForJs(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}
function unescapeStringForJs(str) {
  return str
    .replace(/\\\$/g, "$")
    .replace(/\\`/g, "`")
    .replace(/\\\\/g, "\\");
}
// --- Snapshot file parsing ---
function parseSnapshotFile(content) {
  const snapshots = new Map();
  const regex =
    /snapshot\[`((?:[^`\\]|\\.)*)`\]\s*=\s*`((?:[^`\\]|\\.)*)`\s*;/gs;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const name = unescapeStringForJs(match[1]);
    let value = unescapeStringForJs(match[2]);
    // Multi-line snapshots have leading/trailing newlines in the backticks
    if (value.startsWith("\n") && value.endsWith("\n")) {
      value = value.slice(1, -1);
    }
    snapshots.set(name, value);
  }
  return snapshots;
}
// --- Update mode detection ---
let _isUpdate;
export function getIsUpdate() {
  if (_isUpdate !== undefined) {
    return _isUpdate;
  }
  try {
    _isUpdate = Deno.args.some((arg) => arg === "--update" || arg === "-u");
  } catch {
    _isUpdate = false;
  }
  return _isUpdate;
}
const inlineUpdateRequests = [];
/**
 * Gets the call site location of the caller of `toMatchInlineSnapshot`.
 * Walks the stack to find the first frame outside of expect internals.
 */
export function getInlineCallSite(
  // deno-lint-ignore no-explicit-any
  captureTarget,
) {
  // deno-lint-ignore no-explicit-any
  const ErrorCtor = Error;
  const origPrepareStackTrace = ErrorCtor.prepareStackTrace;
  try {
    const obj = { stack: null };
    ErrorCtor.prepareStackTrace = (
      _err,
      // deno-lint-ignore no-explicit-any
      stack,
    ) => {
      for (const frame of stack) {
        if (frame.isEval()) {
          continue;
        }
        const fileName = frame.getFileName();
        if (fileName === null) {
          continue;
        }
        if (
          fileName.includes("/expect/_") ||
          fileName.includes("/expect/expect.ts")
        ) {
          continue;
        }
        const lineNumber = frame.getLineNumber();
        const columnNumber = frame.getColumnNumber();
        if (lineNumber === null || columnNumber === null) {
          continue;
        }
        return { fileName, lineNumber, columnNumber, actualSnapshot: "" };
      }
      return null;
    };
    ErrorCtor.captureStackTrace(obj, captureTarget);
    return obj.stack;
  } finally {
    ErrorCtor.prepareStackTrace = origPrepareStackTrace;
  }
}
/** Queues an inline snapshot update to be applied on teardown. */
export function pushInlineUpdate(request) {
  inlineUpdateRequests.push(request);
}
/** Returns the current inline update queue (for testing). */
export function getInlineUpdateRequests() {
  return inlineUpdateRequests;
}
/** Clears the inline update queue (for testing). */
export function clearInlineUpdateRequests() {
  inlineUpdateRequests.length = 0;
}
function makeSnapshotUpdater(updateRequests) {
  return {
    name: "snapshot-updater-plugin",
    rules: {
      "update-snapshot": {
        // deno-lint-ignore no-explicit-any
        create(context) {
          const src = context.sourceCode.text;
          const lineBreaks = [...src.matchAll(/\n|\r\n?/g)]
            .map((m) => m.index);
          const locationToSnapshot = {};
          for (const req of updateRequests) {
            const { lineNumber, columnNumber, actualSnapshot } = req;
            const location = (lineBreaks[lineNumber - 2] ?? 0) + columnNumber;
            locationToSnapshot[location] = actualSnapshot;
          }
          return {
            // deno-lint-ignore no-explicit-any
            "CallExpression"(node) {
              const snapshot = locationToSnapshot[node.range[0]];
              if (snapshot === undefined) {
                return;
              }
              const args = node.arguments;
              if (args.length === 0) {
                context.report({
                  node,
                  message: "",
                  // deno-lint-ignore no-explicit-any
                  fix(fixer) {
                    return fixer.insertTextBeforeRange([
                      node.range[1] - 1,
                      node.range[1] - 1,
                    ], snapshot);
                  },
                });
              } else {
                const lastArg = args[args.length - 1];
                context.report({
                  node,
                  message: "",
                  // deno-lint-ignore no-explicit-any
                  fix(fixer) {
                    return fixer.replaceText(lastArg, snapshot);
                  },
                });
              }
            },
          };
        },
      },
    },
  };
}
function applyInlineUpdates() {
  if (inlineUpdateRequests.length === 0) {
    return;
  }
  // @ts-ignore Deno.lint may not exist in all versions
  if (typeof Deno.lint?.runPlugin !== "function") {
    throw new Error(
      "Deno versions before 2.2.0 do not support Deno.lint, which is required to update inline snapshots",
    );
  }
  const pathsToUpdate = Map.groupBy(inlineUpdateRequests, (r) => r.fileName);
  for (const [path, requests] of pathsToUpdate) {
    const file = Deno.readTextFileSync(path);
    // @ts-ignore Deno.lint may not exist in all versions
    const pluginRunResults = Deno.lint.runPlugin(
      makeSnapshotUpdater(requests),
      "dummy.ts",
      file,
    );
    const fixes = pluginRunResults
      .flatMap((v) => v.fix ?? []);
    // Apply fixes in order
    fixes.sort((a, b) => a.range[0] - b.range[0]);
    let output = "";
    let lastIndex = 0;
    for (const fix of fixes) {
      output += file.slice(lastIndex, fix.range[0]);
      output += fix.text ?? "";
      lastIndex = fix.range[1];
    }
    output += file.slice(lastIndex);
    Deno.writeTextFileSync(path, output);
  }
  const shouldFormat = !Deno.args.some((arg) => arg === "--no-format");
  if (shouldFormat) {
    const command = new Deno.Command(Deno.execPath(), {
      args: ["fmt", ...pathsToUpdate.keys()],
    });
    command.outputSync();
  }
  // deno-lint-ignore no-console
  console.log(
    `%c\n > ${inlineUpdateRequests.length} inline ${
      inlineUpdateRequests.length === 1 ? "snapshot" : "snapshots"
    } updated.`,
    "color: green; font-weight: bold;",
  );
}
let inlineTeardownRegistered = false;
/** Registers the global teardown for inline snapshot updates. */
export function registerInlineTeardown() {
  if (inlineTeardownRegistered) {
    return;
  }
  globalThis.addEventListener("unload", () => {
    applyInlineUpdates();
  });
  inlineTeardownRegistered = true;
}
// --- Snapshot Context (per snapshot file) ---
/**
 * @experimental
 */
export class SnapshotContext {
  static contexts = new Map();
  static fromTestFile(testFilePath) {
    const filePath = testFilePath.startsWith("file://")
      ? fromFileUrl(testFilePath)
      : testFilePath;
    const dir = dirname(filePath);
    const base = basename(filePath);
    const snapshotPath = join(dir, SNAPSHOT_DIR, `${base}.${SNAPSHOT_EXT}`);
    let context = this.contexts.get(snapshotPath);
    if (context) {
      return context;
    }
    context = new SnapshotContext(snapshotPath);
    this.contexts.set(snapshotPath, context);
    return context;
  }
  #snapshotFilePath;
  #currentSnapshots;
  #updatedSnapshots = new Map();
  #snapshotCounts = new Map();
  #snapshotsUpdated = [];
  #snapshotUpdateQueue = [];
  #teardownRegistered = false;
  constructor(snapshotFilePath) {
    this.#snapshotFilePath = snapshotFilePath;
  }
  #readSnapshotFile() {
    if (this.#currentSnapshots) {
      return this.#currentSnapshots;
    }
    try {
      const content = Deno.readTextFileSync(this.#snapshotFilePath);
      this.#currentSnapshots = parseSnapshotFile(content);
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        this.#currentSnapshots = new Map();
      } else {
        throw e;
      }
    }
    return this.#currentSnapshots;
  }
  /** Gets the snapshot count for a test name and increments it. */
  getCount(testName) {
    let count = this.#snapshotCounts.get(testName) ?? 0;
    this.#snapshotCounts.set(testName, ++count);
    return count;
  }
  /** Gets an existing snapshot value by name. */
  getSnapshot(name) {
    return this.#readSnapshotFile().get(name);
  }
  /** Checks if a snapshot exists by name. */
  hasSnapshot(name) {
    return this.#readSnapshotFile().has(name);
  }
  /** Stores an updated snapshot value. Written to disk on teardown. */
  updateSnapshot(name, snapshot) {
    if (!this.#snapshotsUpdated.includes(name)) {
      this.#snapshotsUpdated.push(name);
    }
    const current = this.#readSnapshotFile();
    if (!current.has(name)) {
      current.set(name, "");
    }
    this.#updatedSnapshots.set(name, snapshot);
  }
  /** Tracks the order of snapshots for writing the file. */
  pushToUpdateQueue(name) {
    this.#snapshotUpdateQueue.push(name);
  }
  /** Registers a teardown listener to write snapshots when tests complete. */
  registerTeardown() {
    if (this.#teardownRegistered) {
      return;
    }
    globalThis.addEventListener("unload", this.#teardown);
    this.#teardownRegistered = true;
  }
  #teardown = () => {
    const currentSnapshots = this.#readSnapshotFile();
    const buf = ["export const snapshot = {};"];
    const removedNames = [...currentSnapshots.keys()].filter((name) =>
      !this.#snapshotUpdateQueue.includes(name)
    );
    for (const name of this.#snapshotUpdateQueue) {
      const updatedSnapshot = this.#updatedSnapshots.get(name);
      const currentSnapshot = currentSnapshots.get(name);
      let formattedSnapshot;
      if (typeof updatedSnapshot === "string") {
        formattedSnapshot = updatedSnapshot;
      } else if (typeof currentSnapshot === "string") {
        formattedSnapshot = currentSnapshot;
      } else {
        continue;
      }
      formattedSnapshot = escapeStringForJs(formattedSnapshot);
      formattedSnapshot = formattedSnapshot.includes("\n")
        ? `\n${formattedSnapshot}\n`
        : formattedSnapshot;
      const formattedName = escapeStringForJs(name);
      buf.push(`\nsnapshot[\`${formattedName}\`] = \`${formattedSnapshot}\`;`);
    }
    // Ensure snapshot directory exists
    const snapshotDir = dirname(this.#snapshotFilePath);
    try {
      Deno.mkdirSync(snapshotDir, { recursive: true });
    } catch {
      // directory already exists
    }
    Deno.writeTextFileSync(this.#snapshotFilePath, buf.join("\n") + "\n");
    const updated = this.#snapshotsUpdated.length;
    if (updated > 0) {
      // deno-lint-ignore no-console
      console.log(
        `%c\n > ${updated} ${
          updated === 1 ? "snapshot" : "snapshots"
        } updated.`,
        "color: green; font-weight: bold;",
      );
    }
    if (removedNames.length > 0) {
      // deno-lint-ignore no-console
      console.log(
        `%c\n > ${removedNames.length} ${
          removedNames.length === 1 ? "snapshot" : "snapshots"
        } removed.`,
        "color: red; font-weight: bold;",
      );
      for (const name of removedNames) {
        // deno-lint-ignore no-console
        console.log(`%c   \u2022 ${name}`, "color: red;");
      }
    }
  };
}
