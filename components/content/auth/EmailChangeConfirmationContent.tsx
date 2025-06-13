import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from "react-icons/io";
import { PulseLoader } from 'react-spinners';

export const EmailChangeConfirmationContent = (messageKey: string | undefined) => {
  switch (messageKey) {
    case 'tokenRequired':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: "Lien non cliqué",
        description: "Il semble que vous n'ayez pas cliqué sur le lien de confirmation envoyé à votre nouvel e-mail. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour confirmer votre changement d'adresse e-mail.",
        buttonLabel: "Ouvrir ma boîte mail",
        buttonHref: `https://mail.google.com/mail/u/0/#inbox`,
        targetHref: "_blank"
      };
    case 'tokenInvalid':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: "Lien invalide",
        description: "Le lien de confirmation du changement d'e-mail est invalide. Veuillez vérifier votre boîte de réception ou demander un nouveau changement d'e-mail.",
        buttonLabel: "Revenir aux paramètres",
        buttonHref: `/account`,
      };
    case 'tokenExpired':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: "Lien expiré",
        description: "Le lien de confirmation du changement d'e-mail a expiré. Veuillez effectuer une nouvelle demande depuis vos paramètres.",
        buttonLabel: "Revenir aux paramètres",
        buttonHref: `/account`,
      };
    case 'emailNotExist':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: "Nouvel e-mail introuvable",
        description: "L'adresse e-mail fournie n'existe pas. Veuillez vérifier l'adresse saisie et réessayer.",
        buttonLabel: "Revenir aux paramètres",
        buttonHref: `/account`,
      };
    case 'emailChanged':
      return {
        icon: <FaCheckCircle className="text-green-500 text-6xl mb-4" />,
        title: "E-mail mis à jour",
        description: "Votre adresse e-mail a été changée avec succès. Vous pouvez maintenant vous connecter avec votre nouvelle adresse.",
        buttonLabel: "Se connecter",
        buttonHref: `/auth/login`,
      };
    case 'emailAlreadyChanged':
      return {
        icon: <FaCheckCircle className="text-green-500 text-6xl mb-4" />,
        title: "E-mail déjà mis à jour",
        description: "Votre adresse e-mail a déjà été changée. Connectez-vous maintenant avec votre nouvelle adresse.",
        buttonLabel: "Se connecter",
        buttonHref: `/auth/login`,
      };
    case 'somethingWentWrong':
      return {
        icon: <IoIosCloseCircle className="text-red-500 text-6xl mb-4" />,
        title: "Erreur",
        description: "Une erreur est survenue lors du changement d'e-mail. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
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
