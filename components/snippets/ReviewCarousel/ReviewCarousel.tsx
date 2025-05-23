"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './review-carousel.module.css';

const slides = [
  {
    title: "Un produit qui fait la différence",
    description: "Conçu pour améliorer votre quotidien avec simplicité et efficacité. Découvrez une expérience d'utilisation unique à chaque instant.",
  },
  {
    title: "Qualité et fiabilité au rendez-vous",
    description: "Des matériaux sélectionnés avec soin et des finitions irréprochables pour vous offrir le meilleur, jour après jour.",
  },
  {
    title: "Approuvé par nos clients",
    description: "Des milliers d'utilisateurs nous font confiance. Rejoignez une communauté satisfaite qui ne cesse de grandir.",
  }
];

const ReviewCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    setCurrentSlide(newIndex);
  };

  return (
    <section className={cn(styles.section)}>
      <div className={cn(styles.sliderContainer)}>
        <div 
          className={cn(styles.slider)} 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className={cn(styles.slide)}>
              <h2 className={cn(styles.title)}>{slide.title}</h2>

              <div className={cn(styles.stars)}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#4abf8e" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>

              <p className={cn(styles.description)}>{slide.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={cn(styles.pagination)}>
        <button onClick={prevSlide} className={cn(styles.arrow)}>←</button>
        <span className={cn(styles.pageNumber)}>{currentSlide + 1} / {slides.length}</span>
        <button onClick={nextSlide} className={cn(styles.arrow)}>→</button>
      </div>
    </section>
  );
};

export default ReviewCarousel;
