"use client";
import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import HeaderImg from '@/public/images/header.png';
import ImageLoader from './ImageLoader';
import NavBar from './navigation/NavBar';
import { Menu } from '@/types/types';
import StickyBar from './navigation/StickyBar';
import { AvatarCirclesPeople } from './AvatarCircles';
import { BestReviews } from './BestReviews';

interface HeaderProps {
    menu: Menu[];
}
const Header:FC<HeaderProps> = ({menu}) => {
    return (
        <header className={cn('h-[100dvh]')}>
            <div className={cn("hidden lg:block")}>
                <StickyBar />
            </div>
            <div className={cn('p-4 text-center py-14 space-y-8 mx-auto max-w-screen-2xl h-[95dvh] z-10', "lg:flex lg:justify-between lg:p-2 lg:py-0 lg:space-y-0 lg:text-left", "3xl:max-w-screen-3xl")}>
                <div className={cn("lg:flex lg:flex-col lg:justify-between lg:px-4 xl:px-10 lg:w-[90%]", "xl:w-[70%]")}>
                    <div className={cn("hidden", "lg:block")}>
                        <NavBar isHome menu={menu} />
                    </div>
                    <div className={cn("space-y-8 px-2", "sm:px-10", "lg:px-0 lg:w-[90%]")}>
                        <h1 className={cn('uppercase font-medium text-2xl leading-tight', "md:text-4xl md:leading-[1.2]", "lg:text-5xl", "xl:text-6xl xl:leading-tight", "3xl:text-8xl 3xl:leading-snug")}>
                            La ceinture qui{" "}
                            <span className='text-primary font-bold'>
                                Protège Maman & Bébé
                            </span> {" "}
                            efficacement
                        </h1>
                        <p className={cn("text-sm font-regular", "lg:text-base lg:max-w-2xl", "xl:text-xl", "3xl:text-2xl 3xl:max-w-3xl")}>
                        Développée après des tests rigoureux en laboratoire, cette ceinture offre une protection maximale durant la grossesse.
                        </p>
                        <Button className={cn(
                            "uppercase bg-foreground px-[60px] py-[24px] rounded-full text-background text-xs font-medium w-max", "sm:text-sm", "3xl:text-lg",
                            "hover:bg-primary",
                        )}
                            asChild
                        >
                            <Link href={"/products/wesecure"}>
                            Découvrir
                            </Link>
                        </Button>
                    </div>
                    <div className={cn("hidden", "lg:pb-4 lg:flex lg:justify-between lg:items-end")}>
                        <div className={cn("flex items-center font-medium gap-2 pb-10 text-sm", "xl:text-base", "3xl:text-xl")}>
                            <AvatarCirclesPeople classNameImage='size-8 3xl:size-20' />
                            <p>Recommander par<br />
                            <span className='font-bold text-primary'> +46</span> mamans</p>
                        </div> 
                        <BestReviews />
                    </div>
                </div>
                <div className={cn("pt-10", "lg:py-4")}>
                    <ImageLoader
                            src={HeaderImg ?? ""} // Utilisez l'index pour obtenir l'image
                            alt='Main Images of Bidet-Wc'
                            className={cn('h-full rounded-[20px] mx-auto w-full', "md:hidden", "lg:block lg:h-full lg:w-full lg:mx-0")}
                            width={397}
                            height={595}
                        />
                </div>
                <div className='space-y-6 pb-10 lg:hidden'>
                    <div className={cn("flex text-nowrap items-center font-medium gap-2 text-xs justify-center", "sm:text-sm", "lg:text-wrap lg:gap-4 lg:text-lg lg:hidden")}>
                        <AvatarCirclesPeople classNameImage='size-8' />
                        <p>Recommander par<br className={cn("hidden", "lg:block")} />
                        <span className='font-bold text-primary'>+46</span> mamans</p>
                    </div> 
                    <BestReviews />
                </div>
            </div>
        </header>
    );
};

export default Header;