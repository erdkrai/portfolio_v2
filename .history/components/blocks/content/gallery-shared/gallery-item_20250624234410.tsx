"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface GalleryItemProps {
  item: {
    image: {
      asset: {
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
  };
  hoverEffect: "overlay" | "scale" | "fade-zoom" | "none";
  aspectRatio: "auto" | "square" | "landscape" | "portrait";
  onImageClick: () => void;
  className?: string;
}

const aspectRatioClasses = {
  auto: "",
  square: "aspect-square",
  landscape: "aspect-video",
  portrait: "aspect-[3/4]",
};

const hoverEffectClasses = {
  overlay: "group-hover:scale-105",
  scale: "group-hover:scale-110 group-hover:shadow-2xl",
  "fade-zoom": "group-hover:scale-105 group-hover:opacity-90",
  none: "",
};

export default function GalleryItem({
  item,
  hoverEffect,
  aspectRatio,
  onImageClick,
  className,
}: GalleryItemProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getInternalHref = () => {
    if (item.link?.linkType === "internal" && item.link.internalLink) {
      const { slug, _type } = item.link.internalLink;
      if (_type === "post") {
        return `/blog/${slug.current}`;
      }
      return `/${slug.current}`;
    }
    return "";
  };

  const renderContent = () => (
    <div className={cn("group relative overflow-hidden rounded-lg", className)}>
      {/* Image container */}
      <div className={cn(
        "relative overflow-hidden rounded-lg bg-muted",
        aspectRatio !== "auto" && aspectRatioClasses[aspectRatio]
      )}>
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted" />
        )}

        {/* Error state */}
        {imageError && (
          <div className="flex h-48 items-center justify-center text-muted-foreground">
            Failed to load image
          </div>
        )}

        {/* Image */}
        {!imageError && (
          <Image
            src={item.image.asset.url}
            alt={item.alt}
            width={item.image.asset.metadata.dimensions.width}
            height={item.image.asset.metadata.dimensions.height}
            className={cn(
              "h-full w-full object-cover transition-all duration-300",
              aspectRatio === "auto" ? "aspect-auto" : "object-cover",
              hoverEffectClasses[hoverEffect]
            )}
            placeholder={item.image.asset.metadata.lqip ? "blur" : undefined}
            blurDataURL={item.image.asset.metadata.lqip}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImageError(true);
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Featured badge */}
        {item.featured && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-primary text-primary-foreground"
          >
            Featured
          </Badge>
        )}

        {/* Category badge */}
        {item.category && (
          <Badge 
            variant="outline" 
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
          >
            {item.category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
          </Badge>
        )}

        {/* Hover overlay */}
        {hoverEffect === "overlay" && (item.title || item.description || item.link) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {item.title && (
                <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-sm text-white/80 line-clamp-2 mb-3">
                  {item.description}
                </p>
              )}
              
              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onImageClick();
                  }}
                  className="flex items-center gap-1 rounded-md bg-white/20 px-2 py-1 text-xs backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  <Eye className="h-3 w-3" />
                  View
                </button>
                
                {item.link?.externalUrl && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const target = item.link?.openInNewTab ? "_blank" : "_self";
                      window.open(item.link.externalUrl, target);
                    }}
                    className="flex items-center gap-1 rounded-md bg-white/20 px-2 py-1 text-xs backdrop-blur-sm transition-colors hover:bg-white/30"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Click overlay for lightbox */}
        {hoverEffect !== "overlay" && (
          <button
            onClick={onImageClick}
            className="absolute inset-0 z-10 cursor-pointer"
            aria-label={`View ${item.title || "image"} in lightbox`}
          />
        )}
      </div>

      {/* Content below image (for non-overlay hover effects) */}
      {hoverEffect !== "overlay" && (item.title || item.description) && (
        <div className="mt-3 space-y-1">
          {item.title && (
            <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
          )}
          {item.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      )}
    </div>
  );

  // Wrap with link if internal link is provided
  if (item.link?.linkType === "internal" && item.link.internalLink) {
    return (
      <Link href={getInternalHref()} className="block">
        {renderContent()}
      </Link>
    );
  }

  // Wrap with external link if provided and not using overlay hover
  if (item.link?.linkType === "external" && item.link.externalUrl && hoverEffect !== "overlay") {
    const target = item.link.openInNewTab ? "_blank" : "_self";
    return (
      <a 
        href={item.link.externalUrl} 
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="block"
      >
        {renderContent()}
      </a>
    );
  }

  // Default: just the content
  return renderContent();
}
