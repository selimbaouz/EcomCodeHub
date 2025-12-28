import { Product } from "@/types/product";
import { shopifyProBundleTemplate } from "./shopify-pro-bundle.template";
import { highConvertingDesignsTemplate } from "./highConvertingDesignsTemplate";

export const productTemplates: Record<string, Product> = {
  "shopify-pro-codes-bundle": shopifyProBundleTemplate,
  /* "high-converting-designs": highConvertingDesignsTemplate, */
};

export function getProductTemplate(slug: string): Product | undefined {
  return productTemplates[slug];
}

export function getAllProductSlugs(): string[] {
  return Object.keys(productTemplates);
}
