"use client";

import { stegaClean } from "next-sanity";
import { cn } from "@/lib/utils";
import { 
  Star, 
  Diamond, 
  Circle, 
  Square, 
  Heart, 
  Flower, 
  Asterisk 
} from "lucide-react";

interface DividerProps {
  style: "solid" | "dashed" | "dotted" | "double" | "gradient" | "decorative";
  thickness: "thin" | "normal" | "thick" | "extra-thick";
  width: "full" | "75" | "50" | "25";
  spacing: "small" | "medium" | "large" | "extra-large";
  color: "default" | "muted" | "primary" | "secondary" | "accent";
  alignment: "left" | "center" | "right";
  decorativeIcon?: "star" | "diamond" | "circle" | "square" | "heart" | "flower" | "asterisk";
  customText?: string;
}

const spacingClasses = {
  small: "my-4",
  medium: "my-8",
  large: "my-12",
  "extra-large": "my-16",
};

const widthClasses = {
  full: "w-full",
  "75": "w-3/4",
  "50": "w-1/2",
  "25": "w-1/4",
};

const alignmentClasses = {
  left: "mx-0",
  center: "mx-auto",
  right: "ml-auto mr-0",
};

const thicknessClasses = {
  thin: "h-px",
  normal: "h-0.5",
  thick: "h-1",
  "extra-thick": "h-2",
};

const colorClasses = {
  default: "border-border bg-border",
  muted: "border-muted-foreground/20 bg-muted-foreground/20",
  primary: "border-primary bg-primary",
  secondary: "border-secondary bg-secondary",
  accent: "border-accent bg-accent",
};

const styleClasses = {
  solid: "border-solid",
  dashed: "border-dashed border-t-2",
  dotted: "border-dotted border-t-2",
  double: "border-double border-t-4",
  gradient: "",
  decorative: "",
};

const iconComponents = {
  star: Star,
  diamond: Diamond,
  circle: Circle,
  square: Square,
  heart: Heart,
  flower: Flower,
  asterisk: Asterisk,
};

export default function Divider({
  style,
  thickness,
  width,
  spacing,
  color,
  alignment,
  decorativeIcon = "star",
  customText,
}: DividerProps) {
  // Clean Sanity data
  const cleanStyle = stegaClean(style);
  const cleanThickness = stegaClean(thickness);
  const cleanWidth = stegaClean(width);
  const cleanSpacing = stegaClean(spacing);
  const cleanColor = stegaClean(color);
  const cleanAlignment = stegaClean(alignment);
  const cleanDecorativeIcon = stegaClean(decorativeIcon);
  const cleanCustomText = stegaClean(customText);

  // Gradient divider
  if (cleanStyle === "gradient") {
    return (
      <div className={cn("flex items-center", spacingClasses[cleanSpacing])}>
        <div className={cn(
          "h-px bg-gradient-to-r from-transparent via-border to-transparent",
          widthClasses[cleanWidth],
          alignmentClasses[cleanAlignment]
        )} />
      </div>
    );
  }

  // Decorative divider with icon
  if (cleanStyle === "decorative") {
    const IconComponent = iconComponents[cleanDecorativeIcon];
    
    return (
      <div className={cn(
        "flex items-center",
        spacingClasses[cleanSpacing],
        cleanWidth !== "full" && alignmentClasses[cleanAlignment]
      )}>
        <div className={cn(
          "flex items-center gap-4",
          widthClasses[cleanWidth],
          cleanWidth !== "full" && alignmentClasses[cleanAlignment]
        )}>
          <div className={cn("flex-1 h-px", colorClasses[cleanColor])} />
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full",
            "bg-background border-2",
            colorClasses[cleanColor].replace("bg-", "border-")
          )}>
            <IconComponent className={cn(
              "w-4 h-4",
              colorClasses[cleanColor].replace("bg-", "text-").replace("border-", "text-")
            )} />
          </div>
          <div className={cn("flex-1 h-px", colorClasses[cleanColor])} />
        </div>
      </div>
    );
  }

  // Text divider
  if (cleanCustomText) {
    return (
      <div className={cn(
        "flex items-center",
        spacingClasses[cleanSpacing],
        cleanWidth !== "full" && alignmentClasses[cleanAlignment]
      )}>
        <div className={cn(
          "flex items-center gap-4",
          widthClasses[cleanWidth],
          cleanWidth !== "full" && alignmentClasses[cleanAlignment]
        )}>
          <div className={cn(
            "flex-1",
            cleanStyle === "solid" ? thicknessClasses[cleanThickness] : "h-0.5 border-t-2",
            colorClasses[cleanColor],
            styleClasses[cleanStyle]
          )} />
          <span className={cn(
            "px-4 py-1 text-sm font-medium bg-background",
            colorClasses[cleanColor].replace("bg-", "text-").replace("border-", "text-")
          )}>
            {cleanCustomText}
          </span>
          <div className={cn(
            "flex-1",
            cleanStyle === "solid" ? thicknessClasses[cleanThickness] : "h-0.5 border-t-2",
            colorClasses[cleanColor],
            styleClasses[cleanStyle]
          )} />
        </div>
      </div>
    );
  }

  // Standard divider
  return (
    <div className={cn("flex", spacingClasses[cleanSpacing])}>
      <div className={cn(
        cleanStyle === "solid" ? thicknessClasses[cleanThickness] : "h-0.5 border-t-2",
        widthClasses[cleanWidth],
        alignmentClasses[cleanAlignment],
        colorClasses[cleanColor],
        styleClasses[cleanStyle]
      )} />
    </div>
  );
}
