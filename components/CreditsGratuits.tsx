import { useTranslations } from "next-intl";
import React from "react";

const CreditsGratuits = () => {
  const t = useTranslations("fe");

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto dark:bg-[#324e58] h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {t("creditsGratuits.title")}
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        {t("creditsGratuits.subtitle1")}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {t("creditsGratuits.subtitle2Part1")}
        <strong>{t("creditsGratuits.strongText")}</strong>
        {t("creditsGratuits.subtitle2Part2")}
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {t("creditsGratuits.step1.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t("creditsGratuits.step1.description")}
          </p>
          <a
            href="https://www.google.com/search?nfpr=1&q=avis+sur+ecomcodehub+toulon&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzxCAX6Y-MYBdJ0ccMN9jN6O3luQYWsCh1ZGoHrBO0TmH8se3GhEtOTHRS4jHKd-1G7rIAi-UJbWYyHBd1lVI2Y08ulWT3urDb1OwkTXjLCoGX2iH3UaDvy6wJvHpJeEg92T5jMGFzaHf1ec5dXHEukjzS_tg&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E9EshZX3GWIEXaoNNU90bh_GkICpSnqz5VUaDlBAC5fxsnm6iIVGvzaFMLWZfBRgqgBEygDDBMl7G1_cupIIhwZfW6StRuL_Mn7-82Co5iLLhlcbLw%3D%3D&stq=1&cs=1&lei=VJpMaOPKMKHX7M8PtqWQgQo&safe=strict"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-blue-600 dark:text-blue-400 underline font-medium"
          >
            {t("creditsGratuits.step1.linkText")}
          </a>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {t("creditsGratuits.step2.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t("creditsGratuits.step2.description")}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {t("creditsGratuits.step3.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t("creditsGratuits.step3.descriptionPart1")}
            <strong>{t("creditsGratuits.step3.strongText")}</strong>
            {t("creditsGratuits.step3.descriptionPart2")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditsGratuits;
