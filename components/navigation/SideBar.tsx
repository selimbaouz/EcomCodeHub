"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu } from "@/types/types";
import { usePathname } from "next/navigation";
import { useOpenSidebarStore } from "@/store/sidebar";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface SideBarProps {
    menu: Menu[];
    isAccount?: boolean;
}

export default function SideBar ({
    menu,
    isAccount
}: SideBarProps) {
    const classLink = "font-light text-base text-foreground lg:text-sm xl:text-base group-hover:text-background";
    const pathname = usePathname();
    const { isOpenSidebar, setIsOpenSidebar } = useOpenSidebarStore();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/auth/login" });
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
                            path: "/docs", 
                            title: "Snippets",
                        },
                        {
                            path: "/installation", 
                            title: "Installation",
                        },
                        {
                            path: "/credits-gratuits", 
                            title: "Crédits gratuits",
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
                    <li className={cn("border-y dark:border-[#324e58] py-3 pl-4 hover:bg-primary group", "/auth/login" === pathname && "bg-primary")}>
                        <Link 
                            href={"/auth/login"} 
                            className={cn(classLink, "/auth/login" === pathname && "text-background")}
                            onClick={handleSignOut}
                            >
                                Se déconnecter
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
            {menu?.map((data, i) => (
                <li key={i} className={cn("border-t dark:border-[#324e58] py-3 pl-4 hover:bg-primary group", data.path === pathname && "bg-primary")}>
                    {data.path.includes("contact") ? (
                        <Link 
                            href="mailto:tailwindliquid@gmail.com"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={cn(classLink)}
                        >Contact</Link>
                    ) : (
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
                    )}
                </li>
            ))}
            <li className={cn("border-y dark:border-[#324e58] py-3 pl-4 hover:bg-primary group", "/auth/login" === pathname && "bg-primary")}>
                <Link 
                    href={"/auth/login"} 
                    className={cn(classLink, "/auth/login" === pathname && "text-background")}
                    onClick={() => {
                        if (!"/auth/login".startsWith("/#")) {
                            setIsOpenSidebar(false);
                        }
                    }}
                    >
                        Se connecter
                </Link>
            </li>
        </ul>
        </SheetContent>
    </Sheet>
  );
}
