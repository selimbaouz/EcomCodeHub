import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import ImageLoader from './ImageLoader';

interface ImageTextProps {
    title: string;
    content: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    inverse?: boolean;
}

const ImageText: FC<ImageTextProps> = ({
    title,
    content,
    src,
    alt,
    width,
    height,
    className,
    inverse
}) => {
    return (
        <section className={cn("p-4 bg-background max-w-screen-xl mx-auto flex flex-col gap-4", "lg:py-20 lg:grid lg:grid-cols-2 lg:grid-auto-flow-dense lg:gap-4 lg:items-center lg:justify-between", className)}>
            <div className={cn(inverse ? "lg:order-2" : "lg:order-1")}>
                <ImageLoader
                    src={src ?? ""}
                    alt={alt}
                    className={cn('bg-white h-[20rem] mx-auto w-full rounded-2xl', "xs:h-[26rem]", "md:h-[40rem]")}
                    width={width}
                    height={height}
                />
            </div>
            <div className={cn("space-y-4 p-4", "lg:space-y-6 max-w-lg mx-auto", inverse ? "lg:order-1" : "lg:order-2")}>
                <h3 className={cn("font-medium text-2xl", "lg:text-4xl")}>
                    {title}
                </h3>
                <p className={cn("text-base", "lg:text-base")}>
                    {content}
                </p>
            </div>
        </section>
    );
};

export default ImageText;