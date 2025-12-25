"use client";
import { useCartStore, useOpenCartStore } from "../../store/cart";
import { ShoppingCartIcon } from "lucide-react";
import { DeleteItemButton } from "@/components/cart/delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { PulseLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { createCheckoutSessionCart } from "@/actions/stripe";
import PriceCart from "../PriceCart";
import { useHideFlashPromoStore } from "@/store/hide-flashpromo";
import { useLocale, useTranslations } from "next-intl";
import SecureBadges from "@/components/SecureBadges";
import { FB_PIXEL_ID } from "@/lib/constants";

export default function Cart() {
  const { cart } = useCartStore();
  const { isOpenCart, setIsOpenCart } = useOpenCartStore();
  const setCartOpen = useHideFlashPromoStore((state) => state.setCartOpen);
  const quantityRef = useRef(cart?.quantity);
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();
  const t = useTranslations("fe.cart");

  useEffect(() => {
    if (
      cart?.quantity &&
      cart?.quantity !== quantityRef.current &&
      cart?.quantity > 0
    ) {
      if (!isOpenCart) {
        setCartOpen(true);
        setIsOpenCart(true);
      }
      quantityRef.current = cart?.quantity;
    }
  }, [isOpenCart, cart?.quantity, quantityRef, setIsOpenCart, setCartOpen]);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const firstItem = cart.lines[0].merchandise;
      const variantId = firstItem.id;

      const uniqueQuantity =
        cart.lines.find((item) =>
          item.merchandise.title.includes("Achat unique")
        )?.quantity || 1;

      const quantities = [uniqueQuantity];
      await fetch("/api/pixels-initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTime: Math.floor(Date.now() / 1000),
          eventSourceUrl: window.location.href,
          userAgent: navigator.userAgent,
          fbPixelId: FB_PIXEL_ID,
          value: cart.cost.totalAmount.amount,
          currency: cart.cost.totalAmount.currencyCode,
          content_ids: cart.lines.map((line) => line.merchandise.id),
          num_items: cart.quantity,
          fbp: document.cookie
            .split("; ")
            .find((row) => row.startsWith("_fbp="))
            ?.split("=")[1],
        }),
      });

      const res = await createCheckoutSessionCart({
        quantities,
        variantId,
        successUrl: `${window.location.origin}/${locale}/products/shopify-pro-codes-bundle?success=true`,
        cancelUrl: `${window.location.origin}/${locale}/products/shopify-pro-codes-bundle?echec=true`,
      });

      if (res?.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Erreur lors du démarrage du paiement :", error);
      alert(t("toast.errors.errorServerStripe"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpenCart} onOpenChange={setIsOpenCart}>
      <SheetContent side="right" className="h-full w-full">
        <SheetHeader className="border-b">
          <div className="flex justify-between items-center p-4">
            <SheetTitle className="text-foreground text-lg font-medium">
              {t("title")}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {t("emptyCart")}
            </SheetDescription>
            <SheetClose>
              <Cross2Icon className="size-5" />
              <span className="sr-only">{t("close")}</span>
            </SheetClose>
          </div>
        </SheetHeader>
        <div
          className={cn(
            "bg-background text-foreground h-auto flex-grow overflow-hidden"
          )}
        >
          {!cart || cart.lines.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center pt-14">
              <ShoppingCartIcon className="size-14" />
              <p className="mt-6 text-center text-lg font-medium">
                {t("emptyCart")}
              </p>
            </div>
          ) : (
            <div className="h-[92%] flex flex-col justify-between">
              <ul className="flex-1 overflow-auto">
                {cart.lines
                  .sort((a, b) =>
                    a.merchandise.product.title.localeCompare(
                      b.merchandise.product.title
                    )
                  )
                  .map((item, i) => {
                    const amount = Number(item.cost.totalAmount.amount);
                    const compareAtAmount = item.merchandise.compareAtPrice
                      ? Number(item.merchandise.compareAtPrice.amount) *
                        item.quantity
                      : null;
                    const savings = compareAtAmount
                      ? compareAtAmount - amount
                      : 0;

                    return (
                      <li
                        key={i}
                        className="w-full border-b dark:border-b-gray-200/10"
                      >
                        <div className="flex w-full justify-between gap-1 items-stretch py-6 px-4">
                          <Image
                            src={
                              item.merchandise.product.featuredImage.node
                                .originalSrc
                            }
                            alt="Image of Product"
                            width={500}
                            height={500}
                            className="size-20 max-w-32 lg:h-32 lg:w-32 lg:max-w-32 rounded-lg object-fill"
                          />
                          <div className="ml-1 md:ml-4 w-full space-y-3">
                            <div>
                              <p className="text-base md:text-xl font-bold">
                                {item.merchandise.product.title}
                              </p>
                            </div>
                            <div className="flex items-center rounded-md overflow-hidden w-max bg-primary">
                              <EditItemQuantityButton
                                item={item}
                                type="minus"
                              />
                              <span className="px-4 py-1 text-sm font-bold bg-primary text-white">
                                {item.quantity}
                              </span>
                              <EditItemQuantityButton item={item} type="plus" />
                            </div>
                          </div>
                          <div
                            className={cn(
                              "flex flex-col justify-between h-auto items-end"
                            )}
                          >
                            <DeleteItemButton item={item} />
                            <div className="text-right space-y-0.5 w-full">
                              <div className="flex items-center justify-end gap-2">
                                {compareAtAmount && (
                                  <div className="flex items-center justify-end">
                                    <PriceCart
                                      className="text-sm text-muted-foreground line-through font-montserrat"
                                      amount={String(compareAtAmount)}
                                      currencyCode={
                                        item.cost.totalAmount.currencyCode
                                      }
                                    />
                                  </div>
                                )}
                                <PriceCart
                                  className="text-lg font-extrabold text-primary font-montserrat"
                                  amount={String(amount)}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                              </div>
                              {savings > 0 && (
                                <p className="text-sm text-foreground font-semibold">
                                  {t("youSave", {
                                    amount: `${new Intl.NumberFormat(locale, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(savings)}€`,
                                  })}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 pb-2 w-full">
          {/*   <div className={cn("w-full py-3 bg-secondary/30 dark:bg-[#2c4049] flex justify-center")}>
              <p className='text-primary uppercase font-semibold text-xs dark:text-white'>{t("couponInfo")}</p>
            </div> */}
          <div className="z-50 border-t dark:border-t-gray-200/10 p-4 pt-4 space-y-3">
            {(() => {
              const totalSavings = cart.lines.reduce((acc, item) => {
                const compareAtAmount = item.merchandise.compareAtPrice
                  ? Number(item.merchandise.compareAtPrice.amount) *
                    item.quantity
                  : 0;
                const amount = Number(item.cost.totalAmount.amount);
                return acc + (compareAtAmount ? compareAtAmount - amount : 0);
              }, 0);

              return totalSavings > 0 ? (
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">
                    {t("savingsLabel")}
                  </p>
                  <p className="text-lg font-extrabold text-primary">
                    -
                    {new Intl.NumberFormat(locale, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(totalSavings)}
                    €
                  </p>
                </div>
              ) : null;
            })()}
            <div className="flex items-center justify-between">
              <p className={cn("font-bold text-lg")}>{t("totalLabel")}</p>
              <span className="ml-1 inline">
                <PriceCart
                  className="flex justify-end space-y-2 text-right text-xl font-extrabold"
                  amount={cart.cost.totalAmount.amount}
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              </span>
            </div>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleCheckout();
            }}
            className="px-4"
          >
            <CheckoutButton
              isLoading={isLoading}
              quantity={cart.quantity}
              t={t}
            />
          </form>
          <div className="pt-4">
            <SecureBadges />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CheckoutButton({
  isLoading,
  quantity,
  t,
}: {
  isLoading: boolean;
  quantity: number;
  t: (key: string) => string;
}) {
  return (
    <button
      className="bg-primary rounded-lg text-white hover:bg-primary/80 uppercase py-[18px] w-full flex items-center justify-center text-sm font-semibold"
      type="submit"
      disabled={isLoading || quantity === 0}
    >
      {isLoading ? <PulseLoader size={7} color="white" /> : t("checkoutButton")}
      <div />
    </button>
  );
}
