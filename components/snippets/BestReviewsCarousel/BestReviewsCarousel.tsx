"use client";
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Image from 'next/image';
import GetRatings from '@/lib/fn';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImQuotesRight } from "react-icons/im";
import { useTranslations } from "next-intl";
import styles from './best-reviews-carousel.module.css';
import { useResponsiveStore } from '@/store/responsive-screen';

const reviews = [
    {
        score: 5,
        title: "Super service",
        content: "Très satisfait du service client et de la rapidité.",
        images: "https://cdn.shopify.com/s/files/1/0970/6094/6252/files/3_c9e44b7f-c88e-493e-99c5-8a5dbb809d6f.png?v=1755507381",
        author: "Jean Dupont"
    },
    {
        score: 5,
        title: "Super service",
        content: "Très satisfait du service client et de la rapidité.",
        images: "https://cdn.shopify.com/s/files/1/0970/6094/6252/files/3_c9e44b7f-c88e-493e-99c5-8a5dbb809d6f.png?v=1755507381",
        author: "Jean Dupont"
    },
    {
        score: 5,
        title: "Super service",
        content: "Très satisfait du service client et de la rapidité.",
        images: "https://cdn.shopify.com/s/files/1/0970/6094/6252/files/3_c9e44b7f-c88e-493e-99c5-8a5dbb809d6f.png?v=1755507381",
        author: "Jean Dupont"
    },
]

export function BestReviewsCarousel({snippetId}: {snippetId: string}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const t = useTranslations("fe.reviews");
  const view = useResponsiveStore((s) =>
      s.getView(snippetId)
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  const scrollPrev = () => api && api.scrollPrev();
  const scrollNext = () => api && api.scrollNext();

  /* const scrollTo = (idx: number) => api && api.scrollTo(idx); */

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.title}>Avis</h3>
        {/* Desktop: grid 3 colonnes */}
        {view === "desktop" && (
          <div className={styles.gridDesktop}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.imgWrapper}>
                  <Image
                    src={review.images}
                    alt="image of review"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 400px, 100vw"
                    priority={index === 0}
                  />
                </div>
                <div className={styles.ratings}>
                  <GetRatings value={review.score} className={styles.ratingsIcon} />
                </div>
                <p className={styles.titleText}>{`"${review.title}"`}</p>
                <p className={styles.contentText}>{`"${review.content}"`}</p>
                <p className={styles.author}>- {review.author}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile: carousel */}
        {(view === "mobile" || view === "tablet") && (
          <>
              <Carousel setApi={setApi} className={styles.carousel}>
                <CarouselContent className={styles.carouselContent}>
                  {reviews.map((review, index) => (
                    <CarouselItem
                      key={index}
                      className={cn(styles.carouselItem)}
                    >
                      <div className={styles.imgMobile}>
                        <Image
                          src={review.images}
                          alt="image of review"
                          fill
                          className="object-cover"
                          sizes="100vw"
                          priority={index === 0}
                        />
                        <div className={styles.quoteWrapper}>
                          <ImQuotesRight className={styles.quoteIcon} />
                        </div>
                      </div>
                      <div className={styles.ratingsMobile}>
                        <GetRatings value={review.score} className={styles.ratingsIcon} />
                      </div>
                      <p className={styles.mobileTitle}>{`"${review.title}"`}</p>
                      <p className={styles.mobileText}>{`"${review.content}"`}</p>
                      <p className={styles.mobileAuthor}>- {review.author}</p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className={styles.navContainer}>
                <button
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  aria-label="Image précédente"
                  className={cn(
                    styles.navBtn,
                    !canScrollPrev ? styles.navBtnDisabled : styles.navBtnEnabled
                  )}
                  type="button"
                >
                  <ChevronLeft className={styles.chevronIcon} />
                </button>
                {reviews.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      styles.dot,
                      current - 1 === index ? styles.dotSelected : styles.dotUnselected
                    )}
                  ></div>
                ))}
                <button
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  aria-label="Image suivante"
                  className={cn(
                    styles.navBtn,
                    !canScrollNext ? styles.navBtnDisabled : styles.navBtnEnabled
                  )}
                  type="button"
                >
                  <ChevronRight className={styles.chevronIcon} />
                </button>
              </div>
          </>
        )}

      </div>
    </section>
  );
}
