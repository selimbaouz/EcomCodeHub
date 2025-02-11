'use server';

import { addToCart, createCart, getCart, getCheckoutURL, removeFromCart, updateCart } from '@/data/shopify';
import { TAGS } from '@/lib/constants';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export async function addItem(prevState: any, variantId: string | undefined, sellingPlanId?: string) {
    // Récupère ou crée un cartId
    let cartId = cookies().get('cartId')?.value;
  
    // Si aucun cartId trouvé, crée un nouveau panier et récupère son ID
    if (!cartId) {
      try {
        const cart = await createCart();
        cartId = cart.id!;
        cookies().set('cartId', cartId);  // Stocke le nouvel ID de panier dans les cookies
      } catch (error) {
        console.error("Erreur lors de la création du panier :", error);
        return 'Erreur lors de la création du panier';
      }
    }
  
    // Vérifie si le variantId est fourni
    if (!variantId) {
      return 'Erreur : variantId est manquant';
    }
  
    try {
      // Ajoute le produit au panier
      await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1, sellingPlanId }]);
      revalidateTag(TAGS.cart);
    } catch (e) {
      console.error("Erreur lors de l'ajout au panier :", e);
      return 'Erreur lors de l\'ajout au panier';
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function removeItem(prevState: any, merchandiseId: string) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId);

    if (lineItem && lineItem.id) {
      await removeFromCart(cartId, [lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    console.error(e);

    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId);

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart(cartId, [lineItem.id]);
      } else {
        await updateCart(cartId, [
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart(cartId, [{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return 'Error updating item quantity';
  }
}

export async function redirectToCheckoutUrl(variantId: string, quantity: number, sellingPlanId?: string) {
  if(!quantity) {
    return "No Quantity"
  }

  try {
    const checkoutUrl = await getCheckoutURL(variantId, quantity, sellingPlanId);

    if (!checkoutUrl) {
      return "Error Url"; // Si l'URL n'est pas générée correctement
    }
    
      /* const customCheckoutUrl = checkoutUrl.replace(
        /^https:\/\/tailwindliquid\.myshopify\.com/,
        "https://www.tailwindliquid.com"
      ); */

    return checkoutUrl; // Retourne l'URL du checkout
  } catch (error) {
    console.error("Erreur lors de la redirection vers le checkout :", error);
    throw error;
  }
}

export async function redirectCartToCheckout() {
  const cartId = cookies().get('cartId')?.value;

  const cart = await getCart(cartId);

  return console.log(cart?.checkoutUrl)
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
  cookies().set('cartId', cart.id!);
}


/* await getCheckoutURL(cart.id!); */