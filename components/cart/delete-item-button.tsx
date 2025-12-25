"use client";

import { CartItem } from "@/types/types";
import { CgClose } from "react-icons/cg";
import { useCartStore } from "@/store/cart";

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { updateCartItem } = useCartStore();
  const merchandiseId = item.merchandise.id;

  return (
    <button
      onClick={() => {
        updateCartItem(merchandiseId, "delete");
      }}
      aria-label="Remove cart item"
      className="flex h-[24px] w-[24px] items-center justify-center rounded-lg bg-primary hover:bg-primary/80"
    >
      <CgClose className="mx-[1px] h-4 w-4 text-white" />
    </button>
  );
}
