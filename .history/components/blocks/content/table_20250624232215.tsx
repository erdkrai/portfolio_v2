"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/components/hooks/use-navigation";

interface TableCell {
  content?: string;
  type?: "text" | "number" | "code" | "link" | "badge";
  link?: {
    linkType?: string;
    title?: string;
    href?: string;
    target?: boolean;
    page?: {
      title?: string;
      slug?: {
        current?: string;
      };
    };
    post?: {
      title?: string;
      slug?: {
        current?: string;
      };
    };
  };
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "destructive";
}

interface TableRow {
  cells?: TableCell[];
}

interface TableHeader {
  title?: string;
  width?: string;
  alignment?: "left" | "center" | "right";
  sortable?: boolean;
}

interface TableProps {
  caption?: string;
  headers?: TableHeader[];
  rows?: TableRow[];
  style?: "default" | "striped" | "bordered" | "minimal";
  size?: "sm" | "default" | "lg";
  responsive?: boolean;
}

type SortDirection = "asc" | "desc" | null;

export default function Table({
  caption,
  headers = [],
  rows = [],
  style = "default",
  size = "default",
  responsive = true,
}: TableProps) {
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const { navigateTo } = useNavigation();

  // Sort rows based on current sort column and direction
  const sortedRows = [...rows].sort((a, b) => {
    if (sortColumn === null || sortDirection === null) return 0;
    
    const aCell = a.cells?.[sortColumn];
    const bCell = b.cells?.[sortColumn];
    const aValue = aCell?.content || "";
    const bValue = bCell?.content || "";
    
    // Handle different cell types
    if (aCell?.type === "number" && bCell?.type === "number") {
      const aNum = parseFloat(aValue) || 0;
      const bNum = parseFloat(bValue) || 0;
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }
    
    // Default string comparison
    const comparison = aValue.localeCompare(bValue);
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSort = (columnIndex: number) => {
    const header = headers[columnIndex];
    if (!header?.sortable) return;

    if (sortColumn === columnIndex) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(columnIndex);
      setSortDirection("asc");
    }
  };

  const renderCell = (cell: TableCell, header: TableHeader) => {
    const content = cell.content || "";
    const alignment = header.alignment || "left";
    
    const cellClasses = cn(
      "text-sm",
      alignment === "center" && "text-center",
      alignment === "right" && "text-right"
    );

    switch (cell.type) {
      case "number":
        return <span className={cn(cellClasses, "font-mono")}>{content}</span>;
      
      case "code":
        return (
          <code className={cn(cellClasses, "bg-muted px-1.5 py-0.5 rounded text-xs font-mono")}>
            {content}
          </code>
        );
      
      case "link":
        const linkType = cell.link?.linkType;
        let href = "#";
        let target: string | undefined;

        switch (linkType) {
          case "page":
            href = cell.link?.page?.slug?.current ? `/${cell.link.page.slug.current}` : "#";
            break;
          case "post":
            href = cell.link?.post?.slug?.current ? `/blog/${cell.link.post.slug.current}` : "#";
            break;
          case "manual":
            href = cell.link?.href || "#";
            target = cell.link?.target ? "_blank" : undefined;
            break;
        }

        return (
          <button
            onClick={() => navigateTo(href, target)}
            className={cn(cellClasses, "text-primary hover:underline")}
            disabled={href === "#"}
          >
            {content}
          </button>
        );
      
      case "badge":
        return (
          <Badge variant={cell.badgeVariant} className="text-xs">
            {content}
          </Badge>
        );
      
      default:
        return <span className={cellClasses}>{content}</span>;
    }
  };

  const getSortIcon = (columnIndex: number) => {
    if (!headers[columnIndex]?.sortable) return null;
    
    if (sortColumn === columnIndex) {
      return sortDirection === "asc" ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      );
    }
    
    return <ArrowUpDown className="h-4 w-4 opacity-50" />;
  };

  const tableStyles = {
    default: "border border-border",
    striped: "border border-border",
    bordered: "border-2 border-border",
    minimal: "",
  };

  const sizeStyles = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-base",
  };

  const cellPadding = {
    sm: "px-2 py-1",
    default: "px-3 py-2",
    lg: "px-4 py-3",
  };

  if (headers.length === 0 || rows.length === 0) {
    return (
      <div className="p-4 border border-dashed border-gray-300 rounded-lg my-4 text-center text-gray-500">
        No table data configured
      </div>
    );
  }

  const tableContent = (
    <table className={cn("w-full", sizeStyles[size], tableStyles[style])}>
      {caption && (
        <caption className="mb-2 text-sm font-medium text-muted-foreground">
          {caption}
        </caption>
      )}
      
      <thead>
        <tr className={cn(style === "bordered" && "border-b-2 border-border")}>
          {headers.map((header, index) => (
            <th
              key={index}
              className={cn(
                cellPadding[size],
                "font-semibold text-left bg-muted/50",
                header.alignment === "center" && "text-center",
                header.alignment === "right" && "text-right",
                header.sortable && "cursor-pointer hover:bg-muted/70 transition-colors",
                style === "bordered" && "border-r border-border last:border-r-0"
              )}
              style={{ width: header.width !== "auto" ? header.width : undefined }}
              onClick={() => handleSort(index)}
            >
              <div className="flex items-center gap-2">
                <span>{header.title}</span>
                {getSortIcon(index)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      
      <tbody>
        {sortedRows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={cn(
              "border-b border-border last:border-b-0",
              style === "striped" && rowIndex % 2 === 1 && "bg-muted/30",
              "hover:bg-muted/50 transition-colors"
            )}
          >
            {headers.map((header, cellIndex) => {
              const cell = row.cells?.[cellIndex] || {};
              return (
                <td
                  key={cellIndex}
                  className={cn(
                    cellPadding[size],
                    style === "bordered" && "border-r border-border last:border-r-0"
                  )}
                >
                  {renderCell(cell, header)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (responsive) {
    return (
      <div className="my-4 overflow-x-auto rounded-lg">
        {tableContent}
      </div>
    );
  }

  return <div className="my-4">{tableContent}</div>;
}
