"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { AddToCart } from "../cart/add-to-cart";
import { useIsHydrated } from "@/hook/useIsHydrated";
import { motion } from "framer-motion";
import { useOpenCartStore } from "@/store/cart";
import { usePaymentModalStore } from "@/store/payment-modal";
import { useProductStore } from "@/store/product";
import Image from "next/image";
import { useTranslations } from "next-intl";

const FloatingBar = () => {
  const isHydrated = useIsHydrated();
  const { isOpenCart } = useOpenCartStore();
  const { isPaymentModalOpen } = usePaymentModalStore();
  const { currentProduct: product } = useProductStore();
  const t = useTranslations("fe");

  if (!isHydrated || !product) {
    return null;
  }

  if (isOpenCart || isPaymentModalOpen) {
    return null;
  }

  const mainImage = product.images[0];
  const savings = product.compareAtPrice - product.price;

  return (
    <motion.div className={cn("sticky bottom-0 z-[100] mx-auto w-full")}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className={cn("z-50 relative bg-primary border-t border-white")}
      >
        <div
          className={cn(
            "py-2 px-4 text-white relative flex items-center justify-between max-w-screen-xl mx-auto",
            "lg:py-4"
          )}
        >
          {/* Left side - Product image and info */}
          <div className={cn("flex items-center gap-3")}>
            {/* Product Image */}
            <Image
              src={
                typeof mainImage.src === "string"
                  ? mainImage.src
                  : mainImage.src
              }
              alt={mainImage.alt}
              width={60}
              height={60}
              className={cn(
                "rounded-lg object-cover w-12 h-12",
                "lg:w-16 lg:h-16"
              )}
            />
            {/* Product Info */}
            <div
              className={cn(
                "flex flex-col gap-0.5 max-w-[150px] lg:max-w-full",
                "lg:gap-1"
              )}
            >
              <h6
                className={cn(
                  "font-bold text-base leading-tight",
                  "lg:text-lg"
                )}
              >
                {t(product.name as any)}
              </h6>
              <div className={cn("items-center gap-2 lg:flex hidden")}>
                <p className={cn("font-bold text-base", "lg:text-lg")}>
                  {product.price.toFixed(2)} {product.currency}
                </p>
                <p
                  className={cn(
                    "text-sm line-through text-white/60",
                    "lg:text-base"
                  )}
                >
                  {product.compareAtPrice.toFixed(2)} {product.currency}
                </p>
                <span
                  className={cn(
                    "text-xs font-semibold bg-white/20 px-2 py-0.5 rounded",
                    "lg:text-sm"
                  )}
                >
                  Save {savings.toFixed(0)} {product.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - CTA Button */}
          <AddToCart floatingBar />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingBar;
