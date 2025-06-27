import { defineField, defineType } from "sanity";
import { Images } from "lucide-react";

const LAYOUT_OPTIONS = [
  { title: "Masonry (Pinterest Style)", value: "masonry" },
  { title: "Grid (Equal Heights)", value: "grid" },
  { title: "Carousel (Horizontal Scroll)", value: "carousel" },
  { title: "Justified Rows", value: "justified" },
];

const COLUMN_OPTIONS = [
  { title: "Auto (Responsive)", value: "auto" },
  { title: "2 Columns", value: "2" },
  { title: "3 Columns", value: "3" },
  { title: "4 Columns", value: "4" },
  { title: "5 Columns", value: "5" },
  { title: "6 Columns", value: "6" },
];

const SPACING_OPTIONS = [
  { title: "Tight", value: "tight" },
  { title: "Normal", value: "normal" },
  { title: "Relaxed", value: "relaxed" },
  { title: "Loose", value: "loose" },
];

const ASPECT_RATIO_OPTIONS = [
  { title: "Auto (Original)", value: "auto" },
  { title: "Square (1:1)", value: "square" },
  { title: "Landscape (16:9)", value: "landscape" },
  { title: "Portrait (3:4)", value: "portrait" },
];

export default defineType({
  name: "portfolio-gallery",
  title: "Portfolio Gallery",
  type: "object",
  icon: Images,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Gallery Title",
      description: "Optional title for the gallery",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Gallery Description",
      description: "Optional description for the gallery",
      rows: 3,
    }),
    defineField({
      name: "layout",
      type: "string",
      title: "Layout Style",
      description: "Choose how the gallery items are arranged",
      options: {
        list: LAYOUT_OPTIONS,
        layout: "radio",
      },
      initialValue: "masonry",
    }),
    defineField({
      name: "columns",
      type: "string",
      title: "Number of Columns",
      description: "Auto adjusts based on screen size, or set a fixed number",
      options: {
        list: COLUMN_OPTIONS,
        layout: "radio",
      },
      initialValue: "auto",
    }),
    defineField({
      name: "spacing",
      type: "string",
      title: "Item Spacing",
      description: "Space between gallery items",
      options: {
        list: SPACING_OPTIONS,
        layout: "radio",
      },
      initialValue: "normal",
    }),
    defineField({
      name: "aspectRatio",
      type: "string",
      title: "Aspect Ratio",
      description: "Force all images to a specific aspect ratio (grid layout only)",
      options: {
        list: ASPECT_RATIO_OPTIONS,
        layout: "radio",
      },
      initialValue: "auto",
      hidden: ({ parent }) => parent?.layout !== "grid",
    }),
    defineField({
      name: "enableLightbox",
      type: "boolean",
      title: "Enable Lightbox",
      description: "Allow full-screen viewing of images",
      initialValue: true,
    }),
    defineField({
      name: "enableCategories",
      type: "boolean",
      title: "Enable Category Filtering",
      description: "Show category filter buttons above the gallery",
      initialValue: false,
    }),
    defineField({
      name: "hoverEffect",
      type: "string",
      title: "Hover Effect",
      description: "Choose the hover interaction style",
      options: {
        list: [
          { title: "Overlay with Details", value: "overlay" },
          { title: "Scale & Shadow", value: "scale" },
          { title: "Fade & Zoom", value: "fade-zoom" },
          { title: "None", value: "none" },
        ],
        layout: "radio",
      },
      initialValue: "overlay",
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Gallery Items",
      description: "Add images and details for your portfolio gallery",
      of: [
        {
          type: "object",
          name: "galleryItem",
          title: "Gallery Item",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
              validation: (rule) => rule.required().error("Image is required"),
            }),
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Describe the image for accessibility",
              validation: (rule) => rule.required().error("Alt text is required for accessibility"),
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Item Title",
              description: "Title shown on hover or in lightbox",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
              description: "Description shown on hover or in lightbox",
              rows: 2,
            }),
            defineField({
              name: "category",
              type: "string",
              title: "Category",
              description: "Category for filtering (if enabled)",
              options: {
                list: [
                  { title: "Web Design", value: "web-design" },
                  { title: "Mobile App", value: "mobile-app" },
                  { title: "Branding", value: "branding" },
                  { title: "Photography", value: "photography" },
                  { title: "Illustration", value: "illustration" },
                  { title: "UI/UX", value: "ui-ux" },
                  { title: "Print Design", value: "print-design" },
                  { title: "Other", value: "other" },
                ],
              },
            }),
            defineField({
              name: "link",
              type: "object",
              title: "Project Link",
              description: "Optional link to project details or external site",
              fields: [
                defineField({
                  name: "linkType",
                  type: "string",
                  title: "Link Type",
                  options: {
                    list: [
                      { title: "Internal Page", value: "internal" },
                      { title: "External URL", value: "external" },
                    ],
                    layout: "radio",
                  },
                  initialValue: "external",
                }),
                defineField({
                  name: "internalLink",
                  type: "reference",
                  title: "Internal Page",
                  to: [{ type: "page" }, { type: "post" }],
                  hidden: ({ parent }) => parent?.linkType !== "internal",
                }),
                defineField({
                  name: "externalUrl",
                  type: "url",
                  title: "External URL",
                  hidden: ({ parent }) => parent?.linkType !== "external",
                  validation: (rule) =>
                    rule.uri({
                      scheme: ["http", "https"],
                    }),
                }),
                defineField({
                  name: "openInNewTab",
                  type: "boolean",
                  title: "Open in New Tab",
                  initialValue: true,
                  hidden: ({ parent }) => parent?.linkType !== "external",
                }),
              ],
            }),
            defineField({
              name: "featured",
              type: "boolean",
              title: "Featured Item",
              description: "Highlight this item (larger size in masonry layout)",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "category",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Gallery Item",
                subtitle: subtitle || "No category",
                media,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).error("Add at least one gallery item"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      itemCount: "items.length",
      layout: "layout",
      firstImage: "items.0.image",
    },
    prepare({ title, itemCount, layout, firstImage }) {
      return {
        title: title || "Portfolio Gallery",
        subtitle: `${itemCount || 0} items • ${layout || "masonry"} layout`,
        media: firstImage,
      };
    },
  },
});
