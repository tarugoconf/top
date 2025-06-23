export default {
  type: "object",
  name: "separator",
  fields: [
    {
      type: "select",
      label: "Style",
      name: "width",
      options: [
        {
          label: "Default",
          value: "is-default",
        },
        {
          label: "Full width",
          value: "is-full",
        },
        {
          label: "Invisible",
          value: "is-invisible",
        },
      ],
    },
  ],
};
