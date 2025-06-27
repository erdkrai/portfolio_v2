import { defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    defineField({
      name: "linkType",
      type: "string",
      title: "Link Type",
      description: "Choose between manual URL or post reference",
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
      name: "title",
      type: "string",
      title: "Link Title",
      description: "Custom title for the link (optional for post references)",
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "Manual URL for external or custom links",
      hidden: ({ parent }) => parent?.linkType !== "manual",
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
      type: "boolean",
      title: "Open in new tab",
      description: "Only applies to manual URLs",
      hidden: ({ parent }) => parent?.linkType !== "manual",
    }),
    defineField({
      name: "buttonVariant",
      type: "button-variant",
      title: "Button Variant",
    }),
  ],
  preview: {
    select: {
      title: "title",
      linkType: "linkType",
      href: "href",
      pageTitle: "page.title",
      postTitle: "post.title",
    },
    prepare({ title, linkType, href, pageTitle, postTitle }) {
      let linkTitle = title;
      let linkTarget = "";
      
      switch (linkType) {
        case "page":
          linkTitle = linkTitle || pageTitle || "Untitled";
          linkTarget = pageTitle ? `Page: ${pageTitle}` : "Page (not selected)";
          break;
        case "post":
          linkTitle = linkTitle || postTitle || "Untitled";
          linkTarget = postTitle ? `Post: ${postTitle}` : "Post (not selected)";
          break;
        case "manual":
          linkTitle = linkTitle || "Untitled";
          linkTarget = href || "No URL";
          break;
        default:
          linkTitle = linkTitle || "Untitled";
          linkTarget = "No link type";
      }
      
      return {
        title: linkTitle,
        subtitle: linkTarget,
      };
    },
  },
});
