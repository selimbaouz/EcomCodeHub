"use client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

export default function LegalPage({handle}: { handle: string }) {
  const t = useTranslations("fe.legalpage");

  const legalsPagesData = t.raw(handle) ?? t.raw("not-found");

  return (
    <div className={cn("px-6 text-left space-y-6", "lg:max-w-4xl lg:mx-auto")}>
      <h2 className={cn(
        "text-[28px] text-left pb-14 leading-tight font-semibold ",
        "lg:text-6xl",
        "xl:text-5xl xl:leading-[1.4]",
        "pointer-events-none whitespace-pre-wrap",
      )}> {legalsPagesData.title}</h2>
      {legalsPagesData.data.map((data: { title: string; content: string; }, index: number) => (
        <div key={index} className="space-y-6">
          <h3 className={cn(
            "text-xl text-left leading-tight font-semibold",
            "lg:text-3xl lg:mx-auto",
            "xl:leading-[1.4]",
            "pointer-events-none whitespace-pre-wrap",
          )}>{data.title}</h3>
          <p className={cn("text-base w-full", "lg:text-base lg:mx-auto lg:pb-2", "xl:text-lg xl:leading-relaxed")}>{data.content}</p>
        </div>
      ))}
    </div>
  );
};