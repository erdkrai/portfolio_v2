"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LightboxItem {
  image: {
    asset: {
      url: string;
      metadata?: {
        dimensions?: {
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
  link?: {
    linkType: "internal" | "external";
    externalUrl?: string;
    openInNewTab?: boolean;
  };
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const currentItem = items[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case "ArrowRight":
          if (currentIndex < items.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
      }
    },
    [isOpen, currentIndex, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
  }, [currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  const handleDownload = () => {
    if (currentItem?.image?.asset?.url) {
      const link = document.createElement("a");
      link.href = currentItem.image.asset.url;
      link.download = currentItem.title || "image";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExternalLink = () => {
    if (currentItem?.link?.externalUrl) {
      const target = currentItem.link.openInNewTab ? "_blank" : "_self";
      window.open(currentItem.link.externalUrl, target);
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Navigation buttons */}
      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20",
              currentIndex === 0 && "opacity-50 cursor-not-allowed"
            )}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20",
              currentIndex === items.length - 1 && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleNext}
            disabled={currentIndex === items.length - 1}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Action buttons */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {currentItem.link?.externalUrl && (
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleExternalLink}
            title="Open project link"
          >
            <ExternalLink className="h-5 w-5" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={handleDownload}
          title="Download image"
        >
          <Download className="h-5 w-5" />
        </Button>
      </div>

      {/* Image counter */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
          {currentIndex + 1} / {items.length}
        </div>
      )}

      {/* Main content area */}
      <div 
        className="relative max-h-[90vh] max-w-[90vw] cursor-pointer"
        onClick={onClose}
      >
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className="flex h-64 w-64 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            Failed to load image
          </div>
        )}

        {/* Image */}
        {!imageError && (
          <Image
            src={currentItem.image.asset.url}
            alt={currentItem.alt}
            width={currentItem.image.asset.metadata?.dimensions?.width || 800}
            height={currentItem.image.asset.metadata?.dimensions?.height || 600}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            placeholder={currentItem.image.asset.metadata?.lqip ? "blur" : undefined}
            blurDataURL={currentItem.image.asset.metadata?.lqip}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImageError(true);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {/* Image details */}
        {(currentItem.title || currentItem.description) && (
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.title && (
              <h3 className="text-lg font-semibold mb-2">{currentItem.title}</h3>
            )}
            {currentItem.description && (
              <p className="text-sm text-white/80">{currentItem.description}</p>
            )}
          </div>
        )}
      </div>

      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
        aria-label="Close lightbox"
      />
    </div>
  );
}
