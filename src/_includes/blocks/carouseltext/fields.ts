import { theme } from "../cms.ts";

export default {
  type: "object",
  name: "carouseltext",
  fields: [
    "title: text",
    "id: text",
    theme,
    {
      name: "carousel",
      type: "file-list",
      fields: [
        "src: file"
      ]
    },
    "text: markdown",
  ],
};
