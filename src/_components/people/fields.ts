import { theme } from "../cms.ts";

export default {
  type: "object",
  name: "people",
  fields: [
    "title: text",
    "id: text",
    "description: markdown",
    theme,
    {
      type: "object-list",
      name: "items",
      label: "People",
      fields: [
        "name: text",
        {
          type: "file",
          name: "img",
          label: "Image",
          upload: "uploads:people",
        },
        "url: url",
        "description: text",
      ],
    },
  ],
};
