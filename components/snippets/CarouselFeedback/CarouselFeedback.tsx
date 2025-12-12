"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./carousel-feedback.module.css";

const feedbacks = [
  {
    image:
      "https://res.cloudinary.com/ecomcodehub/image/upload/v1747998469/image-feedback1_vo5vbf.png",
    rating: 4.5,
    comment:
      "Après quelques jours, je remarque une vraie amélioration. Facile à utiliser et très pratique au quotidien.",
    author: "Alexandre R.",
  },
  {
    image:
      "https://res.cloudinary.com/ecomcodehub/image/upload/v1747998469/image-feedback2_do30gr.png",
    rating: 5,
    comment:
      "Très satisfait ! Produit conforme aux attentes, livraison rapide. Je recommande sans hésiter.",
    author: "Marion P.",
  },
  {
    image:
      "https://res.cloudinary.com/ecomcodehub/image/upload/v1747998469/image-feedback3_rqtddy.png",
    rating: 4.5,
    comment:
      "Un excellent rapport qualité-prix. L'expérience d'achat a été fluide du début à la fin.",
    author: "Thomas B.",
  },
];

export default function CarouselFeedback() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.7; // Plus petit = plus lent

    const animate = () => {
      setOffset((prev) => {
        if (!wrapperRef.current) return prev;

        const totalWidth = wrapperRef.current.scrollWidth / 2;
        const newOffset = (prev + speed) % totalWidth;
        return newOffset;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        ref={wrapperRef}
        className={cn("flex gap-6", styles.carousel)}
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {[...feedbacks, ...feedbacks].map((feedback, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex w-[300px] rounded-2xl overflow-hidden shadow-md bg-white"
          >
            <img
              src={feedback.image}
              alt="Avis client"
              className="w-1/2 h-auto object-cover"
            />
            <div className="flex flex-col justify-between bg-blue-100 p-4 w-1/2">
              <div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      {i < Math.floor(feedback.rating)
                        ? "★"
                        : i < feedback.rating
                          ? "☆"
                          : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-medium text-gray-700">
                  {feedback.comment}
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold">{feedback.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
