"use client";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { AddToCart } from "../cart/add-to-cart";
import { Product } from "@/types/types";
import { useIsHydrated } from "@/hook/useIsHydrated";
import { motion, AnimatePresence } from "framer-motion";
import { useOpenCartStore } from "@/store/cart";
import Image from "next/image";

interface FloatingBarProps {
  product: Product;
}

const FloatingBar: FC<FloatingBarProps> = ({ product }) => {
  const isHydrated = useIsHydrated();
  const { isOpenCart } = useOpenCartStore();
  const firstVariant = product.variants.edges[0]?.node;
  const variantPrice = firstVariant?.price?.amount;
  const compareAtPrice = firstVariant?.compareAtPrice?.amount;
  const productImage = product.images.edges[0]?.node.originalSrc;

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
            {productImage && (
              <Image
                src={productImage}
                alt={product.title}
                width={60}
                height={60}
                className={cn(
                  "rounded-lg object-cover w-12 h-12",
                  "lg:w-16 lg:h-16"
                )}
              />
            )}
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
                  {variantPrice ? parseFloat(variantPrice).toFixed(2) : "29.90"}
                  €
                </p>
                {compareAtPrice && (
                  <p
                    className={cn(
                      "text-sm line-through text-white/60",
                      "lg:text-base"
                    )}
                  >
                    {parseFloat(compareAtPrice).toFixed(2)}€
                  </p>
                )}
                {compareAtPrice && variantPrice && (
                  <span
                    className={cn(
                      "text-xs font-semibold bg-white/20 px-2 py-0.5 rounded",
                      "lg:text-sm"
                    )}
                  >
                    Save{" "}
                    {(
                      parseFloat(compareAtPrice) - parseFloat(variantPrice)
                    ).toFixed(0)}
                    €
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right side - CTA Button */}
          <AddToCart
            state={{ title: product.title, price: variantPrice }}
            product={product}
            floatingBar
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingBar;
