export default {
  type: "object",
  name: "tickets",
  fields: [
    "title: text",
    "description: markdown",
    "id: text",
    {
      type: "object-list",
      name: "features",
      fields: [
        "id: text",
        "text: text",
      ],
    },
    {
      type: "object-list",
      name: "tickets",
      fields: [
        "name: text",
        "pricing: text",
        "img: file",
        {
          type: "object",
          name: "buy",
          fields: [
            "text: text",
            "url: text",
            "disabled: checkbox",
          ],
        },
        "features: list",
      ],
    },
  ],
};
