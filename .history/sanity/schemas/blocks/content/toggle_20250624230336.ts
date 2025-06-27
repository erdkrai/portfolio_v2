import { defineField, defineType } from "sanity";
import { ChevronDown } from "lucide-react";

export default defineType({
  name: "toggle",
  type: "object",
  title: "Toggle Section",
  icon: ChevronDown,
  description: "A collapsible section that can be expanded or collapsed",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Toggle Title",
      description: "The clickable title that toggles the content",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "content",
      type: "block-content",
      title: "Content",
      description: "The content that will be shown/hidden when toggled",
    }),
    defineField({
      name: "defaultOpen",
      type: "boolean",
      title: "Default Open",
      description: "Should this section be open by default?",
      initialValue: false,
    }),
    defineField({
      name: "style",
      type: "string",
      title: "Style",
      description: "Visual style of the toggle",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Bordered", value: "bordered" },
          { title: "Minimal", value: "minimal" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: {
      title: "title",
      defaultOpen: "defaultOpen",
      style: "style",
    },
    prepare({ title, defaultOpen, style }) {
      return {
        title: title || "Toggle Section",
        subtitle: `${defaultOpen ? "Open" : "Closed"} by default • ${style} style`,
        media: ChevronDown,
      };
    },
  },
});
