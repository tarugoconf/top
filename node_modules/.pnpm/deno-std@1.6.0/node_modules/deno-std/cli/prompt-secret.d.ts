/** Options for {@linkcode promptSecret}. */
export type PromptSecretOptions = {
  /** A character to print instead of the user's input. */
  mask?: string;
  /** Clear the current line after the user's input. */
  clear?: boolean;
};
/**
 * Shows the given message and waits for the user's input. Returns the user's input as string.
 * This is similar to `prompt()` but it print user's input as `*` to prevent password from being shown.
 * Use an empty `mask` if you don't want to show any character.
 *
 * @param message The prompt message to show to the user.
 * @param options The options for the prompt.
 * @returns The string that was entered or `null` if stdin is not a TTY.
 *
 * @example Usage
 * ```ts ignore
 * import { promptSecret } from "prompt-secret.ts";
 *
 * const password = promptSecret("Please provide the password:");
 * if (password !== "some-password") {
 *   throw new Error("Access denied");
 * }
 * ```
 */
export declare function promptSecret(
  message?: string,
  options?: PromptSecretOptions,
): string | null;
