import { MdOutlineCode, MdOutlineDesignServices, MdOutlineSell, MdVerified } from "react-icons/md";
import { FaCheck, FaCopy, FaEye } from "react-icons/fa6";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiRocket, BiTimeFive } from "react-icons/bi";
import { FaCheckSquare } from "react-icons/fa";
import Description from "@/components/content/detailsProduct/Description";
import WhyTL from "@/components/content/detailsProduct/WhyTL";
import HowItWorks from "@/components/content/detailsProduct/HowItWorks";
import Delivery from "@/components/content/detailsProduct/Delivery";
import { AiOutlineStar } from "react-icons/ai";
import Transformations from "@/components/content/mode/Transformations";
import Difference from "@/components/content/mode/Difference";
import { BestReviews } from "@/components/BestReviews";
import Badges from "@/components/snippets/Badges";
import RatingSummary from "@/components/snippets/RatingSummary";
import FeatureChecklist from "@/components/snippets/FeatureChecklist";
import ProductTitle from "@/components/snippets/ProductTitle";
import GuaranteeIcons from "@/components/snippets/GuaranteeIcons";
import FastShipping from "@/components/snippets/FastShipping";
import CustomerRecommendations from "@/components/snippets/CustomerRecommendations";
import RefundGuarantees from "@/components/snippets/RefundGuarantees";
import DeliveryEstimate from "@/components/snippets/DeliveryEstimate";
import GuaranteeIcons2 from "@/components/snippets/GuaranteeIcons2";
import SelectOptions from "@/components/snippets/SelectOptions";

export const PricesFixeData = (modeSelected?: number) => [
  {
    title: "Pack Débutant", 
    price: modeSelected ? "20.93" : "29.90",
    discount: modeSelected ? "-30% d'économies" : "",
    infoPrice: "", 
    content: "30 crédits : Idéal pour débuter, découvrez comment nos codes peuvent améliorer votre boutique.",
    link: modeSelected ? process.env.NEXT_PUBLIC_LIVE_PRICE_ID_SUBSCRIPTION_BEGINNER! : process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_BEGINNER!,
    options: [
      { title: "Augmenter vos conversions" },
      { title: "Copier-coller facile" },
      { title: "Gain de temps" },
      { title: "Personnalisation rapide" },
      { title: "Résultats immédiats" },
      { title: "Code prêt à l'emploi" },
      { title: "Design professionnel" },
      { title: "Attractivité renforcée" },
      { title: "Boost vos ventes" },
    ],
  },
  {
    title: "Pack Avancé", 
    price:  modeSelected ? "38.43" : "54.90",
    discount: modeSelected ? "-30% d'économies" : "-7% d'économies",
    infoPrice: "Populaire",
    content: "60 crédits : Boostez vos ventes avec des codes avancés et donnez un look moderne à votre boutique.",
    link: modeSelected ? process.env.NEXT_PUBLIC_LIVE_PRICE_ID_SUBSCRIPTION_ADVANCED! : process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_ADVANCED!,
    options: [
      { title: "Augmenter vos conversions" },
      { title: "Copier-coller facile" },
      { title: "Gain de temps" },
      { title: "Personnalisation rapide" },
      { title: "Résultats immédiats" },
      { title: "Code prêt à l'emploi" },
      { title: "Design professionnel" },
      { title: "Attractivité renforcée" },
      { title: "Boost vos ventes" },
    ], 
  },
  {
    title: "Pack Pro", 
    price:  modeSelected ? "55.93" : "79.90",
    discount: modeSelected ? "-30% d'économies" : "-23% d'économies",
    infoPrice: "",
    content: "90 crédits : Des codes professionnels pour une boutique personnalisée, prête à vendre.",
    link: modeSelected ? process.env.NEXT_PUBLIC_LIVE_PRICE_ID_SUBSCRIPTION_PRO! : process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_PRO!,
    options: [
      { title: "Augmenter vos conversions" },
      { title: "Copier-coller facile" },
      { title: "Gain de temps" },
      { title: "Personnalisation rapide" },
      { title: "Résultats immédiats" },
      { title: "Code prêt à l'emploi" },
      { title: "Design professionnel" },
      { title: "Attractivité renforcée" },
      { title: "Boost vos ventes" },
    ], 
  },
];

export const bestReviewsData = [
  {
      name: "Anaïs", 
      picture: [
        {
          imageUrl: "https://avatars.githubusercontent.com/u/16860528",
          profileUrl: "https://sejiux.com/"
        }
      ],
      rating: 5,
      content: "labore ipsum ex enim dolor adipiscing magna eiusmod tempor ullamco consequat consequat ea aliquipxxxx"
  },
  {
    name: "Jessica", 
      picture: [
        {
          imageUrl: "https://avatars.githubusercontent.com/u/16860528",
          profileUrl: "https://sejiux.com/"
        }
      ],
      rating: 5,
      content: "labore ipsum ex enim dolor adipiscing magna eiusmod tempor ullamco consequat consequat ea aliquipxxxx"
  },
  {
    name: "Marie", 
      picture: [
        {
          imageUrl: "https://avatars.githubusercontent.com/u/16860528",
          profileUrl: "https://sejiux.com/"
        }
      ],
      rating: 5,
      content: "labore ipsum ex enim dolor adipiscing magna eiusmod tempor ullamco consequat consequat ea aliquipxxxx"
  },
]

