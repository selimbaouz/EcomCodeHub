"use client";
import { cn } from '@/lib/utils';
import React from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import Image1 from "@/public/images/transformationimg1.png";
import Image2 from "@/public/images/transformationimg2.png";

const Transformations = () => {
    return (    
        <div className={cn("max-w-2xl mx-auto")}>
            <ReactBeforeSliderComponent
                firstImage={{
                    imageUrl: Image1.src,
                    alt: "First Image",
                }}
                secondImage={{
                    imageUrl: Image2.src,
                    alt: "Second Image"
                }}
                className={cn("custom-slider")}
                delimiterIconStyles={{
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="none" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" transform="rotate(90)"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg>')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    width: '35px',
                    height: '35px',
                    cursor: 'pointer',
                }}
                delimiterColor="#2c4049"
            />
        </div>
    );
};

export default Transformations;