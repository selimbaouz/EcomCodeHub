"use client"
import { useCartStore, useOpenCartStore } from '../../store/cart';
import { ShoppingCartIcon } from 'lucide-react';
import { DeleteItemButton } from '@/components/cart/delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import { createCartAndSetCookie } from './actions';
import { PulseLoader } from 'react-spinners';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn } from '@/lib/utils';
import { Cross2Icon } from '@radix-ui/react-icons';
import { MdLock } from 'react-icons/md';
import { createCheckoutSessionCart } from '@/actions/stripe';
import PriceCart from '../PriceCart';
import { useHideFlashPromoStore } from '@/store/hide-flashpromo';
import { useLocale, useTranslations } from 'next-intl';

export default function Cart() {
  const { cart, updateCartItem } = useCartStore();
  const {isOpenCart, setIsOpenCart} = useOpenCartStore();
   const setCartOpen = useHideFlashPromoStore((state) => state.setCartOpen);
  const quantityRef = useRef(cart?.quantity);
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();
  const t = useTranslations("fe.cart");

  useEffect(() => {
    if (cart.lines.length > 0 && isOpenCart) {
      createCartAndSetCookie();
    }
  }, [cart, isOpenCart]);
  
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
  }, [isOpenCart, cart?.quantity, quantityRef, setIsOpenCart]);

  /* const handleRedirectToCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    
    try {
      const cartItem = cart.lines[0];
      const variantId = cartItem.merchandise.id;
      const quantity = cart.quantity;
      const sellingPlanId = cartItem.sellingPlanAllocation?.sellingPlan.id;
      
        const url = await redirectToCheckoutUrl(variantId, quantity, sellingPlanId);
        if (url) {
          window.location.href = url;
          } else {
            console.error("L'URL de redirection est indéfinie.");
            setIsLoading(false);
          }
      } catch (error) {
        console.error("Erreur lors de la redirection vers le checkout:", error); 
        setIsLoading(false);
      }
      setIsLoading(false);
  } */

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const firstItem = cart.lines[0].merchandise;
      const [purchaseType, packName] = firstItem.title.split(" / ");

      const type =
      purchaseType === "Abonnement mensuel" ? "subscription"
        : firstItem.title === "Bundle" ? "bundle"
        : "one_time";

      const variantId = firstItem.id;
      const packNameWithBundle = type === "bundle" ? cart.lines[1].merchandise.selectedOptions[1].value : packName;
      
      const uniqueQuantity = cart.lines.find(item => item.merchandise.title.includes("Achat unique"))?.quantity || 1;
      const bundleQuantity = cart.lines.find(item => item.merchandise.title.includes("Bundle"))?.quantity || 1;
      const subscriptionQuantity = cart.lines.find(item => item.merchandise.title.includes("Abonnement mensuel"))?.quantity || 1;

      const quantities = type === "bundle" 
      ? [bundleQuantity, uniqueQuantity]  // Bundle + Achat unique 
      : type === "subscription" ? [subscriptionQuantity] :  [uniqueQuantity]; // Achat unique seul ou abonnement seul
        await fetch("/api/pixels-initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventTime: Math.floor(Date.now() / 1000),
            eventSourceUrl: window.location.href,
            userAgent: navigator.userAgent,
            fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
            tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
            value: cart.cost.totalAmount.amount,
            currency: cart.cost.totalAmount.currencyCode,
            content_ids: cart.lines.map(line => line.merchandise.id),
            num_items: cart.quantity,
            fbp: document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1]
          }),
        });

      const res = await createCheckoutSessionCart({
        packNameWithBundle,
        quantities,
        variantId,
        type,
        successUrl: `${window.location.origin}/${locale}/auth/login`,
        cancelUrl: `${window.location.origin}/${locale}/products/pack-pro-conversion-shopify?echec=true`,
      });

      if(res?.data?.url) {
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
          <div className='flex justify-between items-center p-4'>
            <SheetTitle className="text-foreground text-lg font-medium uppercase">{t("title")}</SheetTitle>
            <SheetClose>
              <Cross2Icon className="size-5" />
              <span className="sr-only">{t("close")}</span>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className={cn("bg-background text-foreground h-auto flex-grow overflow-hidden")}>
          {!cart || cart.lines.length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center pt-14">
                <ShoppingCartIcon className="size-14" />
                <p className="mt-6 text-center text-lg font-medium">{t("emptyCart")}</p>
              </div>
          ) : (
              <div className='h-[92%] flex flex-col justify-between'>
                <ul className="flex-1 overflow-auto">
                  {cart.lines
                  .sort((a, b) =>
                      a.merchandise.product.title.localeCompare(b.merchandise.product.title)
                  ).map((item, i) => {
                    const amount = Number(item.cost.totalAmount.amount);
                    return (
                      <li key={i} className="w-full border-b dark:border-b-gray-200/10">
                        <div className='flex w-full justify-between gap-1 items-stretch py-6 px-4'>
                          <Image src={item.merchandise.product.featuredImage.node.originalSrc} alt="Image of Product" width={500} height={500} className="size-20 max-w-20 lg:h-32 lg:w-32 lg:max-w-32 rounded-lg object-fill" />
                          <div className='ml-4 w-full space-y-4'>
                            <div>
                              <p className="text-sm font-bold">{item.merchandise.product.title}</p>
                              <p className='text-sm'>{item.merchandise.title}</p>
                            </div>
                            <div className="flex items-center border w-max dark:border-gray-200/10">
                              <EditItemQuantityButton
                                  item={item}
                                  type="minus"
                                  optimisticUpdate={updateCartItem}
                              />
                              <span className="mx-4 text-sm font-semibold">{item.quantity}</span>
                              <EditItemQuantityButton
                                  item={item}
                                  type="plus"
                                  optimisticUpdate={updateCartItem}
                              />
                            </div>
                          </div>
                          <div className={cn("flex flex-col justify-between h-auto items-end")}>
                            <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                            <PriceCart
                                className="text-sm text-foreground font-montserrat"
                                amount={String(amount)}
                                currencyCode={item.cost.totalAmount.currencyCode}
                            />
                          </div>
                        </div>
                      </li>
                    )}  
                  )}
                </ul>
            </div>
          )}
          </div>
          <div className='absolute bottom-0 pb-6 w-full'>
          {/*   <div className={cn("w-full py-3 bg-secondary/30 dark:bg-[#2c4049] flex justify-center")}>
              <p className='text-primary uppercase font-semibold text-xs dark:text-white'>{t("couponInfo")}</p>
            </div> */}
            <div className="z-50 border-t dark:border-t-gray-200/10 p-4 pt-6 flex items-center justify-between dark:border-gray-200/10 border-neutral-200 dark:border-neutral-700">
                <p className={cn("uppercase font-semibold")}>{t("totalLabel")}</p>
                <span className='ml-1 inline'>
                    <PriceCart
                        className="flex justify-end space-y-2 text-right text-sm"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                    />
                </span>
            </div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                await handleCheckout();
              }} 
              className='px-4'
            >
                <CheckoutButton isLoading={isLoading} quantity={cart.quantity} t={t} />
            </form>
          </div>
      </SheetContent>
  </Sheet>
  );
}


function CheckoutButton({isLoading, quantity, t}: {isLoading: boolean, quantity: number, t: (key: string) => string}) {
    return (
      <button
        className="bg-primary rounded-lg text-white hover:bg-primary/80 uppercase py-[18px] w-full flex items-center justify-around text-sm font-semibold"
        type='submit'
        disabled={isLoading || quantity === 0}
      >
        <MdLock className={cn("text-white flex justify-start text-lg")} />
        {isLoading ? <PulseLoader size={7} color="white" /> : t("checkoutButton")}
        <div />
      </button>
    );
  }