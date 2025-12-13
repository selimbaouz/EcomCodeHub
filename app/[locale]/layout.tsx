import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import LayoutClient from "@/components/LayoutClient";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default:
      "EcomCodeHub – snippets Liquid Shopify pour booster votre boutique",
    template: "%s | EcomCodeHub",
  },
  description:
    "Libérez tout le potentiel de votre boutique Shopify avec EcomCodeHub : snippets Liquid et composants UI prêts à l’emploi, pour améliorer votre design, augmenter vos ventes et optimiser vos conversions—sans coder ni acheter de thème coûteux.",
  keywords: [
    "shopify liquid code",
    "code liquid shopify",
    "code shopify",
    "liquid shopify",
    "code shopify liquid",
    "extrait code shopify",
    "snippets shopify",
    "conversion shopify",
    "tailwindcss shopify",
    "design boutique shopify",
    "ui shopify",
    "code personnalisé shopify",
    "shopify composants",
    "exemple code shopify",
    "no-code shopify",
    "ux shopify",
    "ecommerce design",
  ],
  authors: [{ name: "selimbaouz" }],
  creator: "selimbaouz",
  publisher: "selimbaouz",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ecomcodehub.com",
    siteName: "EcomCodeHub",
    title: "EcomCodeHub – snippets Liquid Shopify pour booster votre boutique",
    description:
      "EcomCodeHub offre aux commerçants Shopify des snippets et composants TailwindCSS puissants et prêts à l’emploi pour personnaliser leur boutique et booster la conversion — sans compétences techniques.",
    images: [
      {
        url: "https://ecomcodehub.com/en/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "EcomCodeHub – Code Liquid Shopify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@selimbaouz",
    creator: "@selimbaouz",
    title: "EcomCodeHub – snippets Liquid Shopify",
    description:
      "Code Liquid Shopify, composants UI clé-en-main et blocs TailwindCSS pour améliorer rapidement le design et la conversion de votre boutique.",
    images: ["https://ecomcodehub.com/en/images/og-image.webp"],
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: "https://ecomcodehub.com",
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} font-montserrat relative text-foreground size-full`}
      >
        <head>
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
                PageView&noscript=1"
            />
          </noscript>
          {/* End Meta Pixel Code */}
          {/** Tiktok Pixel Code */}
          {/* <Script strategy="lazyOnload">
              {`
                !function (w, d, t) {
                  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
    
    
                  ttq.load('D2AVJF3C77U67ECJ57P0');
                  ttq.page();
                }(window, document, 'ttq');
                `}
            </Script> */}
          {/* End Tiktok Pixel Code */}
        </head>
        <Toaster position="bottom-right" />
        <NextIntlClientProvider>
          <SpeedInsights />
          <Analytics />
          <Providers>
            <LayoutClient>{children}</LayoutClient>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
