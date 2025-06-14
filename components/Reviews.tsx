"use client";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import { reviewsData } from "@/data";
import ReviewCard from "./card/ReviewCard";

export function Reviews() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

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

        const totalBullets = isMobile ? reviewsData.length : Math.ceil(reviewsData.length / 4);

    return (
        <div>
            <section className={cn(
              "bg-gray-100 dark:bg-background px-4 relative py-10 space-y-4 text-center mx-auto text-2xl font-bold", 
              "lg:text-3xl lg:py-20 lg:px-0", 
              "xl:text-4xl",
              )}>
              <div className={cn("space-y-3 pb-4")}>
                  <h3 className="mx-auto xl:text-6xl">
                      Ils ne peuvent plus s{"'"}en passer
                  </h3>
                  <p className="text-base font-medium lg:text-xl max-w-5xl mx-auto">Qui de mieux qu{"'"}eux pour parler du pack pro conversion ?</p>
                  <div className="text-center">
                    <a 
                      href="https://www.google.com/search?safe=strict&tbm=lcl&sxsrf=AE3TifNbb_1LBN1FsuMJ8m80oCOnLUZvwg:1749897451817&q=tailwindliquid%20toulon%20reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDWwtLC0NDcyMzY1NrK0MDEyMdvAyPiKUbYkMTOnPDMvJSezsDQzRaEkvzQnP0-hKLUsM7W8eBErfnkAXD5oWFsAAAA&rldimm=15098997263532984246&hl=en-FR#arid=Ci9DQUlRQUNvZENodHljRjlvT21SRmVrRlhkRGM1TkRkcWVGTnNUSEl6YjJOVE1GRRAB&lkt=LocalPoiReviews&rlfi=hd:;si:15098997263532984246,l,Ch10YWlsd2luZGxpcXVpZCB0b3Vsb24gcmV2aWV3c0jvw6__gLyAgAhaIxAAGAAiHXRhaWx3aW5kbGlxdWlkIHRvdWxvbiByZXZpZXdzkgEXY29tcHV0ZXJfc29mdHdhcmVfc3RvcmU;mv:[[43.13072237731904,5.918950512532541],[43.130362422680975,5.918457287467461]]" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-medium lg:text-base max-w-5xl mx-auto underline"
                    >
                      Voir tous les avis sur Google
                    </a>
                  </div>
              </div>
              <Carousel 
                  setApi={setApi} 
                  opts={{
                    slidesToScroll: isMobile ? 1 : 4
                  }}
                  className={cn("w-full lg:p-6 cursor-pointer mx-auto max-w-screen-xl")}>
                  <CarouselContent>
                  {reviewsData.map((data, index) =>  (
                      <CarouselItem
                        key={index}
                        className={cn("lg:basis-1/4 flex items-center py-4")}
                      >
                          <ReviewCard content={data.content} name={data.name} score={data.score} />
                      </CarouselItem>
                  ))}
                  </CarouselContent>
                  <CarouselPrevious className={cn("hidden bg-foreground  text-background left-4 lg:left-24 lg:size-10 lg:flex", "hover:bg-foreground/50 hover:text-white", "dark:bg-primary dark:text-white dark:hover:bg-background/50 dark:hover:text-white")} />
                  <CarouselNext className={cn("hidden bg-foreground text-background right-4 lg:right-24 lg:size-10 lg:flex", "hover:bg-foreground/50 hover:text-white", "dark:bg-primary dark:text-white dark:hover:bg-background/50 dark:hover:text-white")} />
              </Carousel>
              <div className={cn("flex items-center gap-2 justify-center pt-4", "lg:hidden")}>
              {Array.from({ length: totalBullets }).map((_, index) => (
                      <div 
                          key={index} 
                          className={cn("rounded-full size-3", current - 1 === index ? "bg-primary" : "bg-foreground/70")}
                          >
                      </div>
                  ))}
              </div>
            </section>
        </div>
  );
}
