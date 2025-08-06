"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ImageLoader from './ImageLoader';
import Component1 from "@/public/images/component1.png";
import Component2 from "@/public/images/component2.png";
import Component3 from "@/public/images/component3.png";
import Component4 from "@/public/images/component4.png";
import Component5 from "@/public/images/component5.png";
import Component6 from "@/public/images/component6.png";
import Component7 from "@/public/images/component7.png";
import Component8 from "@/public/images/component8.png";
import Component9 from "@/public/images/component9.png";
import { useTranslations } from 'next-intl';

const ExampleCode = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("fe.productImage.exampleCodePage")

  const images = [
    { title: t("images.proveSatisfaction"), image: Component1 },
    { title: t("images.crowdEffect"), image: Component2 },
    { title: t("images.credibility"), image: Component3 },
    { title: t("images.urgency"), image: Component4 },
    { title: t("images.valueOffer"), image: Component5 },
    { title: t("images.eliminateRisk"), image: Component6 },
    { title: t("images.clearExpectation"), image: Component7 },
    { title: t("images.reassureSecure"), image: Component8 },
    { title: t("images.finalPush"), image: Component9 },
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
          return
        }
        
        setCurrent(api.selectedScrollSnap() + 1)
    
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap() + 1)
        })
      }, [api]);

      const totalBullets = isMobile ? images.length : Math.ceil(images.length / 3);

    return (
      <section
       className={cn(
        "bg-foreground  px-4 relative py-10 space-y-4 text-center mx-auto text-2xl font-bold", 
        "lg:text-3xl lg:py-20 lg:px-0", 
        "xl:text-4xl", 
        "dark:bg-[#2c4049]"
      )}
        >
        <div className={cn("space-y-3 pb-4 text-white")}>
            <h3 className="mx-auto xl:text-6xl">
              {t("title")}
            </h3>
            <p className="text-base font-medium lg:text-xl max-w-4xl mx-auto">
              {t("subtitle")}
            </p>
        </div>
        <Carousel 
          setApi={setApi} 
          opts={{
            slidesToScroll: isMobile ? 1 : 5
          }}
          className={cn("w-full lg:p-6 cursor-pointer mx-auto")}>
          <CarouselContent>
            {images.map((data, index) => (
                <CarouselItem key={index} className="lg:basis-1/5 flex items-center">
                    <div 
                      className={cn("cursor-pointer size-full flex flex-col justify-center")}>
                        <div className={cn("relative w-full h-full overflow-hidden rounded-tl-xl rounded-tr-xl")}>
                            <ImageLoader
                                src={data.image.src}
                                alt={`Uploaded image ${index}`}
                                width={data.image.width}
                                height={data.image.height}
                                loading="lazy" 
                            />
                        </div>
                            <p className='text-foreground dark:text-background text-center text-base rounded-bl-xl rounded-br-xl py-2 bg-secondary'>{data.title}</p>
                    </div>
                </CarouselItem>
            ))}
          </CarouselContent>
            <CarouselPrevious className={cn("hidden bg-foreground  text-background left-4 lg:left-24 lg:size-10 lg:flex", "hover:bg-foreground/50 hover:text-white", "dark:bg-background dark:text-white dark:hover:bg-background/50 dark:hover:text-white")} />
            <CarouselNext className={cn("hidden bg-foreground text-background right-4 lg:right-24 lg:size-10 lg:flex", "hover:bg-foreground/50 hover:text-white", "dark:bg-background dark:text-white dark:hover:bg-background/50 dark:hover:text-white")} />
        </Carousel>
        <div className={cn("flex items-center gap-2 justify-center pt-4 lg:hidden")}>
          {Array.from({ length: totalBullets }).map((_, index) => (
                  <div 
                      key={index} 
                      className={cn("rounded-full size-3", current - 1 === index ? "bg-primary" : "bg-gray-200")}
                      >
                  </div>
              ))}
          </div>
      </section>
    );
};

export default ExampleCode;