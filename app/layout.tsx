import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import LayoutClient from "@/components/LayoutClient";
import { auth } from "@/auth";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/sonner";
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
  variable: "--font-ms",
});

export const metadata: Metadata = {
  title: "TailwindLiquid - Transformez votre boutique Shopify",
  description: "Découvrez TailwindLiquid, des codes optimisés pour améliorer le design de votre boutique Shopify et augmenter vos conversions, sans thème premium coûteux.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${montserrat.variable} font-montserrat relative text-foreground size-full`}
        >
          <Toaster position="bottom-right" />
          <Providers>
            <LayoutClient>
              {children}
            </LayoutClient>
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
