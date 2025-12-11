"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageLoader from "./ImageLoader";
import Component1 from "@/public/images/component1.png";
import Component2 from "@/public/images/component2.png";
import Component3 from "@/public/images/component3.png";
import Component4 from "@/public/images/component4.png";
import Component5 from "@/public/images/component5.png";
import Component6 from "@/public/images/component6.png";
import Component7 from "@/public/images/component7.png";
import { useTranslations } from "next-intl";

const ExampleCode = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("fe.productImage.exampleCodePage");

  const images = [
    { title: t("images.crowdEffect"), image: Component1 }, // 600 people bought (beige)
    { title: t("images.proveSatisfaction"), image: Component2 }, // Témoignage client avec photo (menthe)
    { title: t("images.credibility"), image: Component3 }, // Ships by + FREE Shipping (vert/bleu)
    { title: t("images.crowdEffect"), image: Component4 }, // Loved by 1,000 Customers (violet)
    { title: t("images.urgency"), image: Component5 }, // Just 5 items left (jaune)
    { title: t("images.proveSatisfaction"), image: Component6 }, // Rated 4.9/5 by 100+ (menthe)
    { title: t("images.urgency"), image: Component7 }, // 8 items left at this price (rose)
  ];

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

  const totalBullets = isMobile ? images.length : Math.ceil(images.length / 3);

  return (
    <section
      className={cn(
        "bg-secondary/30  px-4 relative py-10 space-y-4 text-center mx-auto text-2xl font-bold",
        "lg:text-3xl lg:py-20 lg:px-0",
        "xl:text-4xl"
      )}
    >
      <div
        className={cn("space-y-3 pb-4 text-foreground max-w-screen-lg mx-auto")}
      >
        <h3 className="mx-auto xl:text-6xl uppercase">{t("title")}</h3>
        <p className="text-base font-medium lg:text-xl max-w-4xl mx-auto">
          {t("subtitle")}
        </p>
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          slidesToScroll: isMobile ? 1 : 5,
        }}
        className={cn("w-full lg:p-6 cursor-pointer mx-auto")}
      >
        <CarouselContent>
          {images.map((data, index) => (
            <CarouselItem
              key={index}
              className="lg:basis-1/5 flex items-center"
            >
              <div
                className={cn(
                  "cursor-pointer size-full flex flex-col justify-center"
                )}
              >
                <div
                  className={cn(
                    "relative w-full h-full overflow-hidden rounded-tl-xl rounded-tr-xl"
                  )}
                >
                  <ImageLoader
                    src={data.image.src}
                    alt={`Uploaded image ${index}`}
                    width={data.image.width}
                    height={data.image.height}
                    loading="lazy"
                  />
                </div>
                <p className="text-white text-center text-base rounded-bl-xl rounded-br-xl py-2 bg-primary">
                  {data.title}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn(
            "hidden bg-primary  text-background left-4 lg:left-24 lg:size-10 lg:flex",
            "hover:bg-primary/50 hover:text-white",
            "dark:bg-background dark:text-white dark:hover:bg-background/50 dark:hover:text-white"
          )}
        />
        <CarouselNext
          className={cn(
            "hidden bg-primary text-background right-4 lg:right-24 lg:size-10 lg:flex",
            "hover:bg-primary/50 hover:text-white",
            "dark:bg-background dark:text-white dark:hover:bg-background/50 dark:hover:text-white"
          )}
        />
      </Carousel>
      <div
        className={cn("flex items-center gap-2 justify-center pt-4 lg:hidden")}
      >
        {Array.from({ length: totalBullets }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "rounded-full size-3",
              current - 1 === index ? "bg-primary" : "bg-white"
            )}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default ExampleCode;
