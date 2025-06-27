"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/components/hooks/use-navigation";

interface ContentButtonProps {
  text?: string;
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
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
  alignment?: "left" | "center" | "right";
}

export default function ContentButton({
  text,
  link,
  variant = "default",
  size = "default",
  fullWidth = false,
  alignment = "left",
}: ContentButtonProps) {
  const { navigateTo } = useNavigation();

  // Generate final href and title based on link type
  const linkType = link?.linkType;
  let finalHref = "#";
  let finalTarget: string | undefined;

  switch (linkType) {
    case "page":
      finalHref = link?.page?.slug?.current ? `/${link.page.slug.current}` : "#";
      break;
    case "post":
      finalHref = link?.post?.slug?.current ? `/blog/${link.post.slug.current}` : "#";
      break;
    case "manual":
      finalHref = link?.href || "#";
      finalTarget = link?.target ? "_blank" : undefined;
      break;
  }

  const handleClick = () => {
    if (finalHref !== "#") {
      navigateTo(finalHref, finalTarget);
    }
  };

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={cn("flex my-4", alignmentClasses[alignment])}>
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        className={cn(fullWidth && "w-full")}
        disabled={finalHref === "#"}
      >
        {text || "Button"}
      </Button>
    </div>
  );
}
