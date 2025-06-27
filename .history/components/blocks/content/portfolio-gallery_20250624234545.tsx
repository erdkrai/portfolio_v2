"use client";

import { useState, useMemo } from "react";
import { stegaClean } from "next-sanity";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MasonryGrid from "./gallery-shared/masonry-grid";
import GalleryItem from "./gallery-shared/gallery-item";
import Lightbox from "./gallery-shared/lightbox";
import LoadingSkeleton from "./gallery-shared/loading-skeleton";

interface PortfolioGalleryProps {
  title?: string;
  description?: string;
  layout: "masonry" | "grid" | "carousel" | "justified";
  columns: string;
  spacing: "tight" | "normal" | "relaxed" | "loose";
  aspectRatio: "auto" | "square" | "landscape" | "portrait";
  enableLightbox: boolean;
  enableCategories: boolean;
  hoverEffect: "overlay" | "scale" | "fade-zoom" | "none";
  items: Array<{
    _key: string;
    image: {
      asset: {
        _id: string;
        url: string;
        metadata: {
          dimensions: {
            width: number;
            height: number;
          };
          lqip?: string;
        };
      };
    };
    alt: string;
    title?: string;
    description?: string;
    category?: string;
    link?: {
      linkType: "internal" | "external";
      internalLink?: {
        slug: {
          current: string;
        };
        _type: string;
      };
      externalUrl?: string;
      openInNewTab?: boolean;
    };
    featured?: boolean;
  }>;
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

export default function PortfolioGallery({
  title,
  description,
  layout,
  columns,
  spacing,
  aspectRatio,
  enableLightbox,
  enableCategories,
  hoverEffect,
  items = [],
}: PortfolioGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);

  // Clean Sanity data
  const cleanLayout = stegaClean(layout);
  const cleanColumns = stegaClean(columns);
  const cleanSpacing = stegaClean(spacing);
  const cleanAspectRatio = stegaClean(aspectRatio);
  const cleanHoverEffect = stegaClean(hoverEffect);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map(item => item.category).filter(Boolean))
    );
    return uniqueCategories.sort();
  }, [items]);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") {
      return items;
    }
    return items.filter(item => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // Prepare lightbox items
  const lightboxItems = useMemo(() => {
    return filteredItems.map(item => ({
      image: item.image,
      alt: item.alt,
      title: item.title,
      description: item.description,
      link: item.link,
    }));
  }, [filteredItems]);

  const handleImageClick = (index: number) => {
    if (enableLightbox) {
      setLightboxIndex(index);
    }
  };

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Simulate loading for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  };

  const renderGalleryItems = () => {
    const galleryItems = filteredItems.map((item, index) => (
      <GalleryItem
        key={item._key}
        item={item}
        hoverEffect={cleanHoverEffect}
        aspectRatio={cleanAspectRatio}
        onImageClick={() => handleImageClick(index)}
        className={item.featured && cleanLayout === "masonry" ? "md:col-span-2" : ""}
      />
    ));

    if (isLoading) {
      return (
        <LoadingSkeleton
          layout={cleanLayout}
          columns={cleanColumns}
          spacing={cleanSpacing}
          itemCount={Math.min(filteredItems.length, 6)}
        />
      );
    }

    switch (cleanLayout) {
      case "masonry":
        return (
          <MasonryGrid
            columns={cleanColumns}
            spacing={cleanSpacing}
          >
            {galleryItems}
          </MasonryGrid>
        );

      case "carousel":
        return (
          <div className="w-full overflow-x-auto">
            <div className={cn("flex pb-4", spacingClasses[cleanSpacing])}>
              {galleryItems.map((item, index) => (
                <div key={index} className="min-w-[280px] flex-shrink-0">
                  {item}
                </div>
              ))}
            </div>
          </div>
        );

      case "grid":
      case "justified":
      default:
        return (
          <div className={cn(
            "grid",
            getColumnClasses(cleanColumns),
            spacingClasses[cleanSpacing]
          )}>
            {galleryItems}
          </div>
        );
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-muted-foreground/25">
        <p className="text-muted-foreground">No gallery items to display</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Gallery header */}
      {(title || description) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>
      )}

      {/* Category filters */}
      {enableCategories && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange("all")}
            className="rounded-full"
          >
            All ({items.length})
          </Button>
          {categories.map((category) => {
            const count = items.filter(item => item.category === category).length;
            const displayName = category?.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) || category;
            
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className="rounded-full"
              >
                {displayName} ({count})
              </Button>
            );
          })}
        </div>
      )}

      {/* Gallery grid */}
      <div className="w-full">
        {renderGalleryItems()}
      </div>

      {/* Results count */}
      {enableCategories && selectedCategory !== "all" && (
        <div className="mt-6 text-center">
          <Badge variant="secondary">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} in {selectedCategory?.replace("-", " ")}
          </Badge>
        </div>
      )}

      {/* Lightbox */}
      {enableLightbox && lightboxIndex >= 0 && (
        <Lightbox
          items={lightboxItems}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
