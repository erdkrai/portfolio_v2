import { defineField, defineType, defineArrayMember } from "sanity";
import { Table } from "lucide-react";

export default defineType({
  name: "table",
  type: "object",
  title: "Table",
  icon: Table,
  description: "A responsive table with sorting and formatting options",
  fields: [
    defineField({
      name: "caption",
      type: "string",
      title: "Table Caption",
      description: "Optional caption/title for the table",
    }),
    defineField({
      name: "headers",
      type: "array",
      title: "Table Headers",
      description: "Column headers for the table",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableHeader",
          title: "Header",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Header Title",
              validation: (Rule) => Rule.required().error("Header title is required"),
            }),
            defineField({
              name: "width",
              type: "string",
              title: "Column Width",
              description: "CSS width value (e.g., '200px', '25%', 'auto')",
              initialValue: "auto",
            }),
            defineField({
              name: "alignment",
              type: "string",
              title: "Text Alignment",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Center", value: "center" },
                  { title: "Right", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "left",
            }),
            defineField({
              name: "sortable",
              type: "boolean",
              title: "Sortable",
              description: "Allow sorting by this column",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "title",
              alignment: "alignment",
              sortable: "sortable",
            },
            prepare({ title, alignment, sortable }) {
              return {
                title: title || "Header",
                subtitle: `${alignment} aligned${sortable ? " • Sortable" : ""}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error("At least one header is required"),
    }),
    defineField({
      name: "rows",
      type: "array",
      title: "Table Rows",
      description: "Data rows for the table",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          title: "Row",
          fields: [
            defineField({
              name: "cells",
              type: "array",
              title: "Row Cells",
              description: "Cell data for this row",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "tableCell",
                  title: "Cell",
                  fields: [
                    defineField({
                      name: "content",
                      type: "string",
                      title: "Cell Content",
                      description: "Text content for this cell",
                    }),
                    defineField({
                      name: "type",
                      type: "string",
                      title: "Cell Type",
                      description: "Type of content in this cell",
                      options: {
                        list: [
                          { title: "Text", value: "text" },
                          { title: "Number", value: "number" },
                          { title: "Code", value: "code" },
                          { title: "Link", value: "link" },
                          { title: "Badge", value: "badge" },
                        ],
                        layout: "dropdown",
                      },
                      initialValue: "text",
                    }),
                    defineField({
                      name: "link",
                      type: "link",
                      title: "Link",
                      description: "Link for this cell (when type is 'link')",
                      hidden: ({ parent }) => parent?.type !== "link",
                    }),
                    defineField({
                      name: "badgeVariant",
                      type: "string",
                      title: "Badge Variant",
                      description: "Style variant for badge cells",
                      options: {
                        list: [
                          { title: "Default", value: "default" },
                          { title: "Secondary", value: "secondary" },
                          { title: "Success", value: "success" },
                          { title: "Warning", value: "warning" },
                          { title: "Error", value: "destructive" },
                        ],
                        layout: "dropdown",
                      },
                      initialValue: "default",
                      hidden: ({ parent }) => parent?.type !== "badge",
                    }),
                  ],
                  preview: {
                    select: {
                      content: "content",
                      type: "type",
                    },
                    prepare({ content, type }) {
                      return {
                        title: content || "Empty cell",
                        subtitle: type || "text",
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              cells: "cells",
            },
            prepare({ cells }) {
              const cellCount = cells?.length || 0;
              const firstCell = cells?.[0]?.content || "";
              return {
                title: `Row (${cellCount} cells)`,
                subtitle: firstCell ? `Starts with: ${firstCell.slice(0, 30)}...` : "Empty row",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "style",
      type: "string",
      title: "Table Style",
      description: "Visual style of the table",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Striped", value: "striped" },
          { title: "Bordered", value: "bordered" },
          { title: "Minimal", value: "minimal" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "size",
      type: "string",
      title: "Table Size",
      description: "Size/density of the table",
      options: {
        list: [
          { title: "Compact", value: "sm" },
          { title: "Default", value: "default" },
          { title: "Large", value: "lg" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "responsive",
      type: "boolean",
      title: "Responsive",
      description: "Make table horizontally scrollable on small screens",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      caption: "caption",
      headers: "headers",
      rows: "rows",
      style: "style",
    },
    prepare({ caption, headers, rows, style }) {
      const headerCount = headers?.length || 0;
      const rowCount = rows?.length || 0;
      
      return {
        title: caption || `Table (${headerCount} columns)`,
        subtitle: `${rowCount} rows • ${style} style`,
        media: Table,
      };
    },
  },
});
