import plugins from "./plugins.ts";
import "lume/types.ts";

export default function () {
  return (site: Lume.Site) => {
    // Configure the site
    site.use(plugins());

    // Add remote files
    const files = [
      "_includes/**/*",
      "*/_data.yml",
      "scripts/main.js",
      "_components/**/*",
      "styles/*.css",
    ];

    site.remote("/", import.meta.resolve("./src/"), files);
  };
}
