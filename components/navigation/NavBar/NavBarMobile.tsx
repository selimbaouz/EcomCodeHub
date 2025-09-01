"use client";

import { cn } from "@/lib/utils";
import { useCartStore, useOpenCartStore } from "@/store/cart";
import { RiShoppingBag3Fill } from "react-icons/ri";
import Link from "next/link";
import { useIsHydrated } from "@/hook/useIsHydrated";
import { User } from "next-auth";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useOpenSidebarStore } from "@/store/sidebar";
import { useOpenAccountStore } from "@/store/account";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useLocale } from "next-intl";

interface NavBarMobileProps {
    isAccount?: boolean;
}
const NavBarMobile = ({
    isAccount
}: NavBarMobileProps) => {
    const { cart } = useCartStore();
    const { setIsOpenCart } = useOpenCartStore();
    const { setIsOpenSidebar } = useOpenSidebarStore();
    const { setIsOpenAccount } = useOpenAccountStore();
    const router = useRouter();
    const locale = useLocale();
    const isHydrated = useIsHydrated();

    if(!isHydrated){
        return;
    }

    if(isAccount) {
        return (
            <div className={cn("px-3 py-4 flex justify-between items-center max-w-screen-2xl mx-auto", "md:p-4", "lg:hidden")}>
                <div className="flex items-center gap-2">
                <div 
                    onClick={() => setIsOpenSidebar(true)}
                >
                    <HiOutlineMenuAlt4 className={cn("text-2xl uppercase text-foreground hover:text-foreground", "xs:text-3xl")} />
                </div>
                        <Link href="/" className="xs:absolute xs:left-1/2 xs:transform xs:-translate-x-1/2 cursor-pointer text-lg font-bold xs:text-xl sm:text-2xl">
                    {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} /> */}
                    Tailwind<span className="text-primary">Liquid</span>
                </Link>
                </div>
                <div className={cn("flex items-center gap-2")}>
                    {/* <ToggleMode /> */}
                    <LocaleSwitcher locale={locale} />
                    <div className={cn("cursor-pointer flex items-center gap-1")}>
                        <CgProfile className="text-3xl" onClick={() => {
                            router.push("/account"); 
                            setIsOpenAccount(false);
                        }} />
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className={cn("px-3 py-2 flex justify-between items-center max-w-screen-2xl mx-auto", "md:p-4", "lg:hidden")}>
            <div className="flex items-center gap-2">
                <div 
                    onClick={() => setIsOpenSidebar(true)}
                >
                    <HiOutlineMenuAlt4 className={cn("text-2xl uppercase text-foreground hover:text-foreground", "xs:text-3xl")} />
                </div>
                    <Link href="/" className="xs:absolute xs:left-1/2 xs:transform xs:-translate-x-1/2 cursor-pointer text-lg font-bold xs:text-xl sm:text-2xl">
                {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} /> */}
                Tailwind<span className="text-primary">Liquid</span>
            </Link>
            </div>
            <div className={cn("flex gap-2 items-center")}>
                <LocaleSwitcher locale={locale} />
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