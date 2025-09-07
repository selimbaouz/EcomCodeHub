"use client";

import { useLocale, useTranslations } from "next-intl";
import Footer from '@/components/Footer';
import NavBar from '@/components/navigation/NavBar';
import StickyBar from '@/components/navigation/StickyBar';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import { useSession } from "next-auth/react";

export default function AmbassadorProgram() {
  const t = useTranslations("fe.ambassador");
  const locale = useLocale();
  const session = useSession();
  console.log(session);

  const formUrl =
  locale === "fr"
    ? "https://docs.google.com/forms/d/e/1FAIpQLSdIQLMTWDha82sNpD7ZLg05GL-BpBGljN5_ecZ9a_adKlqR4A/viewform?usp=dialog"
    : "https://docs.google.com/forms/d/e/1FAIpQLScQY8jdBN6k3V3X86DVHAYSww-qTi6ac3zE241B_ctWtOvq4A/viewform?usp=dialog";

  // Forcer le typage des tableaux retournés par t()
  const offers = t.raw("offers") as string[];
  const requirements = t.raw("requirements") as string[];
  const applyInstructions = t.raw("applyInstructions") as string[];

  return (
    <div className="relative">
      <div className="sticky top-0 w-full z-50">
        <StickyBar />
        <NavBar isAccount={session.data?.user ? true : false} />
      </div>

      <section className={cn(
        "w-full text-left space-y-10 max-w-screen-2xl mx-auto py-10",
        "lg:flex lg:flex-col lg:items-center lg:py-20"
      )}>
        <div className={cn('px-6 space-y-14', "md:px-0 max-w-prose")}>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p>{t("description")}</p>

          <h2 className="text-2xl font-semibold mt-8">{t("offersTitle")}</h2>
          <ul className="list-disc list-inside space-y-2">
            {offers.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-8">{t("requirementsTitle")}</h2>
          <ul className="list-disc list-inside space-y-2">
            {requirements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-8">{t("howItWorksTitle")}</h2>
          <p>{t("howItWorksDescription")}</p>

          <h2 className="text-2xl font-semibold mt-8">{t("applyTitle")}</h2>
        <ul className="list-disc list-inside space-y-2">
            {applyInstructions.map((item, idx) => (
                <li key={idx} className="whitespace-pre-wrap">
                <ReactMarkdown
                    components={{
                    p: ({ node, ...props }) => <>{props.children}</>, // ❗️Évite les <p>
                    a: ({ node, ...props }) => (
                        <a
                        {...props}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        />
                    ),
                    }}
                >
                    {item.replace('FORM_URL', formUrl)}
                </ReactMarkdown>
                </li>
            ))}
        </ul>



          <p className="mt-8">{t("closingStatement")}</p>

          <h3 className="text-xl font-semibold mt-12">{t("callToAction")}</h3>
        </div>
      </section>

      <section className="relative mt-20">
        <Footer />
      </section>
    </div>
  );
}
