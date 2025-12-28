import Image1 from "@/public/images/pro-codes-product-1.png";
import Image2 from "@/public/images/pro-codes-product-2.png";
import Image3 from "@/public/images/pro-codes-product-3.png";
import Design1 from "@/public/images/design1.png";
import Design2 from "@/public/images/design2.png";
import Design3 from "@/public/images/design3.png";
import Design4 from "@/public/images/design4.png";
import Component1 from "@/public/images/component1.png";
import Component2 from "@/public/images/component2.png";
import Component3 from "@/public/images/component3.png";
import Component4 from "@/public/images/component4.png";
import Component5 from "@/public/images/component5.png";
import Component6 from "@/public/images/component6.png";
import Component7 from "@/public/images/component7.png";
import Demo from "@/public/images/demo-video.gif";
import { Product } from "@/types/product";

export const shopifyProBundleTemplate: Product = {
  id: "prod_shopify_pro_bundle",
  slug: "shopify-pro-bundle",
  name: "products.shopifyProBundle.name",
  title: "products.shopifyProBundle.title",
  description: "products.shopifyProBundle.description",
  price: 29.9,
  compareAtPrice: 150.0,
  currency: "EUR",
  fbPixelContentId: "prod_shopify_pro_bundle",
  instantAccess: true,
  lifetimeUpdates: true,

  images: [
    {
      src: Image1,
      alt: "Product 1",
      width: Image1.width,
      height: Image1.height,
    },
    {
      src: Image2,
      alt: "Product 2",
      width: Image2.width,
      height: Image2.height,
    },
    {
      src: Image3,
      alt: "Product 3",
      width: Image3.width,
      height: Image3.height,
    },
  ],

  benefits: [
    {
      title: "products.shopifyProBundle.benefits.benefit1",
      icon: "FaCheckSquare",
    },
    {
      title: "products.shopifyProBundle.benefits.benefit2",
      icon: "FaCheckSquare",
    },
    {
      title: "products.shopifyProBundle.benefits.benefit3",
      icon: "FaCheckSquare",
    },
    {
      title: "products.shopifyProBundle.benefits.benefit4",
      icon: "FaCheckSquare",
    },
  ],

  exampleStore: {
    title: "products.shopifyProBundle.exampleStore.title",
    subtitle: "products.shopifyProBundle.exampleStore.subtitle",
    instructions: "products.shopifyProBundle.exampleStore.instructions",
    modalAlt: "products.shopifyProBundle.exampleStore.modalAlt",
    images: [
      {
        src: Design3,
        alt: "Design 3",
        width: Design3.width,
        height: Design3.height,
      },
      {
        src: Design1,
        alt: "Design 1",
        width: Design1.width,
        height: Design1.height,
      },
      {
        src: Design2,
        alt: "Design 2",
        width: Design2.width,
        height: Design2.height,
      },
      {
        src: Design4,
        alt: "Design 4",
        width: Design4.width,
        height: Design4.height,
      },
    ],
  },

  exampleCode: {
    title: "products.shopifyProBundle.exampleCode.title",
    subtitle: "products.shopifyProBundle.exampleCode.subtitle",
    images: [
      {
        title: "products.shopifyProBundle.exampleCode.images.crowdEffect",
        image: {
          src: Component1,
          alt: "Component 1",
          width: Component1.width,
          height: Component1.height,
        },
      },
      {
        title: "products.shopifyProBundle.exampleCode.images.proveSatisfaction",
        image: {
          src: Component2,
          alt: "Component 2",
          width: Component2.width,
          height: Component2.height,
        },
      },
      {
        title: "products.shopifyProBundle.exampleCode.images.credibility",
        image: {
          src: Component3,
          alt: "Component 3",
          width: Component3.width,
          height: Component3.height,
        },
      },
      {
        title: "products.shopifyProBundle.exampleCode.images.crowdEffect",
        image: {
          src: Component4,
          alt: "Component 4",
          width: Component4.width,
          height: Component4.height,
        },
      },
      {
        title: "products.shopifyProBundle.exampleCode.images.urgency",
        image: {
          src: Component5,
          alt: "Component 5",
          width: Component5.width,
          height: Component5.height,
        },
      },
      {
        title: "products.shopifyProBundle.exampleCode.images.proveSatisfaction",
        image: {
          src: Component6,
          alt: "Component 6",
          width: Component6.width,
          height: Component6.height,
        },
      },
      {
        title: "products.shopifyProBundle.exampleCode.images.urgency",
        image: {
          src: Component7,
          alt: "Component 7",
          width: Component7.width,
          height: Component7.height,
        },
      },
    ],
  },

  howItWorks: {
    title: "products.shopifyProBundle.howItWorks.title",
    subtitle: "products.shopifyProBundle.howItWorks.subtitle",
    videoDescription: "products.shopifyProBundle.howItWorks.videoDescription",
    demoVideo: {
      src: Demo,
      alt: "Demo video",
      width: Demo.width,
      height: Demo.height,
    },
    leftBenefits: [
      {
        title: "products.shopifyProBundle.howItWorks.left.noMoreApps",
        icon: "FaCheckSquare",
      },
      {
        title: "products.shopifyProBundle.howItWorks.left.convertingDesign",
        icon: "FaCheckSquare",
      },
      {
        title: "products.shopifyProBundle.howItWorks.left.buildCredibility",
        icon: "FaCheckSquare",
      },
      {
        title: "products.shopifyProBundle.howItWorks.left.easyToInstall",
        icon: "FaCheckSquare",
      },
      {
        title: "products.shopifyProBundle.howItWorks.left.saveTime",
        icon: "FaCheckSquare",
      },
      {
        title: "products.shopifyProBundle.howItWorks.left.noSkillsNeeded",
        icon: "FaCheckSquare",
      },
    ],
    rightBenefits: [
      {
        title: "products.shopifyProBundle.howItWorks.right.noPremiumTheme",
        icon: "FaCheckSquare",
      },
      {
        title:
          "products.shopifyProBundle.howItWorks.right.unlimitedCustomization",
        icon: "FaCheckSquare",
      },
      {
        title: "products.shopifyProBundle.howItWorks.right.proLook",
        icon: "FaCheckSquare",
      },
      {
        title: "products.shopifyProBundle.howItWorks.right.compatibleAllThemes",
        icon: "FaCheckSquare",
      },
      {
        title: "products.shopifyProBundle.howItWorks.right.boostConversions",
        icon: "FaCheckSquare",
      },
      {
        title: "products.shopifyProBundle.howItWorks.right.regularUpdates",
        icon: "FaCheckSquare",
      },
    ],
  },

  faq: {
    title: "products.shopifyProBundle.faq.title",
    subtitle: "products.shopifyProBundle.faq.subtitle",
    items: [
      {
        title: "products.shopifyProBundle.faq.items.0.title",
        content: "products.shopifyProBundle.faq.items.0.content",
      },
      {
        title: "products.shopifyProBundle.faq.items.1.title",
        content: "products.shopifyProBundle.faq.items.1.content",
      },
      {
        title: "products.shopifyProBundle.faq.items.2.title",
        content: "products.shopifyProBundle.faq.items.2.content",
      },
      {
        title: "products.shopifyProBundle.faq.items.3.title",
        content: "products.shopifyProBundle.faq.items.3.content",
      },
      {
        title: "products.shopifyProBundle.faq.items.4.title",
        content: "products.shopifyProBundle.faq.items.4.content",
      },
    ],
  },

  reviews: {
    title: "products.shopifyProBundle.reviews.title",
    subtitle: "products.shopifyProBundle.reviews.subtitle",
    googleBadge: "products.shopifyProBundle.reviews.googleBadge",
    reviews: [
      {
        name: "Ye Yun",
        content: "products.shopifyProBundle.reviews.items.0.content",
        score: 5,
      },
      {
        name: "Mickael L.",
        content: "products.shopifyProBundle.reviews.items.1.content",
        score: 5,
      },
      {
        name: "Marwen L.",
        content: "products.shopifyProBundle.reviews.items.2.content",
        score: 5,
      },
      {
        name: "Karim H.",
        content: "products.shopifyProBundle.reviews.items.3.content",
        score: 5,
      },
      {
        name: "Gustavo W",
        content: "products.shopifyProBundle.reviews.items.4.content",
        score: 5,
      },
      {
        name: "Bagy Bagy",
        content: "products.shopifyProBundle.reviews.items.5.content",
        score: 5,
      },
      {
        name: "A Bbouaz",
        content: "products.shopifyProBundle.reviews.items.6.content",
        score: 5,
      },
    ],
  },
};
