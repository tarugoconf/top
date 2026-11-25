export default {
  type: "object",
  name: "vimeo",
  fields: [
    {
      type: "text",
      name: "code",
      description:
        "Vimeo video code. It's in the URL: <code>https://vimeo.com/{code}</code>",
    },
    "cover: file",
    "alt: text",
    "caption: markdown",
    "id: text",
  ],
};
