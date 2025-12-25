import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import MetaPixel from "@/components/MetaPixel";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default:
      "EcomCodeHub – 500+ Shopify Liquid Code Snippets to Boost Conversions",
    template: "%s | EcomCodeHub",
  },
  description:
    "Access 500+ ready-to-use Shopify Liquid & TailwindCSS code snippets. Boost conversions, enhance design, and customize your store without hiring a developer. Copy-paste in 2 minutes. One-time payment, lifetime access.",
  keywords: [
    "shopify liquid code",
    "shopify code snippets",
    "shopify liquid snippets",
    "shopify conversion code",
    "shopify customization",
    "shopify liquid templates",
    "tailwindcss shopify",
    "shopify code library",
    "shopify snippets pack",
    "custom shopify code",
    "shopify ui components",
    "shopify design snippets",
    "shopify liquid examples",
    "increase shopify conversion",
    "shopify store optimization",
    "no-code shopify",
    "shopify theme customization",
    "shopify development snippets",
  ],
  authors: [{ name: "Selim Baouz" }],
  creator: "Selim Baouz",
  publisher: "EcomCodeHub",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecomcodehub.com",
    siteName: "EcomCodeHub",
    title:
      "500+ Shopify Liquid Code Snippets | Boost Conversions Without a Developer",
    description:
      "Get instant access to 500+ professional Shopify Liquid & TailwindCSS code snippets. Increase conversions, customize your store, and save $1,200+ on developer fees. Copy-paste ready. Lifetime updates included.",
    images: [
      {
        url: "https://ecomcodehub.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "EcomCodeHub - 500+ Shopify Liquid Code Snippets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ecomcodehub",
    creator: "@selimbaouz",
    title: "500+ Shopify Liquid Code Snippets | EcomCodeHub",
    description:
      "Professional Shopify code snippets to boost conversions. Copy-paste ready. No coding required. Save $1,200+ vs hiring a developer. Lifetime access.",
    images: ["https://ecomcodehub.com/images/og-image.webp"],
  },
  verification: {
    google: "your-google-verification-code", // À remplacer par ton code Google Search Console
  },
  alternates: {
    canonical: "https://ecomcodehub.com",
    languages: {
      en: "https://ecomcodehub.com/en",
      fr: "https://ecomcodehub.com/fr",
    },
  },
  metadataBase: new URL("https://ecomcodehub.com"),
  category: "technology",
  classification: "Business",
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
        suppressHydrationWarning
      >
        <MetaPixel />
        <Toaster position="bottom-right" />
        <NextIntlClientProvider>
          <SpeedInsights />
          <Analytics />
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
