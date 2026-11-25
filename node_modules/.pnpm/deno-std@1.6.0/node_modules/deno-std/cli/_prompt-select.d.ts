import type { PromptEntry } from "./unstable-prompt-select.ts";
/**
 * @param message The prompt message to show to the user.
 * @param indicator The string to indicate the selected item.
 * @param values The values for the prompt.
 * @param clear Whether to clear the lines after the user's input.
 * @param visibleLinesInit The initial number of lines to be visible at once.
 * @param fitToRemainingHeight Whether to calculate visible lines based on remaining height from cursor position.
 * @param valueChange A function that is called when the value changes.
 * @param handleInput A function that handles the input from the user. If it returns false, the prompt will continue. If it returns true, the prompt will exit with clean ups of terminal state (Use this for finalizing the selection). If it returns "return", the prompt will exit immediately without clean ups of terminal state (Use this for exiting the program).
 */
export declare function handlePromptSelect<V>(
  message: string,
  indicator: string,
  values: PromptEntry<V>[],
  clear: boolean | undefined,
  visibleLinesInit: number | undefined,
  fitToRemainingHeight: boolean | undefined,
  valueChange: (active: boolean, absoluteIndex: number) => string | void,
  handleInput: (str: string, absoluteIndex: number | undefined, actions: {
    etx(): "return";
    up(): void;
    down(): void;
    remove(): void;
    inputStr(): void;
  }) => boolean | "return",
): void;
