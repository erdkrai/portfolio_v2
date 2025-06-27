import { defineField, defineType } from "sanity";
import { Globe } from "lucide-react";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: Globe,
  groups: [
    {
      name: "general",
      title: "General",
      default: true,
    },
    {
      name: "navigation",
      title: "Navigation",
    },
    {
      name: "social",
      title: "Social Media",
    },
    {
      name: "content",
      title: "Content",
    },
  ],
  fields: [
    defineField({
      name: "showFooter",
      title: "Show Footer",
      type: "boolean",
      description: "Toggle to show or hide the footer across the entire website",
      initialValue: true,
      group: "general",
    }),
    defineField({
      name: "logoType",
      title: "Logo Type",
      type: "string",
      options: {
        list: [
          { title: "Image Logo", value: "image" },
          { title: "Text Logo", value: "text" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      group: "general",
    }),
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
      hidden: ({ parent }) => parent?.logoType !== "image",
      group: "general",
    }),
    defineField({
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: "Text to display as logo",
      hidden: ({ parent }) => parent?.logoType !== "text",
      group: "general",
    }),
    defineField({
      name: "navigationLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "target",
              title: "Open in new tab",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
      group: "navigation",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Twitter", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Discord", value: "discord" },
                  { title: "Dribbble", value: "dribbble" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
      group: "social",
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "block-content",
      description: "Copyright and attribution text (supports rich text and links)",
      group: "content",
    }),
    defineField({
      name: "additionalContent",
      title: "Additional Content",
      type: "block-content",
      description: "Any additional footer content",
      group: "content",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer Configuration",
        subtitle: "Website footer settings",
      };
    },
  },
});
