"use client";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import ReviewCard from "./card/ReviewCard";
import { GoStarFill } from "react-icons/go";
import { useTranslations } from "next-intl";
import { Review, ReviewsData } from "@/types/product";

export function Reviews({ data }: { data: ReviewsData }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("fe");

  const reviewsData = data.reviews;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const totalBullets = isMobile
    ? data.reviews.length
    : Math.ceil(data.reviews.length / 4);

  return (
    <div>
      <section
        className={cn(
          "bg-primary px-4 relative py-10 space-y-4 text-center mx-auto text-2xl font-bold",
          "lg:text-3xl lg:py-20 lg:px-0",
          "xl:text-4xl"
        )}
      >
        <div className={cn("space-y-4 max-w-screen-lg mx-auto")}>
          <h3 className="mx-auto xl:text-6xl uppercase text-white">
            {t(data.title as any)}
          </h3>
          <p className="text-base font-medium lg:text-xl max-w-5xl mx-auto pb-4 text-white">
            {t(data.subtitle as any)}
          </p>
          <div className="flex items-center justify-center mx-auto rounded-full shadow-md bg-white px-6 py-2 w-max gap-2">
            <GoStarFill className="text-lg text-primary" />
            <div className="text-sm font-semibold text-foreground">
              {t(data.googleBadge as any)}
            </div>
            <img
              className="w-[60px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png"
              alt="Logo Google"
            />
          </div>
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            slidesToScroll: isMobile ? 1 : 4,
          }}
          className={cn("w-full lg:p-6 cursor-pointer mx-auto max-w-screen-xl")}
        >
          <CarouselContent>
            {data.reviews.map((review: Review, index: number) => (
              <CarouselItem
                key={index}
                className={cn("lg:basis-1/4 flex items-center py-4")}
              >
                <ReviewCard
                  content={t(review.content as any)}
                  name={review.name}
                  score={review.score}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={cn(
              "hidden bg-foreground text-background left-4 lg:left-24 lg:size-10 lg:flex",
              "hover:bg-foreground/50 hover:text-white",
              "dark:bg-primary dark:text-white dark:hover:bg-background/50 dark:hover:text-white"
            )}
          />
          <CarouselNext
            className={cn(
              "hidden bg-foreground text-background right-4 lg:right-24 lg:size-10 lg:flex",
              "hover:bg-foreground/50 hover:text-white",
              "dark:bg-primary dark:text-white dark:hover:bg-background/50 dark:hover:text-white"
            )}
          />
        </Carousel>
        <div
          className={cn(
            "flex items-center gap-2 justify-center pt-4",
            "lg:hidden"
          )}
        >
          {Array.from({ length: totalBullets }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "rounded-full size-3",
                current - 1 === index ? "bg-white" : "bg-secondary/30"
              )}
            ></div>
          ))}
        </div>
      </section>
    </div>
  );
}
