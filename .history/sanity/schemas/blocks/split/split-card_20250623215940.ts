import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "split-card",
  type: "object",
  icon: TextQuote,
  title: "Split Card",
  description:
    "Column with tag line, title and content body. Part of a split cards.",
  fields: [
    defineField({
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "link",
      type: "link",
      title: "Link",
      description: "Optional link for the card",
    }),
    defineField({
      name: "linkStyle",
      type: "string",
      title: "Link Style",
      description: "How the link should be displayed",
      options: {
        list: [
          { title: "Button", value: "button" },
          { title: "Clickable Card", value: "card" },
          { title: "Both", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "button",
      hidden: ({ parent }) => !parent?.link?.href,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No Title",
      };
    },
  },
});