export const trustsDataGroup1 = [
  {
    icon: MdOutlineSell, // Icône pour symboliser les ventes
    title: "Augmenter vos conversions",
  },
  {
    icon: FaCopy, // Icône représentant un clipboard pour le copier-coller
    title: "Copier-coller facile",
  },
  {
    icon: BiTimeFive, // Icône d'une horloge pour symboliser le gain de temps
    title: "Gain de temps",
  },
  {
    icon: BiRocket, // Icône d'une fusée pour symboliser la rapidité et l'amélioration
    title: "Personnalisation rapide",
  },
  {
    icon: AiOutlineStar, // Icône d'une étoile pour symboliser des résultats immédiats
    title: "Résultats immédiats",
  },
];

export const trustsDataGroup2 = [
  {
    icon: RiSecurePaymentLine, // Icône de paiement sécurisé pour mettre en avant la fiabilité
    title: "Code prêt à l'emploi",
  },
  {
    icon: MdOutlineDesignServices, // Icône représentant le design et la créativité
    title: "Design professionnel",
  },
  {
    icon: AiOutlineStar, // Icône d'une étoile pour renforcer l'attractivité
    title: "Attractivité renforcée",
  },
  {
    icon: FaCheck, // Icône d'un check pour symboliser la garantie de succès
    title: "Succès assuré",
  },
  {
    icon: MdOutlineSell, // Icône liée aux ventes et à l'augmentation des conversions
    title: "Boostez vos ventes",
  },
];

export const stickyBarData = [
/*   {
    title: "🎁 Boutique offerte dès l'abonnement",
  }, */
  {
    title: "💻 60+ codes prêts à l’emploi",
  },
  {
    title: "📅 Nouveaux ajouts chaque mois",
  },
  {
    title: "🚀 Un rendu pro en quelques minutes",
  },
];

export const trustsData2 = [
  {
    icon: MdOutlineSell, // Icône pour symboliser les ventes
    title: "Augmenter vos conversions",
  },
  {
    icon: FaCopy, // Icône représentant un clipboard pour le copier-coller
    title: "Copier-coller facile",
  },
  {
    icon: BiTimeFive, // Icône d'une horloge pour symboliser le gain de temps
    title: "Gain de temps",
  },
  {
    icon: BiRocket, // Icône d'une fusée pour symboliser la rapidité et l'amélioration
    title: "Personnalisation rapide",
  },
  {
    icon: AiOutlineStar, // Icône d'une étoile pour symboliser des résultats marquants
    title: "Résultats immédiats",
  },
  {
    icon: RiSecurePaymentLine, // Icône de paiement sécurisé pour mettre en avant la fiabilité
    title: "Code prêt à l'emploi",
  },
  {
    icon: MdOutlineDesignServices, // Icône représentant le design et la créativité
    title: "Design professionnel",
  },
  {
    icon: AiOutlineStar, // Icône d'une étoile pour renforcer l'attractivité
    title: "Attractivité renforcée",
  },
  {
    icon: FaCheck, // Icône d'un check pour symboliser la garantie de succès
    title: "Succès assuré",
  },
  {
    icon: MdOutlineSell, // Icône liée aux ventes et à l'augmentation des conversions
    title: "Boostez vos ventes",
  },
];

export const reviewsData = [
  {
    name: "Sophie D.",
    score: 5,
    content: "Je n'avais aucune expérience en codage, mais grâce au Pack Pro Conversion, j'ai transformé ma boutique en un site professionnel en quelques minutes. C'était tellement simple à installer !",
  },
  {
    name: "Claudia R.",
    score: 5,
    content: "J'hésitais à investir dans des thèmes premium coûteux. Ce pack m'a offert un design tout aussi impressionnant pour une fraction du prix.",
  },
  {
    name: "Philippe G.",
    score: 5,
    content: "J'avais peur que ça ne fonctionne pas avec mon thème Shopify. Mais tout s'est intégré parfaitement, et ma boutique est plus belle que jamais.",
  },
  {
    name: "Marie L.",
    score: 5,
    content: "Le Pack Pro Conversion m'a permis d'ajouter des fonctionnalités comme des preuves sociales et des badges de confiance. Mes clients se sentent rassurés, et mes ventes ont augmenté.",
  },
  {
    name: "Jean-Marc T.",
    score: 5,
    content: "Depuis que j'ai installé ce pack, mon taux de conversion a doublé. Les codes de tailwind ont vraiment fait la différence !",
  },
  {
    name: "Laura M.",
    score: 5,
    content: "J'ai économisé des heures de travail grâce à ce pack. Tout est bien documenté, et l'installation est rapide et intuitive.",
  },
  {
    name: "Marc L.",
    score: 5,
    content: "Je pensais que ce genre d'outil ralentirait ma boutique, mais c'est tout le contraire. Mon site est rapide et performant.",
  },
];

export const checkProduct = [
  {
    title: "+60 codes Liquid + Tailwind prêts à l’emploi",
    icon: FaCheckSquare,
  },
  {
    title: "Copiez, collez et boostez vos conversions",
    icon: FaCheckSquare,
  },
  {
    title: "100 % compatibles avec tous les thèmes Shopify",
    icon: FaCheckSquare,
  },
  {
    title: "Achat unique ou abonnement avec mises à jour",
    icon: FaCheckSquare,
  },
]

export const detailsProduct = [
  {
    title: "Description",
    content: <Description />
  },
  {
    title: "Pourquoi choisir TailwindLiquid ?",
    content: <WhyTL />
  },
  {
    title: "Informations de Livraison et Accès",
    content: <Delivery />
  },
  {
    title: "Comment ça marche ?",
    content: <HowItWorks />
  },
]

