import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from "react-icons/io";
import { PulseLoader } from 'react-spinners';

export const EmailChangeConfirmationContent = (
  messageKey: string | undefined,
  locale: string,
  t: (key: string) => string
) => {
  switch (messageKey) {
    case 'tokenRequired':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.tokenRequiredTitle"),
        description: t("content.tokenRequiredDescription"),
        buttonLabel: t("content.tokenRequiredButtonLabel"),
        buttonHref: `https://mail.google.com/mail/u/0/#inbox`,
        targetHref: "_blank"
      };
    case 'tokenInvalid':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.tokenInvalidTitle"),
        description: t("content.tokenInvalidDescription"),
        buttonLabel: t("content.tokenInvalidButtonLabel"),
        buttonHref: `/${locale}/account`,
      };
    case 'tokenExpired':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.tokenExpiredTitle"),
        description: t("content.tokenExpiredDescription"),  
        buttonLabel: t("content.tokenExpiredButtonLabel"),
        buttonHref: `/${locale}/account`,
      };
    case 'emailChanged':
      return {
        icon: <FaCheckCircle className="text-green-500 text-6xl mb-4" />,
        title: t("content.emailChangedTitle"),
        description: t("content.emailChangedDescription"),
        buttonLabel: t("content.emailChangedButtonLabel"),
        buttonHref: `/${locale}/auth/login`,
      };
    case 'userNotFound':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.userNotFoundTitle"),
        description: t("content.userNotFoundDescription"),
        buttonLabel: t("content.userNotFoundButtonLabel"),
        buttonHref: `/${locale}/account`,
      };
    case 'somethingWentWrong':
      return {
        icon: <IoIosCloseCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.somethingWentWrongTitle"),
        description: t("content.somethingWentWrongDescription"),
        buttonLabel: t("content.somethingWentWrongButtonLabel"),
        buttonHref: "mailto:tailwindliquid@gmail.com",
      };
    default:
      return {
        icon: <PulseLoader size={14} color="#0ea5e9" />,
        title: t("content.defaultTitle"),
        description: t("content.defaultDescription"),
        buttonLabel: "",
        buttonHref: "",
      };
  }
};
