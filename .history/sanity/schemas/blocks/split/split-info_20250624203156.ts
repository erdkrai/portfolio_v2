import { defineField, defineType } from "sanity";
import { Info } from "lucide-react";
import { extractPlainText } from "@/lib/utils";

export default defineType({
  name: "split-info",
  type: "object",
  icon: Info,
  title: "Split Info",
  description:
    "Column with a title, content body, image and tags. Part of a split cards.",
  fields: [
    defineField({
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
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
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
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
      hidden: ({ parent }) => !parent?.link || 
        (!parent.link.href && !parent.link.page && !parent.link.post),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "body",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "No Title",
        subtitle: extractPlainText(subtitle) || "No Subtitle",
      };
    },
  },
});
