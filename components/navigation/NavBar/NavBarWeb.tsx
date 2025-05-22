"use client"
import { cn } from "@/lib/utils";
import { useCartStore, useOpenCartStore } from "@/store/cart";
import Link from "next/link";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Menu, UserType } from "@/types/types";
import { FC, useEffect, useState } from "react";
import ImageLoader from "@/components/ImageLoader";
import Logo from '@/public/images/Logo.png';
import LogoDark from '@/public/images/LogoDark.png';
import { useTheme } from "next-themes";
import { StaticImageData } from "next/image";
import { useIsHydrated } from "@/hook/useIsHydrated";
import { User } from "next-auth";
import MenuDropdown from "../MenuDropdown";
import { signOut } from "next-auth/react";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { useModalStore } from "@/store/plans";

interface NavBarWebProps {
    menu: Menu[];
    isAccount?: boolean;
    currentUser: User | undefined;
    user?: UserType | null;
}
const NavBarWeb: FC<NavBarWebProps> = ({ menu, isAccount = false, currentUser, user }) => {
    const classLink = "font-light text-foreground text-base hover:text-primary";
    const {systemTheme, theme} = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const [imageInTheme, setImageInTheme] = useState<StaticImageData>();
    const { cart } = useCartStore();
    const { setIsOpenCart } = useOpenCartStore();
    const router = useRouter();
    const isHydrated = useIsHydrated();
    const pathname = usePathname();
    const {setModeSelected} = useModalStore();
    
    useEffect(() => {
        const images = currentTheme === "dark" ? LogoDark : Logo;
        setImageInTheme(images);
    }, [currentTheme])

    if(!isHydrated){
        return;
    }

    if(isAccount) {
        return (
            <div className={cn("hidden px-3 py-2 justify-between items-center max-w-screen-xl mx-auto", "md:p-4", "lg:flex")}>
                <div className="flex items-center gap-14">
                    <div className="flex items-center gap-2">
                        <ImageLoader
                            src={imageInTheme ?? ""}
                            alt='Logo of TailwindLiquid'
                            className={cn('size-8 rounded-lg')}
                            width={500}
                            height={500}
                        />
                        <Link href="/" className="cursor-pointer text-lg font-bold xs:text-xl sm:text-2xl">
                            {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} /> */}
                            Tailwind<span className="text-primary">Liquid</span>
                        </Link>
                    </div>
                    <ul className={cn("flex items-center gap-5", "xl:gap-6")}>
                        {[
                            {
                                path: "/docs", 
                                title: "Snippets",
                            },
                            {
                                path: "/docs/installation", 
                                title: "Installation",
                            }
                        ]?.map((data, i) => (
                            <li key={i}>
                                <Link href={data.path} className={cn(classLink, data.path === pathname && "font-bold text-primary")}>{data.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:flex lg:items-center lg:gap-4">
                {/* <ToggleMode /> */}
                {!currentUser ? (
                <CgProfile className="text-2xl ml-2 cursor-pointer transition-all ease-in-out hover:scale-110" onClick={() => router.push("/auth/login")} />
                ) : (
                    <MenuDropdown
                        items={[
                            {label: "Acheter des crédits", handleClick: () => {
                                setModeSelected(0);
                                router.push("/plans");
                            }},
                            {label: "S'abonner", handleClick: () => {
                                setModeSelected(1);
                                router.push("/plans");
                            }},
                            {href: `/ambassador-program`, label: "Devenez Ambassadeur", separator: true},
                            {href: `/account`, label: "Compte"},
                            ...(user?.plan === "SUBSCRIPTION" ? 
                                [{ 
                                    href: `https://www.facebook.com/groups/tailwindliquid`, 
                                    label: "Groupe Privé", 
                                    separator: true,
                                    target: "_blank", 
                                    rel: "noopener noreferrer" 
                                }] : []), 
                        ]}
                        handleLogOut={() => signOut()}
                        isLogOut={currentUser ? true : false}
                        >
                        <div className={cn("lg:py-2 lg:cursor-pointer lg:flex lg:items-center lg:gap-1")}>
                            <CgProfile className="text-2xl" />
                            <IoIosArrowDown />
                        </div>
                    </MenuDropdown>
                )}
                </div>
            </div>
        )
    }

    return (
        <div className={cn("hidden", "relative max-w-screen-xl lg:p-6 lg:flex lg:justify-between lg:items-center lg:mx-auto lg:py-2 lg:h-20", "xl:px-0")}>
            <div className="flex items-center gap-14">
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
                <ul className={cn("flex items-center gap-5", "xl:gap-6")}>
                    {menu.map((data, i) => (
                        <li key={i}>
                            {data.path.includes("contact") ? (
                                <Link 
                                    href="mailto:tailwindliquid@gmail.com"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={cn(classLink, data.path === pathname && "font-bold")}
                                >Contact</Link>
                            ) : (
                                <Link href={data.path} className={cn(classLink, data.path === pathname && "font-bold text-primary")}>{data.title}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cn("flex gap-3 items-center")}>
                {/* <ToggleMode /> */}
                <CgProfile className="text-2xl ml-2 cursor-pointer transition-all ease-in-out hover:scale-110" onClick={() => router.push("/auth/login")} />
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