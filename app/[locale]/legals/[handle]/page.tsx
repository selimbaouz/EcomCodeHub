import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";
import { Suspense } from "react";
import { Metadata } from "next";
import StickyBar from "@/components/navigation/StickyBar";
import NavBar from "@/components/navigation/NavBar";

type Props = {
  params: { handle: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  // Transforme le handle pour un titre humain : "politique-de-confidentialite" => "Politique De Confidentialite"
  const title = params.handle
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${title} | EcomCodeHub`,
    description: `${title} : informations légales, conformité, et mentions obligatoires pour EcomCodeHub, créateur de boutiques Shopify headless sur mesure.`,
    alternates: {
      canonical: `https://www.ecomcodehub.com/en/legals/${params.handle}`,
    },
    keywords: [
      title.toLowerCase(),
      "legal information",
      "mentions légales",
      "shopify store",
      "shopify code",
      "shopify snippet",
      "shopify customization",
      "ecomcodehub",
    ],
    openGraph: {
      title: `${title} | EcomCodeHub`,
      description: `${title} : toutes les informations légales et réglementaires nécessaires concernant EcomCodeHub.`,
      url: `https://www.ecomcodehub.com/en/legals/${params.handle}`,
      siteName: "EcomCodeHub",
    },
  };
}

export default async function Legals({ params }: Props) {
  return (
    <Suspense>
      <div className="relative">
        <div className="sticky top-0 w-full z-50">
          <StickyBar />
          <NavBar />
        </div>
        <div className="space-y-24 pt-14 lg:space-y-44 whitespace-pre-line">
          <LegalPage handle={params.handle} />
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}
