"use client";
import { useRouter } from "next/navigation";
import { useLoading } from "@/components/providers/loading-provider";
import { useCallback } from "react";

export function useNavigation() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();

  const navigateTo = useCallback(
    (href: string, target?: string) => {
      if (target === "_blank") {
        // For external links, open in new tab without loading state
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      // For internal navigation, show loading state
      showLoading();
      
      // Add a small delay to ensure loading state is visible
      setTimeout(() => {
        router.push(href);
        // Hide loading after navigation (will be hidden when new page loads)
        setTimeout(() => {
          hideLoading();
        }, 100);
      }, 50);
    },
    [router, showLoading, hideLoading]
  );

  const prefetchRoute = useCallback(
    (href: string) => {
      router.prefetch(href);
    },
    [router]
  );

  return {
    navigateTo,
    prefetchRoute,
  };
}