export const faqData = [
  {
      title: "Qu’est-ce qu’un code Liquid ?",
      content: "Liquid est le langage de programmation utilisé par Shopify pour personnaliser et structurer les thèmes des boutiques en ligne."
  },
  {
    title: "À quoi sert le Pack Pro Conversion Shopify?",
    content: "Le Pack Pro Conversion améliore le design, enrichit l'expérience utilisateur et augmente significativement le taux de conversion."
  },
  {
      title: "Les codes fonctionnent-ils avec tous les thèmes ?",
      content: "Oui, les codes ont été testés sur une large gamme de thèmes gratuits et premium pour garantir une intégration parfaite."
  },
  {
    title: "Quels types de fonctionnalités puis-je ajouter ?",
    content: "Avec le Pack Pro Conversion, vous pouvez ajouter des avis clients dynamiques, des preuves sociales, des CTA attractifs, des badges de confiance et bien plus encore pour améliorer l'expérience utilisateur."
  },
  {
      title: "Ai-je besoin de compétences techniques ?",
      content: "Pas du tout ! Chaque achat inclut des instructions détaillées étape par étape. Même un débutant peut facilement les installer."
  },
  {
    title: "Comment fonctionne l'installation des codes ?",
    content: "Une fois votre achat effectué, vous recevrez un accès à une page Notion contenant tous les codes. Copiez simplement le code souhaité et collez-le dans un bloc 'Custom Liquid' de votre thème Shopify."
  },
  {
      title: "Que faire si j'ai des problèmes ?",
      content: "Je suis disponible pour vous aider à chaque étape. Contactez-moi directement via mon adresse email: im.sejiux@gmail.com ou mes réseaux sociaux."
  },
];

export const HowItWorks1 = [
  {
    title: "Plus besoin d'applications",
    icon: FaCheckSquare,
  },
  {
    title: "Un design qui convertit",
    icon: FaCheckSquare,
  },
  {
    title: "Crédibilise votre boutique",
    icon: FaCheckSquare,
  },
  {
    title: "Facile à installer",
    icon: FaCheckSquare,
  },
  {
    title: "Gagne du temps",
    icon: FaCheckSquare,
  },
  {
    title: "Aucune compétence requise",
    icon: FaCheckSquare,
  },
]

export const HowItWorks2 = [
  {
    title: "Plus besoin de thème premium",
    icon: FaCheckSquare,
  },
  {
    title: "Personnalisation illimitée",
    icon: FaCheckSquare,
  },
  {
    title: "Rendu professionnel",
    icon: FaCheckSquare,
  },
  {
    title: "Compatible avec tous thèmes",
    icon: FaCheckSquare,
  },
  {
    title: "Boost les conversions",
    icon: FaCheckSquare,
  },
  {
    title: "Mises à jour régulière",
    icon: FaCheckSquare,
  },
]

export const selectModesData = [
  {
    title: "Transformation",
    description: "Transformez votre boutique en seulement quelques minutes"
  },
  {
    title: "Différences",
    description: "Ce qui distingue TailwindLiquid des autres"
  }
]

export const productModeSelected = (selected: number) => {
  switch (selected) {
  case 0:
    return {
      content: <Transformations />
    };
  case 1:
    return {
      content: <Difference />
    };
  default:
    return {
      content: <Transformations />
    };
  }
};

export const PacksSelected = (selected: number) => {
  switch (selected) {
  case 0:
    return {
      content: "Pour débloquer des codes simples"
    };
  case 1:
    return {
      content: "Pour débloquer des codes avancés"
    };
    case 2:
    return {
      content: "Pour débloquer des codes pro"
    };
  default:
    return {
      content: "Pour débloquer des codes simples"
    };
  }
};

export const selectSnippetData = [
  {
    title: "Aperçu",
    icon: FaEye,
  },
  {
    title: "Code",
    icon: MdOutlineCode
  }
]

