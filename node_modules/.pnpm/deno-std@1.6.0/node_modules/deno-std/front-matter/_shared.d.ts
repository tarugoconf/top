export declare function extractFrontMatter(
  input: string,
  extractRegExp: RegExp,
): {
  frontMatter: string;
  body: string;
};
