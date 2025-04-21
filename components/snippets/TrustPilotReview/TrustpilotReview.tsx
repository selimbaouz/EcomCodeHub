import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { bestReviewsData, trustPilotReviewsData } from "@/data";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import styles from "./trustpilot-review.module.css";

const TrustpilotReview = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(false);
    
    React.useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 1024); 
        };
    
        handleResize(); 
        window.addEventListener("resize", handleResize); 
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const totalBullets = isMobile ? trustPilotReviewsData.length : Math.ceil(trustPilotReviewsData.length / 1);

    return (
        <div className={cn("lg:px-20 mx-auto w-full")}>
      <Carousel 
        opts={{
            slidesToScroll: 1
        }}
        setApi={setApi}
        className={styles.carouselContainer}
      >
        <CarouselContent>
          {trustPilotReviewsData.map((data, index) => {
            return (
              <CarouselItem key={index} className={cn(
                styles.carouselItem,
                index === 0 && styles.carouselItemMarginLeft,
                index === 7 && styles.carouselItemMarginRight
              )}>
                <div className={cn(styles.reviewCard)}>
                <div className={cn(styles.reviewInner)}>
                  <div className={cn(styles.reviewHeader)}>
                    <svg
                      height="120px"
                      width="120px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 96"
                      className="h-12"
                    >
                      <g fill="none">
                        <g fill="#00b67a">
                          <path
                            d="M0 0h96v96H0zM104 0h96v96h-96zM208 0h96v96h-96zM312 0h96v96h-96zM416 0h96v96h-96z"
                          />
                        </g>
                        <path
                          d="M48 64.7L62.6 61l6.1 18.8zm33.6-24.3H55.9L48 16.2l-7.9 24.2H14.4l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM152 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L152 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM256 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L256 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM360 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L360 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM464 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L464 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2z"
                          fill="#fff"
                        />
                      </g>
                    </svg>
                    <h3 className={cn(styles.reviewTitle)}>
                      {data.title}
                    </h3>
                  </div>
                  <p className={cn(styles.reviewContent)}>
                    {data.content}
                  </p>
                  <div
                    className={cn(styles.reviewFooter)}
                  >
                    <h6 className={cn(styles.reviewAuthor)}>
                      {data.title}, {data.date}
                    </h6>
                    <div
                      className={cn(styles.verifiedBadge)}
                    >
                      Acheteur vérifié
                    </div>
                  </div>
                </div>
              </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <div className={cn("flex justify-between items-center mt-4")}>
            <Button
              variant="outline"
              size="icon"
              className={cn(styles.arrowButton, styles.arrowLeft)}
              disabled={current === 1}
              onClick={scrollPrev}
            >
              <IoMdArrowDropleftCircle className="size-10" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(styles.arrowButton, styles.arrowRight)}
              disabled={current === bestReviewsData.length}
              onClick={scrollNext}
            >
              <IoMdArrowDroprightCircle className="size-10" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
      </Carousel>
        <div className={cn(styles.bulletContainer)}>
          {Array.from({ length: totalBullets }).map((_, index) => (
            <div 
              key={index} 
              className={cn(styles.bullet, current - 1 === index ? styles.bulletActive : styles.bulletInactive)}
            />
          ))}
        </div>
    </div>
    );
};

export default TrustpilotReview;