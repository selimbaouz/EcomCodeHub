"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOpenSidebarStore } from "@/store/sidebar";
import { CgClose } from "react-icons/cg";
import { useLocale, useTranslations } from "next-intl";
import { FB_PIXEL_ID } from "@/lib/constants";

export default function SideBar() {
  const classLink =
    "font-light text-base text-foreground lg:text-sm xl:text-base group-hover:text-background";
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("fe.navigation");
  const { isOpenSidebar, setIsOpenSidebar } = useOpenSidebarStore();

  return (
    <Sheet open={isOpenSidebar} onOpenChange={setIsOpenSidebar}>
      <SheetContent
        side="left"
        className={cn("h-full min-w-full", "lg:min-w-[500px]")}
      >
        <SheetHeader className="px-4 py-6">
          <SheetTitle className="flex items-center justify-between">
            <h3 className="text-2xl">Menu</h3>
            <CgClose
              className="text-xl"
              onClick={() => setIsOpenSidebar(false)}
            />
          </SheetTitle>
        </SheetHeader>
        <SheetDescription></SheetDescription>
        <ul className={cn("cursor-pointer")}>
          {[
            {
              path: `/${locale}/products/shopify-pro-codes-bundle`,
              title: t("conversionPack"),
            },
            {
              path: `/${locale}/ambassador-program`,
              title: t("ambassadorProgram"),
            },
          ].map((data, i) => (
            <li
              key={i}
              className={cn(
                "border-t dark:border-[#324e58] py-3 pl-4 hover:bg-primary group",
                data.path === pathname && "bg-primary"
              )}
            >
              <Link
                href={data.path}
                className={cn(
                  classLink,
                  data.path === pathname &&
                    "text-background font-bold dark:text-foreground"
                )}
              >
                {data.title}
              </Link>
            </li>
          ))}
          <li className="border-t dark:border-[#324e58] py-3 pl-4 hover:bg-primary group">
            <Link
              href="mailto:ecomcodehub.team@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                fetch("/api/pixels-contact-click", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    eventTime: Math.floor(Date.now() / 1000),
                    eventSourceUrl: window.location.href,
                    userAgent: navigator.userAgent,
                    fbPixelId: FB_PIXEL_ID,
                    fbp: document.cookie
                      .split("; ")
                      .find((row) => row.startsWith("_fbp="))
                      ?.split("=")[1],
                  }),
                });
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
