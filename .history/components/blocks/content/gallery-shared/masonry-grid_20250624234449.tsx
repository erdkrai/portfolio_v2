"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MasonryGridProps {
  children: React.ReactNode[];
  columns?: string;
  spacing?: "tight" | "normal" | "relaxed" | "loose";
  className?: string;
}

const spacingClasses = {
  tight: "gap-1",
  normal: "gap-4",
  relaxed: "gap-6",
  loose: "gap-8",
};

const getColumnCount = (columns: string, width: number): number => {
  if (columns === "auto") {
    // Responsive column count based on screen width
    if (width < 640) return 1;      // mobile
    if (width < 768) return 2;      // sm
    if (width < 1024) return 2;     // md
    if (width < 1280) return 3;     // lg
    if (width < 1536) return 4;     // xl
    return 4;                       // 2xl+
  }
  
  return parseInt(columns, 10);
};

export default function MasonryGrid({
  children,
  columns = "auto",
  spacing = "normal",
  className,
}: MasonryGridProps) {
  const [columnCount, setColumnCount] = useState(3);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    
    const updateColumnCount = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setColumnCount(getColumnCount(columns, width));
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    
    return () => window.removeEventListener("resize", updateColumnCount);
  }, [columns]);

  // Server-side rendering fallback
  if (!isClient) {
    const fallbackColumns = columns === "auto" ? 3 : parseInt(columns, 10);
    return (
      <div 
        ref={containerRef}
        className={cn(
          "grid",
          `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${fallbackColumns}`,
          spacingClasses[spacing],
          className
        )}
      >
        {children}
      </div>
    );
  }

  // Create column arrays
  const columnArrays: React.ReactNode[][] = Array.from(
    { length: columnCount },
    () => []
  );

  // Distribute children across columns
  children.forEach((child, index) => {
    const columnIndex = index % columnCount;
    columnArrays[columnIndex].push(child);
  });

  const gapSize = {
    tight: 4,
    normal: 16,
    relaxed: 24,
    loose: 32,
  }[spacing];

  return (
    <div 
      ref={containerRef}
      className={cn("flex", className)}
      style={{ gap: `${gapSize}px` }}
    >
      {columnArrays.map((columnChildren, columnIndex) => (
        <div
          key={columnIndex}
          className="flex flex-col flex-1"
          style={{ gap: `${gapSize}px` }}
        >
          {columnChildren.map((child, childIndex) => (
            <div key={`${columnIndex}-${childIndex}`}>
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
