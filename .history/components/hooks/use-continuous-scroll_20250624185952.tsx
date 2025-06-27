"use client";
import { useEffect, useRef, useCallback } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface UseContinuousScrollProps {
  api: CarouselApi;
  enabled?: boolean;
  speed?: number; // Duration for one complete cycle in milliseconds
  pauseOnHover?: boolean;
  stopOnInteraction?: boolean;
}

export function useContinuousScroll({
  api,
  enabled = false,
  speed = 30000, // 30 seconds for one complete cycle
  pauseOnHover = true,
  stopOnInteraction = false,
}: UseContinuousScrollProps) {
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const isHoveredRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const containerRef = useRef<HTMLElement | null>(null);

  const cancelAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const startContinuousScroll = useCallback(() => {
    if (!api || !enabled || !containerRef.current) return;

    const container = containerRef.current;
    const scrollContainer = container.querySelector('[data-slot="carousel-content"] > div');
    
    if (!scrollContainer) return;

    const totalWidth = scrollContainer.scrollWidth;
    const visibleWidth = scrollContainer.clientWidth;
    const scrollDistance = totalWidth - visibleWidth;

    if (scrollDistance <= 0) return; // No need to scroll if content fits

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime - pausedTimeRef.current;
      }

      // Don't animate if paused on hover or user has interacted
      if (
        (pauseOnHover && isHoveredRef.current) ||
        (stopOnInteraction && hasInteractedRef.current)
      ) {
        pausedTimeRef.current = currentTime - startTimeRef.current;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = (elapsed % speed) / speed; // 0 to 1 over the duration
      const scrollPosition = progress * scrollDistance;

      if (scrollContainer && scrollContainer.parentElement) {
        scrollContainer.parentElement.scrollLeft = scrollPosition;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    cancelAnimation();
    animationRef.current = requestAnimationFrame(animate);
  }, [api, enabled, speed, pauseOnHover, stopOnInteraction, cancelAnimation]);

  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    // Reset start time to account for pause duration
    if (startTimeRef.current && pausedTimeRef.current) {
      startTimeRef.current = performance.now() - pausedTimeRef.current;
    }
  }, []);

  // Handle manual interaction
  const handleInteraction = useCallback(() => {
    if (stopOnInteraction) {
      hasInteractedRef.current = true;
      cancelAnimation();
    }
  }, [stopOnInteraction, cancelAnimation]);

  // Set up continuous scroll
  useEffect(() => {
    if (!api || !enabled) {
      cancelAnimation();
      return;
    }

    // Get the carousel container
    const emblaContainer = api.containerNode();
    if (emblaContainer) {
      containerRef.current = emblaContainer.closest('[data-slot="carousel"]') as HTMLElement;
    }

    startContinuousScroll();

    // Listen for manual interactions
    api.on("select", handleInteraction);
    api.on("pointerDown", handleInteraction);

    return () => {
      cancelAnimation();
      api.off("select", handleInteraction);
      api.off("pointerDown", handleInteraction);
    };
  }, [api, enabled, startContinuousScroll, handleInteraction, cancelAnimation]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  return {
    handleMouseEnter: pauseOnHover ? handleMouseEnter : undefined,
    handleMouseLeave: pauseOnHover ? handleMouseLeave : undefined,
  };
}
