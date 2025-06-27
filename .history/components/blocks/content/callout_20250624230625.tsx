"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, CheckCircle, XCircle, Lightbulb, FileText, X } from "lucide-react";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Button } from "@/components/ui/button";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error" | "tip" | "note";
  title?: string;
  content?: any;
  dismissible?: boolean;
}

const calloutConfig = {
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-900 dark:text-blue-100",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    textColor: "text-yellow-900 dark:text-yellow-100",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-900 dark:text-green-100",
    iconColor: "text-green-600 dark:text-green-400",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-900 dark:text-red-100",
    iconColor: "text-red-600 dark:text-red-400",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    textColor: "text-purple-900 dark:text-purple-100",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  note: {
    icon: FileText,
    bgColor: "bg-gray-50 dark:bg-gray-950/20",
    borderColor: "border-gray-200 dark:border-gray-800",
    textColor: "text-gray-900 dark:text-gray-100",
    iconColor: "text-gray-600 dark:text-gray-400",
  },
};

export default function Callout({ 
  type = "info", 
  title, 
  content, 
  dismissible = false 
}: CalloutProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  
  if (isDismissed) return null;
  
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative rounded-lg border-l-4 p-4 my-4",
        config.bgColor,
        config.borderColor,
        config.textColor
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.iconColor)} />
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold text-sm mb-2">
              {title}
            </h4>
          )}
          
          {content && (
            <div className="text-sm">
              <PortableTextRenderer value={content} />
            </div>
          )}
        </div>
        
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className={cn(
              "h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10",
              config.textColor
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </div>
    </div>
  );
}
