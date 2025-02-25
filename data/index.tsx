import { MdOutlineDesignServices, MdOutlineSell, MdVerified } from "react-icons/md";
import { FaCheck, FaCopy, FaTruck } from "react-icons/fa6";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { BiRocket, BiTimeFive } from "react-icons/bi";
import { GiFrance } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineHeart, HiOutlineShieldCheck, HiOutlineSparkles } from "react-icons/hi";
import { FaCheckSquare, FaUndo } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import Description from "@/components/content/detailsProduct/Description";
import WhyTL from "@/components/content/detailsProduct/WhyTL";
import HowItWorks from "@/components/content/detailsProduct/HowItWorks";
import Delivery from "@/components/content/detailsProduct/Delivery";
import { AiOutlineStar } from "react-icons/ai";
import Transformations from "@/components/content/mode/Transformations";
import Difference from "@/components/content/mode/Difference";
import { BestReviews } from "@/components/BestReviews";
import ProductBadges from "@/components/snippets/ProductBadges";
import ProductTrustReview from "@/components/snippets/ProductTrustReview";
import ProductCheck from "@/components/snippets/ProductCheck";
import ProductTitle from "@/components/snippets/ProductTitle";
import ProductInformations from "@/components/snippets/ProductInformations";
import ProductCommandNow from "@/components/snippets/ProductCommandNow";
import ProductSocialProof from "@/components/snippets/ProductSocialProof";
import ProductWarranty from "@/components/snippets/ProductWarranty";

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

export const benefitsFeelingData = [
  {
    icon: HiOutlineShieldCheck, 
    title: "Confort", 
    content: "Une fois fixé, il reste fermement en place et s'adapte à tous les sièges auto, quelle que soit leur forme."
  },
  {
    icon: HiOutlineSparkles, 
    title: "Efficacité", 
    content: "Diminue le risque de complications graves lors d'accidents de 82,7% comparé aux ceintures standard."
  },
  {
    icon: HiOutlineHeart, 
    title: "Protection", 
    content: "Design innovant répartissant la pression sur les cuisses, pour une protection et un confort optimal."
  },
  {
    icon: HiOutlineHeart, 
    title: "Protection", 
    content: "Design innovant répartissant la pression sur les cuisses, pour une protection et un confort optimal."
  }
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
  {
    title: "🎁 Boutique offerte dès l'abonnement",
  },
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

export const productInstructionSelected = (selected: number) => {
  switch (selected) {
  case 0:
    return {
      content: "La ceinture de l'ajusteur doit être tirée à travers l'espace entre le siège et le dossier"
    };
  case 1:
    return {
      content: "Ensuite, la ceinture doit être tirée sous le siège, en veillant à ce que la ceinture ne soit pas tordue"
    };
  case 2:
    return {
      content: "L'extrémité de la ceinture doit être bouclée à travers les trous supérieur et inférieur de la boucle, respectivement"
    };
  case 3:
    return {
      content: "La ceinture doit être serrée fermement en la tirant vers le bas"
    };
  default:
    return {
      content: "La ceinture de l'ajusteur doit être tirée à travers l'espace entre le siège et le dossier"
    };
  }
};

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
  },
  {
    title: "Code",
  }
]

