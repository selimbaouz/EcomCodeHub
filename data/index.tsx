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
    title: "Aperçu",
    content: <BestReviews />,
    code: `<div>BestReview1</div>`,
    private: false,
  },
  {
    title: "Code",
    content: <BestReviews />,
    code: `<div>BestReview2</div>`,
    private: true,
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
