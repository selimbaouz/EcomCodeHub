"use client"

import { ImageProduct } from "@/types/types";
import { cn } from "@/lib/utils";
import React, { FC, useState } from 'react';
import ImageLoader from "./ImageLoader";

interface ImagesGalleryProps {
    images: ImageProduct[],
}
const ImagesGallery: FC<ImagesGalleryProps> = ({images}) => {
    const [bigImageIndex, setBigImageIndex] = useState(0);
    
    const handleImageClick = (index: number) => {
        setBigImageIndex(index);
    };

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            setBigImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1)); // Précédent
        } else {
            setBigImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0)); // Suivant
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
        const touchStartX = e.touches[0].clientX;

        const handleTouchMove = (event: TouchEvent) => {
            const touchEndX = event.touches[0].clientX;
            const touchDiff = touchStartX - touchEndX;

            if (touchDiff > 50) {
                handleSwipe('right'); // Glisser à droite
                document.removeEventListener('touchmove', handleTouchMove);
            } else if (touchDiff < -50) {
                handleSwipe('left'); // Glisser à gauche
                document.removeEventListener('touchmove', handleTouchMove);
            }
        };

        // Ajoutez un écouteur pour le mouvement
        document.addEventListener('touchmove', handleTouchMove as EventListener);

        // Supprimez l'écouteur lorsque l'événement touche est terminé
        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove as EventListener);
            document.removeEventListener('touchend', handleTouchEnd);
        };
        document.addEventListener('touchend', handleTouchEnd);
    };

    return (
        <div className={cn("flex flex-col gap-3 p-4 max-w-2xl", "lg:py-12")}>
            <div className={cn("relative")}>
                <ImageLoader
                    src={images[bigImageIndex].node.originalSrc ?? ""} // Utilisez l'index pour obtenir l'image
                    alt='Main Images of Bidet-Wc'
                    className={cn('h-[20rem] mx-auto w-full rounded-xl', "xs:h-[26rem]", "md:size-full", 'xl:rounded-xl')}
                    width={images[0].node.width}
                    height={images[0].node.height}
                    onTouchStart={handleTouchStart} // Ajoutez l'événement touch
                />
                <div className="absolute flex justify-center items-center w-full bottom-4 space-x-3 mt-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                'rounded-full cursor-pointer',
                                bigImageIndex === index ? 'bg-primary size-3' : 'bg-foreground dark:bg-background size-2' // Change couleur selon l'état
                            )}
                            onClick={() => handleImageClick(index)} // Changer d'image lors du clic
                        />
                    ))}
                </div>
            </div>
            <div className={cn("flex gap-2 items-center justify-center", "lg:justify-start lg:px-0")}>
                {images.map((image, index) => (
                    <div key={index} className={cn('rounded-lg cursor-pointer')} onClick={() => handleImageClick(index)}>
                        <ImageLoader
                            src={image.node.originalSrc ?? ""}
                            alt='Images of Bidet-Wc'
                            className={cn(
                                'rounded-lg w-auto size-[50px] lg:size-20',
                                'xl:w-full',
                                images[bigImageIndex].node.originalSrc === image.node.originalSrc ? "border-2 border-primary" : "border opacity-50"
                            )}
                            width={image.node.width}
                            height={image.node.height}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImagesGallery;