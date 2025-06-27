import { defineField, defineType } from "sanity";
import { Navigation } from "lucide-react";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon: Navigation,
  groups: [
    {
      name: "behavior",
      title: "Behavior",
      default: true,
    },
    {
      name: "appearance",
      title: "Appearance",
    },
    {
      name: "logo",
      title: "Logo",
    },
    {
      name: "navigation",
      title: "Navigation",
    },
    {
      name: "mobile",
      title: "Mobile",
    },
  ],
  fields: [
    defineField({
      name: "isSticky",
      title: "Enable Sticky Navigation",
      type: "boolean",
      description: "Make the navigation bar stick to the top when scrolling",
      initialValue: true,
      group: "behavior",
    }),
    defineField({
      name: "stickyBehavior",
      title: "Sticky Behavior",
      type: "string",
      options: {
        list: [
          { title: "Always Visible", value: "always" },
          { title: "Hide on Scroll Down", value: "scroll-down" },
          { title: "Show on Scroll Up", value: "scroll-up" },
        ],
        layout: "radio",
      },
      initialValue: "always",
      hidden: ({ parent }) => !parent?.isSticky,
      group: "behavior",
    }),
    defineField({
      name: "backgroundStyle",
      title: "Background Style",
      type: "string",
      options: {
        list: [
          { title: "Solid Background", value: "solid" },
          { title: "Transparent", value: "transparent" },
          { title: "Blur Effect", value: "blur" },
          { title: "Gradient", value: "gradient" },
        ],
        layout: "radio",
      },
      initialValue: "blur",
      group: "appearance",
    }),
    defineField({
      name: "height",
      title: "Navigation Height",
      type: "string",
      options: {
        list: [
          { title: "Compact", value: "compact" },
          { title: "Normal", value: "normal" },
          { title: "Large", value: "large" },
        ],
        layout: "radio",
      },
      initialValue: "normal",
      group: "appearance",
    }),
    defineField({
      name: "showBorder",
      title: "Show Bottom Border",
      type: "boolean",
      description: "Display a border at the bottom of the navigation",
      initialValue: true,
      group: "appearance",
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
      group: "logo",
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
      group: "logo",
    }),
    defineField({
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: "Text to display as logo",
      hidden: ({ parent }) => parent?.logoType !== "text",
      group: "logo",
    }),
    defineField({
      name: "navigationLinks",
      title: "Navigation Links",
      type: "array",
      of: [{ type: "navigation-link" }],
      group: "navigation",
    }),
    defineField({
      name: "showThemeToggle",
      title: "Show Theme Toggle",
      type: "boolean",
      description: "Display the dark/light mode toggle button",
      initialValue: true,
      group: "navigation",
    }),
    defineField({
      name: "mobileBreakpoint",
      title: "Mobile Breakpoint",
      type: "string",
      options: {
        list: [
          { title: "Small (640px)", value: "sm" },
          { title: "Medium (768px)", value: "md" },
          { title: "Large (1024px)", value: "lg" },
          { title: "Extra Large (1280px)", value: "xl" },
        ],
      },
      initialValue: "xl",
      description: "Screen size where mobile navigation appears",
      group: "mobile",
    }),
    defineField({
      name: "showMobileMenu",
      title: "Show Mobile Menu",
      type: "boolean",
      description: "Enable mobile hamburger menu",
      initialValue: true,
      group: "mobile",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Header Configuration",
        subtitle: "Navigation and header settings",
      };
    },
  },
});
