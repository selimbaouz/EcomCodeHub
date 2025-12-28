"use client";

import {
  useVisibleFloatingCartStore,
  useCartStore,
  useOpenCartStore,
} from "@/store/cart";
import { useProductStore } from "@/store/product";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { FB_PIXEL_ID } from "@/lib/constants";

interface SubmitButtonProps {
  size?: "fullWidth" | "initial";
  floatingBar?: boolean;
}

export function SubmitButtonClient({
  size = "initial",
  floatingBar = false,
}: SubmitButtonProps) {
  const buttonRef = useRef(null);
  const t = useTranslations("fe");
  const { setIsVisible } = useVisibleFloatingCartStore();
  const { addCartItem } = useCartStore();
  const { setIsOpenCart } = useOpenCartStore();
  const { currentProduct: product } = useProductStore();

  useEffect(() => {
    const target = document.getElementById("add-to-cart-anchor");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.25 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [setIsVisible]);

  if (!product) return null;

  const handleAddToCart = async () => {
    addCartItem();
    setIsOpenCart(true);

    await fetch("/api/pixels-add-to-cart", {
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
      }),
    });
  };

  return (
    <button
      type="submit"
      ref={buttonRef}
      className={cn(
        "rounded-lg font-medium border-t",
        size === "fullWidth" ? "min-w-full" : "w-max",
        floatingBar
          ? "bg-background hover:bg-background/80 text-primary text-sm py-3 px-2 lg:px-6"
          : "bg-primary hover:bg-primary/80 text-white text-base py-4 px-2 lg:px-6"
      )}
      onClick={handleAddToCart}
    >
      {floatingBar ? (
        <p className={cn("uppercase font-bold")}>Add to cart</p>
      ) : (
        <div className={cn("flex items-center justify-center gap-2")}>
          <p className={cn("uppercase")}>
            {t("productImage.addToCart", {
              price: product.price.toFixed(2),
            })}
          </p>
          <p className="line-through text-white/70">
            {t("productImage.compareAtPrice", {
              compareAtPrice: product.compareAtPrice.toFixed(2),
            })}
          </p>
        </div>
      )}
    </button>
  );
}
