"use client"
import { cn } from "@/lib/utils";
import { useCartStore, useOpenCartStore } from "@/store/cart";
import Link from "next/link";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Menu } from "@/types/types";
import { FC, useEffect, useState } from "react";
import ToggleMode from "@/components/ToggleMode";
import { useOpenSidebarStore } from "@/store/sidebar";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import ImageLoader from "@/components/ImageLoader";
import Logo from '@/public/images/Logo.png';
import LogoDark from '@/public/images/LogoDark.png';
import { useTheme } from "next-themes";
import { StaticImageData } from "next/image";
import { useIsHydrated } from "@/hook/useIsHydrated";

interface NavBarWebProps {
    menu: Menu[];
    isHome?: boolean;
}
const NavBarWeb: FC<NavBarWebProps> = ({ menu, isHome }) => {
    console.log(menu);
    const {systemTheme, theme} = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const [imageInTheme, setImageInTheme] = useState<StaticImageData>();
    const { cart } = useCartStore();
    const { setIsOpenCart } = useOpenCartStore();
    const { setIsOpenSidebar, isOpenSidebar } = useOpenSidebarStore();

    const isHydrated = useIsHydrated();
    
    useEffect(() => {
        const images = currentTheme === "dark" ? LogoDark : Logo;
        setImageInTheme(images);
    }, [currentTheme])

    if(!isHydrated){
        return;
    }

    if (isHome) {
        return (
            <div className={cn("hidden", "relative max-w-screen-2xl lg:flex lg:justify-between lg:items-center lg:mx-auto lg:py-4")}>
               <div className="flex items-center gap-4">
                    <ImageLoader
                        src={imageInTheme ?? ""}
                        alt='Main Images of Bidet-Wc'
                        className={cn('size-10 rounded-lg')}
                        width={500}
                        height={500}
                    />
                    <Link href="/" className={cn("text-white font-bold cursor-pointer z-50 font-regular", "lg:text-2xl", "xl:text-3xl")}>
                        {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} className={cn("lg:w-32", "xl:w-44")} /> */}
                        Tailwind<span className="text-foreground">Liquid</span>
                    </Link>
                </div>
                <div className={cn("flex gap-4 items-center")}>
                    <ToggleMode />
                    <div 
                        onClick={() => setIsOpenSidebar(true)}
                        className={cn("cursor-pointer bg-foreground flex items-center gap-3 text-background py-3 px-6 rounded-full", "hover:bg-primary", isOpenSidebar && "bg-primary")}
                    >
                        <p className={cn("text-sm", "3xl:text-xl")}>menu</p>
                        <HiOutlineMenuAlt4 className={cn("text-lg uppercase text-background", "sm:text-xl", "3xl:text-2xl")} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={cn("hidden", "relative max-w-screen-xl lg:p-6 lg:flex lg:justify-between lg:items-center lg:mx-auto lg:py-2 lg:h-20", "xl:px-0")}>
            <div className="flex items-center gap-4">
                <ImageLoader
                    src={imageInTheme ?? ""}
                    alt='Main Images of Bidet-Wc'
                    className={cn('size-8 rounded-lg')}
                    width={500}
                    height={500}
                />
                <Link href="/" className={cn("text-foreground font-bold cursor-pointer z-50 font-regular", "lg:text-xl", "xl:text-2xl")}>
                    {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} className={cn("lg:w-32", "xl:w-44")} /> */}
                    Tailwind<span className="text-primary">Liquid</span>
                </Link>
            </div>
            <div className={cn("flex gap-2 items-center")}>
                <ToggleMode />
                <div 
                    className="relative p-2 cursor-pointer group" 
                    onClick={() => setIsOpenCart(true)}
                >
                    <RiShoppingBag3Fill 
                        className={cn("text-3xl text-foreground group-hover:text-primary transition-all ease-in-out hover:scale-110", "lg:text-2xl", "xl:text-3xl")}  
                    />
                    {cart.quantity ? (
                        <div className="absolute right-0 top-0 -mr-2 -mt-2 size-6 flex justify-center items-center rounded-full bg-primary text-[11px] font-bold text-white">
                            {cart.quantity}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default NavBarWeb;