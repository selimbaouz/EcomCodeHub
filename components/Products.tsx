"use client";
import React, { FC, useEffect } from "react";
import { cn } from "@/lib/utils";
import StickyBar from "@/components/navigation/StickyBar";
import NavBar from "@/components/navigation/NavBar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ExampleStore from "@/components/ExampleStore";
import HowItWorks from "@/components/HowItWorks";
import { Reviews } from "@/components/Reviews";
import { PaymentErrorModal } from "@/components/PaymentErrorModal";
import ExampleCode from "@/components/ExampleCode";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductImage from "@/components/ProductImage";
import ImagesGallery from "@/components/ImagesGallery";
import FlashPromo from "./FlashPromo";
import { useVisibleFloatingCartStore } from "@/store/cart";
import FloatingBar from "./navigation/FloatingBar";
import Image1 from "@/public/images/product-1.png";
import Image2 from "@/public/images/product-2.png";
import Image3 from "@/public/images/product-3.png";

const Products: FC = () => {
  const { isVisible } = useVisibleFloatingCartStore();

  useEffect(() => {
    fetch("/api/pixels-view-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventTime: Math.floor(Date.now() / 1000),
        eventSourceUrl: window.location.href,
        userAgent: navigator.userAgent,
        fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
        tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
        content_ids: ["prod_shopify_pro_bundle"],
        content_name: "Shopify Pro Codes Bundle",
        content_type: "product",
        value: "29.90",
        currency: "EUR",
        fbp: document.cookie
          .split("; ")
          .find((row) => row.startsWith("_fbp="))
          ?.split("=")[1],
      }),
    });
  }, []);

  return (
    <div className="relative">
      <div className="sticky top-0 w-full z-50">
        <StickyBar />
        <NavBar />
        <FlashPromo />
      </div>

      <div className="max-w-screen-xl mx-auto w-full">
        <PaymentErrorModal />
      </div>
      <div>
        <section
          className={cn("w-full text-left mx-auto", "lg:grid lg:grid-cols-2")}
        >
          <div className="lg:flex lg:justify-center xl:pl-40 bg-secondary/30 dark:bg-[#324e58] lg:h-screen lg:sticky lg:top-24">
            <ImagesGallery
              images={[
                {
                  node: {
                    altText: "Product 1",
                    originalSrc: Image1.src,
                    width: Image1.width,
                    height: Image1.height,
                  },
                },
                {
                  node: {
                    altText: "Product 2",
                    originalSrc: Image2.src,
                    width: Image2.width,
                    height: Image2.height,
                  },
                },
                {
                  node: {
                    altText: "Product 3",
                    originalSrc: Image3.src,
                    width: Image3.width,
                    height: Image3.height,
                  },
                },
              ]}
            />
          </div>
          <div className={cn("px-4", "lg:pl-10", "xl:pl-20")}>
            <ProductImage />
          </div>
        </section>
      </div>
      <ExampleStore />
      <AnnouncementBar />
      <ExampleCode />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <Footer />
      {/*  <Discord /> */}
      {/* <PurchasePopup /> */}
      {!isVisible && <FloatingBar />}
    </div>
  );
};

export default Products;
