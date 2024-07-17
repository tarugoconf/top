export default {
  type: "object",
  name: "video",
  fields: [
    "src: file",
    "id: text",
    "caption: markdown",
    "text_over: text",
    {
      type: "radio",
      name: "mode",
      options: ["background", "video"],
    },
  ],
};
