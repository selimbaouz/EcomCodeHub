"use client";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import ImageLoader from "./ImageLoader";
import { MdClose } from "react-icons/md";
import { useTranslations } from "next-intl";
import { ExampleStoreData, ProductImage } from "@/types/product";

const ExampleStore = ({
  data: exampleStoreData,
}: {
  data: ExampleStoreData;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const images = exampleStoreData.images;
  const [selectedImage, setSelectedImage] = useState<ProductImage>();
  const clonedImages = [...images, ...images];
  const totalSlides = images.length;
  const t = useTranslations("fe");

  useEffect(() => {
    if (!api) {
      return;
    }

    if (api) {
      api.reInit(); // Réinitialise Embla après rendu
    }
    const updateCurrent = () => {
      const selectedIndex = api.selectedScrollSnap();
      const normalizedIndex = (selectedIndex + totalSlides) % totalSlides;
      setCurrent(normalizedIndex);
    };

    updateCurrent(); // Initialisation
    api.on("select", updateCurrent); // Mettre à jour lors de changements

    return () => {
      api.off("select", updateCurrent); // Nettoyage
    };
  }, [api, totalSlides]);

  return (
    <div>
      <section
        className={cn(
          "px-4 relative py-10 space-y-4 text-center mx-auto text-2xl font-bold",
          "lg:text-3xl lg:py-20 lg:px-0",
          "xl:text-4xl"
        )}
      >
        <div className={cn("space-y-3 pb-4 max-w-screen-lg mx-auto")}>
          <h3 className="mx-auto xl:text-6xl uppercase">
            {t(exampleStoreData.title as string)}
          </h3>
          <p className="text-base font-medium lg:text-xl max-w-5xl mx-auto">
            {t(exampleStoreData.subtitle as string)}
          </p>
          <p className="text-sm font-normal">
            {t(exampleStoreData.instructions as string)}
          </p>
        </div>
        <div className="lg:h-[650px]">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "center",
            }}
            className={cn("w-full cursor-pointer mx-auto max-w-screen-lg")}
          >
            <CarouselContent>
              {clonedImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="lg:basis-1/3 flex items-center py-6 lg:py-14 w-[calc(100%/3)] flex-shrink-0"
                >
                  <div
                    onClick={() => setSelectedImage(image)}
                    className={cn(
                      "cursor-pointer p-2 w-96 rounded-2xl mx-auto border border-gray-300 shadow-lg h-[550px]",
                      "lg:transition-all lg:duration-700 lg:ease-in-out lg:transform",
                      current === index % totalSlides
                        ? "lg:h-[550px] lg:scale-[1.1] lg:translate-y-[-10px]"
                        : "lg:h-[450px] lg:scale-[0.95] lg:translate-y-[0]"
                    )}
                  >
                    <div
                      className={cn(
                        "relative w-full h-full overflow-hidden rounded-xl",
                        "lg:translate-y-[0]",
                        "lg:transition-transform lg:duration-500 lg:ease-in-out"
                      )}
                    >
                      <ImageLoader
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        className={cn(
                          "w-full h-full object-cover object-top bg-top"
                        )}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden bg-primary hover:bg-primary/80 border-none hover:text-white text-white left-4 lg:left-24 lg:size-10 lg:flex" />
            <CarouselNext className="hidden bg-primary hover:bg-primary/80 border-none hover:text-white text-white right-4 lg:right-24 lg:size-10 lg:flex" />
          </Carousel>
        </div>
        <div className={cn("flex items-center gap-2 justify-center pt-4")}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "rounded-full size-3",
                current === index ? "bg-primary" : "bg-secondary/30"
              )}
            ></div>
          ))}
        </div>
      </section>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl overflow-hidden scrollbar-hidden overflow-y-hidden overscroll-none overscroll-y-none"
          onClick={() => setSelectedImage(undefined)}
        >
          <button
            onClick={() => setSelectedImage(undefined)}
            className="top-4 right-4 fixed z-50 bg-black/50 backdrop-blur-xl text-white rounded-full p-1 text-4xl font-bold"
          >
            <MdClose className="text-3xl" />
          </button>
          <div
            className={cn(
              "relative max-h-[100%] max-w-[100%] lg:max-h-[90vh] overflow-y-auto",
              "lg:p-2 lg:rounded-2xl lg:bg-white"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <ImageLoader
              width={selectedImage.width}
              height={selectedImage.height}
              src={selectedImage.src}
              alt={`Agrandir`}
              loading="lazy"
              className={cn(
                "cursor-pointer mx-auto",
                "lg:w-96 lg:bg-gray-200 lg:rounded-2xl"
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleStore;
