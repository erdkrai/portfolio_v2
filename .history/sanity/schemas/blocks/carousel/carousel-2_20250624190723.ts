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
              { title: "0.5 seconds", value: "500" },
              { title: "1 second", value: "1000" },
              { title: "1.5 seconds", value: "1500" },
              { title: "2 seconds", value: "2000" },
              { title: "2.5 seconds", value: "2500" },
              { title: "3 seconds", value: "3000" },
              { title: "4 seconds", value: "4000" },
            ],
            layout: "dropdown",
          },
          initialValue: "2500",
          description: "Time between slide changes (discrete) or speed of continuous scroll",
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: "continuousSpeed",
          title: "Continuous Scroll Speed",
          type: "string",
          options: {
            list: [
              { title: "Very Fast", value: "8000" },
              { title: "Fast", value: "12000" },
              { title: "Medium", value: "16000" },
              { title: "Slow", value: "20000" },
              { title: "Very Slow", value: "25000" },
            ],
            layout: "dropdown",
          },
          initialValue: "20000",
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
