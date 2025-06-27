import { defineField, defineType, defineArrayMember } from "sanity";
import { Layout } from "lucide-react";

export default defineType({
  name: "tabs",
  type: "object",
  title: "Tabs",
  icon: Layout,
  description: "Organize content into tabbed sections",
  fields: [
    defineField({
      name: "style",
      type: "string",
      title: "Tab Style",
      description: "Visual style of the tabs",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Pills", value: "pills" },
          { title: "Underline", value: "underline" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "tabItems",
      type: "array",
      title: "Tab Items",
      description: "The individual tabs and their content",
      of: [
        defineArrayMember({
          type: "object",
          name: "tabItem",
          title: "Tab Item",
          fields: [
            defineField({
              name: "label",
              type: "string",
              title: "Tab Label",
              description: "The text shown on the tab",
              validation: (Rule) => Rule.required().error("Tab label is required"),
            }),
            defineField({
              name: "content",
              type: "block-content",
              title: "Tab Content",
              description: "The content shown when this tab is active",
            }),
            defineField({
              name: "icon",
              type: "string",
              title: "Icon (Optional)",
              description: "Optional icon name from Lucide React (e.g., 'code', 'settings')",
            }),
          ],
          preview: {
            select: {
              title: "label",
              icon: "icon",
            },
            prepare({ title, icon }) {
              return {
                title: title || "Tab",
                subtitle: icon ? `Icon: ${icon}` : "No icon",
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(2).error("At least 2 tabs are required"),
    }),
    defineField({
      name: "defaultTab",
      type: "number",
      title: "Default Active Tab",
      description: "Which tab should be active by default (starting from 1)",
      initialValue: 1,
      validation: (Rule) => Rule.min(1).error("Must be at least 1"),
    }),
  ],
  preview: {
    select: {
      tabItems: "tabItems",
      style: "style",
    },
    prepare({ tabItems, style }) {
      const tabCount = tabItems?.length || 0;
      const tabLabels = tabItems?.map((tab: any) => tab.label).join(", ") || "";
      
      return {
        title: `Tabs (${tabCount} tabs)`,
        subtitle: `${style} style • ${tabLabels.slice(0, 50)}${tabLabels.length > 50 ? "..." : ""}`,
        media: Tabs,
      };
    },
  },
});
