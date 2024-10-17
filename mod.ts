import plugins from "./plugins.ts";
import "lume/types.ts";

export default function () {
  return (site: Lume.Site) => {
    // Configure the site
    site.use(plugins());

    // Add remote files
    const files = [
      "_includes/layouts/base.vto",
      "_includes/layouts/block_page.vto",
      "_includes/layouts/home.vto",
      "_includes/layouts/text.vto",
      "_includes/styles/ui/typography.css",
      "_includes/styles/ui/theme.css",
      "_includes/styles/ui/accordion.css",
      "_includes/styles/ui/badge.css",
      "_includes/styles/ui/button.css",
      "_includes/styles/ui/footer.css",
      "_includes/styles/ui/markdown-alert.css",
      "_includes/styles/ui/navbar.css",
      "_includes/styles/ui/text.css",
      "_includes/styles/ui/modal.css",
      "_includes/styles/variables.css",
      "_includes/styles/base.css",
      "_includes/templates/footer.vto",
      "_includes/templates/navbar.vto",
      "_includes/blocks.vto",
      "block_pages/_data.yml",
      "pages/_data.yml",
      "scripts/main.js",
      "styles/main.css",
    ];

    const blocks = [
      "activities",
      "calendar",
      "multitrack-calendar",
      "contact",
      "faq",
      "header",
      "hero",
      "imagetext",
      "location",
      "logos",
      "pdf",
      "people",
      "separator",
      "speakers",
      "text",
      "tickets",
      "video",
    ];

    for (const block of blocks) {
      files.push(`_includes/blocks/${block}/${block}.css`);
      files.push(`_includes/blocks/${block}/${block}.vto`);
    }

    for (const file of files) {
      site.remoteFile(file, import.meta.resolve(`./src/${file}`));
    }
  };
}
