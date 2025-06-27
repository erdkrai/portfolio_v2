"use client";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  CarouselCounter,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useAutoScroll } from "@/components/hooks/use-auto-scroll";
import { useContinuousScroll } from "@/components/hooks/use-continuous-scroll";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { PAGE_QUERYResult } from "@/sanity.types";
import { useState } from "react";

const CAROUSEL_SIZES = {
  one: "basis-full",
  two: "basis-full md:basis-1/2",
  three: "basis-full md:basis-1/2 lg:basis-1/3",
} as const;

const IMAGE_SIZES = {
  one: "h-[30rem] sm:h-[40rem] lg:h-[31.25rem] xl:h-[35rem]",
  two: "h-[30rem] md:h-[22rem] lg:h-[30rem] xl:h-[35rem]",
  three: "h-[30rem] md:h-[20rem] xl:h-[25rem]",
} as const;

type CarouselSize = keyof typeof CAROUSEL_SIZES;

type Carousel1 = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "carousel-1" }
>;

interface Carousel1Props
  extends Omit<NonNullable<Carousel1>, "_type" | "_key"> {
  size: CarouselSize | null;
  indicators: "none" | "dots" | "count" | null;
  autoScroll?: {
    enabled?: boolean | null;
    scrollType?: string | null;
    interval?: string | null;
    continuousSpeed?: string | null;
    pauseOnHover?: boolean | null;
    stopOnInteraction?: boolean | null;
    showArrows?: boolean | null;
  } | null;
}

export default function Carousel1({
  padding,
  colorVariant,
  size = "one",
  indicators = "none",
  autoScroll,
  images,
}: Carousel1Props) {
  const [api, setApi] = useState<CarouselApi>();
  const color = stegaClean(colorVariant);
  const stegaIndicators = stegaClean(indicators);
  const stegaSize = stegaClean(size) as CarouselSize;

  // Auto-scroll configuration
  const autoScrollEnabled = stegaClean(autoScroll?.enabled) ?? false;
  const scrollType = stegaClean(autoScroll?.scrollType) ?? "discrete";
  const autoScrollInterval = parseInt(stegaClean(autoScroll?.interval) ?? "2000");
  const continuousSpeed = parseInt(stegaClean(autoScroll?.continuousSpeed) ?? "16000");
  const pauseOnHover = stegaClean(autoScroll?.pauseOnHover) ?? true;
  const stopOnInteraction = stegaClean(autoScroll?.stopOnInteraction) ?? false;
  const showArrows = stegaClean(autoScroll?.showArrows) ?? true;

  // Determine if arrows should be visible
  const shouldShowArrows = !autoScrollEnabled || showArrows;

  // Set up discrete auto-scroll
  const discreteScroll = useAutoScroll({
    api,
    enabled: autoScrollEnabled && scrollType === "discrete",
    interval: autoScrollInterval,
    pauseOnHover,
    stopOnInteraction,
  });

  // Set up continuous scroll
  const continuousScroll = useContinuousScroll({
    api,
    enabled: autoScrollEnabled && scrollType === "continuous",
    speed: continuousSpeed,
    pauseOnHover,
    stopOnInteraction,
  });

  // Use the appropriate scroll handlers
  const { handleMouseEnter, handleMouseLeave } = scrollType === "continuous" 
    ? continuousScroll 
    : discreteScroll;

  return (
    <SectionContainer color={color} padding={padding}>
      {images && images.length > 0 && (
        <Carousel 
          setApi={setApi}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={`${index}-${image.alt}`}
                className={CAROUSEL_SIZES[stegaSize]}
              >
                {image && (
                  <div
                    className={cn(
                      "relative mx-auto overflow-hidden rounded-2xl",
                      IMAGE_SIZES[stegaSize],
                      stegaSize === "one" ? "max-w-[35rem]" : undefined
                    )}
                  >
                    <Image
                      className="object-cover"
                      src={urlFor(image).url()}
                      alt={image.alt || ""}
                      fill
                      placeholder={
                        image?.asset?.metadata?.lqip ? "blur" : undefined
                      }
                      blurDataURL={image.asset?.metadata?.lqip || ""}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      quality={100}
                    />
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="secondary"
            className="-left-3 md:-left-8 xl:-left-12"
          />
          <CarouselNext
            variant="secondary"
            className="-right-3 md:-right-8 xl:-right-12"
          />
          {stegaIndicators !== "none" && (
            <div className="w-full flex justify-center">
              {stegaIndicators === "dots" && <CarouselDots />}
              {stegaIndicators === "count" && <CarouselCounter />}
            </div>
          )}
        </Carousel>
      )}
    </SectionContainer>
  );
}
