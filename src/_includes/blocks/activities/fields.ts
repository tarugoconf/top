export default {
  type: "object",
  name: "activities",
  fields: [
    "title: text",
    "id: text",
    "description: markdown",
    {
      type: "object-list",
      name: "items",
      label: "Activities",
      fields: [
        "title: text",
        "tags: list",
        {
          type: "file",
          name: "img",
          label: "Image",
          upload: "src:files/logos",
        },
        "description: text",
      ],
    },
  ],
};
