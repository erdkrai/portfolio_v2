"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  layout?: "masonry" | "grid" | "carousel" | "justified";
  columns?: string;
  spacing?: "tight" | "normal" | "relaxed" | "loose";
  itemCount?: number;
}

const spacingClasses = {
  tight: "gap-1",
  normal: "gap-4",
  relaxed: "gap-6",
  loose: "gap-8",
};

const getColumnClasses = (columns: string) => {
  switch (columns) {
    case "2":
      return "grid-cols-1 sm:grid-cols-2";
    case "3":
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    case "4":
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    case "5":
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
    case "6":
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6";
    default: // auto
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
};

const SkeletonItem = ({ 
  height, 
  className 
}: { 
  height?: string; 
  className?: string; 
}) => (
  <div className={cn("relative overflow-hidden rounded-lg bg-muted", className)}>
    <div 
      className="w-full animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted"
      style={{ height: height || "200px" }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
  </div>
);

export default function LoadingSkeleton({
  layout = "masonry",
  columns = "auto",
  spacing = "normal",
  itemCount = 6,
}: LoadingSkeletonProps) {
  const items = Array.from({ length: itemCount }, (_, i) => i);

  if (layout === "carousel") {
    return (
      <div className="w-full overflow-hidden">
        <div className={cn("flex", spacingClasses[spacing])}>
          {items.map((i) => (
            <SkeletonItem
              key={i}
              height="300px"
              className="min-w-[280px] flex-shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (layout === "masonry") {
    // For masonry, we'll use a grid with varying heights
    const heights = ["200px", "300px", "250px", "350px", "180px", "280px"];
    
    return (
      <div className={cn(
        "grid",
        getColumnClasses(columns),
        spacingClasses[spacing]
      )}>
        {items.map((i) => (
          <SkeletonItem
            key={i}
            height={heights[i % heights.length]}
          />
        ))}
      </div>
    );
  }

  // Grid and justified layouts use consistent heights
  return (
    <div className={cn(
      "grid",
      getColumnClasses(columns),
      spacingClasses[spacing]
    )}>
      {items.map((i) => (
        <SkeletonItem
          key={i}
          height={layout === "justified" ? "250px" : "300px"}
        />
      ))}
    </div>
  );
}
