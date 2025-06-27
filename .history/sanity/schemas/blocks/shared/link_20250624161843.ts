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
      postTitle: "post.title",
    },
    prepare({ title, linkType, href, postTitle }) {
      const linkTitle = title || (linkType === "post" ? postTitle : "Untitled");
      const linkTarget = linkType === "post" ? `Post: ${postTitle}` : href || "No URL";
      
      return {
        title: linkTitle,
        subtitle: linkTarget,
      };
    },
  },
});
