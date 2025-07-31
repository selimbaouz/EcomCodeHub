import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from "react-icons/io";
import { PulseLoader } from 'react-spinners';

export const VerificationContent = (messageKey: string | undefined) => {
  switch (messageKey) {
    case 'tokenRequired':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: "Lien non cliqué",
        description: "Il semble que vous n'ayez pas cliqué sur le lien dans l'email. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour vérifier votre email.",
        buttonLabel: "Ouvrir ma boite mail",
        buttonHref: `https://mail.google.com/mail/u/0/#inbox`,
        targetHref: "_blank"
      };
    case 'tokenExpired':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: "Lien expiré",
        description: "Le lien de vérification a expiré. Veuillez demander un nouveau lien en saisissant à nouveau votre adresse e-mail.",
        buttonLabel: "Se connecter",
        buttonHref: `/auth/login`,
      };
      case 'tokenInvalidOrUsed':
        return {
          icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
          title: "Lien invalide ou déjà utilisé",
          description: "Ce lien de vérification est invalide ou a déjà été utilisé. Veuillez en demander un nouveau ou vous connecter si votre e-mail a déjà été confirmé.",
          buttonLabel: "Se connecter",
          buttonHref: `/auth/login`,
        };
    case 'emailNotExist':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: "E-mail introuvable",
        description: "Cet e-mail n'existe pas. Veuillez vérifier l'adresse e-mail ou acheter un plan.",
        buttonLabel: "Ouvrir ma boite mail",
        buttonHref: `https://mail.google.com/mail/u/0/#inbox`,
        targetHref: "_blank"
      };
    case 'emailVerified':
      return {
        icon: <FaCheckCircle className="text-green-500 text-6xl mb-4" />,
        title: "E-mail vérifié",
        description: "Votre adresse e-mail a été vérifiée avec succès. Vous pouvez maintenant créer votre mot de passe pour pouvoir accéder à votre compte.",
        buttonLabel: "Se connecter",
        buttonHref: `/auth/login`,
      };
    case 'somethingWentWrong':
      return {
        icon: <IoIosCloseCircle className="text-red-500 text-6xl mb-4" />,
        title: "Erreur",
        description: "Quelque chose s'est mal passé. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
        buttonLabel: "Contacter le support",
        buttonHref: "mailto:tailwindliquid@gmail.com",
      };
    default:
      return {
        icon: <PulseLoader size={14} color="#0ea5e9" />,
        title: "Vérification en cours...",
        description: "Merci de patienter pendant la vérification de votre email.",
        buttonLabel: "",
        buttonHref: "",
      };
  }
};