import { theme } from "../cms.ts";

export default {
  type: "object",
  name: "imagetext",
  fields: [
    "title: text",
    "id: text",
    theme,
    "src: file",
    "text: markdown",
  ],
};
