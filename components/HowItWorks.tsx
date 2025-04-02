import { cn } from '@/lib/utils';
import React from 'react';
import { HowItWorks1, HowItWorks2 } from '@/data';
import ImageLoader from './ImageLoader';
import Demo from "@/public/images/demo-video.gif";

const HowItWorks = () => {
    return (
        <section className={cn(
            "bg-background px-4 relative py-10 space-y-4 text-center mx-auto text-2xl font-bold", 
            "lg:text-3xl lg:py-20 lg:px-0", 
            "xl:text-4xl",
            )}>
            <div className={cn("space-y-3 pb-4 max-w-screen-xl mx-auto")}>
                <h3 className="mx-auto xl:text-6xl">
                Fini les thèmes hors de prix
                </h3>
                <p className="text-base font-medium lg:text-xl max-w-5xl mx-auto">La solution abordable pour un design haut de gamme</p>
                <div className={cn("flex flex-col", "lg:flex-row lg:items-center lg:justify-between")}>
                    <ul className={cn("order-2 flex flex-col gap-4", "lg:order-1")}>
                        {HowItWorks1.map((data, index) => (
                            <li key={index} className={cn("bg-secondary/30 flex w-max px-2 py-1 gap-2 items-center text-center dark:text-white dark:bg-[#2c4049] rounded-lg")}>
                                <data.icon className={cn("text-lg lg:text-xl text-foreground rounded-lg")} />
                                <p className={cn("text-xs lg:text-base text-foreground font-medium", "xs:text-sm")}>{data.title}</p>
                            </li>
                        ))}
                    </ul>
                    <div className={cn("order-1 relative z-10 space-y-6 py-6", "md:h-[433px] md:w-[661px] md:mx-auto", "lg:order-2 lg:space-y-10 lg:pt-10 lg:size-full lg:max-w-2xl")}>
                        <ImageLoader 
                            height={Demo.height} 
                            width={Demo.width} 
                            src={Demo.src} 
                            alt="Gif who show how it works"
                            className='border rounded-2xl h-full'
                        />
                        <p className="text-base lg:text-xl font-medium max-w-5xl mx-auto">C{"'"}est incroyablement facile à ajouter sur votre boutique, vous verrez des améliorations instantanément</p>
                    </div>
                    <ul className={cn("order-3 flex flex-col pt-4 gap-4", "lg:pt-0")}>
                        {HowItWorks2.map((data, index) => (
                            <li key={index} className={cn("bg-secondary/30 flex w-max px-2 py-1 gap-2 items-center text-center dark:text-white dark:bg-[#2c4049] rounded-lg")}>
                                <data.icon className={cn("text-lg lg:text-xl text-foreground rounded-lg")} />
                                <p className={cn("text-xs lg:text-base text-foreground font-medium", "xs:text-sm")}>{data.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;