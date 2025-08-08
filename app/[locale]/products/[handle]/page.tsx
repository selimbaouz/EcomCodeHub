import { getHandleOfProduct } from '@/data/shopify'; 
import { redirect } from 'next/navigation';
import Products from '@/components/Products';
import { Metadata } from 'next';

type Props = {
    params: { handle: string }
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  // Génère automatiquement un titre propre pour le produit : ex "secure-badges" -> "Secure Badges"
  const productName = params.handle
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  return {
    title: `${productName} | TailwindLiquid`,
    description: `Découvrez le snippet "${productName}" pour Shopify : améliorez votre boutique avec un code Liquid optimisé TailwindLiquid. Facile à installer, rapide, et conçu pour booster vos conversions.`,
    alternates: {
      canonical: `https://www.tailwindliquid.com/fr/products/${params.handle}`,
    },
    keywords: [
      productName.toLowerCase(),
      "shopify liquid code",
      "code shopify",
      "liquid shopify",
      "snippet shopify",
      "shopify customization",
      "tailwindliquid",
    ],
    openGraph: {
      title: `${productName} | TailwindLiquid`,
      description: `Optimisez votre boutique Shopify avec le snippet "${productName}" de TailwindLiquid : design moderne, performance et conversion.`,
      url: `https://www.tailwindliquid.com/fr/products/${params.handle}`,
      siteName: "TailwindLiquid",
    },
  };
}


export default async function ProductPage({ params }: Props) {    
    const product = await getHandleOfProduct(params.handle);
    
    if(!product) {
        redirect('/')
    }
    /* const bundle = await getProductById(product?.metafield?.value ?? ""); */

    return (
        <Products product={product} />
    );
};