export default {
  type: "object",
  name: "separator",
  fields: [
    {
      type: "select",
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
      ],
    },
  ],
};
