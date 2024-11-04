import lumeCMS from "lume/cms/mod.ts";

import contactBlock from "./src/_includes/blocks/contact/fields.ts";
import faqBlock from "./src/_includes/blocks/faq/fields.ts";
import heroBlock from "./src/_includes/blocks/hero/fields.ts";
import imageTextBlock from "./src/_includes/blocks/imagetext/fields.ts";
import locationBlock from "./src/_includes/blocks/location/fields.ts";
import logosBlock from "./src/_includes/blocks/logos/fields.ts";
import pdfBlock from "./src/_includes/blocks/pdf/fields.ts";
import textBlock from "./src/_includes/blocks/text/fields.ts";
import videoBlock from "./src/_includes/blocks/video/fields.ts";
import separatorBlock from "./src/_includes/blocks/separator/fields.ts";
import calendarBlock from "./src/_includes/blocks/calendar/fields.ts";
import speakersBlock from "./src/_includes/blocks/speakers/fields.ts";
import ticketsBlock from "./src/_includes/blocks/tickets/fields.ts";
import peopleBlock from "./src/_includes/blocks/people/fields.ts";
import activitiesBlock from "./src/_includes/blocks/activities/fields.ts";
import headerBlock from "./src/_includes/blocks/header/fields.ts";
import multiTrackCalendarBlock from "./src/_includes/blocks/multitrack-calendar/fields.ts";

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
    locationBlock,
    logosBlock,
    peopleBlock,
    separatorBlock,
    speakersBlock,
    ticketsBlock,
    pdfBlock,
    textBlock,
    videoBlock,
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

const state = {
  type: "select",
  label: "Visibility",
  name: "only_state",
  description: "When should this page be visible?",
  options: [
    { label: "Always", value: "" },
    { label: "Before the event", value: "pre-event" },
    { label: "During the event", value: "event" },
    { label: "After the event", value: "post-event" },
    { label: "Never", value: "never" },
  ],
};

const cms = lumeCMS();

cms.collection({
  name: "Pages",
  store: "src:block_pages/*.yml",
  fields: [
    "title: text",
    {
      name: "url",
      type: "text",
      description: "Public URL of the page",
    },
    styles,
    metas,
    state,
    menu,
    blocks,
  ],
});

cms.collection("Legal pages", "src:pages/*.md", [
  "title: text",
  state,
  styles,
  "subtitle: text",
  "content: markdown",
]);

cms.document({
  name: "Settings",
  description: "General settings",
  store: "src:_data.yml",
  fields: [
    {
      type: "text",
      name: "title_suffix",
      description: "Default title or suffix for all pages",
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

cms.upload("Uploads", "src:files");

export default cms;
