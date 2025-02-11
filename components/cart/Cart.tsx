"use client"
import { useCartStore, useOpenCartStore } from '../../store/cart';
import { ShoppingCartIcon } from 'lucide-react';
import Price from '../Price';
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
import CartTimer from './cart-timer';
import FreeShippingBar from './FreeShippingBar';
import { createCheckoutSession } from '@/data/stripe/action';

export default function Cart() {
  const { timeLeft, cart, updateCartItem } = useCartStore();
  const {isOpenCart, setIsOpenCart} = useOpenCartStore();
  const quantityRef = useRef(cart?.quantity);
  const [isLoading, setIsLoading] = useState(false);

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
      const type =
      cart.lines[0].merchandise.title === "Abonnement mensuel" ? "subscription"
          : cart.lines[0].merchandise.title === "Bundle"
          ? "bundle"
          : "one_time";

      const variantId = cart.lines[0].merchandise.id;

      const { url } = await createCheckoutSession({
        variantId,
        type,
        successUrl: `${window.location.origin}?success=true`,
        cancelUrl: `${window.location.origin}?cancel=true`,
      });

      if(url) {
        window.location.href = url;
      }

      /**const res = await createTestShopifyOrder(
        "sejiux@gmail.com",
        cart.lines,
      )**/

    } catch (error) {
      console.error("Erreur lors du démarrage du paiement :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpenCart} onOpenChange={setIsOpenCart}>
      <SheetContent side="right" className="h-full w-full">
        <SheetHeader className="border-b">
          <div className='flex justify-between items-center p-4'>
            <SheetTitle className="text-foreground text-lg font-medium uppercase">Votre Panier</SheetTitle>
            <SheetClose>
              <Cross2Icon className="size-5" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>
        {timeLeft > 0 && (
          <div className={cn("w-full py-3 bg-primary flex justify-center")}>
            <CartTimer />
          </div>
        )}
        <div className='py-6 text-sm flex flex-col justify-center text-center px-4 border-b dark:border-b-gray-200/10'>
          <FreeShippingBar timeForFreeDelivery={50}/>
        </div>
        <div className={cn("bg-background text-foreground h-auto flex-grow overflow-hidden")}>
          {!cart || cart.lines.length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center pt-14">
                <ShoppingCartIcon className="size-14" />
                <p className="mt-6 text-center text-lg font-medium">Votre panier est vide.</p>
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
                            <Price
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
            <div className={cn("w-full py-3 bg-secondary/30 dark:bg-[#2c4049] flex justify-center")}>
              <p className='text-primary uppercase font-semibold text-xs dark:text-white'>Garantie satisfaction de 90 jours</p>
            </div>
            <div className="z-50 border-t dark:border-t-gray-200/10 p-4 pt-6 flex items-center justify-between dark:border-gray-200/10 border-neutral-200 dark:border-neutral-700">
                <p className={cn("uppercase font-semibold")}>Total</p>
                <span className='ml-1 inline'>
                    <Price
                        className="flex justify-end space-y-2 text-right text-sm"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                    />
                </span>
            </div>
            <form action={handleCheckout} className='px-4'>
                <CheckoutButton isLoading={isLoading} />
            </form>
          </div>
      </SheetContent>
  </Sheet>
  );
}


function CheckoutButton({isLoading}: {isLoading: boolean}) {
    return (
      <button
        className="bg-primary rounded-lg text-white hover:bg-primary/80 uppercase py-[18px] w-full flex items-center justify-around text-sm font-semibold"
        type='submit'
        disabled={isLoading}
      >
        <MdLock className={cn("text-white flex justify-start text-lg")} />
        {isLoading ? <PulseLoader size={7} color="white" /> : "Passez à l'étape suivante"}
        <div />
      </button>
    );
  }