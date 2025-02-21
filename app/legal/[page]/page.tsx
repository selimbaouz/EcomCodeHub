import Footer from '@/components/Footer';
import NavBar from '@/components/navigation/NavBar';
import StickyBar from '@/components/navigation/StickyBar';
import Prose from '@/components/prose';
import { getMenu, getPage } from '@/data/shopify';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function LegalPage({ params }: { params: { page: string } }) {
    const page = await getPage(params.page);
    const menu = await getMenu("main-menu");
    const footerMenu = await getMenu("footer");

    if (!page) redirect("/");
    if (params.page.includes("contact")) redirect("/");

    return (
        <div className='relative'>
            <div className="sticky top-0 w-full z-50">
                <StickyBar />
                <NavBar menu={menu} />
            </div>
            <section className={cn(
                "w-full text-left space-y-10 max-w-screen-2xl mx-auto py-10", 
                "lg:flex lg:flex-col lg:items-center lg:py-20", 
            )}>
                <div className={cn('px-6 space-y-14', "md:px-0")}>
                    <h1 className="text-3xl font-bold">{page.title}</h1>
                    <Prose html={page.body as string} />
                </div>
            </section>
            <section className="relative pt-10">
              <div className='w-full h-[313px] bg-foreground/80 blur-3xl absolute top-4 -z-10' />
              <Footer
                footerMenu={footerMenu}
              />
            </section>
        </div>
    );
};
