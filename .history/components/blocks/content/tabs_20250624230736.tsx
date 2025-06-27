"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import * as LucideIcons from "lucide-react";

interface TabItem {
  label?: string;
  content?: any;
  icon?: string;
}

interface TabsProps {
  style?: "default" | "pills" | "underline";
  tabItems?: TabItem[];
  defaultTab?: number;
}

export default function Tabs({ 
  style = "default", 
  tabItems = [], 
  defaultTab = 1 
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab - 1); // Convert to 0-based index

  if (!tabItems || tabItems.length === 0) {
    return (
      <div className="p-4 border border-dashed border-gray-300 rounded-lg my-4 text-center text-gray-500">
        No tabs configured
      </div>
    );
  }

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    
    // Dynamically get the icon from Lucide React
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) return null;
    
    return <IconComponent className="h-4 w-4" />;
  };

  const styleClasses = {
    default: {
      container: "border border-border rounded-lg my-4",
      tabList: "flex border-b border-border bg-muted/30",
      tab: "px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50",
      activeTab: "bg-background border-b-2 border-primary text-primary",
      inactiveTab: "text-muted-foreground",
      content: "p-4",
    },
    pills: {
      container: "my-4",
      tabList: "flex gap-2 mb-4",
      tab: "px-4 py-2 text-sm font-medium rounded-full transition-colors hover:bg-muted/50",
      activeTab: "bg-primary text-primary-foreground",
      inactiveTab: "bg-muted text-muted-foreground",
      content: "p-4 border border-border rounded-lg",
    },
    underline: {
      container: "my-4",
      tabList: "flex border-b border-border mb-4",
      tab: "px-4 py-2 text-sm font-medium transition-colors hover:text-primary relative",
      activeTab: "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary",
      inactiveTab: "text-muted-foreground",
      content: "p-4",
    },
  };

  const currentStyle = styleClasses[style];

  return (
    <div className={currentStyle.container}>
      {/* Tab List */}
      <div className={currentStyle.tabList} role="tablist">
        {tabItems.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            onClick={() => setActiveTab(index)}
            className={cn(
              currentStyle.tab,
              activeTab === index ? currentStyle.activeTab : currentStyle.inactiveTab
            )}
          >
            <div className="flex items-center gap-2">
              {getIcon(tab.icon)}
              <span>{tab.label || `Tab ${index + 1}`}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={currentStyle.content}>
        {tabItems.map((tab, index) => (
          <div
            key={index}
            id={`tabpanel-${index}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            className={cn(
              activeTab === index ? "block" : "hidden"
            )}
          >
            {tab.content && <PortableTextRenderer value={tab.content} />}
          </div>
        ))}
      </div>
    </div>
  );
}
