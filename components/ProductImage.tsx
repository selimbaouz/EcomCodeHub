"use client";
import { checkProduct, detailsProduct, PacksSelected } from "@/data";
import GetRatings, { removeSuffix } from "@/lib/fn";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Product } from "@/types/types";
import { FC, useEffect, useState } from "react";
import { AddToCart } from "./cart/add-to-cart";
import { BestReviews } from "./BestReviews";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { CheckIcon } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import SecureBadges from "./snippets/SecureBadges/SecureBadges";

interface ProductImageProps {
    product: Product;
    bundle?: Product | undefined
}

const ProductImage: FC<ProductImageProps> = ({product, bundle}) => {
    const [bundleActive, setBundleActive] = useState(false);
    const [selectedPack, setSelectedPack] = useState(0);
    const [selectedPackName, setSelectedPackName] = useState("Débutant");
    const filteredVariant = product.variants.edges.filter(v => v.node.title.includes(selectedPackName));
    const [selectedVariant, setSelectedVariant] = useState({
        title: filteredVariant[0].node.title,
        price: filteredVariant[0].node.price?.amount
    });

    useEffect(() => {
        if (removeSuffix(selectedVariant.title) === "Abonnement mensuel") {
            setBundleActive(false);
        }
    }, [selectedVariant.title]);

    /* useEffect(() => {
        if (filteredVariant.length > 0 && !filteredVariant.some(v => v.node.title === selectedVariant.title)) {
            setSelectedVariant({
                title: filteredVariant[0].node.title,
                price: filteredVariant[0].node.price?.amount,
            });
        }
    }, [filteredVariant, selectedPackName]); */

    useEffect(() => {
        const matchingVariant = product.variants.edges.find(v => v.node.title.includes(selectedPackName));
        if (matchingVariant) {
            setSelectedVariant({
                title: matchingVariant.node.title,
                price: matchingVariant.node.price?.amount
            });
        }
    }, [selectedPackName]);

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
               <div className="flex items-center justify-start border border-primary bg-secondary/30 rounded-sm mt-2 px-6 py-[2px] w-max gap-2">
                    <div className="text-[13px] font-semibold">"Incroyable"</div>
                    <div className="flex items-center">
                        <StarFilledIcon className="text-sm text-primary"/>
                        <StarFilledIcon className="text-sm text-primary"/>
                        <StarFilledIcon className="text-sm text-primary"/>
                        <StarFilledIcon className="text-sm text-primary"/>
                        <StarFilledIcon className="text-sm text-primary"/>
                    </div>
                    <div className="text-xs font-semibold text-foreground">Noté 5/5 sur</div>
                    <img
                        className="w-[45px] mt-[2px]"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png"
                        alt="Logo Google"
                    />
                </div>
            </div>
            <p className={cn("text-sm", "sm:text-base", "xl:text-lg")}>Rejoignez notre <strong>communauté d’e-commerçants</strong> qui ont fait <strong>exploser leurs ventes</strong> grâce à notre <strong>Pack Conversion</strong> 🚀.</p>

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
                    <div className={cn("flex items-center justify-between")}>
                        <h6 className={cn("font-bold uppercase")}>Nos Packs :</h6>
                        <p className={cn("text-[13px] font-medium", "lg:text-sm")}>{PacksSelected(selectedPack).content}</p>
                    </div>
                    <div className={cn("relative w-full flex items-center justify-stretch gap-2")}>
                        {[
                            {
                                title: "Débutant",
                                credits: 30
                            },
                            {
                                title: "Avancé",
                                credits: 60,
                                discount: "-7%"
                            },
                            {
                                title: "Pro",
                                credits: 90,
                                discount: "-11%"
                            },
                        ].map((data, index) => (
                        <div 
                            key={index} 
                            onClick={() => {
                                setSelectedPack(index);
                                setSelectedPackName(data?.title)
                            }} 
                            className={cn(
                                "flex items-center font-semibold uppercase py-4 justify-center text-center rounded-md w-full border-2 cursor-pointer",
                                selectedPack !== index ? "bg-background border-gray-200 dark:border-gray-200/10" : "border-2 border-r-2 border-l-2 bg-secondary/30 dark:bg-[#324e58] border-primary"
                            )}
                            >
                                {data.discount && <div className={cn("absolute -top-3 text-xs px-2 py-1 bg-primary rounded-md text-background", "lg:text-sm lg:-top-4")}>{data.discount}</div>}
                            <div className="space-y-1">
                                <h6 className={cn("text-sm", "lg:text-base")}>
                                    {data.title}
                                </h6>
                                <p className={cn("text-xs font-medium", "lg:text-sm")}>
                                    {data.credits} Crédits
                                </p>
                            </div>
                        </div>

                        ))}
                    </div>
                    <h6 className={cn("font-bold uppercase")}>Fréquence :</h6>
                    <RadioGroup 
                        value={selectedVariant.title}
                        className={cn("flex flex-col items-center justify-between text-center gap-0")}
                        >
                        {filteredVariant.map((data, index) => {
                            const cleanedTitle = removeSuffix(data.node.title);
                            return (
                                <div key={index} className={cn(
                                    "p-4 md:p-5 w-full flex items-start gap-4 cursor-pointer relative", 
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
                                    {selectedPack !== 0 && index !== 0 && <div className={cn("absolute -top-4 right-3 text-xs px-2 py-1 bg-primary rounded-md text-background", "lg:text-sm lg:-top-4")}>{selectedPack === 1 ? "La plus populaire" : "La plus rentable"}</div>}
                                        <div className={cn("flex flex-col items-start text-left w-full")}>
                                            <div className={cn(index !== 0 && "flex items-center w-full justify-between")}>
                                                <h4 className={cn("text-sm font-semibold", "lg:text-lg")}>{parseFloat(data.node.price?.amount ?? "").toFixed(2)} € - {cleanedTitle}</h4>
                                                {data.node.compareAtPrice && index !== 0 && (
                                                    <p className={cn("text-sm font-medium line-through text-foreground/50", "lg:text-base")}>{parseFloat(data.node.compareAtPrice.amount).toFixed(2)}€</p>
                                                )}
                                            </div>
                                            {index !== 0 && (
                                                <div>
                                                    {/* {selectedPackName === "Pro" && <p className="text-sm font-bold text-primary">+ Boutique offerte</p>} */}
                                                    <p className="text-sm">Sans engagement</p>
                                                    {selectedVariant.title === data.node.title && (
                                                        <div className="space-y-1 pt-4">
                                                            {[
                                                                {title: "Économisez  30% sur chaque commande"},
                                                                {title: "Annulez, modifiez, mettez en pause à tout moment"},
                                                                {title: "Support client prioritaire"},
                                                                {title: "Accès à notre groupe VIP"},
                                                                {title: "Recevez de nouveaux codes chaque mois"},
                                                                {title: "Audits et conseils pour améliorer votre boutique"},
                                                            ].map((data, index) => (
                                                                <div key={index}>
                                                                    <div className="flex gap-2 items-center">
                                                                        <div>
                                                                            <CheckIcon className="text-primary size-5"/>
                                                                        </div>
                                                                        <p className={cn("text-sm font-bold text-primary dark:text-foreground")}>{data.title}</p>
                                                                    </div>
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
                    <AddToCart
                        state={selectedVariant} 
                        product={product} 
                        bundle={bundleActive ? bundle : undefined}  
                        size="fullWidth" 
                    />
                    <p className="text-center text-xs text-foreground font-medium xs:text-sm lg:text-base">Paiement sécurisé – Accès immédiat après achat</p>
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