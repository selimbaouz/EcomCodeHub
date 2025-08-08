// SubmitButtonClient.tsx
"use client";

import { useVisibleFloatingCartStore, useCartStore, useOpenCartStore } from '@/store/cart';
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Product, VariantsProduct } from '@/types/types';
import { useTranslations } from 'next-intl';

interface SubmitButtonProps {
  size?: "fullWidth" | "initial";
  price?: string;
  variant: VariantsProduct;
  product: Product;
}

export function SubmitButtonClient({ size = "initial", price, variant, product }: SubmitButtonProps) {
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
          "py-4 px-2 lg:px-6 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium text-base border-t",
          size === "fullWidth" ? "min-w-full" : "w-max",
          "hover:bg-gradient-to-tr"
      )}
        onClick={async () => {
            addCartItem(variant, product);
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
                content_ids: [variant.node.id],
                content_name: variant.node.title,
                content_type: "product",
                value: variant?.node?.price?.amount,
                currency: "EUR",
                }),
            });
        }}
        >
            <p className={cn("uppercase")}>{t("productImage.addToCart", { price: parseFloat(price ?? "").toFixed(2) })}</p>
        </button>
    );
}
