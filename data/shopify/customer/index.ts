import Stripe from "stripe";
import { OrderCreate } from "./mutations/order";
import { ShopifyOrderCreate } from "@/types/types";
import { isShopifyError } from "@/types/type-guards";
import { ensureStartsWith } from "@/lib/utils";
import { SHOPIFY_GRAPHQL_ADMIN_API_ENDPOINT } from "@/lib/constants";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_ADMIN_API_ENDPOINT}`;
const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

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
          'X-Shopify-Access-Token': accessToken,
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

export async function createShopifyOrder(
    email: string | null,
    variantId: string,
    stripeLineItems: Stripe.Response<Stripe.ApiList<Stripe.LineItem>>
  ): Promise<string | null> {
    if (!email) throw new Error("L'email du client est requis");
    if (!stripeLineItems) throw new Error("stripeLineItems est requis");

    /**const lineItems = stripeLineItems.data.map((item) => ({
      variantId: "gid://shopify/ProductVariant/49721525764432",//item.price?.metadata?.variantId, // Vérifie que Shopify a bien l'ID du produit
      price: 3490 / 100,//item.amount_total ? item.amount_total / 100 : 0, // Stripe stocke en centimes
      quantity: item.quantity ?? 1,
    }));
  
    // 📌 Construction de l'objet de commande Shopify
    const orderInputee = {
      input: {
        email,
        lineItems,
        currencyCode: "EUR", // Change selon la boutique
        financialStatus: "PAID", // Commande déjà payée
        transactions: [
          {
            kind: "SALE",
            status: "SUCCESS",
            amount: 3490 / 100, //lineItems.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0),
            currencyCode: "EUR",
          },
        ],
      },
    };*/
  
    const orderInput = {
      order: { 
        currency: "EUR",
        financialStatus: "PAID",
        email,
        lineItems: [
          {
            title: "Big Brown Bear Boots",
            priceSet: {
              shopMoney: {
                amount: 0.0,
                currencyCode: "EUR"
              }
            },
            variantId,
            quantity: 1,
            taxLines: [
              {
                priceSet: {
                  shopMoney: {
                    amount: 0.0,
                    currencyCode: "EUR"
                  }
                },
                rate: 0.0,
                title: "State tax"
              }
            ]
          }
        ],
        transactions: [
          {
            kind: "SALE",
            status: "SUCCESS",
            amountSet: {
              shopMoney: {
                amount: 34.9,
                currencyCode: "EUR"
              }
            }
          }
        ]
      }
    };
    // 📌 Envoi à l'API Shopify
    const response = await shopifyFetch<ShopifyOrderCreate>({
      query: OrderCreate,
      variables: orderInput,
      cache: "no-store",
    });
  
    if (response.body.data.orderCreate.userErrors.length > 0) {
      throw new Error(response.body.data.orderCreate.userErrors[0].message);
    }
  
    return response.body.data.orderCreate.order?.id || null;
  }