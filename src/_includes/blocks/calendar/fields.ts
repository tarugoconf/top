export default {
  type: "object",
  name: "calendar",
  fields: [
    "title: text",
    "id: text",
    {
      type: "object-list",
      name: "days",
      fields: [
        "title: text",
        {
          type: "object-list",
          name: "events",
          fields: [
            "time: text",
            "title: text",
            "id: text",
            "subtitle: text",
            "description: markdown",
            {
              type: "list",
              name: "speakers",
              description: "Select the speakers ID for this event",
            },
          ],
        },
      ],
    },
  ],
};
