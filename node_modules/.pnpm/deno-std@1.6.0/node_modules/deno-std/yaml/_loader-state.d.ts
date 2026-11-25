import { type Schema, type TypeMap } from "./_schema.ts";
import type { KindType, Type } from "./_type.ts";
import { YamlSyntaxError } from "./types.ts";
export interface LoaderStateOptions {
  /** specifies a schema to use. */
  schema?: Schema;
  /** compatibility with JSON.parse behaviour. */
  allowDuplicateKeys?: boolean;
  /** function to call on warning messages. */
  onWarning?(error: YamlSyntaxError): void;
}
interface State {
  tag: string | null;
  anchor: string | null;
  kind: KindType | null;
  result: unknown[] | Record<string, unknown> | string | null;
}
export declare class LoaderState {
  #private;
  lineIndent: number;
  lineStart: number;
  line: number;
  onWarning: ((error: YamlSyntaxError) => void) | undefined;
  allowDuplicateKeys: boolean;
  implicitTypes: Type<"scalar">[];
  typeMap: TypeMap;
  checkLineBreaks: boolean;
  tagMap: Map<any, any>;
  anchorMap: Map<any, any>;
  constructor(
    input: string,
    { schema, onWarning, allowDuplicateKeys }: LoaderStateOptions,
  );
  skipWhitespaces(): void;
  skipComment(): void;
  readIndent(): void;
  dispatchWarning(message: string): void;
  yamlDirectiveHandler(args: string[]): string | null;
  tagDirectiveHandler(args: string[]): void;
  captureSegment(
    start: number,
    end: number,
    checkJson: boolean,
  ): string | undefined;
  readBlockSequence(
    tag: string | null,
    anchor: string | null,
    nodeIndent: number,
  ): State | void;
  mergeMappings(
    destination: Record<string, unknown>,
    source: Record<string, unknown>,
    overridableKeys: Set<string>,
  ): void;
  storeMappingPair(
    result: Record<string, unknown>,
    overridableKeys: Set<string>,
    keyTag: string | null,
    keyNode: Record<PropertyKey, unknown> | unknown[] | string | null,
    valueNode: unknown,
    startLine?: number,
    startPos?: number,
  ): Record<string, unknown>;
  readLineBreak(): void;
  skipSeparationSpace(allowComments: boolean, checkIndent: number): number;
  testDocumentSeparator(): boolean;
  readPlainScalar(
    tag: string | null,
    anchor: string | null,
    nodeIndent: number,
    withinFlowCollection: boolean,
  ): State | void;
  readSingleQuotedScalar(
    tag: string | null,
    anchor: string | null,
    nodeIndent: number,
  ): State | void;
  readDoubleQuotedScalar(
    tag: string | null,
    anchor: string | null,
    nodeIndent: number,
  ): State | void;
  readFlowCollection(
    tag: string | null,
    anchor: string | null,
    nodeIndent: number,
  ): State | void;
  readBlockScalar(
    tag: string | null,
    anchor: string | null,
    nodeIndent: number,
  ): State | void;
  readBlockMapping(
    tag: string | null,
    anchor: string | null,
    nodeIndent: number,
    flowIndent: number,
  ): State | void;
  readTagProperty(tag: string | null): string | void;
  readAnchorProperty(anchor: string | null): string | void;
  readAlias(): string | void;
  resolveTag(state: State): State;
  composeNode({ parentIndent, nodeContext, allowToSeek, allowCompact }: {
    parentIndent: number;
    nodeContext: number;
    allowToSeek: boolean;
    allowCompact: boolean;
  }): State | void;
  readDirectives(): boolean;
  readDocument(): string | unknown[] | Record<string, unknown> | null;
  readDocuments(options?: {
    singleDocument?: boolean;
  }): Generator<unknown>;
}
export {};
