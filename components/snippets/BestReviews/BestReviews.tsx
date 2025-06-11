import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
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
    if (!api) return;
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
        setApi={setApi}
        className={`${styles.container} ${productPage ? styles.minWFull : styles.maxWXs} ${styles.mdMaxWLg} ${styles.lgMaxWXs} ${styles.xlMaxWMd} ${styles.x3lMaxWXl}`}
      >
        <CarouselContent>
          {bestReviewsData.map((data, index) => (
            <CarouselItem key={index}>
              <div className={styles.reviewsWrapper}>
                <div className={styles.avatarWrapper}>
                  <AvatarCircles
                    avatarUrls={data.picture} 
                    classNameImage={styles.avatarImg}
                  />
                  <div>
                    <div className={styles.headerRow}>
                      <h6 className={styles.headerText}>{data.name}</h6>
                      <div className={styles.subHeader}>
                        <div className={styles.checkIconWrapper}>
                          <FaCircleCheck className={styles.checkIcon} />
                        </div>
                        <p className={styles.verifiedText}>Avis vérifié</p>
                      </div>
                    </div>
                    <GetRatings value={data.rating} className={styles.ratingText} />
                  </div>
                </div>
                <p className={styles.reviewText}>“{data.content}”</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className={`${styles.navigationWrapper} ${productPage ? styles.minWFull : styles.mdMaxWLg} ${styles.mxAuto}`}>
        <div className={styles.navBtnsRow}>
          <Button
            variant="outline"
            size="icon"
            className={styles.navButtons}
            disabled={current === 1}
            onClick={scrollPrev}
          >
            <ArrowLeftIcon className={styles.arrowIcon} />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={styles.navButtons}
            disabled={current === bestReviewsData.length}
            onClick={scrollNext}
          >
            <ArrowRightIcon className={styles.arrowIcon} />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
        <div className={styles.dotsRow}>
          {bestReviewsData.map((_, index) => (
            <div 
              key={index} 
              className={`${styles.navDot} ${current - 1 === index ? styles.activeDot : styles.inactiveDot}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
