"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu } from "@/types/types";
import { usePathname } from "next/navigation";
import { useOpenSidebarStore } from "@/store/sidebar";

interface SideBarProps {
    menu: Menu[];
}

export default function SideBar ({
    menu,
}: SideBarProps) {
    const classLink = "font-light text-base text-foreground lg:text-sm xl:text-base group-hover:text-background";
    const pathname = usePathname();
    const { isOpenSidebar, setIsOpenSidebar } = useOpenSidebarStore();

  return (
    <Sheet open={isOpenSidebar} onOpenChange={setIsOpenSidebar}>
        <SheetContent side="left" className={cn("h-full min-w-full", "lg:min-w-[500px]")}>
        <SheetHeader>
            <SheetTitle>
                {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} className={cn("lg:w-32", "xl:w-44")} /> */}
            </SheetTitle>
        </SheetHeader>
        <SheetDescription></SheetDescription>
        <ul className={cn("pt-14 cursor-pointer")}>
            {menu?.map((data, i) => (
                <li key={i} className={cn("border-b border-primary py-3 pl-4 hover:bg-primary group", data.path === pathname && "bg-primary")}>
                    {data.path.includes("contact") ? (
                        <Link 
                            href="mailto:im.sejiux@gmail.com"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={cn(classLink)}
                        >Contact</Link>
                    ) : (
                        <Link 
                        href={data.path} 
                        target={data.title === "Suivre ma commande" ? "_blank" : undefined} 
                        rel={data.title === "Suivre ma commande" ? "noopener noreferrer" : undefined} 
                        className={cn(classLink, data.path === pathname && "text-background")}
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
        </ul>
        </SheetContent>
    </Sheet>
  );
}
