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
  type CarouselApi,
} from "@/components/ui/carousel";
import { useAutoScroll } from "@/components/hooks/use-auto-scroll";
import { useContinuousScroll } from "@/components/hooks/use-continuous-scroll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";
import { StarRating } from "@/components/ui/star-rating";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import { useState } from "react";

type Carousel2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "carousel-2" }
> & {
  autoScroll?: {
    enabled?: boolean | null;
    scrollType?: string | null;
    interval?: string | null;
    continuousSpeed?: string | null;
    pauseOnHover?: boolean | null;
    stopOnInteraction?: boolean | null;
    showArrows?: boolean | null;
  } | null;
};

export default function Carousel2({
  padding,
  colorVariant,
  autoScroll,
  testimonial,
}: Carousel2Props) {
  const [api, setApi] = useState<CarouselApi>();
  const color = stegaClean(colorVariant);

  // Auto-scroll configuration
  const autoScrollEnabled = stegaClean(autoScroll?.enabled) ?? false;
  const scrollType = stegaClean(autoScroll?.scrollType) ?? "discrete";
  const autoScrollInterval = parseInt(stegaClean(autoScroll?.interval) ?? "2500");
  const continuousSpeed = parseInt(stegaClean(autoScroll?.continuousSpeed) ?? "20000");
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
      {testimonial && testimonial.length > 0 && (
        <Carousel 
          setApi={setApi}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent>
            {testimonial.map((item) => (
              <CarouselItem
                key={item._id}
                className="pl-2 md:pl-4 md:basis-1/3"
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col justify-between p-4 h-full">
                    <div>
                      <div className="flex items-center mb-2">
                        <Avatar className="w-10 h-10 mr-3">
                          {item.image && (
                            <AvatarImage
                              src={urlFor(item.image).url()}
                              alt={item.name ?? ""}
                            />
                          )}
                          <AvatarFallback>
                            {item.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-sm font-semibold">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {item.title}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={item.rating ?? 0} />
                      {item.body && (
                        <div className="text-sm mt-2 line-clamp-4">
                          <PortableTextRenderer value={item.body} />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
          <div className="w-full flex justify-center">
            <CarouselDots />
          </div>
        </Carousel>
      )}
    </SectionContainer>
  );
}
