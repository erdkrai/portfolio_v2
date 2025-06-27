"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import PortableTextRenderer from "@/components/portable-text-renderer";

interface ToggleProps {
  title?: string;
  content?: any;
  defaultOpen?: boolean;
  style?: "default" | "bordered" | "minimal";
}

export default function Toggle({ 
  title, 
  content, 
  defaultOpen = false, 
  style = "default" 
}: ToggleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const styleClasses = {
    default: {
      container: "border border-border rounded-lg my-4",
      header: "p-4 hover:bg-muted/50 transition-colors",
      content: "px-4 pb-4",
    },
    bordered: {
      container: "border-2 border-border rounded-lg my-4 shadow-sm",
      header: "p-4 bg-muted/30 hover:bg-muted/50 transition-colors",
      content: "px-4 pb-4 bg-background",
    },
    minimal: {
      container: "my-4",
      header: "py-2 hover:bg-muted/30 transition-colors rounded",
      content: "pt-2",
    },
  };

  const currentStyle = styleClasses[style];

  return (
    <div className={currentStyle.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between text-left",
          currentStyle.header
        )}
        aria-expanded={isOpen}
        aria-controls="toggle-content"
      >
        <h4 className="font-semibold text-base">
          {title || "Toggle Section"}
        </h4>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-200 flex-shrink-0 ml-2",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      <div
        id="toggle-content"
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={currentStyle.content}>
          {content && <PortableTextRenderer value={content} />}
        </div>
      </div>
    </div>
  );
}
