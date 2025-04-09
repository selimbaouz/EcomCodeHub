import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import GetRatings from "@/lib/fn";
import { FaCircleCheck } from "react-icons/fa6";
import { bestReviewsData } from "@/data";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import styles from './best-reviews.module.css';
import { Button } from "@/components/ui/button";
import AvatarCircles from "@/components/ui/avatar-circles";

export function BestReviews({ productPage }: { productPage?: boolean }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <div>
      <Carousel 
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        setApi={setApi}
        className={cn(styles.container, productPage ? "min-w-full" : "max-w-xs", "md:max-w-lg", "lg:max-w-xs", "xl:max-w-md", "3xl:max-w-xl")}
      >
        <CarouselContent>
          {bestReviewsData.map((data, index) => (
            <CarouselItem key={index}>
              <div className={cn(styles.reviewsWrapper)}>
                <div className={cn(styles.avatarWrapper)}>
                  <AvatarCircles
                    avatarUrls={data.picture} 
                    classNameImage="size-12"
                  />
                  <div>
                    <div className={cn("flex items-center gap-2")}>
                      <h6 className={styles.headerText}>{data.name}</h6>
                      <div className={styles.subHeader}>
                        <div className="p-1">
                          <FaCircleCheck className={styles.checkIcon} />
                        </div>
                        <p className={cn("text-xs", "xl:text-sm", "3xl:text-lg")}>Avis vérifié</p>
                      </div>
                    </div>
                    <GetRatings value={data.rating} className={cn("text-xs text-primary", "sm:text-sm", "md:text-lg", "xl:text-base", "3xl:text-xl")} />
                  </div>
                </div>
                <p className={styles.reviewText}>“{data.content}”</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className={cn(styles.navigationWrapper, productPage ? "min-w-full" : "md:max-w-lg mx-auto")}>
        <div className={cn("flex items-center gap-2")}>
          <Button
            variant="outline"
            size="icon"
            className={styles.navButtons}
            disabled={current === 1}
            onClick={scrollPrev}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={styles.navButtons}
            disabled={current === bestReviewsData.length}
            onClick={scrollNext}
          >
            <ArrowRightIcon className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
        <div className={cn("flex items-center gap-2")}>
          {bestReviewsData.map((_, index) => (
            <div 
              key={index} 
              className={cn(styles.navDot, current - 1 === index ? styles.activeDot : styles.inactiveDot)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
