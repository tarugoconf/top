/**
 * State for snapshot testing, following Jest's
 * `expect.getState()`/`expect.setState()` API.
 *
 * @experimental
 */
export interface ExpectSnapshotState {
  /** The name of the currently running test. Required for snapshot testing. */
  currentTestName?: string | undefined;
  /** The file path of the currently running test. Auto-detected from stack trace if not set. */
  testPath?: string | undefined;
}
/**
 * Sets the expect state. Used by test runners to provide test context.
 *
 * @experimental
 */
export declare function setState(newState: Partial<ExpectSnapshotState>): void;
/**
 * Gets the current expect state.
 *
 * @experimental
 */
export declare function getState(): ExpectSnapshotState;
/**
 * Gets the test file path by walking up the call stack and finding the first
 * frame that isn't part of the expect module internals.
 */
export declare function getTestFileFromStack(): string | null;
/** Serializes a value for snapshot comparison using `Deno.inspect`. */
export declare function serialize(actual: unknown): string;
export declare function escapeStringForJs(str: string): string;
export declare function getIsUpdate(): boolean;
interface InlineSnapshotUpdateRequest {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  actualSnapshot: string;
}
/**
 * Gets the call site location of the caller of `toMatchInlineSnapshot`.
 * Walks the stack to find the first frame outside of expect internals.
 */
export declare function getInlineCallSite(
  captureTarget: (...args: any[]) => any,
): InlineSnapshotUpdateRequest | null;
/** Queues an inline snapshot update to be applied on teardown. */
export declare function pushInlineUpdate(
  request: InlineSnapshotUpdateRequest,
): void;
/** Returns the current inline update queue (for testing). */
export declare function getInlineUpdateRequests(): InlineSnapshotUpdateRequest[];
/** Clears the inline update queue (for testing). */
export declare function clearInlineUpdateRequests(): void;
/** Registers the global teardown for inline snapshot updates. */
export declare function registerInlineTeardown(): void;
/**
 * @experimental
 */
export declare class SnapshotContext {
  #private;
  static contexts: Map<string, SnapshotContext>;
  static fromTestFile(testFilePath: string): SnapshotContext;
  constructor(snapshotFilePath: string);
  /** Gets the snapshot count for a test name and increments it. */
  getCount(testName: string): number;
  /** Gets an existing snapshot value by name. */
  getSnapshot(name: string): string | undefined;
  /** Checks if a snapshot exists by name. */
  hasSnapshot(name: string): boolean;
  /** Stores an updated snapshot value. Written to disk on teardown. */
  updateSnapshot(name: string, snapshot: string): void;
  /** Tracks the order of snapshots for writing the file. */
  pushToUpdateQueue(name: string): void;
  /** Registers a teardown listener to write snapshots when tests complete. */
  registerTeardown(): void;
}
export {};
