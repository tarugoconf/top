import { theme } from "../cms.ts";

export default {
  type: "object",
  name: "faq",
  fields: [
    "title: text",
    "id: text",
    theme,
    {
      type: "object-list",
      name: "questions",
      fields: [
        "question: text",
        "answer: markdown",
      ],
    },
  ],
};
