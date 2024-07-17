export default {
  type: "object",
  name: "logos",
  fields: [
    "title: text",
    "id: text",
    "description: markdown",
    {
      type: "select",
      name: "size",
      options: ["small", "medium"],
    },
    {
      type: "object-list",
      name: "items",
      label: "Logos",
      fields: [
        "alt: text",
        {
          type: "file",
          name: "img",
          label: "Image",
          upload: "src:files/logos",
        },
        "url: url",
        "description: text",
      ],
    },
  ],
};
