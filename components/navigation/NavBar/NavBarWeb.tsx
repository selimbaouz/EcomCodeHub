"use client";
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
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import TiktokPixel from 'tiktok-pixel';

interface NavBarWebProps {
  isAccount?: boolean;
  currentUser: User | undefined;
  user?: UserType | null;
}

const NavBarWeb: FC<NavBarWebProps> = ({ isAccount = false, currentUser, user }) => {
  const classLink = "font-light text-foreground text-base hover:text-primary";
  const locale = useLocale();
  const t = useTranslations("fe.navigation");
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [imageInTheme, setImageInTheme] = useState<StaticImageData>();
  const { cart } = useCartStore();
  const { setIsOpenCart } = useOpenCartStore();
  const router = useRouter();
  const isHydrated = useIsHydrated();
  const pathname = usePathname();
  const { setModeSelected } = useModalStore();
  const pathnameOfProduct = pathname === `/${locale}/products/pack-pro-conversion-shopify`;

  useEffect(() => {
    const images = currentTheme === "dark" ? LogoDark : Logo;
    setImageInTheme(images);
  }, [currentTheme]);

  if (!isHydrated) return;

  if (isAccount) {
    return (
      <div className={cn("hidden px-3 py-2 justify-between items-center max-w-screen-2xl mx-auto", "md:p-4", "lg:flex")}>
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-2">
            <ImageLoader
              src={imageInTheme ?? ""}
              alt="Logo"
              className={cn("size-8 rounded-lg")}
              width={500}
              height={500}
            />
            <Link href={`/${locale}`} className="cursor-pointer text-lg font-bold xs:text-xl sm:text-2xl">
                {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} /> */}
                Tailwind<span className="text-primary">Liquid</span>
            </Link>
          </div>
          <ul className={cn("flex items-center gap-5", "xl:gap-6")}>
            {[
              { path: `/${locale}`, title: t("snippets") },
              { path: `/${locale}/installation`, title: t("installation") },
              { path: `/${locale}/credits-gratuits`, title: t("credits") }
            ].map((data, i) => (
              <li key={i}>
                <Link href={data.path} className={cn(classLink, data.path === pathname && "font-bold text-primary")}>
                  {data.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:flex lg:items-center lg:gap-4">
            <LocaleSwitcher locale={locale} />
          {!currentUser ? (
            <CgProfile className="text-2xl ml-2 cursor-pointer transition-all ease-in-out hover:scale-110" onClick={() => router.push(`/${locale}/auth/login`)} />
          ) : (
            <MenuDropdown
              items={[
                { label: t("buyCredits"), handleClick: () => { setModeSelected(0); router.push(`/${locale}/plans`); } },
                { label: t("subscribe"), handleClick: () => { setModeSelected(1); router.push(`/${locale}/plans`); } },
                { href: `/${locale}/ambassador-program`, label: t("ambassador"), separator: true },
                { href: `/${locale}/account`, label: t("account") },
                { href: "https://discord.gg/kGayPFck58", label: t("discord"), separator: true, target: "_blank", rel: "noopener noreferrer" }
              ]}
              handleLogOut={() => signOut()}
              isLogOut={!!currentUser}
            >
              <div className={cn("lg:py-2 lg:cursor-pointer lg:flex lg:items-center lg:gap-1")}>
                <CgProfile className="text-2xl" />
                <IoIosArrowDown />
              </div>
            </MenuDropdown>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("hidden", "relative lg:p-6 lg:flex lg:justify-between lg:items-center lg:mx-auto lg:py-2 lg:h-20", "xl:px-0", pathnameOfProduct ? "max-w-screen-xl" : "max-w-screen-2xl")}>
      <div className="flex items-center gap-14">
        <div className="flex items-center gap-4">
          <ImageLoader
            src={imageInTheme ?? ""}
            alt="Main Logo"
            className={cn("size-8 rounded-lg")}
            width={500}
            height={500}
          />
            <Link href={`/${locale}`} className={cn("text-foreground font-bold cursor-pointer z-50 font-regular", "lg:text-xl", "xl:text-2xl")}>
                {/* <Image src={Logo} alt="Logo of HelloPurly" width={170} height={36} className={cn("lg:w-32", "xl:w-44")} /> */}
                Tailwind<span className="text-primary">Liquid</span>
            </Link>
        </div>
        <ul className={cn("flex items-center gap-5", "xl:gap-6")}>
          {[
            { path: `/${locale}`, title: t("snippets") },
            { path: `/${locale}/products/pack-pro-conversion-shopify`, title: t("conversionPack") },
            { path: `/${locale}/ambassador-program`, title: t("ambassadorProgram") }
          ].map((data, i) => (
            <li key={i}>
              <Link href={data.path} className={cn(classLink, data.path === pathname && "font-bold text-primary")}>
                {data.title}
              </Link>
            </li>
          ))}
          <li>
            <Link 
              href="mailto:tailwindliquid@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => {
                 TiktokPixel.track('Contact', {
                    content_id: 'contact',
                    content_type: 'action',
                    content_name: 'Contact Click',
                    description: window.location.pathname,
                    value: 0,
                    currency: 'EUR'
                  });
                  // Envoi l'event serveur Facebook ! (appel asynchrone)
                  fetch('/api/fb-contact-click', {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                          eventTime: Math.floor(Date.now() / 1000),
                          eventSourceUrl: window.location.href,
                          userAgent: navigator.userAgent,
                          pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
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
      </div>
      <div className={cn("flex gap-3 items-center")}>
        <LocaleSwitcher locale={locale} />
        <CgProfile className="text-2xl ml-2 cursor-pointer transition-all ease-in-out hover:scale-110" onClick={() => router.push(`/${locale}/auth/login`)} />
        <div className="relative p-2 cursor-pointer group" onClick={() => setIsOpenCart(true)}>
          <RiShoppingBag3Fill className={cn("text-3xl text-foreground group-hover:text-primary transition-all ease-in-out hover:scale-110", "lg:text-2xl", "xl:text-3xl")} />
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
