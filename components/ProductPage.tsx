"use client";
import React, { FC, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/product";
import StickyBar from "@/components/navigation/StickyBar";
import NavBar from "@/components/navigation/NavBar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ExampleStore from "@/components/ExampleStore";
import HowItWorks from "@/components/HowItWorks";
import { Reviews } from "@/components/Reviews";
import { PaymentErrorModal } from "@/components/PaymentErrorModal";
import { PaymentSuccessModal } from "@/components/PaymentSuccessModal";
import ExampleCode from "@/components/ExampleCode";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductImage from "@/components/ProductImage";
import ImagesGallery from "@/components/ImagesGallery";
import FlashPromo from "@/components/FlashPromo";
import { useVisibleFloatingCartStore } from "@/store/cart";
import FloatingBar from "@/components/navigation/FloatingBar";
import { FB_PIXEL_ID } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import StickyBarPromo from "./navigation/StickyBarPromo";

const ProductPage: FC<{ data: Product }> = ({ data }) => {
  const product = data;
  const { isVisible } = useVisibleFloatingCartStore();
  const { setCurrentProduct } = useProductStore();

  useEffect(() => {
    if (!product) return;

    // Set le produit dans le store
    setCurrentProduct(product);

    // Facebook Pixel tracking
    fetch("/api/pixels-view-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventTime: Math.floor(Date.now() / 1000),
        eventSourceUrl: window.location.href,
        userAgent: navigator.userAgent,
        fbPixelId: FB_PIXEL_ID,
        content_ids: [product.fbPixelContentId],
        content_name: product.name,
        content_type: "product",
        value: product.price.toFixed(2),
        currency: product.currency,
        fbp: document.cookie
          .split("; ")
          .find((row) => row.startsWith("_fbp="))
          ?.split("=")[1],
      }),
    });
  }, [product, setCurrentProduct]);

  if (!product) {
    notFound();
  }

  return (
    <div className="relative">
      <div className="sticky top-0 w-full z-50">
        <StickyBarPromo />
        <NavBar />
        <FlashPromo />
      </div>

      <div className="max-w-screen-xl mx-auto w-full">
        <PaymentErrorModal />
        <PaymentSuccessModal />
      </div>

      <div>
        <section
          className={cn("w-full text-left mx-auto", "lg:grid lg:grid-cols-2")}
        >
          <div className="lg:flex lg:justify-center xl:pl-40 bg-secondary/30 dark:bg-[#324e58] lg:h-screen lg:sticky lg:top-24">
            <ImagesGallery
              images={product.images.map((img) => ({
                node: {
                  altText: img.alt,
                  originalSrc:
                    typeof img.src === "string" ? img.src : img.src.src,
                  width: img.width,
                  height: img.height,
                },
              }))}
            />
          </div>
          <div className={cn("px-4", "lg:pl-10", "xl:pl-20")}>
            <ProductImage
              checkProduct={product.benefits}
              title={product.title}
              description={product.description as string}
            />
          </div>
        </section>
      </div>

      {product.exampleStore && <ExampleStore data={product.exampleStore} />}

      <AnnouncementBar />

      {product.exampleCode && <ExampleCode data={product.exampleCode} />}

      {product.howItWorks && <HowItWorks data={product.howItWorks} />}

      {product.reviews && <Reviews data={product.reviews} />}

      {product.faq && <FAQ data={product.faq} />}

      <Footer />

      {!isVisible && <FloatingBar />}
    </div>
  );
};

export default ProductPage;
