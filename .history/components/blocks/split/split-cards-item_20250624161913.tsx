"use client";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { PAGE_QUERYResult, ColorVariant } from "@/sanity.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stegaClean } from "next-sanity";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitCardsList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-cards-list" }
>;
type SplitCardItem = NonNullable<NonNullable<SplitCardsList["list"]>[number]>;

interface SplitCardsItemProps {
  color?: ColorVariant;
  tagLine?: SplitCardItem["tagLine"];
  title?: SplitCardItem["title"];
  body?: SplitCardItem["body"];
  link?: {
    linkType?: string;
    title?: string;
    href?: string;
    target?: boolean;
    buttonVariant?: string;
    post?: {
      title?: string;
      slug?: {
        current?: string;
      };
      excerpt?: string;
    };
  };
  linkStyle?: "button" | "card" | "both";
}

export default function SplitCardsItem({
  color,
  tagLine,
  title,
  body,
  link,
  linkStyle,
}: SplitCardsItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 1,
  });

  const hasLink = (stegaClean(link?.linkType) === "manual" && link?.href) || 
                  (stegaClean(link?.linkType) === "post" && link?.post?.slug);
  const cleanLinkStyle = stegaClean(linkStyle);
  const isClickableCard = hasLink && (cleanLinkStyle === "card" || cleanLinkStyle === "both");
  const showButton = hasLink && (cleanLinkStyle === "button" || cleanLinkStyle === "both");

  // Generate final href and title based on link type
  const finalHref = stegaClean(link?.linkType) === "post" && link?.post?.slug
    ? `/blog/${link.post.slug.current}`
    : link?.href || "#";
  
  const finalTitle = link?.title || 
    (stegaClean(link?.linkType) === "post" ? link?.post?.title : "Learn More");
  
  const finalTarget = stegaClean(link?.linkType) === "manual" && link?.target
    ? "_blank"
    : undefined;

  const cardContent = (
    <>
      {tagLine && (
        <div
          className={cn(
            "font-bold text-2xl lg:text-3xl transition-colors duration-1000 ease-in-out",
            isInView ? "text-background" : "text-foreground",
            color === "primary" ? "text-background" : undefined
          )}
        >
          {tagLine}
        </div>
      )}
      {title && (
        <div
          className={cn(
            "my-2 font-semibold text-xl transition-colors duration-1000 ease-in-out",
            isInView ? "text-background" : "text-foreground",
            color === "primary" ? "text-background" : undefined
          )}
        >
          {title}
        </div>
      )}
      {body && (
        <div
          className={cn(
            "transition-colors duration-1000 ease-in-out",
            isInView ? "text-background" : "text-foreground"
          )}
        >
          <PortableTextRenderer value={body} />
        </div>
      )}
      {showButton && (
        <div className="mt-4 flex flex-col">
          <Button
            variant={stegaClean(link?.buttonVariant) as any}
            size="sm"
            asChild
            className={cn(
              "transition-colors duration-1000 ease-in-out",
              isInView ? "text-foreground bg-background hover:bg-background/90" : undefined
            )}
          >
            <Link
              href={finalHref}
              target={finalTarget}
            >
              {finalTitle}
            </Link>
          </Button>
        </div>
      )}
    </>
  );

  return (
    <motion.div
      ref={ref}
      className={cn(
        "flex flex-col items-start border border-primary rounded-3xl px-6 lg:px-8 py-6 lg:py-8 transition-all duration-1000 ease-in-out",
        isInView ? "bg-foreground/85" : "bg-background",
        color === "primary" ? "text-background" : undefined,
        isClickableCard ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg" : undefined
      )}
    >
      {isClickableCard ? (
        <Link
          href={finalHref}
          target={finalTarget}
          className="w-full h-full flex flex-col items-start"
        >
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}
