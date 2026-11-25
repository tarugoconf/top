import basePath from "@lumeland/plugin-base-path";
import date from "@lumeland/plugin-date";
import lightningCSS from "@lumeland/plugin-lightningcss";
import icons from "@lumeland/plugin-icons";
import favicon from "@lumeland/plugin-favicon";
import metas from "@lumeland/plugin-metas";
import { alert } from "@mdit/plugin-alert";
import lumeCms from "@lumeland/plugin-cms";
import cms from "./cms.ts";

export interface Options {}

let id = 0;

export default function (options?: Options) {
  return (site: Lume.Site) => {
    site.use(date())
      .add("files")
      .add("scripts")
      .add([".css"])
      .add(
        "npm:@vimeo/player@2.20.1/dist/player.es.js",
        "scripts/deps/vimeo-player.js",
      )
      .use(basePath())
      .use(metas())
      .data("counter", () => id++)
      .data("basename", "/", "pages")
      .use(lightningCSS())
      .use(icons())
      .use(favicon({
        input: "files/favicon.svg",
      }))
      .use(lumeCms({ cms }))
      .remote(
        "_includes/styles/reset.css",
        "https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.css",
      );

    // Alert plugin
    site.hooks.addMarkdownItPlugin(alert);

    // Add remote files
    site.remote("/", import.meta.resolve("./src"), ["_includes/**"]);
  };
}

export const setup: Lume.Archetype = function* () {
  yield {
    url: import.meta.resolve("./src"),
    files: ["_data/*", "files/*"],
  };
};
