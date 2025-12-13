"use client";
import { cn } from "@/lib/utils";
import { useCartStore, useOpenCartStore } from "@/store/cart";
import Link from "next/link";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FC } from "react";
import { useIsHydrated } from "@/hook/useIsHydrated";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface NavBarWebProps {
  isAccount?: boolean;
}

const NavBarWeb: FC<NavBarWebProps> = () => {
  const classLink = "font-light text-foreground text-base hover:text-primary";
  const locale = useLocale();
  const t = useTranslations("fe.navigation");
  const { cart } = useCartStore();
  const { setIsOpenCart } = useOpenCartStore();
  const isHydrated = useIsHydrated();
  const pathname = usePathname();
  const pathnameOfProduct =
    pathname === `/${locale}/products/shopify-pro-codes-bundle`;

  if (!isHydrated) return;

  return (
    <div
      className={cn(
        "hidden",
        "relative lg:p-6 lg:flex lg:justify-between lg:items-center lg:mx-auto lg:py-2 lg:h-20",
        "xl:px-0",
        pathnameOfProduct ? "max-w-screen-xl" : "max-w-screen-2xl"
      )}
    >
      <div className="flex items-center gap-14">
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}`}
            className={cn(
              "text-foreground font-bold cursor-pointer z-50 font-regular",
              "lg:text-xl",
              "xl:text-2xl"
            )}
          >
            {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} className={cn("lg:w-32", "xl:w-44")} /> */}
            Ecom<span className="text-primary">Code</span>Hub
          </Link>
        </div>
        <ul className={cn("flex items-center gap-5", "xl:gap-6")}>
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
            <li key={i}>
              <Link
                href={data.path}
                className={cn(
                  classLink,
                  data.path === pathname && "font-bold text-primary"
                )}
              >
                {data.title}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="ttps://wa.me/0745473667"
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
                    fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
                    tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
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
      </div>
      <div className={cn("flex gap-3 items-center")}>
        <div
          className="relative p-2 cursor-pointer group"
          onClick={() => setIsOpenCart(true)}
        >
          <RiShoppingBag3Fill
            className={cn(
              "text-3xl text-foreground group-hover:text-primary transition-all ease-in-out hover:scale-110",
              "lg:text-2xl",
              "xl:text-3xl"
            )}
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
