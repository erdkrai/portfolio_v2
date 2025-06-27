"use client";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { PAGE_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import { stegaClean } from "next-sanity";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitInfoList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-info-list" }
>;
type SplitInfoItem = NonNullable<SplitInfoList["list"]>[number];

interface SplitInfoItemProps {
  image?: SplitInfoItem["image"];
  title?: SplitInfoItem["title"];
  body?: SplitInfoItem["body"];
  tags?: SplitInfoItem["tags"];
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
  image,
  title,
  body,
  tags,
  link,
  linkStyle,
}: SplitInfoItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 1,
  });

  const hasLink = link?.href;
  const cleanLinkStyle = stegaClean(linkStyle);
  const isClickableCard = hasLink && (cleanLinkStyle === "card" || cleanLinkStyle === "both");
  const showButton = hasLink && (cleanLinkStyle === "button" || cleanLinkStyle === "both");

  const cardContent = (
    <>
      <div
        className={cn(
          "flex flex-col gap-4 transition-colors duration-1000 ease-in-out",
          isInView ? "text-background" : "text-foreground"
        )}
      >
        <div className="flex items-center gap-2">
          {image && image.asset?._id && (
            <div className="shrink-0 w-10 h-10 flex items-center justify-center">
              <Image
                src={urlFor(image).url()}
                alt={image.alt || ""}
                placeholder={
                  image?.asset?.metadata?.lqip &&
                  image?.asset?.mimeType !== "image/svg+xml"
                    ? "blur"
                    : undefined
                }
                blurDataURL={image?.asset?.metadata?.lqip || ""}
                width={image.asset?.metadata?.dimensions?.width || 40}
                height={image?.asset?.metadata?.dimensions?.height || 40}
              />
            </div>
          )}
          {title && (
            <div className="text-xl font-semibold leading-[1.1]">{title}</div>
          )}
        </div>
        {body && <PortableTextRenderer value={body} />}
      </div>
      {tags && (
        <div
          className={cn(
            "flex flex-wrap gap-3 mt-4 transition-colors duration-1000 ease-in-out",
            isInView ? "text-background" : "text-foreground"
          )}
        >
          {tags.map((tag) => (
            <Badge
              key={tag}
              className={cn(
                "transition-colors duration-1000 ease-in-out",
                isInView
                  ? "bg-background text-foreground"
                  : "bg-foreground text-background"
              )}
            >
              {tag}
            </Badge>
          ))}
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
              href={link?.href || "#"}
              target={link?.target ? "_blank" : undefined}
            >
              {link?.title || "Learn More"}
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
        "border border-primary rounded-3xl px-6 lg:px-8 py-6 lg:py-8 transition-all duration-1000 ease-in-out",
        isInView ? "bg-foreground/85" : "bg-background",
        isClickableCard ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg" : undefined
      )}
    >
      {isClickableCard ? (
        <Link
          href={link?.href || "#"}
          target={link?.target ? "_blank" : undefined}
          className="w-full h-full flex flex-col"
        >
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}