export const SnippetSelected = () => [
  {
    title: "Titre Produit",
    content: <ProductTitle />,
    code: `<h3 class="tw-font-semibold tw-pt-2 tw-text-[23px] tw-leading-[18px] sm:tw-text-[24px] lg:tw-text-[24px] xl:tw-text-[32px]">Packs Conversion Shopify</h3>`,
    unLocked: true,
  },
  {
    title: "Badges",
    content: <Badges />,
    code: `
<div class="tw-flex tw-items-center tw-gap-3">
  <div class="tw-bg-[#259d93] tw-text-white tw-px-3 tw-py-1 tw-rounded-lg tw-w-max tw-text-xs tw-font-bold">Accès instantané</div>
  <div class="tw-bg-[#2C4049] tw-text-white tw-px-3 tw-py-1 tw-rounded-lg tw-w-max tw-text-xs tw-font-bold">Top Achat 2025</div>
</div>
    `,
    unLocked: true,
  },
  {
    title: "Note globale",
    content: <RatingSummary />,
    code: `
<div class="tw-flex tw-items-center tw-gap-2 tw-pb-4">
  <p class="tw-text-xxs xl:tw-text-sm">4.5/5</p>
  <div class="tw-flex tw-items-center">
    <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-xs sm:text-sm text-primary md:text-lg xl:text-sm" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
    <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-base sm:text-md text-primary md:text-lg xl:text-sm" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
    <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-base sm:text-md text-primary md:text-lg xl:text-sm" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
    <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-base sm:text-md text-primary md:text-lg xl:text-sm" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
    <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-base sm:text-md text-primary md:text-lg xl:text-sm" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
  </div>
  <p class="tw-text-xxs xl:tw-text-sm">Basé sur <strong>650 
  e-commercants</strong></p>
</div>`,
    unLocked: true,
  },
  {
    title: "Avantages",
    content: <FeatureChecklist />,
    code: `<div class="tw-py-6 tw-space-y-6">
<div class="tw-flex tw-items-center tw-gap-3 tw-bg-[#E4F7F1] tw-py-1 tw-px-2 tw-rounded-lg tw-w-max">
<svg stroke="currentColor" fill="#2c4049" stroke-width="0" viewBox="0 0 448 512" class="text-lg text-foreground rounded-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg> 
<p class="tw-text-xs sm:tw-text-sm tw-font-medium">+60 codes Liquid + Tailwind prêts à l’emploi
</p>
</div>

<div class="tw-flex tw-items-center tw-gap-3 tw-bg-[#E4F7F1] tw-py-1 tw-px-2 tw-rounded-lg tw-w-max">
<svg stroke="currentColor" fill="#2c4049" stroke-width="0" viewBox="0 0 448 512" class="text-lg text-foreground rounded-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg> 
<p class="tw-text-xs sm:tw-text-sm tw-font-medium">Copiez, collez et boostez vos conversions
</p>
</div>

<div class="tw-flex tw-items-center tw-gap-3 tw-bg-[#E4F7F1] tw-py-1 tw-px-2 tw-rounded-lg tw-w-max">
<svg stroke="currentColor" fill="#2c4049" stroke-width="0" viewBox="0 0 448 512" class="text-lg text-foreground rounded-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg> 
<p class="tw-text-xs sm:tw-text-sm tw-font-medium">100 % compatibles avec tous les thèmes Shopify
</p>
</div>

<div class="tw-flex tw-items-center tw-gap-3 tw-bg-[#E4F7F1] tw-py-1 tw-px-2 tw-rounded-lg tw-w-max">
<svg stroke="currentColor" fill="#2c4049" stroke-width="0" viewBox="0 0 448 512" class="text-lg text-foreground rounded-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg> 
<p class="tw-text-xs sm:tw-text-sm tw-font-medium">Achat unique ou abonnement avec mises à jour
</p>
</div>
</div>`,
    unLocked: true,
  }, 
  {
    title: "Engagements",
    content: <GuaranteeIcons />,
    code: `<div class="tw-grid tw-grid-cols-3 tw-items-center tw-gap-2 tw-w-full tw-justify-between tw-text-center">
            <div class="tw-p-4 xl:tw-p-6 tw-h-full tw-max-w-xs tw-bg-[#e4f7f1] tw-rounded-xl tw-border tw-border-[#2c4049] tw-flex tw-flex-col tw-justify-center tw-gap-1">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" class='tw-mx-auto' xmlns="http://www.w3.org/2000/svg"><path d="M11.0049 2L18.3032 4.28071C18.7206 4.41117 19.0049 4.79781 19.0049 5.23519V7H21.0049C21.5572 7 22.0049 7.44772 22.0049 8V10H9.00488V8C9.00488 7.44772 9.4526 7 10.0049 7H17.0049V5.97L11.0049 4.094L5.00488 5.97V13.3744C5.00488 14.6193 5.58406 15.7884 6.56329 16.5428L6.75154 16.6793L11.0049 19.579L14.7869 17H10.0049C9.4526 17 9.00488 16.5523 9.00488 16V12H22.0049V16C22.0049 16.5523 21.5572 17 21.0049 17L17.7848 17.0011C17.3982 17.5108 16.9276 17.9618 16.3849 18.3318L11.0049 22L5.62486 18.3318C3.98563 17.2141 3.00488 15.3584 3.00488 13.3744V5.23519C3.00488 4.79781 3.28913 4.41117 3.70661 4.28071L11.0049 2Z"></path></svg>
            <p class="tw-text-[12px] tw-font-semibold">Paiement Sécurisé</p>
            </div>

            <div class="tw-p-4 xl:tw-p-6 tw-h-full tw-max-w-xs tw-bg-[#e4f7f1] tw-rounded-xl tw-border tw-border-[#2c4049] tw-flex tw-flex-col tw-justify-center tw-gap-1">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="30px" width="30px" class='tw-mx-auto' xmlns="http://www.w3.org/2000/svg"><path d="M16 9l-2-4h-3v-2c0-0.55-0.45-1-1-1h-9c-0.55 0-1 0.45-1 1v8l1 1h1.268c-0.17 0.294-0.268 0.636-0.268 1 0 1.105 0.895 2 2 2s2-0.895 2-2c0-0.364-0.098-0.706-0.268-1h5.536c-0.17 0.294-0.268 0.636-0.268 1 0 1.105 0.895 2 2 2s2-0.895 2-2c0-0.364-0.098-0.706-0.268-1h1.268v-3zM11 9v-3h2.073l1.5 3h-3.573z"></path></svg>
            <p class="tw-text-[12px] tw-font-semibold">Livraison Offerte</p>
            </div>

            <div class="tw-p-4 xl:tw-p-6 tw-h-full tw-max-w-xs tw-bg-[#e4f7f1] tw-rounded-xl tw-border tw-border-[#2c4049] tw-flex tw-flex-col tw-justify-center tw-gap-1">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" class='tw-mx-auto' xmlns="http://www.w3.org/2000/svg"><path d="M12.0049 13.0028C13.6617 13.0028 15.0049 14.346 15.0049 16.0028C15.0049 16.8519 14.6521 17.6187 14.0851 18.1645L12.175 20.0024L15.0049 20.0028V22.0028H9.00488L9.00398 20.2784L12.6983 16.7234C12.8874 16.5411 13.0049 16.2857 13.0049 16.0028C13.0049 15.4505 12.5572 15.0028 12.0049 15.0028C11.4526 15.0028 11.0049 15.4505 11.0049 16.0028H9.00488C9.00488 14.346 10.348 13.0028 12.0049 13.0028ZM18.0049 13.0028V17.0028H20.0049V13.0028H22.0049V22.0028H20.0049V19.0028H16.0049V13.0028H18.0049ZM4.00488 12.0028C4.00488 14.5294 5.17612 16.7824 7.00527 18.2485L7.0049 20.665C4.01588 18.9359 2.00488 15.7042 2.00488 12.0028H4.00488ZM12.0049 2.00281C17.1902 2.00281 21.4537 5.94943 21.9555 11.0027L19.943 11.0029C19.4509 7.05652 16.0845 4.00281 12.0049 4.00281C9.54102 4.00281 7.33731 5.11664 5.8698 6.86824L8.00488 9.00281H2.00488V3.00281L4.45144 5.44929C6.28491 3.3379 8.98898 2.00281 12.0049 2.00281Z"></path></svg>
            <p class="tw-text-[12px] tw-font-semibold">Livré en 72H</p>
            </div>
        </div>`,
    unLocked: true,
  },
  {
    title: "Engagements",
    content: <GuaranteeIcons2 />,
    code: `<div class="tw-grid tw-grid-cols-3 tw-items-center tw-gap-2 tw-w-full tw-justify-between tw-text-center">
            <div class="tw-p-4 xl:tw-p-6 tw-h-full tw-max-w-xs tw-bg-[#e4f7f1] tw-rounded-xl tw-border tw-border-[#2c4049] tw-flex tw-flex-col tw-justify-center tw-gap-1">
<div>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" class='tw-mx-auto' xmlns="http://www.w3.org/2000/svg"><path d="M11.0049 2L18.3032 4.28071C18.7206 4.41117 19.0049 4.79781 19.0049 5.23519V7H21.0049C21.5572 7 22.0049 7.44772 22.0049 8V10H9.00488V8C9.00488 7.44772 9.4526 7 10.0049 7H17.0049V5.97L11.0049 4.094L5.00488 5.97V13.3744C5.00488 14.6193 5.58406 15.7884 6.56329 16.5428L6.75154 16.6793L11.0049 19.579L14.7869 17H10.0049C9.4526 17 9.00488 16.5523 9.00488 16V12H22.0049V16C22.0049 16.5523 21.5572 17 21.0049 17L17.7848 17.0011C17.3982 17.5108 16.9276 17.9618 16.3849 18.3318L11.0049 22L5.62486 18.3318C3.98563 17.2141 3.00488 15.3584 3.00488 13.3744V5.23519C3.00488 4.79781 3.28913 4.41117 3.70661 4.28071L11.0049 2Z"></path></svg>
</div>
            <p class="tw-text-[12px] tw-font-semibold">Paiement Sécurisé</p>
            </div>

            <div class="tw-p-4 xl:tw-p-6 tw-h-full tw-max-w-xs tw-bg-[#e4f7f1] tw-rounded-xl tw-border tw-border-[#2c4049] tw-flex tw-flex-col tw-justify-center tw-gap-1">
            <div>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="30px" width="30px" class='tw-mx-auto' xmlns="http://www.w3.org/2000/svg"><path d="M16 9l-2-4h-3v-2c0-0.55-0.45-1-1-1h-9c-0.55 0-1 0.45-1 1v8l1 1h1.268c-0.17 0.294-0.268 0.636-0.268 1 0 1.105 0.895 2 2 2s2-0.895 2-2c0-0.364-0.098-0.706-0.268-1h5.536c-0.17 0.294-0.268 0.636-0.268 1 0 1.105 0.895 2 2 2s2-0.895 2-2c0-0.364-0.098-0.706-0.268-1h1.268v-3zM11 9v-3h2.073l1.5 3h-3.573z"></path></svg>
            </div>
            <p class="tw-text-[12px] tw-font-semibold">Livraison Offerte</p>
            </div>

            <div class="tw-p-4 xl:tw-p-6 tw-h-full tw-max-w-xs tw-bg-[#e4f7f1] tw-rounded-xl tw-border tw-border-[#2c4049] tw-flex tw-flex-col tw-justify-center tw-gap-1">
            <div>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" class='tw-mx-auto' xmlns="http://www.w3.org/2000/svg"><path d="M12.0049 13.0028C13.6617 13.0028 15.0049 14.346 15.0049 16.0028C15.0049 16.8519 14.6521 17.6187 14.0851 18.1645L12.175 20.0024L15.0049 20.0028V22.0028H9.00488L9.00398 20.2784L12.6983 16.7234C12.8874 16.5411 13.0049 16.2857 13.0049 16.0028C13.0049 15.4505 12.5572 15.0028 12.0049 15.0028C11.4526 15.0028 11.0049 15.4505 11.0049 16.0028H9.00488C9.00488 14.346 10.348 13.0028 12.0049 13.0028ZM18.0049 13.0028V17.0028H20.0049V13.0028H22.0049V22.0028H20.0049V19.0028H16.0049V13.0028H18.0049ZM4.00488 12.0028C4.00488 14.5294 5.17612 16.7824 7.00527 18.2485L7.0049 20.665C4.01588 18.9359 2.00488 15.7042 2.00488 12.0028H4.00488ZM12.0049 2.00281C17.1902 2.00281 21.4537 5.94943 21.9555 11.0027L19.943 11.0029C19.4509 7.05652 16.0845 4.00281 12.0049 4.00281C9.54102 4.00281 7.33731 5.11664 5.8698 6.86824L8.00488 9.00281H2.00488V3.00281L4.45144 5.44929C6.28491 3.3379 8.98898 2.00281 12.0049 2.00281Z"></path></svg>
            </div>
            <p class="tw-text-[12px] tw-font-semibold">Livré en 72H</p>
            </div>
        </div>`,
    unLocked: true,
  },
  {
    title: "Expédition Rapide",
    content: <FastShipping />,
    code: `<div class="tw-flex tw-items-center tw-justify-center tw-gap-1 sm:tw-gap-2">
                <svg stroke="currentColor" fill="#4abf8e" stroke-width="0" viewBox="0 0 640 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M112 0C85.5 0 64 21.5 64 48l0 48L16 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 208 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 160l-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 176 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 224l-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 288l0 128c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L112 0zM544 237.3l0 18.7-128 0 0-96 50.7 0L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"></path></svg>
                <p class="tw-text-[10px] lg:tw-text-[12px]"}>Commandez maintenant pour une expédition demain.</p>
            </div>`,
    unLocked: true,
  },
  {
    title: "Recommandations",
    content: <CustomerRecommendations />,
    code: `<div class="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-pb-4">
            <div class='tw-flex tw-items-center tw--space-x-2'>
                    <img
                        class="tw-rounded-full tw-size-8 lg:tw-size-10 tw-border-2 tw-border-white dark:tw-border-gray-800"
                        src="https://avatars.githubusercontent.com/u/89768406"
                        width={100}
                        height={100}
                        alt="Avatar"
                    />
                    <img
                        class="tw-rounded-full tw-size-8 lg:tw-size-10 tw-border-2 tw-border-white dark:tw-border-gray-800"
                        src="https://avatars.githubusercontent.com/u/59442788"
                        width={100}
                        height={100}
                        alt="Avatar"
                    />
                    <img
                        class="tw-rounded-full tw-size-8 lg:tw-size-10 tw-border-2 tw-border-white dark:tw-border-gray-800"
                        src="https://avatars.githubusercontent.com/u/59228569"
                        width={100}
                        height={100}
                        alt="Avatar"
                    />
            </div>
            <p class="tw-text-xs lg:tw-text-sm">Recommander par <span class="tw-font-bold tw-text-[#4abf8e]">+650 </span>personnes</p>
        </div>`,
    unLocked: true,
  },
  {
    title: "Garantie Remboursement",
    content: <RefundGuarantees />,
    code: `<div class='tw-w-full tw-rounded-2xl tw-bg-[#e4f7f1] tw-flex tw-items-center tw-gap-4 tw-p-3 tw-max-w-sm'>
            <img 
                src="/images/moneyBack.png"
                alt="Img of moneyback"
                width={100}
                height={100}
            />
            <div class='tw-flex tw-flex-col tw-gap-2'>
                <h6 class="tw-font-bold tw-text-[12px] lg:tw-text-[14px]">Remboursement Garantie Pendant 90 Jours</h6>
                <p class='tw-text-[10px] lg:tw-text-xs'>Nous avons confiance en nos produits. Pas convaincu ? Renvoyez-le et nous vous rembourserons votre achat.</p>
            </div>
        </div>`,
    unLocked: true,
  },
  {
    title: "Estimation Livraison",
    content: <DeliveryEstimate />,
    code: `<div class="tw-flex tw-items-center tw-gap-2">
            <svg stroke="currentColor" fill="#4abf8e" stroke-width="0" viewBox="0 0 640 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M112 0C85.5 0 64 21.5 64 48l0 48L16 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 208 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 160l-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 176 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 224l-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 288l0 128c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L112 0zM544 237.3l0 18.7-128 0 0-96 50.7 0L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"></path></svg>
            <p class="tw-text-xxs lg:tw-text-xs xl:tw-text-sm">Livraison entre le <strong id="startDelivery"></strong> et le <strong id="endDelivery"></strong></p>
        </div>

<script>
function calculateDeliveryDates(startDays, endDays) {
   const today = new Date();

   const startDate = new Date(today);
   startDate.setDate(today.getDate() + startDays);

   const endDate = new Date(today);
   endDate.setDate(today.getDate() + endDays);

   const options = { day: 'numeric', month: 'long' };
   const formattedStartDate = startDate.toLocaleDateString('fr-FR', options);
   const formattedEndDate = endDate.toLocaleDateString('fr-FR', options);

   return [formattedStartDate, formattedEndDate];
}

const [startDelivery, endDelivery] = calculateDeliveryDates(3,5);
document.getElementById("startDelivery").textContent=startDelivery;
document.getElementById("endDelivery").textContent=endDelivery;
</script>`,
    unLocked: true,
  },
  {
    title: "Meilleurs Avis",
    content: <BestReviews />,
    code: `<div class="tw-flex tw-items-center tw-gap-2">
            <svg stroke="currentColor" fill="#4abf8e" stroke-width="0" viewBox="0 0 640 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M112 0C85.5 0 64 21.5 64 48l0 48L16 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 208 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 160l-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 176 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 224l-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 288l0 128c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L112 0zM544 237.3l0 18.7-128 0 0-96 50.7 0L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"></path></svg>
            <p class="tw-text-[10px] lg:tw-text-[12px]">Livraison entre le <strong id="startDelivery"></strong> et le <strong id="endDelivery"></strong></p>
        </div>
      <script>
      /**
       * Calcule une plage de dates de livraison.
       * @param {number} startDays - Nombre minimum de jours à partir d'aujourd'hui.
       * @param {number} endDays - Nombre maximum de jours à partir d'aujourd'hui.
       * @returns {string[]} - Tableau contenant les deux dates formatées.
       */
      function calculateDeliveryDates(startDays, endDays) {
        const today = new Date();

        // Calcul des deux dates
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + startDays);

        const endDate = new Date(today);
        endDate.setDate(today.getDate() + endDays);

        // Formatage des dates (exemple : "29 Janvier")
        const options = { day: 'numeric', month: 'long' };
        const formattedStartDate = startDate.toLocaleDateString('fr-FR', options);
        const formattedEndDate = endDate.toLocaleDateString('fr-FR', options);

        return [formattedStartDate, formattedEndDate];
      }

      // Injecter les dates calculées dans le DOM
      const [startDelivery, endDelivery] = calculateDeliveryDates(3,5);
      document.getElementById("startDelivery").textContent=startDelivery;
      document.getElementById("endDelivery").textContent=endDelivery;
      </script>`,
    unLocked: true,
  },
  {
    title: "Select Options",
    content: <SelectOptions />,
    code: `<div class="tw-px-6">
<div class="tw-bg-[#259d93] tw-text-white tw-rounded-[20px] tw-w-full tw-relative lg:tw-max-w-[1000px] tw-p-6 tw-mx-auto">
  <!-- Switch Buttons -->
  <div class="tw-whitespace-nowrap tw-overflow-x-scroll tw-scrollbar-hidden tw-flex tw-items-center tw-justify-start lg:tw-justify-center tw-gap-2 tw-mb-10" style="scrollbar-width: none;">
    <button
      class="tw-px-4 tw-py-2 tw-text-[14px] lg:tw-text-[16px] tw-font-bold"
      data-id="1"
      onclick="updateContent(this)"
    >
      Option 1
    </button>
    <button
      class="tw-px-4 tw-py-2 tw-text-[14px] lg:tw-text-[16px] tw-font-bold"
      data-id="2"
      onclick="updateContent(this)"
    >
      Option 2
    </button>
    <button
      class="tw-px-4 tw-py-2 tw-text-[14px] lg:tw-text-[16px] tw-font-bold"
      data-id="3"
      onclick="updateContent(this)"
    >
      Option 3
    </button>
    <button
      class="tw-px-4 tw-py-2 tw-text-[14px] lg:tw-text-[16px] tw-font-bold"
      data-id="4"
      onclick="updateContent(this)"
    >
      Option 4
    </button>
 <button
      class="tw-px-4 tw-py-2 tw-text-[14px] lg:tw-text-[16px] tw-font-bold"
      data-id="4"
      onclick="updateContent(this)"
    >
      Option 5
    </button>
  </div>

  <!-- Dynamic Content -->
  <div id="content" class="tw-text-center tw-space-y-6 lg:tw-space-y-8">
    <h2 id="title" class="tw-text-[20px] tw-text-white lg:tw-text-[20px] tw-font-bold">Titre par défaut</h2>
    <p id="description" class="tw-text-[14px] lg:tw-text-[16px]">Description par défaut.</p>
  </div>
</div>
</div>

<script>
  const contentData = {
    1: {
      title: "Titre pour Option 1",
      description: "Description associée à l'Option 1.",
    },
    2: {
      title: "Titre pour Option 2",
      description: "Description associée à l'Option 2.",
    },
    3: {
      title: "Titre pour Option 3",
      description: "Description associée à l'Option 3.",
    },
    4: {
      title: "Titre pour Option 4",
      description: "Description associée à l'Option 4.",
    },
5: {
      title: "Titre pour Option 5",
      description: "Description associée à l'Option 5.",
    },
  };

  function updateContent(button) {
    const id = button.getAttribute("data-id"); 
    const titleElement = document.getElementById("title");
    const descriptionElement = document.getElementById("description");

    titleElement.textContent = contentData[id].title;
    descriptionElement.textContent = contentData[id].description;

    const buttons = document.querySelectorAll("[data-id]");
  buttons.forEach((btn) => {
    btn.classList.remove("tw-text-[#2c4049]", "tw-border-b-2", "tw-border-[#2c4049]");
  });

  button.classList.add("tw-text-[#2c4049]", "tw-border-b-2", "tw-border-[#2c4049]");
  }
</script>`,
    unLocked: true,
  },
];

