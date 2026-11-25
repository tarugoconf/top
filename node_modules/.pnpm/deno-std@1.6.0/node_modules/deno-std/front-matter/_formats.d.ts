/**
 * Supported format for front matter. `"unknown"` is used when auto format
 * detection logic fails.
 */
export type Format = "yaml" | "toml" | "json";
export declare const EXTRACT_YAML_REGEXP: RegExp;
export declare const EXTRACT_TOML_REGEXP: RegExp;
export declare const EXTRACT_JSON_REGEXP: RegExp;
export declare const RECOGNIZE_REGEXP_MAP: Map<string, RegExp>;
export declare const EXTRACT_REGEXP_MAP: Map<string, RegExp>;
