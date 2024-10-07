export default {
  type: "object",
  name: "multitrack-calendar",
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
          name: "tracks",
          fields: [
            "title: text",
            "id: text",
          ],
        },
        {
          type: "object-list",
          name: "events",
          fields: [
            "time: text",
            "title: text",
            "id: text",
            "subtitle: text",
            "track: text",
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
