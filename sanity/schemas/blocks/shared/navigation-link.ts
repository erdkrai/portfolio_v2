import { defineField, defineType } from "sanity";
import { Link } from "lucide-react";

export default defineType({
  name: "navigation-link",
  type: "object",
  title: "Navigation Link",
  icon: Link,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Text displayed for the navigation item",
    }),
    defineField({
      name: "linkType",
      type: "string",
      title: "Link Type",
      description: "Choose how to link this navigation item",
      options: {
        list: [
          { title: "Manual URL", value: "manual" },
          { title: "Page Reference", value: "page" },
          { title: "Post Reference", value: "post" },
          { title: "No Link (Submenu Only)", value: "none" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
      hidden: ({ parent }) => parent?.submenuItems && parent.submenuItems.length > 0,
      readOnly: ({ parent }) => parent?.submenuItems && parent.submenuItems.length > 0,
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "Manual URL for external or custom links",
      hidden: ({ parent }) => 
        parent?.linkType !== "manual" || 
        (parent?.submenuItems && parent.submenuItems.length > 0),
      validation: (rule) => 
        rule.custom((value, context) => {
          const parent = context.parent as any;
          if (parent?.linkType === "manual" && !value && (!parent?.submenuItems || parent.submenuItems.length === 0)) {
            return "URL is required for manual links without submenu items";
          }
          return true;
        }),
    }),
    defineField({
      name: "page",
      type: "reference",
      title: "Page",
      description: "Select a page to link to",
      to: [{ type: "page" }],
      hidden: ({ parent }) => 
        parent?.linkType !== "page" || 
        (parent?.submenuItems && parent.submenuItems.length > 0),
    }),
    defineField({
      name: "post",
      type: "reference",
      title: "Post",
      description: "Select a post to link to",
      to: [{ type: "post" }],
      hidden: ({ parent }) => 
        parent?.linkType !== "post" || 
        (parent?.submenuItems && parent.submenuItems.length > 0),
    }),
    defineField({
      name: "target",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
      description: "Only applies to manual URLs",
      hidden: ({ parent }) => 
        parent?.linkType !== "manual" || 
        (parent?.submenuItems && parent.submenuItems.length > 0),
    }),
    defineField({
      name: "submenuItems",
      title: "Submenu Items",
      type: "array",
      description: "Add submenu items for dropdown navigation",
      of: [
        {
          type: "object",
          title: "Submenu Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "linkType",
              type: "string",
              title: "Link Type",
              options: {
                list: [
                  { title: "Manual URL", value: "manual" },
                  { title: "Page Reference", value: "page" },
                  { title: "Post Reference", value: "post" },
                ],
                layout: "radio",
              },
              initialValue: "manual",
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              description: "Manual URL for external or custom links",
              hidden: ({ parent }) => parent?.linkType !== "manual",
              validation: (rule) => 
                rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.linkType === "manual" && !value) {
                    return "URL is required for manual links";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "page",
              type: "reference",
              title: "Page",
              description: "Select a page to link to",
              to: [{ type: "page" }],
              hidden: ({ parent }) => parent?.linkType !== "page",
            }),
            defineField({
              name: "post",
              type: "reference",
              title: "Post",
              description: "Select a post to link to",
              to: [{ type: "post" }],
              hidden: ({ parent }) => parent?.linkType !== "post",
            }),
            defineField({
              name: "target",
              title: "Open in new tab",
              type: "boolean",
              initialValue: false,
              description: "Only applies to manual URLs",
              hidden: ({ parent }) => parent?.linkType !== "manual",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
              description: "Optional description for the submenu item",
            }),
          ],
          preview: {
            select: {
              title: "label",
              linkType: "linkType",
              href: "href",
              pageTitle: "page.title",
              postTitle: "post.title",
            },
            prepare({ title, linkType, href, pageTitle, postTitle }) {
              let subtitle = "";
              switch (linkType) {
                case "page":
                  subtitle = pageTitle ? `Page: ${pageTitle}` : "Page (not selected)";
                  break;
                case "post":
                  subtitle = postTitle ? `Post: ${postTitle}` : "Post (not selected)";
                  break;
                case "manual":
                  subtitle = href || "No URL";
                  break;
                default:
                  subtitle = "No link type";
              }
              
              return {
                title,
                subtitle,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "label",
      linkType: "linkType",
      href: "href",
      pageTitle: "page.title",
      postTitle: "post.title",
      submenuCount: "submenuItems",
    },
    prepare({ title, linkType, href, pageTitle, postTitle, submenuCount }) {
      const count = submenuCount?.length || 0;
      let subtitle = "";
      
      if (count > 0) {
        subtitle = `${count} submenu items`;
      } else {
        switch (linkType) {
          case "page":
            subtitle = pageTitle ? `Page: ${pageTitle}` : "Page (not selected)";
            break;
          case "post":
            subtitle = postTitle ? `Post: ${postTitle}` : "Post (not selected)";
            break;
          case "manual":
            subtitle = href || "No URL";
            break;
          case "none":
            subtitle = "No link (submenu only)";
            break;
          default:
            subtitle = "No link type";
        }
      }
      
      return {
        title,
        subtitle,
      };
    },
  },
});
