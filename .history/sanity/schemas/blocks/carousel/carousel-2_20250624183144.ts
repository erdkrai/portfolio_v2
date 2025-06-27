import { defineField, defineType } from "sanity";
import { Quote } from "lucide-react";

export default defineType({
  name: "carousel-2",
  type: "object",
  title: "Carousel 2",
  icon: Quote,
  description: "A carousel of testimonials",
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
          initialValue: "5000",
          description: "Time between automatic slide changes",
          hidden: ({ parent }) => !parent?.enabled,
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
      name: "testimonial",
      type: "array",
      of: [
        {
          name: "testimonial",
          type: "reference",
          to: [{ type: "testimonial" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "testimonial.0.name",
    },
    prepare({ title }) {
      return {
        title: "Testimonials Carousel",
        subtitle: title,
      };
    },
  },
});
