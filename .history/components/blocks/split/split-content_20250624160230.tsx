import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TagLine from "@/components/ui/tag-line";
import { createElement } from "react";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitContent = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-content" }
>;

interface SplitContentProps extends Omit<SplitContent, 'link'> {
  noGap?: boolean;
  link?: {
    linkType?: string | null;
    title?: string | null;
    href?: string | null;
    target?: boolean | null;
    buttonVariant?: string | null;
    post?: {
      title?: string | null;
      slug?: {
        current?: string;
      } | null;
      excerpt?: string | null;
    } | null;
  } | null;
}

export default function SplitContent({
  sticky,
  padding,
  noGap,
  tagLine,
  title,
  body,
  link,
}: SplitContentProps) {
  return (
    <div
      className={cn(
        !sticky ? "flex flex-col justify-center" : undefined,
        padding?.top ? "pt-16 xl:pt-20" : undefined,
        padding?.bottom ? "pb-16 xl:pb-20" : undefined
      )}
    >
      <div
        className={cn(
          "flex flex-col items-start",
          sticky ? "lg:sticky lg:top-56" : undefined,
          noGap ? "px-10" : undefined
        )}
      >
        {tagLine && <TagLine title={tagLine} element="h2" />}
        {title &&
          createElement(
            tagLine ? "h3" : "h2",
            {
              className: cn("my-4 font-semibold leading-[1.2]"),
            },
            title
          )}
        {body && <PortableTextRenderer value={body} />}
        {(link?.href || link?.post?.slug) && (
          <div className="flex flex-col">
            <Button
              className="mt-2"
              variant={stegaClean(link?.buttonVariant) as any}
              size="lg"
              asChild
            >
              <Link
                href={
                  stegaClean(link?.linkType) === "post" && link?.post?.slug
                    ? `/blog/${link.post.slug.current}`
                    : link?.href || "#"
                }
                target={
                  stegaClean(link?.linkType) === "manual" && link?.target
                    ? "_blank"
                    : undefined
                }
              >
                {link?.title || 
                 (stegaClean(link?.linkType) === "post" ? link?.post?.title : "Learn More")}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
