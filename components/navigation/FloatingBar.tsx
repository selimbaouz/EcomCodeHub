"use client";
import GetRatings from '@/lib/fn';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { AddToCart } from '../cart/add-to-cart';
import { Product } from '@/types/types';
import { FiPlus } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { useOpenCartStore, useVisibleFloatingCartStore } from '@/store/cart';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useOpenSidebarStore } from '@/store/sidebar';
import Link from 'next/link';
import { useIsHydrated } from '@/hook/useIsHydrated';

interface FloatingBarProps {
    product: Product;
}
const FloatingBar: FC<FloatingBarProps> = ({
    product
}) => {
    const { isVisible, isOpenFloatingBar, setIsOpenFloatingBar } = useVisibleFloatingCartStore();
    const { isOpenCart } = useOpenCartStore();
    const { isOpenSidebar } = useOpenSidebarStore();
    const isHydrated = useIsHydrated();
    
    if (!isHydrated) {
        return null;
      }

    return (
        <motion.div className={cn('sticky bottom-10 z-[100] mx-auto w-max', "lg:max-w-screen-md lg:w-auto lg:mx-auto", isOpenFloatingBar && "w-full px-4")}>
            <motion.div 
             initial={{ y: 100 }}
             animate={isVisible ? { y: 100 } : { y: 0 }}
             exit={{ y: 100 }}
             transition={{ duration: 0.3 }}
            className={cn('-mt-14', "lg:flex lg:justify-center")}>
                <button
                    className={cn(
                        "rounded-full text-base p-2 hover:backdrop-blur-md hover:bg-background/75 bg-foreground hover:border-foreground border border-transparent hover:text-foreground text-white font-bold",
                        isOpenFloatingBar && "hidden",
                        isOpenCart && "hidden",
                        isOpenSidebar && "hidden"
                    )}
                    onClick={() => setIsOpenFloatingBar(true)}
                >
                    <FiPlus className={cn("text-4xl font-bold")} />
                </button>
            </motion.div>
            {isOpenFloatingBar && (
                <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "-mt-32 z-50 relative shadow-md shadow-black p-[1px] bg-gradient-to-b from-foreground to-[#2D3748] rounded-3xl", 
                    isOpenCart && "hidden",
                    isOpenSidebar && "hidden"
                )}>
                    <CgClose className='absolute top-4 right-4 text-2xl z-50 text-white cursor-pointer' onClick={() => setIsOpenFloatingBar(false)}/>
                    <div className={cn("rounded-3xl p-4 bg-gradient-to-b from-[#171923] to-[#11121A] text-white relative flex flex-col justify-center")}>
                        <div className={cn("flex items-center gap-6")}>
                            <Image src={product.images.edges[0].node.originalSrc} alt="Image of Product" width={1080} height={1080} className="w-max size-14 rounded-2xl object-contain" />
                            <div className={cn("space-y-0.5")}>
                                <h6 className={cn("uppercase font-bold text-2xl", "lg:text-3xl")}>
                                    {product.title}
                                </h6>
                                <div className={cn("flex items-center gap-2")}>
                                    <GetRatings value={5} className={cn("text-sm text-yellow-400", "md:text-md")} />
                                    <Link href="#avis" className={cn("hidden font-light text-sm xs:block underline")}>
                                        4.8/5 sur <span className="font-bold">319 avis</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='py-4'>
                            <div className='border absolute w-full border-foreground left-0'/>
                        </div>
                        <div className={cn("flex items-center justify-between")}>
                            <div className={cn("flex items-end gap-2", "lg:gap-3")}>
                                <p className={cn("line-through text-2xl")}>
                                    79.99 €
                                </p>
                                <p className={cn("font-semibold text-2xl")}>
                                    {product.priceRange.minVariantPrice.amount} €
                                </p>
                            </div>
                            <AddToCart product={product} color='foreground' />
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default FloatingBar;