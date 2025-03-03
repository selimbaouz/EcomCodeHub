import * as React from "react"
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  /* CarouselNext,
  CarouselPrevious, */
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import GetRatings from "@/lib/fn"
import { FaCircleCheck } from "react-icons/fa6"
import { bestReviewsData } from "@/data"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import AvatarCircles from "../ui/avatar-circles";
import { Button } from "../ui/button";

export function BestReviews({productPage}: {productPage?: boolean}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  
  React.useEffect(() => {
    if (!api) {
      return
    }
    
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  return (
    <div>
      <Carousel 
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        setApi={setApi} 
        className={cn("w-full cursor-pointer mx-auto", productPage ? "min-w-full" : "max-w-xs", "md:max-w-lg", "lg:max-w-xs", "xl:max-w-md", "3xl:max-w-xl")}>
        <CarouselContent>
          {bestReviewsData.map((data, index) => (
            <CarouselItem key={index}>
              <div className={cn("bg-background border dark:border-gray-200/10 rounded-2xl p-4 flex flex-col gap-4", "xl:px-6 xl:py-8")}>
                <div className={cn("flex items-center gap-3")}>
                    <AvatarCircles 
                        avatarUrls={data.picture} 
                        classNameImage="size-12"
                    />
                    <div>
                        <div className={cn("flex items-center gap-2")}>
                            <h6 className={cn("font-bold text-lg", "xl:text-2xl", "3xl:text-3xl")}>{data.name}</h6>
                            <div className={cn("flex gap-1 items-center")}>
                                <div className="p-1">
                                    <FaCircleCheck className={cn("text-primary text-sm", "xl:text-base", "3xl:text-xl")} />
                                </div>
                                <p className={cn("text-xs", "xl:text-sm", "3xl:text-lg")}>Avis vérifié</p>
                            </div>
                        </div>
                        <GetRatings value={data.rating} className={cn("text-xs text-primary", "sm:text-sm", "md:text-lg", "xl:text-base", "3xl:text-xl")} />
                    </div>
                </div>
                <p className={cn("text-sm text-left", "3xl:text-base")}>“{data.content}”</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className={cn("w-full flex justify-between gap-2 pt-4", productPage ? "min-w-full" : "md:max-w-lg mx-auto")}>
        <div className={cn("flex items-center gap-2")}>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "size-6 rounded-full text-primary dark:border-gray-200/10", "xl:size-8", "3xl:size-10"
            )}
            disabled={current === 1}
            onClick={scrollPrev}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "size-6 rounded-full text-primary dark:border-gray-200/10", "xl:size-8", "3xl:size-10"
            )}
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
                  className={cn("rounded-full w-8 py-1", "xl:w-10", "3xl:w-14", current - 1 === index ? "bg-primary" : "bg-gray-200")}
                  >
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}
