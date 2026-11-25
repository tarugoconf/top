/** JSON.parse with detailed error message. */
export function parse(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    // Truncate the string so that it is within 30 lengths.
    const truncatedText = 30 < text.length ? `${text.slice(0, 30)}...` : text;
    throw new error.constructor(
      `${error.message} (parsing: '${truncatedText}')`,
    );
  }
}
