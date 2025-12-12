"use client";
import { useState, useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import styles from "./expert-reviews-carousel.module.css";
import Image from "next/image";

const slides = [
  {
    img: "https://res.cloudinary.com/ecomcodehub/image/upload/v1749314061/Oprah_Daily_iwgloo.webp",
    alt: "Oprah Daily",
  },
  {
    img: "https://res.cloudinary.com/ecomcodehub/image/upload/v1749314061/Good_Housekeeping_1_gkb8cu.webp",
    alt: "Good Housekeeping",
  },
  {
    img: "https://res.cloudinary.com/ecomcodehub/image/upload/v1749314061/Good_Housekeeping_vhoaju.webp",
    alt: "Healthline",
  },
  {
    img: "https://res.cloudinary.com/ecomcodehub/image/upload/v1749314061/Byrdie_sk7mhc.webp",
    alt: "Byrdie",
  },
  {
    img: "https://res.cloudinary.com/ecomcodehub/image/upload/v1749314061/Well___Good_nttily.webp",
    alt: "Well & Good",
  },
];

const reviews = [
  {
    text: "“The 13 Best Vegan Protein Powders, Evaluated by Registered Dietitians”",
    source: "Good Housekeeping",
  },
  {
    text: "“Best adaptogenic protein powder. The ingredients are all certified organic and third-party tested.”",
    source: "BYRDIE",
  },
  {
    text: "“A trusted brand with clean ingredients and excellent flavor profile for post-workout recovery.”",
    source: "Healthline",
  },
  {
    text: "“The best-tasting plant-based protein powder we've tried, with a creamy texture and natural sweetness.”",
    source: "Oprah Daily",
  },
  {
    text: "“A clean, effective protein powder that supports overall wellness and tastes great.”",
    source: "Well & Good",
  },
];

export default function ExpertReviewsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    setScrollSnaps(api.scrollSnapList());
    api.on("select", onSelect);
  }, [api, onSelect]);

  const scrollTo = (idx: number) => api?.scrollTo(idx);

  return (
    <section className={styles.section}>
      <div className={styles.textNav}>
        <span className={styles.badge}>BACKED BY EXPERTS</span>
        <div className={styles.reviewSlide}>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={styles.star}
                viewBox="0 0 16 15"
                fill="currentColor"
              >
                <path d="M8 0L9.8 5.5H15.6L10.9 8.9L12.7 14.5L8 11.1L3.3 14.5L5.1 8.9L0.4 5.5H6.2L8 0Z" />
              </svg>
            ))}
          </div>
          <p className={styles.reviewText}>{reviews[selected].text}</p>
          <span className={styles.reviewSource}>
            {reviews[selected].source}
          </span>
        </div>
        <div className={styles.navBtns}>
          <button
            className={styles.btnPrev}
            aria-label="Précédent"
            onClick={() => scrollTo(selected - 1)}
          >
            <svg
              width="27"
              height="14"
              viewBox="0 0 27 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path
                d="M1.5 7L25.5 7M25.5 7C25.5 7 21.6645 6.02872 19.6875 4.85714C17.7105 3.68557 15.375 1 15.375 1M25.5 7C25.5 7 21.6645 7.97129 19.6875 9.14286C17.7105 10.3144 15.375 13 15.375 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className={styles.btnNext}
            aria-label="Suivant"
            onClick={() => scrollTo(selected + 1)}
          >
            <svg
              width="27"
              height="14"
              viewBox="0 0 27 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 7L25.5 7M25.5 7C25.5 7 21.6645 6.02872 19.6875 4.85714C17.7105 3.68557 15.375 1 15.375 1M25.5 7C25.5 7 21.6645 7.97129 19.6875 9.14286C17.7105 10.3144 15.375 13 15.375 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.carouselWrapper}>
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
            skipSnaps: false,
            slidesToScroll: 1,
            containScroll: false,
          }}
          className={styles.emblaRoot}
        >
          <CarouselContent className={styles.emblaContainer}>
            {slides.map((slide, idx) => (
              <CarouselItem
                key={idx}
                className={`${styles.emblaSlide} ${
                  selected === idx ? styles.slideMain : styles.slideSide
                }`}
              >
                <Image
                  src={slide.img}
                  alt={slide.alt}
                  width={404}
                  height={538}
                  loading="lazy"
                  className={styles.slideImg}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
