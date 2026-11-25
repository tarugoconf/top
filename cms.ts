import createCms from "@lumeland/cms";
import contactBlock from "./src/_components/contact/fields.ts";
import faqBlock from "./src/_components/faq/fields.ts";
import heroBlock from "./src/_components/hero/fields.ts";
import imageTextBlock from "./src/_components/imagetext/fields.ts";
import carouselTextBlock from "./src/_components/carouseltext/fields.ts";
import locationBlock from "./src/_components/location/fields.ts";
import logosBlock from "./src/_components/logos/fields.ts";
import pdfBlock from "./src/_components/pdf/fields.ts";
import textBlock from "./src/_components/text/fields.ts";
import videoBlock from "./src/_components/video/fields.ts";
import vimeoBlock from "./src/_components/vimeo/fields.ts";
import separatorBlock from "./src/_components/separator/fields.ts";
import calendarBlock from "./src/_components/calendar/fields.ts";
import speakersBlock from "./src/_components/speakers/fields.ts";
import ticketsBlock from "./src/_components/tickets/fields.ts";
import peopleBlock from "./src/_components/people/fields.ts";
import activitiesBlock from "./src/_components/activities/fields.ts";
import headerBlock from "./src/_components/header/fields.ts";
import multiTrackCalendarBlock from "./src/_components/multitrack-calendar/fields.ts";

const blocks = {
  type: "choose-list",
  name: "blocks",
  description: "Blocks with the content of the page",
  fields: [
    headerBlock,
    activitiesBlock,
    contactBlock,
    calendarBlock,
    multiTrackCalendarBlock,
    faqBlock,
    heroBlock,
    imageTextBlock,
    carouselTextBlock,
    locationBlock,
    logosBlock,
    peopleBlock,
    separatorBlock,
    speakersBlock,
    ticketsBlock,
    pdfBlock,
    textBlock,
    videoBlock,
    vimeoBlock,
  ],
};
const metas = {
  type: "object",
  name: "metas",
  description: "Meta tags for SEO and social media sharing",
  view: "more",
  fields: [
    "title: text",
    "description: text",
    {
      type: "file",
      name: "image",
      description: "Image for sharing on social media (empty for default)",
    },
  ],
};

const styles = {
  type: "code",
  name: "extra_head",
  description: "Extra HTML code to include in the head of the page",
  view: "more",
};

const menu = {
  type: "object-list",
  name: "menu",
  description: "Items for the menu bar",
  view: "more",
  fields: [
    "text: text",
    "url: text",
    "highlight: checkbox",
  ],
};

const cms = createCms();

cms.collection({
  name: "Pages",
  store: "src:pages/*.{yml,md}",
  type: "choose",
  fields: [
    {
      name: "text",
      type: "object",
      fields: [
        {
          type: "hidden",
          name: "layout",
          value: "layouts/page-text.vto",
        },
        "title: text",
        {
          name: "url",
          type: "text",
          description: "Public URL of the page",
        },
        styles,
        "subtitle: text",
        "content: markdown",
      ]
    },
    {
      name: "blocks",
      type: "object",
      fields: [
        {
          type: "hidden",
          name: "layout",
          value: "layouts/page-blocks.vto",
        },
        "title: text",
        {
          name: "url",
          type: "text",
          description: "Public URL of the page",
        },
        {
          label: "Base colors",
          name: "theme",
          type: "select",
          value: "is-light",
          options: [
            {
              label: "Light",
              value: "is-light",
            },
            {
              label: "Primary",
              value: "is-primary",
            },
            {
              label: "Secondary",
              value: "is-secondary",
            },
            {
              label: "Dark",
              value: "is-dark",
            },
          ],
        },
        styles,
        metas,
        menu,
        blocks,
      ],
    }
  ],
});

cms.document({
  name: "Settings",
  description: "General settings",
  store: "src:_data.yml",
  previewUrl: () => "/",
  fields: [
    {
      type: "text",
      name: "title_suffix",
      description: "Default title or suffix for all pages",
    },
    {
      type: "select",
      name: "menu_style",
      description: "Style of the menu bar",
      options: [
        "float",
        "flexible",
        "transparent",
      ],
    },
    {
      type: "select",
      name: "menu_theme",
      description: "Color scheme of the menu bar",
      options: [
        { label: "Primary color", value: "is-primary" },
        { label: "Secondary color", value: "is-secondary" },
        { label: "Light", value: "is-light" },
        { label: "Dark", value: "is-dark" },
      ],
    },
    {
      type: "select",
      name: "footer_theme",
      description: "Color scheme of the footer",
      options: [
        { label: "Primary color", value: "is-primary" },
        { label: "Secondary color", value: "is-secondary" },
        { label: "Light", value: "is-light" },
        { label: "Dark", value: "is-dark" },
      ],
    },
    {
      type: "select",
      name: "state",
      description: "Event state. This will filter the pages by state",
      options: [
        { label: "Before the event", value: "pre-event" },
        { label: "During the event", value: "event" },
        { label: "After the event", value: "post-event" },
      ],
    },
    {
      type: "object",
      name: "metas",
      description: "Default options for meta tags applied to all pages",
      fields: [
        {
          type: "text",
          name: "site",
          label: "Name of the site",
        },
        "lang: text",
        {
          type: "text",
          name: "twitter",
          label: "Twitter username",
          description: "If you want to use Twitter cards",
        },
        {
          type: "text",
          name: "fediverse",
          label: "Fediverse handler",
          description:
            "It's used for <a target=_blank href='https://blog.joinmastodon.org/2024/07/highlighting-journalism-on-mastodon/'>author attribution</a>.",
        },
        {
          type: "color",
          name: "color",
          label: "Color theme",
        },
        {
          type: "file",
          name: "image",
          description:
            "Default image for sharing on social media. It can be overridden in each page",
        },
      ],
    },
    {
      type: "object",
      name: "cta",
      description: "Call to action (visible on all pages)",
      fields: [
        "text: text",
        "url: text",
      ],
    },
    {
      type: "object",
      name: "footer",
      description: "Footer settings (copyright, menu)",
      fields: [
        {
          name: "logo",
          type: "file",
          description:
            "Logo to show in the footer. It's used also in the menu bar",
        },
        "copyright: markdown",
        {
          type: "object-list",
          name: "menu",
          fields: [
            "text: text",
            "href: text",
          ],
        },
      ],
    },
  ],
});

cms.document("Humans.txt", "src:humans.vto", [
  "content: code",
]);

cms.upload("uploads", "src:files");

export default cms;
