import ProCodesBundleProduct from "@/components/ProCodesBundleProduct";
import Products from "@/components/ProCodesBundleProduct";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { handle: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  // Génère automatiquement un titre propre pour le produit : ex "secure-badges" -> "Secure Badges"
  const productName = params.handle
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${productName}`,
    description: `Découvrez le snippet "${productName}" pour Shopify : améliorez votre boutique avec un code Liquid optimisé EcomCodeHub. Facile à installer, rapide, et conçu pour booster vos conversions.`,
    alternates: {
      canonical: `https://www.ecomcodehub.com/en/products/${params.handle}`,
    },
    keywords: [
      productName.toLowerCase(),
      "shopify liquid code",
      "code shopify",
      "liquid shopify",
      "snippet shopify",
      "shopify customization",
      "ecomcodehub",
    ],
    openGraph: {
      title: `${productName} | EcomCodeHub`,
      description: `Optimisez votre boutique Shopify avec le snippet "${productName}" de EcomCodeHub : design moderne, performance et conversion.`,
      url: `https://www.ecomcodehub.com/en/products/${params.handle}`,
      siteName: "EcomCodeHub",
    },
  };
}

const PRODUCT_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "shopify-pro-codes-bundle": ProCodesBundleProduct,
};

export default async function ProductPage({ params }: Props) {
  const ProductComponent = PRODUCT_COMPONENTS[params.handle];

  if (!ProductComponent) {
    return notFound();
  }

  return <ProductComponent />;
}
