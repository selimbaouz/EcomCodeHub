import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from "react-icons/io";
import { PulseLoader } from 'react-spinners';

export const VerificationContent = (
   messageKey: string | undefined,
   locale: string,
   t: (key: string) => string
) => {
  switch (messageKey) {
    case 'tokenRequired':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.tokenMissingTitle"),
        description: t("content.tokenMissingDescription"),
        buttonLabel: t("content.tokenMissingButtonLabel"),
        buttonHref: `https://mail.google.com/mail/u/0/#inbox`,
        targetHref: "_blank"
      };
    case 'tokenExpired':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.tokenExpiredTitle"),
        description: t("content.tokenExpiredDescription"),
        buttonLabel: t("content.tokenExpiredButtonLabel"),
        buttonHref: `/${locale}/auth/login`,
      };
    case 'tokenInvalidOrUsed':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.tokenInvalidOrUsedTitle") || t("content.tokenInvalidTitle"),
        description: t("content.tokenInvalidOrUsedDescription"),
        buttonLabel: t("content.tokenInvalidButtonLabel"),
        buttonHref: `/${locale}/auth/login`,
      };
    case 'emailNotExist':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.emailNotExistTitle"),
        description: t("content.emailNotExistDescription"),
        buttonLabel: t("content.emailNotExistButtonLabel"),
        buttonHref: `https://mail.google.com/mail/u/0/#inbox`,
        targetHref: "_blank"
      };
    case 'emailVerified':
      return {
        icon: <FaCheckCircle className="text-green-500 text-6xl mb-4" />,
        title: t("content.emailVerifiedTitle"),
        description: t("content.emailVerifiedDescription"),
        buttonLabel: t("content.emailVerifiedButtonLabel"),
        buttonHref: `/${locale}/auth/login`,
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
