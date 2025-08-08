"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOpenSidebarStore } from "@/store/sidebar";
import { CgClose } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

interface SideBarProps {
    isAccount?: boolean;
}

export default function SideBar ({
    isAccount
}: SideBarProps) {
    const classLink = "font-light text-base text-foreground lg:text-sm xl:text-base group-hover:text-background";
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations("fe.navigation");
    const { isOpenSidebar, setIsOpenSidebar } = useOpenSidebarStore();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: `/${locale}/auth/login` });
      };

    if(isAccount) {
        return (
        <Sheet open={isOpenSidebar} onOpenChange={setIsOpenSidebar}>
            <SheetContent side="left" className={cn("h-full min-w-full", "lg:min-w-[500px]")}>
                <SheetHeader className="px-4 py-6">
                    <SheetTitle className="flex items-center justify-between">
                        <h3 className="text-2xl">
                            Menu
                        </h3>
                        <CgClose className="text-xl" onClick={() => setIsOpenSidebar(false)}/>
                    </SheetTitle>
                </SheetHeader>
                <SheetDescription></SheetDescription>
                <ul className={cn("cursor-pointer")}>
                    {[
                        {
                            path: `/${locale}`, 
                            title: t("snippets"),
                        },
                        {
                            path: `/${locale}/installation`, 
                            title: t("installation"),
                        },
                        {
                            path: `/${locale}/credits-gratuits`, 
                            title: t("credits"),
                        }
                    ]?.map((data, i) => (
                        <li key={i} className={cn("border-t dark:border-[#324e58] py-3 pl-4 hover:bg-primary group", data.path === pathname && "bg-primary")}>
                            <Link 
                                href={data.path} 
                                target={data.title === "Suivre ma commande" ? "_blank" : undefined} 
                                rel={data.title === "Suivre ma commande" ? "noopener noreferrer" : undefined} 
                                className={cn(classLink, data.path === pathname && "text-background dark:text-foreground")}
                                onClick={() => {
                                    if (!data.path.startsWith("/#")) {
                                        setIsOpenSidebar(false);
                                    }
                                }}
                                >
                                    {data.title}
                            </Link>
                        </li>
                    ))}
                    <li className={cn("border-y dark:border-[#324e58] py-3 pl-4 hover:bg-primary group", `/${locale}/auth/login ` === pathname && "bg-primary")}>
                        <Link 
                            href={"/auth/login"} 
                            className={cn(classLink, "/auth/login" === pathname && "text-background")}
                            onClick={handleSignOut}
                            >
                                {t("logout")}
                        </Link>
                    </li>
                </ul>
            </SheetContent>
        </Sheet>
        )
    }

  return (
    <Sheet open={isOpenSidebar} onOpenChange={setIsOpenSidebar}>
        <SheetContent side="left" className={cn("h-full min-w-full", "lg:min-w-[500px]")}>
        <SheetHeader className="px-4 py-6">
            <SheetTitle className="flex items-center justify-between">
                <h3 className="text-2xl">
                    Menu
                </h3>
                <CgClose className="text-xl" onClick={() => setIsOpenSidebar(false)}/>
            </SheetTitle>
        </SheetHeader>
        <SheetDescription></SheetDescription>
            <ul className={cn("cursor-pointer")}>
                {[
                    {
                        path: `/${locale}`, 
                        title: t("snippets"),
                    },
                    {
                        path: `/${locale}/products/pack-pro-conversion-shopify`, 
                        title: t("conversionPack"),
                    },
                    {
                        path: `/${locale}/ambassador-program`, 
                        title: t("ambassadorProgram"),
                    },
                    {
                        path: `/${locale}/auth/login`, 
                        title: t("login"),
                    }
                ].map((data, i) => (
                    <li key={i} className={cn("border-t dark:border-[#324e58] py-3 pl-4 hover:bg-primary group", data.path === pathname && "bg-primary")}>
                        <Link href={data.path} className={cn(classLink, data.path === pathname && "text-background font-bold dark:text-foreground")}>{data.title}</Link>
                    </li>
                ))}
                <li className="border-t dark:border-[#324e58] py-3 pl-4 hover:bg-primary group">
                    <Link 
                        href="mailto:tailwindliquid@gmail.com"
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => {
                            fetch('/api/pixels-contact-click', {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    eventTime: Math.floor(Date.now() / 1000),
                                    eventSourceUrl: window.location.href,
                                    userAgent: navigator.userAgent,
                                    fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
                                    tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
                                    fbp: document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1],
                                })
                            })
                        }}
                        className={cn(classLink)}
                    >
                        {t("contact")}
                    </Link>
                </li>
            </ul>
        </SheetContent>
    </Sheet>
  );
}
