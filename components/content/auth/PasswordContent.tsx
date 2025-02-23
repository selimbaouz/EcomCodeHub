import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from "react-icons/io";

const PasswordContent = (messageKey: string | undefined) => {
  switch (messageKey) {
  case 'tokenMissing':
    return {
      icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
      title: "Lien non cliqué",
      description: "Il semble que vous n'ayez pas cliqué sur le lien dans l'email. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour réinitialiser votre mot de passe.",
      buttonLabel: "Ouvrir ma boite mail",
      buttonHref: `https://mail.google.com/mail/u/0/#inbox`,
      targetHref: "_blank"
    };
  case 'tokenInvalid':
    return {
      icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
      title: "Lien invalide",
      description: "Le lien de réinitialisation est invalide. Veuillez vérifier votre boîte de réception pour le lien correct ou faire une nouvelle demande.",
      buttonLabel: "Faire une nouvelle demande",
      buttonHref: `https://tailwindliquid.com/auth/reset`,
    };
  case 'tokenExpired':
    return {
      icon: <IoIosCloseCircle className="text-red-500 text-6xl mb-4" />,
      title: "Lien expiré",
      description: "Le lien de réinitialisation a expiré. Veuillez faire une nouvelle demande pour réinitialiser votre mot de passe.",
      buttonLabel: "Faire une nouvelle demande",
      buttonHref: `https://tailwindliquid.com/auth/reset`,
    };
  case 'emailNotExist':
    return {
      icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
      title: "E-mail introuvable",
      description: "Cet e-mail n'existe pas. Veuillez vérifier l'adresse e-mail ou créer un nouveau compte.",
      buttonLabel: "Créer un compte",
      buttonHref: `/auth/login`,
    };
  case 'passwordUpdated':
    return {
      icon: <FaCheckCircle className="text-green-500 text-6xl mb-4" />,
      title: "Mot de passe mis à jour",
      description: "Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
      buttonLabel: "Se connecter",
      buttonHref: `/auth/login`,
    };
  case 'server':
  default:
    return {
      icon: <IoIosCloseCircle className="text-red-500 text-6xl mb-4" />,
      title: "Erreur TEST",
      description: "Quelque chose s'est mal passé. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
      buttonLabel: "Contacter le support",
      buttonHref: "mailto:tailwindliquid@gmail.com",
    };
  }
};

export default PasswordContent;