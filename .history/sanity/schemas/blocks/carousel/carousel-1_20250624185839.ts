import { defineField, defineType } from "sanity";
import { GalleryHorizontal } from "lucide-react";

export default defineType({
  name: "carousel-1",
  type: "object",
  title: "Carousel 1",
  icon: GalleryHorizontal,
  description: "A carousel of images",
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "size",
      type: "string",
      title: "Size",
      options: {
        list: [
          { title: "One", value: "one" },
          { title: "Two", value: "two" },
          { title: "Three", value: "three" },
        ],
        layout: "radio",
      },
      initialValue: "one",
    }),
    defineField({
      name: "indicators",
      type: "string",
      title: "Slide Indicators",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Dots", value: "dots" },
          { title: "Count", value: "count" },
        ],
        layout: "radio",
      },
      initialValue: "none",
      description: "Choose how to indicate carousel progress and position",
    }),
    defineField({
      name: "autoScroll",
      title: "Auto-Scroll Settings",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enable Auto-Scroll",
          type: "boolean",
          description: "Automatically advance slides",
          initialValue: false,
        }),
        defineField({
          name: "scrollType",
          title: "Scroll Type",
          type: "string",
          options: {
            list: [
              { title: "Slide by Slide", value: "discrete" },
              { title: "Continuous Smooth", value: "continuous" },
            ],
            layout: "radio",
          },
          initialValue: "discrete",
          description: "Choose between discrete slide changes or continuous smooth scrolling",
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: "interval",
          title: "Scroll Interval",
          type: "string",
          options: {
            list: [
              { title: "2 seconds", value: "2000" },
              { title: "3 seconds", value: "3000" },
              { title: "4 seconds", value: "4000" },
              { title: "5 seconds", value: "5000" },
              { title: "6 seconds", value: "6000" },
              { title: "8 seconds", value: "8000" },
              { title: "10 seconds", value: "10000" },
            ],
            layout: "dropdown",
          },
          initialValue: "4000",
          description: "Time between slide changes (discrete) or speed of continuous scroll",
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: "continuousSpeed",
          title: "Continuous Scroll Speed",
          type: "string",
          options: {
            list: [
              { title: "Very Slow", value: "60000" },
              { title: "Slow", value: "40000" },
              { title: "Medium", value: "30000" },
              { title: "Fast", value: "20000" },
              { title: "Very Fast", value: "15000" },
            ],
            layout: "dropdown",
          },
          initialValue: "30000",
          description: "Speed of continuous scrolling (time to complete one full cycle)",
          hidden: ({ parent }) => !parent?.enabled || parent?.scrollType !== "continuous",
        }),
        defineField({
          name: "pauseOnHover",
          title: "Pause on Hover",
          type: "boolean",
          description: "Pause auto-scroll when user hovers over carousel",
          initialValue: true,
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: "stopOnInteraction",
          title: "Stop on Manual Navigation",
          type: "boolean",
          description: "Stop auto-scroll permanently after user manually navigates",
          initialValue: false,
          hidden: ({ parent }) => !parent?.enabled,
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "images.0.alt",
    },
    prepare({ title }) {
      return {
        title: "Carousel",
        subtitle: title,
      };
    },
  },
});
