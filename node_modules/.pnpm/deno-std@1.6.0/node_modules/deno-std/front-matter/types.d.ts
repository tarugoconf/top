/** Return type for {@linkcode extract} function. */
export type Extract<T> = {
  frontMatter: string;
  body: string;
  attrs: T;
};
