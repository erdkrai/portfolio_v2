"use client";
import { useState, useEffect } from "react";

interface UseScrollBehaviorProps {
  isSticky: boolean;
  stickyBehavior: string;
}

export function useScrollBehavior({ isSticky, stickyBehavior }: UseScrollBehaviorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!isSticky || stickyBehavior === "always") {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (stickyBehavior === "scroll-down") {
        // Hide when scrolling down, show when scrolling up
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      } else if (stickyBehavior === "scroll-up") {
        // Show only when scrolling up
        setIsVisible(currentScrollY < lastScrollY && currentScrollY > 10);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky, stickyBehavior, lastScrollY]);

  return { isVisible };
}
