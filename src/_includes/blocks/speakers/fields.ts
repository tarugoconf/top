export default {
  type: "object",
  name: "speakers",
  fields: [
    "title: text",
    "description: markdown",
    {
      type: "object-list",
      name: "speakers",
      fields: [
        "name: text",
        "id: text",
        "company: text",
        "role: text",
        "bio: markdown",
        "image: file",
        {
          type: "object-list",
          name: "links",
          fields: [
            {
              type: "text",
              name: "icon",
              description:
                "<a href='https://phosphoricons.com/' target='_blank'>Phosphor icon name</a>",
            },
            "url: url",
          ],
        },
      ],
    },
  ],
};
