import { defineField, defineType } from "sanity";
import { AlertTriangle, Info, CheckCircle, XCircle, Lightbulb, FileText } from "lucide-react";

export default defineType({
  name: "callout",
  type: "object",
  title: "Callout",
  icon: Info,
  description: "A highlighted box for important information, warnings, tips, etc.",
  fields: [
    defineField({
      name: "type",
      type: "string",
      title: "Callout Type",
      description: "Choose the type of callout",
      options: {
        list: [
          { title: "Info", value: "info", icon: Info },
          { title: "Warning", value: "warning", icon: AlertTriangle },
          { title: "Success", value: "success", icon: CheckCircle },
          { title: "Error", value: "error", icon: XCircle },
          { title: "Tip", value: "tip", icon: Lightbulb },
          { title: "Note", value: "note", icon: FileText },
        ],
        layout: "radio",
      },
      initialValue: "info",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Optional title for the callout",
    }),
    defineField({
      name: "content",
      type: "block-content",
      title: "Content",
      description: "The main content of the callout",
    }),
    defineField({
      name: "dismissible",
      type: "boolean",
      title: "Dismissible",
      description: "Allow users to dismiss this callout",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      content: "content",
    },
    prepare({ title, type, content }) {
      const typeLabels = {
        info: "ℹ️ Info",
        warning: "⚠️ Warning", 
        success: "✅ Success",
        error: "❌ Error",
        tip: "💡 Tip",
        note: "📝 Note",
      };
      
      return {
        title: title || typeLabels[type as keyof typeof typeLabels] || "Callout",
        subtitle: content ? `${content[0]?.children?.[0]?.text?.slice(0, 60)}...` : "No content",
        media: type === "info" ? Info : 
               type === "warning" ? AlertTriangle :
               type === "success" ? CheckCircle :
               type === "error" ? XCircle :
               type === "tip" ? Lightbulb : FileText,
      };
    },
  },
});
