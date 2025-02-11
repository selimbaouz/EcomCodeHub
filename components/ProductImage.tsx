"use client";
import { checkProduct, detailsProduct } from "@/data";
import GetRatings from "@/lib/fn";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Product } from "@/types/types";
import { FC, useEffect, useState } from "react";
import { AddToCart } from "./cart/add-to-cart";
import Link from "next/link";
import { BestReviews } from "./BestReviews";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { CheckIcon } from "lucide-react";
import ImageLoader from "./ImageLoader";
import { Switch } from "./ui/switch";

interface ProductImageProps {
    product: Product;
    bundle?: Product | undefined
}

const ProductImage: FC<ProductImageProps> = ({product, bundle}) => {
    const [selectedVariant, setSelectedVariant] = useState({
        title: product.variants.edges[0].node.title,
        price: product.variants.edges[0].node.price?.amount
    });
    const [bundleActive, setBundleActive] = useState(false);

    useEffect(() => {
        if (selectedVariant.title === "Abonnement mensuel") {
            setBundleActive(false);
        }
    }, [selectedVariant.title]);

    return (
        <div className={cn("space-y-6 py-6 lg:py-12 lg:space-y-5 max-w-xl")}>
            <div className={cn("space-y-2")}>
                <div className={cn("flex items-center gap-2")}>
                    <div className={cn("text-xs text-white font-semibold bg-primary px-2 py-1 rounded-lg")}>
                        Accès instantané
                    </div>
                    <div className={cn("text-xs text-background font-semibold bg-foreground px-2 py-1 rounded-lg")}>
                        Top Achat 2025
                    </div>
                </div>
                <h3 className={cn("text-left text-2xl font-bold pointer-events-none whitespace-pre-wrap text-foreground", "lg:text-3xl", "xl:text-4xl")}>
                    {product.title}
                </h3>
                <div className={cn("flex items-center gap-2")}> 
                    <p className={cn("font-medium text-sm text-foreground")}>4.8/5</p>
                    <GetRatings value={5} className={cn("text-base sm:text-md text-primary", "md:text-lg", "xl:text-sm")} />
                    <Link href="#avis" className={cn("font-medium text-xs text-foreground")}>
                        Basé sur <strong>650 e-commercants</strong>
                    </Link>
                </div>
            </div>
            <p className={cn("text-sm", "sm:text-base", "xl:text-lg")}>Rejoignez plus de <strong>600 e-commerçants</strong> qui ont faits <strong>exploser leurs ventes</strong> grâce à notre <strong>pack pro conversion</strong> 🚀.</p>

            <ul className={cn("flex flex-col py-4 gap-4")}>
                {checkProduct.map((data, index) => (
                    <li key={index} className={cn("bg-secondary/30 flex w-max flex-wrap px-2 py-1 gap-2 items-center text-center dark:text-white dark:bg-[#324e58] rounded-lg")}>
                        <data.icon className={cn("text-lg text-foreground rounded-lg")} />
                        <p className={cn("text-xs text-foreground font-medium", "xs:text-sm")}>{data.title}</p>
                    </li>
                ))}
            </ul>
            <div className={cn("space-y-10 py-4")}>    
                <div className={cn("space-y-6")}>
                    <div className={cn("px-4 py-2 rounded-lg border-2 border-foreground/10 bg-gray-100 dark:bg-[#2c4049] flex items-center justify-between")}>
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
                            disabled={selectedVariant.title === "Abonnement mensuel"}
                        />
                    </div>
                    <AddToCart
                        state={selectedVariant} 
                        product={product} 
                        bundle={bundleActive ? bundle : undefined}  
                        size="fullWidth" 
                    />
                    <RadioGroup 
                        defaultValue={product.variants.edges[0].node.title} 
                        defaultChecked={selectedVariant.title === product.variants.edges[0].node.title} 
                        className={cn("flex flex-col items-center justify-between text-center gap-0")}
                        >
                        {product.variants.edges.map((data, index) => {
                            return (
                                <div key={index} className={cn(
                                    "px-6 py-8 w-full flex items-start gap-4 cursor-pointer", 
                                    "lg:p-6",  
                                    selectedVariant.title !== data.node.title && index === 0 ? "border-t-2 border-r-2 border-l-2" : "border-b-2 border-r-2 border-l-2" , 
                                    selectedVariant.title !== data.node.title ? "bg-background border-gray-200 dark:border-gray-200/10" : "border-2 border-r-2 border-l-2 bg-secondary/30 dark:bg-[#324e58] border-primary", 
                                    index === 0 ? "rounded-t-lg" : "rounded-b-lg")} 
                                    onClick={() => setSelectedVariant({
                                        title: data.node.title,
                                        price: data.node.price?.amount
                                    })}>
                                    <RadioGroupItem 
                                        value={data.node.title} 
                                        id={data.node.title} 
                                        checked={selectedVariant.title === data.node.title} 
                                        onChange={(e) => setSelectedVariant({
                                            title: e.currentTarget.value,
                                            price: data.node.price?.amount
                                        })}
                                    />
                                    <div className="flex items-center w-full">
                                        <div className={cn("flex flex-col items-start text-left w-full")}>
                                            <div className={cn(index !== 0 && "flex items-center w-full justify-between")}>
                                                <h4 className={cn("text-sm font-semibold", "lg:text-lg")}>{parseFloat(data.node.price?.amount ?? "").toFixed(2)} € - {data.node.title}</h4>
                                                {index !== 0 && (
                                                    <p className={cn("text-sm font-medium line-through text-foreground/50", "lg:text-base")}>{parseFloat(data.node.compareAtPrice.amount).toFixed(2)}€</p>
                                                )}
                                            </div>
                                            {index !== 0 && (
                                                <div>
                                                    <p className="text-sm font-bold text-primary">+ Boutique offerte</p>
                                                    <p className="text-sm">Sans engagement</p>
                                                    {selectedVariant.title === data.node.title && (
                                                        <div className="space-y-1 pt-4">
                                                            {[
                                                                {title: "Économisez  15%"},
                                                                {title: "Annulez, modifiez, mettez en pause à tout moment"},
                                                                {title: "Support client prioritaire pour les abonnés"},
                                                                /* {title: "Accès à des tutoriels et guides exclusifs"}, */
                                                                {title: "Rejoignez notre groupe VIP"},
                                                                {title: "month"},
                                                                {title: "Recevez de nouveaux codes"},
                                                                {title: "Une nouvelle boutique"},
                                                                {title: "Un audit design"},
                                                                {title: "Des conseils pour améliorer votre boutique"},
                                                            ].map((data, index) => (
                                                                <div key={index}>
                                                                {data.title === "month" ? (
                                                                    <p className={cn("text-sm py-2 text-foreground dark:text-foreground")}>Mais aussi, <span className="font-bold">chaque mois :</span></p>
                                                                ) : (
                                                                    <div className="flex gap-2 items-center">
                                                                        <div>
                                                                            <CheckIcon className="text-primary size-5"/>
                                                                        </div>
                                                                        <p className={cn("text-sm font-bold text-primary dark:text-foreground")}>{data.title}</p>
                                                                    </div>
                                                                )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </RadioGroup>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {detailsProduct.map((data, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className={cn("border-foreground py-1 whitespace-pre-line")}>
                            <AccordionTrigger className={cn("text-sm", "lg:text-base")}>
                                {data.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                {data.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className={cn("space-y-4 pb-5")}>
                <p className="font-bold underline">Exemple de code (vos meilleurs avis)</p>
                <BestReviews productPage />
            </div>  
        </div>
    );
};

export default ProductImage;