"use client";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { AddToCart } from "../cart/add-to-cart";
import { Product } from "@/types/types";
import { useIsHydrated } from "@/hook/useIsHydrated";
import { motion } from "framer-motion";

interface FloatingBarProps {
  product: Product;
}
const FloatingBar: FC<FloatingBarProps> = ({ product }) => {
  const isHydrated = useIsHydrated();
  const variantPrice = product.variants.edges[0].node.price?.amount;

  if (!isHydrated) {
    return null;
  }

  return (
    <motion.div className={cn("sticky bottom-0 z-[100] mx-auto w-full h-full")}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className={cn("z-50 relative bg-white border-t border-secondary")}
      >
        <div
          className={cn(
            "py-2 px-4 bg-white text-foreground border-t border-secondary relative flex flex-col justify-center max-w-screen-xl mx-auto"
          )}
        >
          <div className={cn("flex items-center justify-between")}>
            <div className={cn("lg:space-y-0.5")}>
              <h6 className={cn("font-bold text-lg", "lg:text-3xl")}>
                MosqiBlock
              </h6>
              <p className={cn("font-bold text-lg text-primary")}>
                {variantPrice
                  ? parseFloat(variantPrice).toFixed(2)
                  : product.priceRange.minVariantPrice.amount}{" "}
                €
              </p>
            </div>
            <AddToCart
              state={{ title: product.title, price: variantPrice }}
              product={product}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingBar;
