"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { AddToCart } from "../cart/add-to-cart";
import { useIsHydrated } from "@/hook/useIsHydrated";
import { motion } from "framer-motion";
import { useOpenCartStore } from "@/store/cart";
import Image from "next/image";
import Image1 from "@/public/images/product-1.png";

const FloatingBar = () => {
  const isHydrated = useIsHydrated();
  const { isOpenCart } = useOpenCartStore();

  if (!isHydrated) {
    return null;
  }

  // Cacher le FloatingBar si le panier est ouvert
  if (isOpenCart) {
    return null;
  }

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
              src={Image1.src}
              alt="Shopify Pro Codes Bundle"
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
                Shopify Pro Codes Bundle
              </h6>
              <div className={cn("items-center gap-2 lg:flex hidden")}>
                <p className={cn("font-bold text-base", "lg:text-lg")}>
                  29.90 €
                </p>
                <p
                  className={cn(
                    "text-sm line-through text-white/60",
                    "lg:text-base"
                  )}
                >
                  {`${new Intl.NumberFormat(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(parseFloat("150.00"))}`}
                  €
                </p>
                <span
                  className={cn(
                    "text-xs font-semibold bg-white/20 px-2 py-0.5 rounded",
                    "lg:text-sm"
                  )}
                >
                  Save {(parseFloat("150.00") - parseFloat("29.90")).toFixed(0)}
                  €
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
