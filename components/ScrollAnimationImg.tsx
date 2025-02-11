'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import ImageLoader from './ImageLoader'; // Remplacez par votre composant ou utilisez `next/image`.

interface ScrollAnimationImgProps {
  images: {
    title: string;
    content: string;
    src: string;
    width: number;
    height: number;
  }[];
}

export default function ScrollAnimation({ images }: ScrollAnimationImgProps) {
  const [activeImage, setActiveImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Centrer l'image au chargement
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
      {/* Conteneur principal */}
      <div className="flex h-full">
        {/* Section gauche avec image fixe */}
        <div className="sticky top-0 w-1/3 h-screen flex items-center justify-center max-w-screen-xl mx-auto text-center">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageLoader
              src={images[activeImage].src}
              alt={`Image ${activeImage + 1}`}
              width={images[activeImage].width}
              height={images[activeImage].height}
              className="rounded-lg"
            />
          </motion.div>
        </div>

        {/* Section droite avec texte défilant */}
        <div className="w-2/3 h-screen overflow-y-scroll scrollbar-hidden">
          {images.map((section, index) => (
            <InView
              key={index}
              threshold={0.5} // Déclenche lorsque 50% de l'élément est visible
              onChange={(inView) => inView && setActiveImage(index)}
            >
              <motion.div
                className="min-h-screen flex flex-col justify-center px-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
                <p className="text-lg">{section.content}</p>
              </motion.div>
            </InView>
          ))}
        </div>
      </div>
    </div>
  );
}
