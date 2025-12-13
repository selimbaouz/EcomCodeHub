// SubmitButtonClient.tsx
"use client";

import {
  useVisibleFloatingCartStore,
  useCartStore,
  useOpenCartStore,
} from "@/store/cart";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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

  return (
    <button
      type="submit"
      ref={buttonRef}
      className={cn(
        "rounded-lg font-medium border-t",
        size === "fullWidth" ? "min-w-full" : "w-max",
        floatingBar
          ? "bg-background hover:bg-background/80 text-primary text-sm py-3 px-2 lg:px-6"
          : " bg-primary hover:bg-primary/80 text-white text-base py-4 px-2 lg:px-6"
      )}
      onClick={async () => {
        addCartItem();
        setIsOpenCart(true);
        await fetch("/api/pixels-add-to-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventTime: Math.floor(Date.now() / 1000),
            eventSourceUrl: window.location.href,
            userAgent: navigator.userAgent,
            fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
            tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
            content_ids: ["prod_shopify_pro_bundle"],
            content_name: "Shopify Pro Codes Bundle (Limited Offer)",
            content_type: "product",
            value: parseFloat("29.90").toFixed(2),
            currency: "EUR",
          }),
        });
      }}
    >
      {floatingBar ? (
        <>
          <p className={cn("uppercase font-bold")}>Add to cart</p>
        </>
      ) : (
        <div className={cn("flex items-center justify-center gap-2")}>
          <p className={cn("uppercase")}>
            {t("productImage.addToCart", {
              price: parseFloat("29.90").toFixed(2),
            })}
          </p>
          <p className="line-through text-white/70">
            {t("productImage.compareAtPrice", {
              compareAtPrice: parseFloat("150.00").toFixed(2),
            })}
          </p>
        </div>
      )}
    </button>
  );
}
