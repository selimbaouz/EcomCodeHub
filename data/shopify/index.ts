"use server"
import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "@/lib/constants";
import { isShopifyError } from "@/types/type-guards";
import { ensureStartsWith } from "@/lib/utils";
import { getProductByHandle, getProductByIdQuery } from "./queries/product";
import { 
  Cart, 
  Connection, 
  Menu, 
  Page, 
  Product, 
  ShopifyAddToCartOperation, 
  ShopifyCart, 
  ShopifyCartOperation, 
  ShopifyCheckoutCreateUrl, 
  ShopifyChekoutUrl, 
  ShopifyCreateCartOperation, 
  ShopifyCreateCustomer, 
  ShopifyMenuOperation, 
  ShopifyPageOperation, 
  ShopifyPagesOperation, 
  ShopifyProduct, 
  ShopifyProductById, 
  ShopifyRemoveFromCartOperation, 
  ShopifySendInvite, 
  ShopifyUpdateCartOperation
} from "../../types/types";
import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from "./mutations/cart";
import { getCartQuery, getCheckoutUrl } from "./queries/cart";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import { checkoutCreate } from "./queries/checkout";
import { createCustomer, sendCustomerInvite } from "./mutations/customer";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
    cache = 'no-cache', //force-cache
    headers,
    query,
    tags,
    variables
  }: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: ExtractVariables<T>;
  }): Promise<{ status: number; body: T } | never> {
    try {
      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': accessToken,
          ...headers
        },
        body: JSON.stringify({
          ...(query && { query }),
          ...(variables && { variables })
        }),
        cache,
        ...(tags && { next: { tags } })
      });
  
      const body = await result.json();
  
      if (body.errors) {
        throw body.errors[0];
      }
  
      return {
        status: result.status,
        body
      };
    } catch (e) {
      if (isShopifyError(e)) {
        throw {
          cause: e.cause?.toString() || 'unknown',
          status: e.status || 500,
          message: e.message,
          query
        };
      }
  
      throw {
        error: e,
        query
      };
    }
  }

  export async function getHandleOfProduct(handle: string | undefined): Promise<Product | undefined> {
    if (!handle) {
        return undefined;
    }

    const res = await shopifyFetch<ShopifyProduct>({
        query: getProductByHandle,
        variables: { handle },
        tags: [TAGS.products],
      });

      if (!res.body.data.productByHandle) {
        return undefined;
      }
    
      return res.body.data.productByHandle;
  }

  export async function getProductById(productId: string | undefined): Promise<Product | undefined> {
    if (!productId || !productId.startsWith("gid://shopify/Product/")) {
      console.error("Erreur: productId est undefined ou null", productId)
        return undefined;
    }

    const res = await shopifyFetch<ShopifyProductById>({
        query: getProductByIdQuery,
        variables: { id: productId },
        tags: [TAGS.products],
      });

      if (!res.body.data.product) {
        return undefined;
      }
    
      return res.body.data.product;
  }

  const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
    return array.edges.map((edge) => edge?.node);
  };

  const reshapeCart = (cart: ShopifyCart): Cart => {
    if (!cart.cost?.totalTaxAmount) {
      cart.cost.totalTaxAmount = {
        amount: '0.0',
        currencyCode: 'EUR'
      };
    }
  
    return {
      ...cart,
      lines: removeEdgesAndNodes(cart.lines)
    };
  };

  export async function createCart(): Promise<Cart> {
    const res = await shopifyFetch<ShopifyCreateCartOperation>({
      query: createCartMutation,
      cache: 'no-store'
    });
  
    return reshapeCart(res.body.data.cartCreate.cart);
  }
  
  export async function addToCart(
    cartId: string,
    lines: { merchandiseId: string; quantity: number; sellingPlanId?: string }[]
  ): Promise<Cart> {
    const res = await shopifyFetch<ShopifyAddToCartOperation>({
      query: addToCartMutation,
      variables: {
        cartId,
        lines
      },
      cache: 'no-store'
    });
    return reshapeCart(res.body.data.cartLinesAdd.cart);
  }

  export async function getCheckouCarttURL(cartId: string) {
    const res = await shopifyFetch<ShopifyChekoutUrl>({
      query: getCheckoutUrl,
      variables: {
        cartId,
      },
      cache: 'no-store'
    })
    return res.body.data.cart.checkoutUrl;
  }

  export async function getCheckoutURL(variantId: string, quantity: number, sellingPlanId?: string) {
    const res = await shopifyFetch<ShopifyCheckoutCreateUrl>({
      query: checkoutCreate,
      variables: {
        lineItems: [
          {
            variantId,
            quantity,
            sellingPlanId
          },
        ],
      },
      cache: 'no-store'
    })

    if (!res.body.data.checkoutCreate.checkout) {
      throw new Error(
        'Erreur lors de la création du checkout : ' +
          console.error(JSON.stringify(res.body.data.checkoutCreate.userErrors))
      );
    }
  
    return res.body.data.checkoutCreate.checkout.webUrl;
  }
  
  export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
    const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
      query: removeFromCartMutation,
      variables: {
        cartId,
        lineIds
      },
      cache: 'no-store'
    });
  
    return reshapeCart(res.body.data.cartLinesRemove.cart);
  }
  
  export async function updateCart(
    cartId: string,
    lines: { id: string; merchandiseId: string; quantity: number }[]
  ): Promise<Cart> {
    const res = await shopifyFetch<ShopifyUpdateCartOperation>({
      query: editCartItemsMutation,
      variables: {
        cartId,
        lines
      },
      cache: 'no-store'
    });
  
    return reshapeCart(res.body.data.cartLinesUpdate.cart);
  }
  
  export async function getCart(cartId: string | undefined): Promise<Cart | undefined> {
    if (!cartId) {
      return undefined;
    }
  
    const res = await shopifyFetch<ShopifyCartOperation>({
      query: getCartQuery,
      variables: { cartId },
      tags: [TAGS.cart]
    });
  
    // Old carts becomes `null` when you checkout.
    if (!res.body.data.cart) {
      return undefined;
    }
  
    return reshapeCart(res.body.data.cart);
  }

  export async function getMenu(handle: string): Promise<Menu[]> {
    const res = await shopifyFetch<ShopifyMenuOperation>({
      query: getMenuQuery,
      tags: [TAGS.collections],
      variables: {
        handle
      },
    });
  
    
    return (
      res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
        title: item.title,
        path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
      })) || []
    );
  }
  
  export async function getPage(handle: string): Promise<Page> {
    const res = await shopifyFetch<ShopifyPageOperation>({
      query: getPageQuery,
      cache: 'no-store',
      variables: { handle }
    });
  
    return res.body.data.pageByHandle;
  }
  
  export async function getPages(): Promise<Page[]> {
    const res = await shopifyFetch<ShopifyPagesOperation>({
      query: getPagesQuery,
      cache: 'no-store'
    });
  
    return removeEdgesAndNodes(res.body.data.pages);
  }


