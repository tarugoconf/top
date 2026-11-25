import { theme } from "../cms.ts";

export default {
  type: "object",
  name: "calendar",
  fields: [
    "title: text",
    "description: markdown",
    "id: text",
    theme,
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
            "label: text",
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
