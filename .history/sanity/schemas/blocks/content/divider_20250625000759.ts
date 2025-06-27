import { defineField, defineType } from "sanity";
import { Minus } from "lucide-react";

const DIVIDER_STYLES = [
  { title: "Solid Line", value: "solid" },
  { title: "Dashed Line", value: "dashed" },
  { title: "Dotted Line", value: "dotted" },
  { title: "Double Line", value: "double" },
  { title: "Gradient Fade", value: "gradient" },
  { title: "Decorative", value: "decorative" },
];

const DIVIDER_THICKNESS = [
  { title: "Thin", value: "thin" },
  { title: "Normal", value: "normal" },
  { title: "Thick", value: "thick" },
  { title: "Extra Thick", value: "extra-thick" },
];

const DIVIDER_WIDTH = [
  { title: "Full Width", value: "full" },
  { title: "75% Width", value: "75" },
  { title: "50% Width", value: "50" },
  { title: "25% Width", value: "25" },
];

const DIVIDER_SPACING = [
  { title: "Small", value: "small" },
  { title: "Medium", value: "medium" },
  { title: "Large", value: "large" },
  { title: "Extra Large", value: "extra-large" },
];

export default defineType({
  name: "divider",
  title: "Divider",
  type: "object",
  icon: Minus,
  fields: [
    defineField({
      name: "style",
      type: "string",
      title: "Divider Style",
      description: "Choose the visual style of the divider",
      options: {
        list: DIVIDER_STYLES,
        layout: "radio",
      },
      initialValue: "solid",
    }),
    defineField({
      name: "thickness",
      type: "string",
      title: "Line Thickness",
      description: "Set the thickness of the divider line (not applicable for decorative style)",
      options: {
        list: DIVIDER_THICKNESS,
        layout: "radio",
      },
      initialValue: "normal",
    }),
    defineField({
      name: "width",
      type: "string",
      title: "Divider Width",
      description: "Set the width of the divider relative to container",
      options: {
        list: DIVIDER_WIDTH,
        layout: "radio",
      },
      initialValue: "full",
    }),
    defineField({
      name: "spacing",
      type: "string",
      title: "Vertical Spacing",
      description: "Set the space above and below the divider",
      options: {
        list: DIVIDER_SPACING,
        layout: "radio",
      },
      initialValue: "medium",
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Divider Color",
      description: "Choose the color theme for the divider",
      options: {
        list: [
          { title: "Default (Border)", value: "default" },
          { title: "Muted", value: "muted" },
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Accent", value: "accent" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "alignment",
      type: "string",
      title: "Alignment",
      description: "Align the divider within its container",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "center",
      hidden: ({ parent }) => parent?.width === "full",
    }),
    defineField({
      name: "decorativeIcon",
      type: "string",
      title: "Decorative Icon",
      description: "Choose an icon for decorative divider style",
      options: {
        list: [
          { title: "Star", value: "star" },
          { title: "Diamond", value: "diamond" },
          { title: "Circle", value: "circle" },
          { title: "Square", value: "square" },
          { title: "Heart", value: "heart" },
          { title: "Flower", value: "flower" },
          { title: "Asterisk", value: "asterisk" },
        ],
        layout: "dropdown",
      },
      initialValue: "star",
      hidden: ({ parent }) => parent?.style !== "decorative",
    }),
    defineField({
      name: "customText",
      type: "string",
      title: "Custom Text",
      description: "Add custom text in the center of the divider (optional)",
      validation: (rule) => rule.max(50).warning("Keep text short for better appearance"),
    }),
  ],
  preview: {
    select: {
      style: "style",
      width: "width",
      customText: "customText",
    },
    prepare({ style, width, customText }) {
      const styleLabel = DIVIDER_STYLES.find(s => s.value === style)?.title || style;
      const widthLabel = width === "full" ? "Full Width" : `${width}% Width`;
      
      return {
        title: "Divider",
        subtitle: customText 
          ? `${styleLabel} • ${widthLabel} • "${customText}"`
          : `${styleLabel} • ${widthLabel}`,
      };
    },
  },
});