export async function createShopifyCustomer(email: string, name: string) {
  const [firstName, ...lastNameParts] = name.split(" ");
  const lastName = lastNameParts.length > 0 ? lastNameParts.join(" ") : null;
  /* const generatedPassword = Math.random().toString(36).slice(-10); */

  const variables = {
    input: {
      firstName: firstName || "Client",
      lastName: lastName || "",
      email,
      acceptsMarketing: false,
      /* password: generatedPassword, */
    },
  };

  const res = await shopifyFetch<ShopifyCreateCustomer>({
      query: createCustomer,
      variables,
      cache: 'no-store'
    });

    if (!res.body || !res.body.data) {
      throw new Error("Erreur : Réponse Shopify invalide");
    }

    if (res.body.data.customerCreate.userErrors.length > 0) {
      throw new Error(res.body.data.customerCreate.userErrors[0].message);
    }

    const customerId = res.body.data.customerCreate.customer?.id;

    const customerInviteInput = {
      customerId,
      to: email,
      from: "tailwindliquid@gmail.com", // Adresse e-mail de ton entreprise
      message: "Bienvenue ! Cliquez sur le lien pour activer votre compte.",
    };

    await shopifyFetch<ShopifySendInvite>({
      query: sendCustomerInvite,
      variables: { input: customerInviteInput },
      cache: "no-store",
    });

    return res.body.data.customerCreate.customer?.id;
}

  export async function revalidate(req: NextRequest): Promise<NextResponse> {
    // We always need to respond with a 200 status code to Shopify,
    // otherwise it will continue to retry the request.
    const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
    const productWebhooks = ['products/create', 'products/delete', 'products/update'];
    const topic = headers().get('x-shopify-topic') || 'unknown';
    const secret = req.nextUrl.searchParams.get('secret');
    const isCollectionUpdate = collectionWebhooks.includes(topic);
    const isProductUpdate = productWebhooks.includes(topic);
  
    if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
      console.error('Invalid revalidation secret.');
      return NextResponse.json({ status: 200 });
    }
  
    if (!isCollectionUpdate && !isProductUpdate) {
      // We don't need to revalidate anything for any other topics.
      return NextResponse.json({ status: 200 });
    }
  
    if (isCollectionUpdate) {
      revalidateTag(TAGS.collections);
    }
  
    if (isProductUpdate) {
      revalidateTag(TAGS.products);
    }
  
    return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
  }
  