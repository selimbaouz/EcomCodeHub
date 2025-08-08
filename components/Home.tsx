"use client";
import React, { useEffect } from 'react';
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import Snippets from "@/components/snippets";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Session } from 'next-auth';
import { SnippetsType, UserType } from '@/types/types';
import { useTranslations } from 'next-intl';
import NavBar from './navigation/NavBar';
import useIsMobile from '@/hook/use-is-mobile';
import TiktokPixel from 'tiktok-pixel';

interface HomeProps {
    session: Session | null ;
    user: UserType;
    snippets: SnippetsType;
    categoriesSnippets: {
        id: string;
        title: string;
    }[]
}
const Home = ({
    session,
    user,
    snippets,
    categoriesSnippets
}: HomeProps) => {
    const t = useTranslations("fe.home");    
    const isMobile = useIsMobile();

    useEffect(() => {
        TiktokPixel.track('ViewContent', {
        content_id: 'homepage',
        content_type: 'home',
        content_name: 'Homepage',
        value: 0,
        currency: 'EUR',
        description: window.location.pathname,
        });
        
        fetch('/api/fb-view-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventTime: Math.floor(Date.now() / 1000),
                eventSourceUrl: window.location.href,
                userAgent: navigator.userAgent,
                pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
                content_ids: ['homepage'],      // identifiant générique ou slug
                content_name: 'Homepage',       // titre du contenu
                content_type: 'home',           // type bien explicite
                // value, currency: tu peux les omettre pour la page d'accueil
                fbp: document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1],
            })
        });
    }, []);

    return (
        <div>
            <div className="sticky top-0 w-full z-50">
                <NavBar isAccount={session?.user ? true : false} />
            </div>
            <div className="px-4 w-full mx-auto bg-gray-100 dark:bg-[#324e58] h-full">
                <div className="max-w-screen-2xl mx-auto w-full">
                  {!session?.user ? (
                    <div className={cn("pt-20 pb-10 flex flex-col justify-center items-center space-y-6 lg:space-y-8 lg:pt-24")}>
                      <h1 className="text-4xl lg:text-7xl font-bold text-center max-w-7xl whitespace-pre-wrap">
                        {isMobile ? t("heroTitleMobile") : t("heroTitleWeb")}
                      </h1>
                      <p className="lg:text-xl text-center text-gray-700 max-w-3xl whitespace-pre-wrap">
                        {t("heroDescription")}
                      </p>

                        <Button size="xl" className="text-base lg:text-lg px-6 py-4 rounded-xl" asChild>
                          <Link href="/products/pack-pro-conversion-shopify">
                            {t("heroButton")}
                          </Link>
                        </Button>
                    </div>
                  ) : (
                    <div className={cn("pt-20 pb-10 flex flex-col justify-center items-center space-y-4")}>
                        <Link href="/installation" className="group flex gap-2 items-center font-medium">
                            {t("startInstallation")}
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform"/>
                        </Link>
                        <h3 className="text-6xl mx-auto text-center">{t("greeting")} <span className="font-bold">{user?.name}</span></h3>
                        <p className="text-lg text-gray-500">
                            {user?.credits && user?.credits > 0 
                                ? t("creditsRemaining", { credits: user.credits }) 
                                : t("noCredits")
                            }
                        </p>
                    </div>
                  )}
                    
                    <div className={cn("flex flex-col justify-center items-center pt-10")}>
                        <SearchBar />
                        <div className="w-full relative lg:max-w-3xl xl:max-w-full mx-auto">
                            <Category categories={categoriesSnippets} />
                        </div>
                    </div>
                    <Snippets user={user} snippets={snippets} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;