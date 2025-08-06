'use client';

import { Product, VariantsProduct } from '@/types/types';
import { useFormState } from 'react-dom';
import { addItem } from './actions';
import { useCartStore, useOpenCartStore, useVisibleFloatingCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useTranslations } from "next-intl";

interface SubmitButtonProps {
  size?: "fullWidth" | "initial";
  price?: string;
}
function SubmitButton({size = "initial", price}: SubmitButtonProps) {
  const buttonRef = useRef(null);
  const { setIsVisible } = useVisibleFloatingCartStore();
  const t = useTranslations("fe");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(buttonRef.current);
      }
    };
  }, [setIsVisible]);

  return (
      <button
        aria-label="Add to cart"
        ref={buttonRef}
        className={cn(
          "py-4 px-2 lg:px-6 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium text-base border-t",
          size === "fullWidth" ? "min-w-full" : "w-max",
          "hover:bg-gradient-to-tr"
      )}
      >
        <p className={cn("uppercase")}>{t("productImage.addToCart", { price: parseFloat(price ?? "").toFixed(2) })}</p>
      </button>
  );
}

export function AddToCart({ 
  product, 
  bundle,
  size = "initial", 
  state 
}: { 
  product: Product, 
  bundle?: Product,
  size?: "fullWidth" | "initial", 
  color?: "gradient" | "foreground", 
  state?: {
  title: string,
  price?: string;
} }) {
  const variants = product.variants.edges;
  const { addCartItem } = useCartStore();
  const { setIsOpenCart } = useOpenCartStore();
  const { setIsOpenFloatingBar } = useVisibleFloatingCartStore();
  const [message] = useFormState(addItem, null);

  const stateValues = state?.title.split(" / ").map(s => s.trim());

  const variant = product.variants.edges.find((variant) =>
      variant.node.selectedOptions?.map(option => option.value.trim().toLowerCase()).join(" / ") === stateValues?.join(" / ").toLowerCase()
    );

  
  /* const variantId = variants[0].node.id;
  const actionWithVariant = formAction.bind(null, variantId); */
  const defaultVariantId = variants.length === 1 ? variants[0]?.node.id : undefined;
  const selectedVariantId = variant?.node.id || defaultVariantId;
  const sellingPlanId = variant?.node.sellingPlanAllocations?.edges?.[0]?.node?.sellingPlan?.id;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actionWithVariant = async (prevState: any) => {
    addItem(prevState, selectedVariantId, sellingPlanId ? sellingPlanId : undefined);
    if (bundle) {
      addCartItem(bundle.variants.edges[0], bundle); 
    } 
  }
  
  /* const actionWithVariant = formAction.bind(null, selectedVariantId); */
  const finalVariant = variants.find((variant) => variant.node.id === selectedVariantId)!;
  const updatedPrice = bundle ? (parseFloat(state?.price ?? "0") + parseFloat(bundle.priceRange.maxVariantPrice.amount)).toFixed(2) : state?.price;
  
  return (
    <form
      action={async (prevState) => {
        addCartItem(finalVariant, product);
        await actionWithVariant(prevState);
        setIsOpenFloatingBar(false);
      }}
      onClick={() => setIsOpenCart(true)}
    >
      <SubmitButton size={size} price={updatedPrice} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
