"use client";

import { cn } from "@/lib/utils";
import { useCartStore, useOpenCartStore } from "@/store/cart";
import Logo from '@/public/images/Logo.png';
import LogoDark from '@/public/images/LogoDark.png';
import { RiShoppingBag3Fill } from "react-icons/ri";
import ToggleMode from "@/components/ToggleMode";
import ImageLoader from "@/components/ImageLoader";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useIsHydrated } from "@/hook/useIsHydrated";

const NavBarMobile = () => {
    const { cart } = useCartStore();
    const { setIsOpenCart } = useOpenCartStore();
    const {systemTheme, theme} = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const [imageInTheme, setImageInTheme] = useState<StaticImageData>();

    const isHydrated = useIsHydrated();
    
    useEffect(() => {
        const images = currentTheme === "dark" ? LogoDark : Logo;
        setImageInTheme(images);
    }, [currentTheme])

    if(!isHydrated){
        return;
    }
    
    return (
        <div className={cn("px-3 py-2 flex justify-between items-center max-w-screen-2xl mx-auto", "md:p-4", "lg:hidden")}>
            <div className="flex items-center gap-2">
                <ImageLoader
                        src={imageInTheme ?? ""}
                        alt='Main Images of Bidet-Wc'
                        className={cn('size-8 rounded-lg')}
                        width={500}
                        height={500}
                    />
                    <Link href="/" className="xs:absolute xs:left-1/2 xs:transform xs:-translate-x-1/2 cursor-pointer text-lg font-bold xs:text-xl sm:text-2xl">
                {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} /> */}
                Tailwind<span className="text-primary">Liquid</span>
            </Link>
            </div>
            <div className={cn("flex gap-0.5 items-center")}>
                <ToggleMode />
                <div 
                    className="relative p-2 cursor-pointer group" 
                    onClick={() => setIsOpenCart(true)}
                >
                    <RiShoppingBag3Fill
                        className={cn("text-3xl text-foreground group-hover:text-primary transition-all ease-in-out hover:scale-110", "sm:text-3xl", "lg:text-2xl", "xl:text-3xl")}  
                    />
                    {cart.quantity ? (
                        <div className="absolute right-0 top-0 -mr-1 -mt-1 size-5 flex justify-center items-center rounded-full bg-primary text-[11px] font-medium text-white">
                            {cart.quantity}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default NavBarMobile;