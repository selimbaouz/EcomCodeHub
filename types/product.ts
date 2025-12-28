// types/product.ts
import { StaticImageData } from "next/image";

export interface ProductImage {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
}

export interface ProductBenefit {
  title: string;
  icon: string;
}

export interface ExampleStoreData {
  title: string;
  subtitle: string;
  instructions: string;
  modalAlt: string;
  images: ProductImage[];
}

export interface ExampleCodeData {
  title: string;
  subtitle: string;
  images: Array<{
    title: string;
    image: ProductImage;
  }>;
}

export interface HowItWorksData {
  title: string;
  subtitle: string;
  videoDescription: string;
  demoVideo: ProductImage;
  leftBenefits: ProductBenefit[];
  rightBenefits: ProductBenefit[];
}

export interface FAQItem {
  title: string;
  content: string;
}

export interface FAQData {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface Review {
  name: string;
  content: string;
  score: number;
}

export interface ReviewsData {
  title: string;
  subtitle: string;
  googleBadge: string;
  reviews: Review[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string | React.ReactNode;
  price: number;
  compareAtPrice: number;
  currency: string;
  images: ProductImage[];
  benefits: ProductBenefit[];
  fbPixelContentId: string;

  // Sections optionnelles
  exampleStore?: ExampleStoreData;
  exampleCode?: ExampleCodeData;
  howItWorks?: HowItWorksData;
  faq?: FAQData;
  reviews?: ReviewsData;

  // Métadonnées
  instantAccess?: boolean;
  lifetimeUpdates?: boolean;
}
