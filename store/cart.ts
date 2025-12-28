import { Cart, CartItem } from "@/types/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UpdateType = "plus" | "minus" | "delete";

interface CartState {
  cart: Cart;
  addCartItem: () => void;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  clearCart: () => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
}

interface OpenCartState {
  isOpenCart: boolean;
  setIsOpenCart: (isOpen: boolean) => void;
}

interface FloatingBarState {
  isOpenFloatingBar: boolean;
  setIsOpenFloatingBar: (isOpenFloatingBar: boolean) => void;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

interface CheckoutUrlState {
  checkoutUrl: string;
  setCheckoutUrl: (url: string) => void;
}

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount,
      },
    },
  };
}

function createOrUpdateCartItem(existingItem: CartItem | undefined): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(
    quantity,
    parseFloat("29.90").toFixed(2)
  );

  return {
    id: existingItem?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: "EUR",
      },
    },
    merchandise: {
      id: "prod_shopify_pro_bundle",
      title: "Shopify Pro Codes Bundle",
      selectedOptions: [],
      product: {
        id: "shopify-pro-codes-bundle",
        handle: "shopify-pro-codes-bundle",
        title: "Shopify Pro Codes Bundle",
        featuredImage: {
          node: {
            originalSrc: "/images/pro-codes-product-1.png",
            altText: "Shopify Pro Codes Bundle",
            width: 500,
            height: 500,
          },
        },
      },
      compareAtPrice: {
        amount: "150.00",
        currencyCode: "EUR",
      },
    },
  };
}

function updateCartTotals(lines: CartItem[]): Pick<Cart, "quantity" | "cost"> {
  const quantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "EUR";

  return {
    quantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: "",
    quantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "EUR" },
      totalAmount: { amount: "0", currencyCode: "EUR" },
      totalTaxAmount: { amount: "0", currencyCode: "EUR" },
    },
  };
}

export const useCheckoutUrlStore = create<CheckoutUrlState>((set) => ({
  checkoutUrl: "",
  setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
}));

export const useOpenCartStore = create<OpenCartState>((set) => ({
  isOpenCart: false,
  setIsOpenCart: (isOpenCart) => set({ isOpenCart }),
}));

export const useVisibleFloatingCartStore = create<FloatingBarState>((set) => ({
  isOpenFloatingBar: false,
  setIsOpenFloatingBar: (isOpenFloatingBar) => set({ isOpenFloatingBar }),
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
}));

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: createEmptyCart(),
      timeLeft: 10 * 60,
      setTimeLeft: (time) =>
        set(() => ({
          timeLeft: time,
        })),
      clearCart: () =>
        set(() => ({
          cart: createEmptyCart(),
          timeLeft: 0,
        })),
      addCartItem: () =>
        set((state) => {
          const currentCart = state.cart || createEmptyCart();
          const existingItem = currentCart.lines.find(
            (item) => item.merchandise.id === "prod_shopify_pro_bundle"
          );
          const updatedItem = createOrUpdateCartItem(existingItem);

          const updatedLines = existingItem
            ? currentCart.lines.map((item) =>
                item.merchandise.id === "prod_shopify_pro_bundle"
                  ? updatedItem
                  : item
              )
            : [...currentCart.lines, updatedItem];

          return {
            cart: {
              ...currentCart,
              ...updateCartTotals(updatedLines),
              lines: updatedLines,
            },
            timeLeft: state.timeLeft > 0 ? state.timeLeft : 10 * 60,
          };
        }),

      updateCartItem: (merchandiseId, updateType) =>
        set((state) => {
          const currentCart = state.cart || createEmptyCart();
          const updatedLines = currentCart.lines
            .map((item) =>
              item.merchandise.id === merchandiseId
                ? updateCartItem(item, updateType)
                : item
            )
            .filter(Boolean) as CartItem[];

          if (updatedLines.length === 0) {
            return {
              cart: {
                ...currentCart,
                lines: [],
                quantity: 0,
                cost: {
                  ...currentCart.cost,
                  totalAmount: { ...currentCart.cost.totalAmount, amount: "0" },
                },
              },
            };
          }

          return {
            cart: {
              ...currentCart,
              ...updateCartTotals(updatedLines),
              lines: updatedLines,
            },
          };
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
