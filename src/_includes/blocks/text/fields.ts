import { theme } from "../cms.ts";

export default {
  type: "object",
  name: "text",
  fields: [
    "title: text",
    "id: text",
    theme,
    "text: markdown",
  ],
};
