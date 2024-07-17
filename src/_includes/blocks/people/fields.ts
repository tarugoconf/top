export default {
  type: "object",
  name: "people",
  fields: [
    "title: text",
    "id: text",
    "description: markdown",
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
          upload: "src:files/people",
        },
        "url: url",
        "description: text",
      ],
    },
  ],
};
