"use client";
import Image, { StaticImageData } from 'next/image';
import React, { FC, useState } from 'react';
import { PulseLoader } from 'react-spinners';

interface ImageLoaderProps {
    src: string | StaticImageData;
    alt: string;
    width: number;
    height: number;
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; 
}
const ImageLoader: FC<ImageLoaderProps> = ({
    src,
    alt,
    width,
    height,
    className,
    ...props
}) => {
    const [loading, setLoading] = useState(true);
    return (
        <div className="relative w-full h-full">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <PulseLoader color="foreground" size={10} />
          </div>
        )}
  
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setLoading(false)} // Une fois l'image chargée, enlever le loader
          className={`${className} transition-opacity duration-500 ease-in-out ${
            loading ? 'opacity-50' : 'opacity-100'
          }`}
          {...props}
        />
      </div>
    );
};

export default ImageLoader;