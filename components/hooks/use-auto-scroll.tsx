"use client";
import { useEffect, useRef, useCallback } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface UseAutoScrollProps {
  api: CarouselApi;
  enabled?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  stopOnInteraction?: boolean;
}

export function useAutoScroll({
  api,
  enabled = false,
  interval = 4000,
  pauseOnHover = true,
  stopOnInteraction = false,
}: UseAutoScrollProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);
  const hasInteractedRef = useRef(false);

  const clearAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (!api || !enabled) return;

    clearAutoScroll();

    intervalRef.current = setInterval(() => {
      // Don't auto-scroll if paused on hover or user has interacted
      if (
        (pauseOnHover && isHoveredRef.current) ||
        (stopOnInteraction && hasInteractedRef.current)
      ) {
        return;
      }

      // Check if we can scroll next, if not and we want to loop, go to start
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        // Loop back to the beginning
        api.scrollTo(0);
      }
    }, interval);
  }, [api, enabled, interval, pauseOnHover, stopOnInteraction, clearAutoScroll]);

  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  // Handle manual interaction
  const handleInteraction = useCallback(() => {
    if (stopOnInteraction) {
      hasInteractedRef.current = true;
      clearAutoScroll();
    }
  }, [stopOnInteraction, clearAutoScroll]);

  // Set up auto-scroll
  useEffect(() => {
    if (!api || !enabled) {
      clearAutoScroll();
      return;
    }

    startAutoScroll();

    // Listen for manual interactions
    api.on("select", handleInteraction);

    return () => {
      clearAutoScroll();
      api.off("select", handleInteraction);
    };
  }, [api, enabled, startAutoScroll, handleInteraction, clearAutoScroll]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearAutoScroll();
    };
  }, [clearAutoScroll]);

  return {
    handleMouseEnter: pauseOnHover ? handleMouseEnter : undefined,
    handleMouseLeave: pauseOnHover ? handleMouseLeave : undefined,
  };
}