export const SnippetSelected = () => [
  {
    title: "Title",
    content: <ProductTitle />,
    code: `<h3 class="tw-font-semibold tw-text-[23px] sm:tw-text-[24px] lg:tw-text-[24px] xl:tw-text-[32px]">Packs Conversion Shopify</h3>`,
    private: false,
  },
  {
    title: "Badge",
    content: <ProductBadges />,
    code: `<div class="tw-flex tw-items-center tw-gap-3">
          <div class="tw-bg-[#259d93] tw-text-white tw-px-3 tw-py-1 tw-rounded-lg tw-w-max tw-text-base tw-font-bold">Accès instantané</div>
          <div class="tw-bg-[#2C4049] tw-text-white tw-px-3 tw-py-1 tw-rounded-lg tw-w-max tw-text-base tw-font-bold">Top Achat 2025</div>
          </div>`,
    private: false,
  },
  {
    title: "Avis CTA",
    content: <ProductTrustReview />,
    code: `<div class="tw-flex tw-items-center tw-gap-2">
          <p class="tw-text-[12px]">4.5/5</p>
          <div class="tw-flex tw-text-xl tw-items-center">
          <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-base sm:text-md text-primary md:text-lg xl:text-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
          <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-base sm:text-md text-primary md:text-lg xl:text-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
          <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-base sm:text-md text-primary md:text-lg xl:text-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
          <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-base sm:text-md text-primary md:text-lg xl:text-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
          <svg stroke="currentColor" fill="#259d93" stroke-width="0" viewBox="0 0 24 24" class="text-base sm:text-md text-primary md:text-lg xl:text-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
          </div>
          <p class="tw-text-[12px]">Basé sur <strong>650 
          e-commercants</strong></p>
          </div>`,
    private: false,
  },
  {
    title: "Check",
    content: <ProductCheck />,
    code: `<div class="tw-py-6 tw-space-y-6">
          <div class="tw-flex tw-items-center tw-gap-3 tw-bg-[#E4F7F1] tw-py-1 tw-px-2 tw-rounded-lg tw-w-max">
          <svg stroke="currentColor" fill="#2c4049" stroke-width="0" viewBox="0 0 448 512" class="text-lg text-foreground rounded-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg> 
          <p class="tw-text-[12px] xs:tw-text-[14px] lg:tw-text-xl tw-font-medium">+60 codes Liquid + Tailwind prêts à l’emploi
          </p>
          </div>

          <div class="tw-flex tw-items-center tw-gap-3 tw-bg-[#E4F7F1] tw-py-1 tw-px-2 tw-rounded-lg tw-w-max">
          <svg stroke="currentColor" fill="#2c4049" stroke-width="0" viewBox="0 0 448 512" class="text-lg text-foreground rounded-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg> 
          <p class="tw-text-[12px] xs:tw-text-[14px] lg:tw-text-xl tw-font-medium">Copiez, collez et boostez vos conversions
          </p>
          </div>

          <div class="tw-flex tw-items-center tw-gap-3 tw-bg-[#E4F7F1] tw-py-1 tw-px-2 tw-rounded-lg tw-w-max">
          <svg stroke="currentColor" fill="#2c4049" stroke-width="0" viewBox="0 0 448 512" class="text-lg text-foreground rounded-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg> 
          <p class="tw-text-[12px] xs:tw-text-[14px] lg:tw-text-xl tw-font-medium">100 % compatibles avec tous les thèmes Shopify
          </p>
          </div>

          <div class="tw-flex tw-items-center tw-gap-3 tw-bg-[#E4F7F1] tw-py-1 tw-px-2 tw-rounded-lg tw-w-max">
          <svg stroke="currentColor" fill="#2c4049" stroke-width="0" viewBox="0 0 448 512" class="text-lg text-foreground rounded-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg> 
          <p class="tw-text-[12px] xs:tw-text-[14px] lg:tw-text-xl tw-font-medium">Achat unique ou abonnement avec mises à jour
          </p>
          </div>
          </div>`,
    private: false,
  }, 
  {
    title: "Informations",
    content: <ProductInformations />,
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
    private: false,
  },
  {
    title: "Urgence",
    content: <ProductCommandNow />,
    code: `<div class="tw-flex tw-items-center tw-justify-center tw-gap-1 sm:gap-2 tw-pb-4">
                <svg stroke="currentColor" fill="#4abf8e" stroke-width="0" viewBox="0 0 640 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M112 0C85.5 0 64 21.5 64 48l0 48L16 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 208 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 160l-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 176 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 224l-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 288l0 128c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L112 0zM544 237.3l0 18.7-128 0 0-96 50.7 0L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"></path></svg>
                <p class="tw-text-[10px] lg:tw-text-[12px]"}>Commandez maintenant pour une expédition demain.</p>
            </div>`,
    private: false,
  },
  {
    title: "Urgence",
    content: <ProductSocialProof />,
    code: `<div class="tw-flex tw-items-center tw-justify-center tw-gap-2">
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
            <p class="tw-text-[10px] lg:tw-text-[12px]">Recommander par <span class="tw-font-bold tw-text-[#4abf8e]">+650</span>personnes</p>
        </div>`,
    private: false,
  },
  {
    title: "Garantie",
    content: <ProductWarranty />,
    code: `<div class='tw-w-full tw-rounded-2xl tw-bg-[#e4f7f1] tw-flex tw-items-center tw-gap-4 tw-p-3 tw-max-w-sm'>
            <img 
                src="/images/moneyBack.png"
                alt="Img of moneyback"
                width={100}
                height={100}
            />
            <div class='tw-flex tw-flex-col tw-gap-2'>
                <h6 class="tw-font-bold tw-text-[12px] lg:tw-text-[14px]">Remboursement Garantie Pendant 90 Jours</h6>
                <p class='tw-text-[10px] lg:tw-text-xs'>Nous avons confiancce en nos produits. Pas convaincu ? Renvoyez-le et nous vous rembourserons votre achat.</p>
            </div>
        </div>`,
    private: false,
  }
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

export const stacksData = [
  {
    icon: FaTruck,
    title: "Livraison OFFERTE",
  },
  {
    icon: IoIosPeople,
    title: "+319 clients satisfaits",
  },
  {
    icon: TbTruckReturn,
    title: "Satisfait ou Remboursé",
  },
  {
    icon: GiFrance,
    title: "Support Français",
  },
];

export const beneficesData = [
  {
    icon: FaTruck,
    title: "Protection garantie",
  },
  {
    icon: IoIosPeople,
    title: "Grossesse sereine",
  },
  {
    icon: TbTruckReturn,
    title: "82% de risques en moins",
  },
  {
    icon: GiFrance,
    title: "Adaptation parfaite",
  },
];

export const beneficesProductData = [
  {
    icon: GoHeartFill,
    title: "Support 24/7",
  },
  {
    icon: MdVerified,
    title: "Livraison Gratuite",
  },
  {
    icon: FaUndo,
    title: "Retours Gratuits",
  },
];
