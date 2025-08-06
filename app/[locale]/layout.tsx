import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import LayoutClient from "@/components/LayoutClient";
import { auth } from "@/auth";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";
import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TailwindLiquid - Transformez votre boutique Shopify",
  description: "Découvrez TailwindLiquid, des codes optimisés pour améliorer le design de votre boutique Shopify et augmenter vos conversions, sans thème premium coûteux.",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang={locale}>
        <body
          className={`${montserrat.variable} font-montserrat relative text-foreground size-full`}
        >
          <Head>
            {/* Meta Pixel Code */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
                  n.callMethod.apply(n,arguments):n.queue.push   
                  (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
                  0;n.version='2.0';n.queue=[];t=b.createElement(e);
                  t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,
                  'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '1521652655465018');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <Image
                alt="pixel fb"
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=1521652655465018&ev=
                PageView&noscript=1"/>
            </noscript>
            {/* End Meta Pixel Code */}

          </Head>
          <Toaster position="bottom-right" />
          <NextIntlClientProvider>
            <Providers>
              <LayoutClient>
                {children}
              </LayoutClient>
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
