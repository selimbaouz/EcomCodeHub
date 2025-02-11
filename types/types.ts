import Stripe from "stripe";

export type Money = {
    amount: string;
    currencyCode: string;
  };

  export type Connection<T> = {
    edges: Array<Edge<T>>;
  };

  export type Edge<T> = {
    node: T;
  };

  export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  
  export type Menu = {
    title: string;
    path: string;
  };

  export type Page = {
    id: string;
    title: string;
    handle: string;
    body: string;
    bodySummary: string;
    seo?: SEO;
    createdAt: string;
    updatedAt: string;
  };
  
  export type ShopifyPagesOperation = {
    data: {
      pages: Connection<Page>;
    };
  };

  export type ShopifyMenuOperation = {
    data: {
      menu?: {
        items: {
          title: string;
          url: string;
        }[];
      };
    };
    variables: {
      handle: string;
    };
  };
  
  export type ShopifyPageOperation = {
    data: { pageByHandle: Page };
    variables: { handle: string };
  };


  export type Cart = Omit<ShopifyCart, 'lines'> & {
    lines: CartItem[];
  };
  
  export type CartProduct = {
    id: string;
    handle: string;
    title: string;
    featuredImage: ImageProduct;
  };

  export type VariantsProduct = {
    node: {
      id: string;
      title: string;
      sellingPlanAllocations?: {
        edges: SellingPlanProduct[];
      },
      selectedOptions?: {
        name: string;
        value: string;
      }[];
      price?: Money;
      compareAtPrice: Money;
    }
  }

  export type SellingPlanProduct = {
    node: {
      sellingPlan: {
        id: string;
        name: string;
        options: {
          name: string;
          value: string;
        }
      }
    }
  }

  type Metafield = {
    value: string | null;
  };
  
  export type CartItem = {
    id: string | undefined;
    quantity: number;
    cost: {
      totalAmount: Money;
    };
    merchandise: {
      id: string;
      title: string;
      selectedOptions: {
        name: string;
        value: string;
      }[];
      product: CartProduct;
    };
    sellingPlanAllocation?: {
      sellingPlan: {
        id: string;
        name: string;
      };
      /* priceAdjustments: {
        price: {
          amount: string;
        };
        compareAtPrice: {
          amount: string;
        }
        perDeliveryPrice: {
          amount: string;
        }
      } */
    },
  };

export type SEO = {
  title: string;
  description: string;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  requiresSellingPlan: boolean;
  sellingPlanGroups: {
    edges: {
      node: {
        name: string;
        options: {
          name: string;
          value: string;
        }
        sellingPlans: {
          edges: {
            node: {
              id: string;
              name: string;
              description: string;
              recurringDeliveries: boolean;
              options: {
                name: string;
                value: string;
              }
            }
          }
        }
      }
    }
  };
  compareAtPriceRange: {
    maxVariantCompareAtPrice: {
      amount: string;
      currencyCode: string;
    };
    minVariantCompareAtPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  priceRange: {
      maxVariantPrice: {
          amount: string;
          currencyCode: string;
      };
      minVariantPrice: {
          amount: string;
          currencyCode: string;
      };
  };
  variants: {
    edges: VariantsProduct[];
  }
  metafield: Metafield | null;
  images: {
      edges: ImageProduct[];
  };
  seo: SEO;
  availableForSale: boolean;
  tags: string[];
  updatedAt: string;
};

export type ShopifyProduct = {
    data: {
        productByHandle: Product;
    };
    variables: {
        handle: string;
    };
};

export type ShopifyProductById = {
  data: {
      product: Product;
  };
  variables: {
      id: string;
  };
};

export type ImageProduct = {
  node: {
      altText: string;
      originalSrc: string;
      width: number;
      height: number;
  }
}

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};
  
export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};
  
export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
      sellingPlanId?: string;
    }[];
  };
};

export type ShopifyChekoutUrl = {
  data: {
    cart: {
      checkoutUrl: string;
    };
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCheckoutCreateUrl = {
  data: {
      checkoutCreate: {
          checkout: {
              webUrl: string; // URL pour accéder au checkout
          };
          userErrors: {
            field: string;
            message: string;
        }
      };
  };
  variables: {
    lineItems: {
      variantId: string;
      quantity: number;
      sellingPlanId?: string;
    }[],
  };
};

export type ShopifyCreateCustomer = {
  data: {
    customerCreate: {
      customer: {
        id: string;
      } | null;
      userErrors: Array<{
        field: string[];
        message: string;
      }>;
    };
  };
  variables: {
    input: {
      firstName: string;
      lastName: string;
      email: string;
      acceptsMarketing: boolean;
      /* password: string; */
    };
};
};

export type ShopifySendInvite = {
  data: {
    customerCreate: {
      customer: {
        id: string;
      } | null;
      userErrors: Array<{
        field: string[];
        message: string;
      }>;
    };
  };
  variables: {
    input: {
      customerId?: string;
      to: string;
      from: string;
      message: string;
    };
};
};

export type ShopifyOrderCreate = {
  data: {
    orderCreate: {
      order: {
        id: string;
        totalTaxSet: {
          shopMoney: {
            amount: number;
            currencyCode: string;
          };
        };
        lineItems: {
          nodes: {
            variant: {
              id: string;
            }
            id: string;
            quantity: string;
            taxLines: {
              title: string;
              rate: number;
              priceSet: {
                shopMoney: {
                  amount: number;
                  currencyCode: string;
                };
              }
            }
          }
        }[];
        transactions: {
          kind: string;
          status: string;
          amountSet: {
            shopMoney: {
              amount: number;
              currencyCode: string;
            }
          }
        }[];
      };
      userErrors: Array<{
        field: string[];
        message: string;
      }>;
    };
  };
  variables: {
    input: {
      email: string;
      lineItems: {
        variantId?: string | Stripe.Product | Stripe.DeletedProduct
        price: number;
        quantity: number | null;
    }[] | undefined
      currencyCode?: string;
      financialStatus: string;
      transactions: {
        kind: string;
        status: string;
        amount: number;
        currencyCode: string;
    }[]
    };
};
};

export type ShopifyDraftOrder = {
  data: {
    draftOrderComplete: {
      draftOrder: {
        id: string;
        name: string;
        totalPriceSet: {
          shopMoney: {
            amount: string;
            currencyCode: string;
          };
        };
      } | null;
      userErrors: Array<{
        field: string[];
        message: string;
      }>;
    };
  };
  variables: {
    input: {
      email: string;
      lineItems: {
        title: string | null;
        variantId?: string | Stripe.Product | Stripe.DeletedProduct
        price: number;
        quantity: number | null;
    }[] | undefined
    };
};
};


export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
      sellingPlanId?: string;
    }[];
  };
};

export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  quantity: number;
};
