"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/types/types";
import { FC, useState } from "react";
import { AddToCart } from "./cart/add-to-cart";
import { BestReviews } from "./BestReviews";
import { StarFilledIcon } from "@radix-ui/react-icons";
import SecureBadges from "./snippets/SecureBadges/SecureBadges";
import { useTranslations } from "next-intl";
import { FaCheckSquare } from "react-icons/fa";

interface ProductImageProps {
  product: Product;
  bundle?: Product | undefined;
}

const ProductImage: FC<ProductImageProps> = ({ product }) => {
  const t = useTranslations("fe");

  // Utiliser directement la première variante du produit
  const firstVariant = product.variants.edges[0]?.node;
  const [selectedVariant, setSelectedVariant] = useState({
    title: firstVariant?.title || "",
    price: firstVariant?.price?.amount || "0",
  });

  const checkProduct = [
    {
      title: t("checkProduct.benefit1"),
      icon: FaCheckSquare,
    },
    {
      title: t("checkProduct.benefit2"),
      icon: FaCheckSquare,
    },
    {
      title: t("checkProduct.benefit3"),
      icon: FaCheckSquare,
    },
    {
      title: t("checkProduct.benefit4"),
      icon: FaCheckSquare,
    },
  ];

  return (
    <div className={cn("space-y-4 py-6 lg:py-12 lg:space-y-5 max-w-xl")}>
      <div className={cn("space-y-2 lg:space-y-3")}>
        <div className={cn("flex items-center gap-2")}>
          <div
            className={cn(
              "text-xs text-white font-semibold bg-primary px-2 py-1 rounded-lg"
            )}
          >
            {t("productImage.instantAccess")}
          </div>
          <div
            className={cn(
              "text-xs text-background font-semibold bg-foreground px-2 py-1 rounded-lg"
            )}
          >
            {t("productImage.topSeller2025")}
          </div>
        </div>
        <h3
          className={cn(
            "text-left text-2xl font-bold pointer-events-none whitespace-pre-wrap text-foreground",
            "lg:text-3xl",
            "xl:text-4xl"
          )}
        >
          Shopify Pro Codes Bundle (Limited Offer)
        </h3>
        <div className="flex items-center justify-start border border-dashed border-primary bg-secondary/30 rounded-sm mt-2 px-6 py-[2px] w-max gap-2">
          <div className="text-[13px] font-semibold">
            "{t("productImage.incredible")}"
          </div>
          <div className="flex items-center">
            <StarFilledIcon className="text-sm text-primary" />
            <StarFilledIcon className="text-sm text-primary" />
            <StarFilledIcon className="text-sm text-primary" />
            <StarFilledIcon className="text-sm text-primary" />
            <StarFilledIcon className="text-sm text-primary" />
          </div>
          <div className="text-xs font-semibold text-foreground">
            {t("productImage.rated5")}
          </div>
          <img
            className="w-[45px] mt-[2px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png"
            alt="Logo Google"
          />
        </div>
      </div>
      <p className={cn("text-sm", "sm:text-base", "xl:text-lg")}>
        {t.rich("productImage.joinCommunity", {
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </p>

      <ul className={cn("flex flex-col pt-2 gap-4")}>
        {checkProduct.map((data, index) => (
          <li
            key={index}
            className={cn(
              "bg-secondary/30 flex w-max flex-wrap px-2 py-1 gap-2 items-center text-center dark:text-white dark:bg-[#324e58] rounded-lg"
            )}
          >
            <data.icon className={cn("text-lg text-foreground rounded-lg")} />
            <p
              className={cn(
                "text-xs text-foreground font-medium",
                "xs:text-sm"
              )}
            >
              {data.title}
            </p>
          </li>
        ))}
      </ul>
      <div className={cn("space-y-10 py-4")}>
        <div id="add-to-cart-anchor" className={cn("space-y-6")}>
          <AddToCart
            state={selectedVariant}
            product={product}
            size="fullWidth"
          />
          {/* <p className="text-center text-xs text-foreground font-medium xs:text-sm lg:text-base">
            {t("productImage.paymentSecure")}
          </p> */}
          <SecureBadges />
          {/* <div className={cn("px-4 py-2 rounded-lg border-2 border-foreground/10 bg-gray-100 dark:bg-[#2c4049] flex items-center justify-between")}>
                        <div className={cn("gap-2 flex items-center justify-start")}>
                            <div>
                                <ImageLoader
                                    src={bundle?.images?.edges?.[0].node.originalSrc ?? ""}
                                    alt={`Uploaded image`}
                                    width={bundle?.images?.edges?.[0].node.width ?? 500}
                                    height={bundle?.images?.edges?.[0].node.height ?? 500}
                                    loading="lazy"
                                    className={cn(
                                        "size-20 object-cover rounded-lg", 
                                    )}
                                />
                            </div>
                            <div className={cn("p-2 max-w-sm space-y-1", "lg:p-4")}>
                                <h4 className={cn("text-sm font-semibold", "lg:text-lg")}> {bundle?.title}</h4>
                                <div className="flex items-center gap-2 lg:gap-3">
                                    <p className={cn("text-sm font-semibold", "lg:text-lg")}>
                                    {parseFloat(bundle?.priceRange.maxVariantPrice.amount ?? "").toFixed(2)}€
                                    </p>
                                    <p className={cn("text-sm font-medium line-through text-foreground/50", "lg:text-base")}>{parseFloat(bundle?.variants?.edges?.[0]?.node?.compareAtPrice?.amount ?? "").toFixed(2)}€</p>
                                </div>
                            </div>
                        </div>
                        <Switch 
                            className="dark:b-[#2c4049]" 
                            checked={bundleActive}
                            onCheckedChange={setBundleActive}
                            disabled={removeSuffix(selectedVariant.title) === "Abonnement mensuel"}
                        />
                    </div> */}
        </div>
        {/* <Accordion type="single" collapsible className="w-full">
          {detailsProduct.map((data, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={cn("border-foreground py-1 whitespace-pre-line")}
            >
              <AccordionTrigger className={cn("text-sm", "lg:text-base")}>
                {data.title}
              </AccordionTrigger>
              <AccordionContent>{data.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion> */}
      </div>
      <div className={cn("space-y-6 pb-10")}>
        <BestReviews productPage />
      </div>
    </div>
  );
};

export default ProductImage;
