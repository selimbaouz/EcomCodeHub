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
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

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
  title: {
    default: "TailwindLiquid – Shopify Liquid Code Snippets to Boost Your Store",
    template: "%s | TailwindLiquid"
  },
  description:
    "Unlock your Shopify store’s full potential with TailwindLiquid: ready-to-use Liquid code and UI snippets to enhance your design, boost sales, and improve conversions—no coding or expensive themes required.",
  keywords: [
    "shopify liquid code",
    "code liquid shopify",
    "code shopify",
    "liquid shopify",
    "code shopify liquid",
    "shopify snippets",
    "liquid snippets",
    "shopify conversions",
    "tailwindcss shopify",
    "shopify store design",
    "shopify ui",
    "copy paste shopify code",
    "shopify components",
    "shopify code examples",
    "no-code shopify",
    "ux shopify",
    "ecommerce design"
  ],
  authors: [{ name: "selimmersive" }],
  creator: "selimmersive",
  publisher: "selimmersive",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://tailwindliquid.com",
    siteName: "TailwindLiquid",
    title: "TailwindLiquid – Shopify Liquid Code Snippets to Boost Your Store",
    description:
      "TailwindLiquid provides Shopify merchants with powerful, plug-&-play Liquid code and TailwindCSS snippets to boost conversions and customize any store, without developer skills.",
    images: [
      {
        url: "https://tailwindliquid.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "TailwindLiquid – Shopify Liquid Code"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@selimmersive",
    creator: "@selimmersive",
    title: "TailwindLiquid – Shopify Liquid Code Snippets",
    description:
      "Shopify Liquid code, ready-to-use UI snippets, and plug & play design blocks to enhance your store’s design and boost sales.",
    images: ["https://tailwindliquid.com/images/og-image.webp"],
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: "https://tailwindliquid.com",
  },
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
                  fbq('init', '1861317064600077');
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
                src="https://www.facebook.com/tr?id=1861317064600077&ev=
                PageView&noscript=1"/>
            </noscript>
            {/* End Meta Pixel Code */}

          </Head>
          <Toaster position="bottom-right" />
          <NextIntlClientProvider>
            <SpeedInsights />
            <Analytics />
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
