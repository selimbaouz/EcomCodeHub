"use client";
import { useTranslations } from 'next-intl';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { IoIosCloseCircle } from "react-icons/io";
import { PulseLoader } from 'react-spinners';

const PasswordContent = (
  messageKey: string | undefined,
  locale: string,
  t: (key: string) => string
) => {
  switch (messageKey) {
    case 'tokenMissing':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.tokenMissingTitle"),
        description: t("content.tokenMissingDescription"),
        buttonLabel: t("content.tokenMissingButtonLabel"),
        buttonHref: `https://mail.google.com/mail/u/0/#inbox`,
        targetHref: "_blank"
      };
    case 'tokenInvalid':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.tokenInvalidTitle"),
        description: t("content.tokenInvalidDescription"),
        buttonLabel: t("content.tokenInvalidButtonLabel"),
        buttonHref: `https://tailwindliquid.com/auth/reset`,
      };
    case 'tokenExpired':
      return {
        icon: <IoIosCloseCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.tokenExpiredTitle"),
        description: t("content.tokenExpiredDescription"),
        buttonLabel: t("content.tokenExpiredButtonLabel"),
        buttonHref: `https://tailwindliquid.com/auth/reset`,
      };
    case 'emailNotExist':
      return {
        icon: <FaExclamationCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.emailNotExistTitle"),
        description: t("content.emailNotExistDescription"),
        buttonLabel: t("content.emailNotExistButtonLabel"),
        buttonHref: `/${locale}/auth/login`,
      };
    case 'passwordUpdated':
      return {
        icon: <FaCheckCircle className="text-green-500 text-6xl mb-4" />,
        title: t("content.passwordUpdatedTitle"),
        description: t("content.passwordUpdatedDescription"),
        buttonLabel: t("content.passwordUpdatedButtonLabel"),
        buttonHref: `/${locale}/auth/login`,
      };
    case 'server':
      return {
        icon: <IoIosCloseCircle className="text-red-500 text-6xl mb-4" />,
        title: t("content.serverErrorTitle"),
        description: t("content.serverErrorDescription"),
        buttonLabel: t("content.serverErrorButtonLabel"),
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

export default PasswordContent;
