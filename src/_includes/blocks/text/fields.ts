import { theme } from "../cms.ts";

export default {
  type: "object",
  name: "text",
  fields: [
    "title: text",
    "id: text",
    theme,
    {
      name: "columns",
      type: "checkbox",
      description: "Display text in columns instead a single centered column",
    },
    "text: markdown",
  ],
};
