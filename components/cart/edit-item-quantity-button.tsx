"use client";

import { CartItem } from "@/types/types";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useCartStore } from "@/store/cart";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const { updateCartItem } = useCartStore();
  const merchandiseId = item.merchandise.id;

  return (
    <button
      onClick={() => {
        updateCartItem(merchandiseId, type);
      }}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center p-2 transition-all duration-200 hover:border-primary hover:opacity-80 bg-primary",
        {
          "ml-auto border-r border-white": type === "minus",
          "border-l border-white": type === "plus",
        }
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="size-3 text-white" />
      ) : (
        <MinusIcon className="size-3 text-white" />
      )}
    </button>
  );
}
