"use client";
import React, { FC, useEffect } from 'react';
import { cn } from '@/lib/utils';
import StickyBar from '@/components/navigation/StickyBar';
import NavBar from '@/components/navigation/NavBar';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ExampleStore from '@/components/ExampleStore';
import HowItWorks from '@/components/HowItWorks';
import { Reviews } from '@/components/Reviews';
import { PaymentErrorModal } from '@/components/PaymentErrorModal';
import ExampleCode from '@/components/ExampleCode';
import AnnouncementBar from '@/components/AnnouncementBar';
import ProductImage from '@/components/ProductImage';
import ImagesGallery from '@/components/ImagesGallery'; 
import { Product } from '@/types/types';

interface ProductsProps {
    product: Product;
}

const Products: FC<ProductsProps> = ({product}) => {

    useEffect(() => {
       fetch('/api/pixels-view-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            eventTime: Math.floor(Date.now() / 1000),
            eventSourceUrl: window.location.href,
            userAgent: navigator.userAgent,
            fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
            tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
            content_ids: [product.id],
            content_name: product.title,
            content_type: 'product',
            value: product.priceRange.minVariantPrice.amount,
            currency: 'EUR',
            fbp: document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1],
            })
        });
    }, [product]);

    return (
        <div className='relative'>
            <div className="sticky top-0 w-full z-50">
                <StickyBar />
                <NavBar />
            </div>

            <div className="max-w-screen-xl mx-auto w-full">
                <PaymentErrorModal />
            </div>

            {/* <div className="z-[100] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="p-20 lg:p-32 bg-background rounded-lg shadow-lg">
                    <p className="font-bold uppercase text-foreground">En cours de progression...</p>
                </div>
            </div>
            <div className='blur-xl pointer-events-none'>
            </div> */}
                <div>
                    <section className={cn(
                        "w-full text-left mx-auto", 
                        "lg:grid lg:grid-cols-2"
                    )}>
                        <div className='lg:flex lg:justify-center xl:pl-40 bg-secondary/30 dark:bg-[#324e58] lg:h-screen lg:sticky lg:top-24'>
                            <ImagesGallery
                                images={product?.images.edges ?? []}
                            />
                        </div>
                        <div className={cn("px-4", "lg:pl-10", "xl:pl-20")}>
                            <ProductImage product={product!} />
                        </div>
                    </section>
                </div>
                <ExampleStore />
                <AnnouncementBar />
                <ExampleCode />
                <HowItWorks />
                <Reviews />
                <FAQ />
                <Footer />
               {/*  <Discord /> */}
            {/* <PurchasePopup /> */}
        </div>
    );
};

export default Products;