export const tableData = [
  { feature: "Simplicité d’Installation", pro: true, others: false },
  { feature: "Boutique qui Convertit", pro: true, others: false },
  { feature: "Design Professionnel", pro: true, others: false },
  { feature: "Compatibilité Shopify", pro: true, others: false },
  { feature: "Génère de la Confiance", pro: true, others: false },
  { feature: "Mises à Jour Régulières", pro: true, others: false },
  { feature: "Accès à un Groupe VIP", pro: true, others: false },
  { feature: "Une Boutique par Mois", pro: true, others: false },
  { feature: "Audit, Conseils et Support", pro: true, others: false },
];

export const legalsLinksData = [
  {
    link: "/legals/legal-notice", label: "Mentions légales",
  },
  {
    link: "/legals/privacy-policy", label: "Politique de confidentialité",
  },
  {
    link: "/legals/terms-and-conditions", label: "Conditions générales de vente",
  },
  {
    link: "/legals/terms-and-conditions-of-use", label: "Conditions générales d'utilisation",
  },
];

export const legalsPagesData = (handle: string) => {
  switch (handle) {
    case "terms-and-conditions-of-use":
      return {
        title: "Conditions Générales d'Utilisation (CGU)",
        data: [
          {
            title: "Dernière mise à jour : 02/04/2025",
            content: "Bienvenue sur TailwindLiquid. En accédant et en utilisant notre site web, vous acceptez les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site."
          },
          {
            title: "1. Objet",
            content: "Les présentes CGU définissent les conditions d'utilisation du site TailwindLiquid et des services proposés."
          },
          {
            title: "2. Accès au site",
            content: "L'accès au site est réservé aux personnes majeures. En utilisant ce site, vous déclarez avoir au moins 18 ans."
          },
          {
            title: "3. Propriété intellectuelle",
            content: "Tous les contenus et codes (snippets) présents sur ce site sont la propriété exclusive de TailwindLiquid et sont protégés par les lois sur la propriété intellectuelle."
          },
          {
            title: "4. Responsabilités",
            content: "Nous nous efforçons d'assurer l'exactitude des informations présentes sur ce site, mais nous ne pouvons garantir qu'elles soient toujours complètes ou à jour. L'utilisation des informations disponibles sur ce site se fait sous votre propre responsabilité."
          },
          {
            title: "5. Modification des CGU",
            content: "Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications entreront en vigueur dès leur publication sur le site."
          }
        ]
      };
    case "terms-and-conditions":
      return {
        title: "Conditions Générales de Vente (CGV)",
        data: [
          {
            title: "Dernière mise à jour : 02/04/2025",
            content: "Les présentes Conditions Générales de Vente régissent les ventes de produits et services effectuées sur le site TailwindLiquid."
          },
          {
            title: "1. Produits et services",
            content: "TailwindLiquid propose des snippets Liquid & TailwindCSS prêts à l'emploi pour améliorer les boutiques Shopify. L'accès à ces snippets se fait via un système de crédits, qui peuvent être achetés sous forme de packs."
          },
          {
            title: "2. Packs et abonnements",
            content: "Nous proposons trois packs de crédits, utilisés pour débloquer des snippets :\n- 1 crédit\n- 3 crédits\n- 5 crédits\nCes crédits peuvent être obtenus via un achat ponctuel ou un abonnement mensuel."
          },
          {
            title: "3. Prix",
            content: "Les prix des packs et abonnements sont indiqués en euros, toutes taxes comprises. Nous nous réservons le droit de modifier nos prix à tout moment."
          },
          {
            title: "4. Commandes",
            content: "Vous pouvez passer commande directement sur notre site. La validation de votre commande implique l'acceptation pleine et entière des présentes CGV."
          },
          {
            title: "5. Paiement",
            content: "Le paiement est exigible immédiatement à la commande. Les paiements sont gérés via Stripe."
          },
          {
            title: "6. Livraison",
            content: "Les crédits achetés sont ajoutés à votre compte immédiatement après confirmation du paiement."
          },
          {
            title: "7. Droit de rétractation",
            content: "Conformément à la législation en vigueur, le droit de rétractation ne peut être exercé pour les contenus numériques non fournis sur un support matériel."
          },
          {
            title: "8. Responsabilité",
            content: "Nous ne saurions être tenus responsables des dommages résultant d'une mauvaise utilisation de nos produits."
          }
        ]
      };
    case "privacy-policy":
      return {
        title: "Politique de Confidentialité",
        data: [
          {
            title: "Dernière mise à jour : 02/04/2025",
            content: "Chez TailwindLiquid, nous attachons une grande importance à la protection de vos données personnelles."
          },
          {
            title: "1. Collecte des informations",
            content: "Nous collectons des informations lorsque vous vous inscrivez sur notre site, passez une commande ou interagissez avec nos services."
          },
          {
            title: "2. Utilisation des informations",
            content: "Les informations collectées peuvent être utilisées pour :\n- Améliorer notre site web et nos services\n- Vous contacter par e-mail\n- Administrer un concours, une promotion ou une enquête"
          },
          {
            title: "3. Protection des informations",
            content: "Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles."
          },
          {
            title: "4. Consentement",
            content: "En utilisant notre site, vous consentez à notre politique de confidentialité."
          }
        ]
      };
    case "legal-notice":
      return {
        title: "Mentions Légales",
        data: [
          {
            title: "Dernière mise à jour : 02/04/2025",
            content: "Informations légales du site TailwindLiquid."
          },
          {
            title: "1. Éditeur du site",
            content: "TailwindLiquid\nConçu et développé par Sejiux Studio\nSiège social : 5 rue Marcel Sembat 83200 Toulon\nEmail : tailwindliquid@gmail.com\nNuméro SIRET : 83012126500037\nDirecteur de la publication : Sejiux Studio"
          },
          {
            title: "2. Hébergement",
            content: "Hébergeur Frontend : Vercel\nHébergeur Backend : Shopify"
          },
          {
            title: "3. Propriété intellectuelle",
            content: "Tous les contenus et codes (snippets) présents sur ce site sont la propriété exclusive de TailwindLiquid et sont protégés par les lois françaises relatives à la propriété intellectuelle."
          },
          {
            title: "4. Contact",
            content: "Pour toute question ou demande d'information concernant le site, contactez nous à : tailwindliquid@gmail.com."
          }
        ]
      };
    default:
      return {
        title: "Page non trouvée",
        data: [
          {
            title: "Erreur 404",
            content: "La page demandée n'existe pas."
          }
        ]
      };
  }
};