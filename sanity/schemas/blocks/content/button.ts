import { defineField, defineType } from "sanity";
import { MousePointer } from "lucide-react";

export default defineType({
  name: "button",
  type: "object",
  title: "Button",
  icon: MousePointer,
  description: "An interactive button with customizable styling and actions",
  fields: [
    defineField({
      name: "text",
      type: "string",
      title: "Button Text",
      description: "The text displayed on the button",
      validation: (Rule) => Rule.required().error("Button text is required"),
    }),
    defineField({
      name: "link",
      type: "link",
      title: "Button Link",
      description: "Where the button should navigate to",
    }),
    defineField({
      name: "variant",
      type: "string",
      title: "Button Variant",
      description: "Visual style of the button",
      options: {
        list: [
          { title: "Primary", value: "default" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
          { title: "Destructive", value: "destructive" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "size",
      type: "string",
      title: "Button Size",
      description: "Size of the button",
      options: {
        list: [
          { title: "Small", value: "sm" },
          { title: "Medium", value: "default" },
          { title: "Large", value: "lg" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "fullWidth",
      type: "boolean",
      title: "Full Width",
      description: "Make the button take the full width of its container",
      initialValue: false,
    }),
    defineField({
      name: "alignment",
      type: "string",
      title: "Alignment",
      description: "How to align the button",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
      hidden: ({ parent }) => parent?.fullWidth,
    }),
  ],
  preview: {
    select: {
      text: "text",
      variant: "variant",
      size: "size",
      fullWidth: "fullWidth",
    },
    prepare({ text, variant, size, fullWidth }) {
      return {
        title: text || "Button",
        subtitle: `${variant} • ${size} ${fullWidth ? "• Full width" : ""}`,
        media: MousePointer,
      };
    },
  },
});
