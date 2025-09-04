"use client";
import { cn } from '@/lib/utils';
import React, { useState, useTransition } from 'react';
import {
  FaCheck,
  FaCoins,
  FaEye,
  FaMobileScreen,
  FaRegCopy,
  FaTabletScreenButton,
  FaUnlock,
} from "react-icons/fa6";
import CodeBlock from '../CodeBlock';
import { SnippetType, UserType, View } from '@/types/types';
import ComponentsSnippet from '../snippets/ComponentsSnippet';
import { onPurchaseSnippet } from '@/actions/snippets';
import ConfirmModal from '../modals/ConfirmModal';
import { Button } from '../ui/button';
import { PulseLoader } from 'react-spinners';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { MdModeEditOutline, MdOutlineCode } from "react-icons/md";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useResponsiveStore } from "@/store/responsive-screen";
import useIsMobile from "@/hook/use-is-mobile";
import { EditSnippetForm } from "../forms/EditSnippetForm";

interface SnippetCardProps {
  snippet: SnippetType;
  user: UserType;
}
const SnippetCard = ({
    snippet,
    user
}: SnippetCardProps) => {
    const locale = useLocale();
    const t = useTranslations("fe");
    const [selectedTab, setSelectedTab] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copyMode, setCopyMode] = useState<'generated' | 'original'>('generated');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [generatedCode, setGeneratedCode] = useState("");
    const router = useRouter();
    const hasAccess = !!user?.stripeCustomerId || !!user?.plan;
    const isLoggedIn = !!user?.id;
    const { setView, getView } = useResponsiveStore();
    const view = getView(snippet.id);

    const name = snippet.componentName;
    if(!name) return null;
    const Component = ComponentsSnippet[name] || null;
    var pretty = require('pretty');
    const formattedCode = pretty(snippet.code, {ocd: true});
    const isMobile = useIsMobile();
    
    // Use useState instead of useOptimistic for better control
    const [optimisticPurchases, setOptimisticPurchases] = useState(snippet.purchases);

    const hasPurchased = optimisticPurchases.some(p => p.userId === user?.id);

    const selectSnippetData = [
      {
        title: t("snippets.preview"),
        icon: FaEye,
      },
      {
        title: t("snippets.code"),
        icon: MdOutlineCode
      }
    ]

    const selectResponsiveSnippet = [
    {
      tooltipTitle: t("snippets.screenMobile"),
      icon: FaMobileScreen,
      type: "mobile" as View,
    },
    {
      tooltipTitle: t("snippets.screenTablet"),
      icon: FaTabletScreenButton,
      type: "tablet" as View,
    },
    {
      tooltipTitle: t("snippets.screenDesktop"),
      icon: HiMiniComputerDesktop,
      type: "desktop" as View,
    },
  ];

    const handleCopy = () => {
        if (copyMode === 'generated' && generatedCode.trim()) {
          navigator.clipboard.writeText(generatedCode);
        } else {
          navigator.clipboard.writeText(formattedCode);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePurchase = async () => {
        const tempId = `temp-${Date.now()}`;
        
        // Sécurité mise si l'utilisateur n'a pas suffisamment de crédit, il ne peut pas débloquer car l'optimistic va le permettre
        if (!user || user.credits < snippet.creditPrice) {
          toast.error(t(`toast.errors.notEnoughCredits`)); 
        } else {
          // Ajout optimiste pour afficher la modification immédiatement avant le traitement du serveur
          setOptimisticPurchases(previousPurchases => [
              ...previousPurchases,
              {
                  id: tempId,
                  userId: user?.id ?? "",
                  snippetId: snippet.id,
                  createdAt: new Date()
              }
          ]);
        }

        startTransition(async () => {
            try {
                const data = await onPurchaseSnippet({
                    snippetId: snippet.id,
                    userId: user?.id ?? "",
                    creditPrice: snippet.creditPrice
                });

                if (data?.data?.success) {
                    toast.success(t(`toast.success.${data.data.success}`));
                    setIsModalOpen(false);

                    // Remplacement de l'ID temporaire par l'ID réel de la DB
                    setOptimisticPurchases(previousPurchases =>
                      previousPurchases.map(purchase =>
                        purchase.id === tempId 
                          ? { ...purchase, id: data?.data?.purchaseId ?? purchase.id } // fallback si purchase.id est undefined
                          : purchase
                      )
                    );

                } else {
                    // Rollback si erreur
                    setOptimisticPurchases(previousPurchases =>
                        previousPurchases.filter(purchase => purchase.id !== tempId)
                    );
                    toast.error(t(`toast.errors.${data?.data?.error}`));
                }
            } catch (error) {
                setOptimisticPurchases(previousPurchases =>
                    previousPurchases.filter(purchase => purchase.id !== tempId)
                );
                toast.error(t("toast.errors.somethingWrong"));
            }
        });
    };

  return (
    <div
      className={cn(
        "bg-background relative flex flex-col gap-2 w-full border p-4 rounded-2xl shadow-md",
        "dark:border-[#324e58]",
      )}
    >
      <div
        className={cn(
          "flex",
          isMobile ? "justify-between items-center" : "flex-col gap-2",
        )}
      >
        <h6 className={cn("font-semibold lg:text-base")}>
          {t(`snippets.database.title.${snippet.title}`)}
        </h6>
        <div className={cn(!isMobile && "flex justify-between items-center")}>
          {!isMobile && (
            <div className="flex bg-gray-100 rounded-xl p-0.5">
              {selectResponsiveSnippet.map((data, index) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      key={index}
                      className={cn(
                        "flex items-center gap-2 text-sm font-bold cursor-pointer py-2 px-3 rounded-xl",
                        view === data.type
                          ? "bg-white text-foreground"
                          : "text-gray-500",
                      )}
                      onClick={() => setView(snippet.id, data.type)}
                    >
                      <data.icon className="text-lg lg:text-sm" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{data.tooltipTitle}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}
          <div className={cn("flex items-center gap-2", "lg:gap-2")}>
            <div className="flex bg-gray-100 rounded-xl p-0.5">
              {!hasPurchased ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                  className={cn(
                    "flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer bg-background",
                    "hover:bg-foreground hover:text-background",
                  )}
                >
                  <div className="flex gap-2 items-center">
                    <FaUnlock className="text-sm" />
                    <p className="font-bold text-sm hidden lg:block">
                      {t("snippets.unlockCode")}
                    </p>
                  </div>
                  <p className="text-gray-400">|</p>
                  <div className="flex gap-2 items-center">
                    <FaCoins className="text-sm" />
                    <p>{snippet.creditPrice}</p>
                  </div>
                </button>
              ) : (
                selectSnippetData.map((data, index) => (
                  <button
                    key={index}
                    className={cn(
                      "flex items-center gap-2 text-sm font-bold cursor-pointer py-2 px-3 rounded-xl",
                      selectedTab === index
                        ? "bg-white text-foreground"
                        : "text-gray-500",
                    )}
                    onClick={() => setSelectedTab(index)}
                  >
                    <data.icon className="text-lg lg:text-sm" />
                    <h6 className="hidden lg:block lg:text-sm">{data.title}</h6>
                  </button>
                ))
              )}
            </div>
            {hasPurchased && (
               <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        snippet.title === "benefitsFourth" ? setCopyMode("generated") : setCopyMode("original");
                        handleCopy();
                      }}
                      className="p-2 bg-gray-100 border text-foreground rounded-lg hover:bg-gray-200 transition"
                      >
                      {copied ? (
                        <FaCheck className="text-green-400" />
                      ) : (
                        <FaRegCopy />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("snippets.copy")}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={cn(
                        "p-2 border text-foreground rounded-lg hover:bg-gray-200 transition",
                        isEditing
                          ? "bg-white text-foreground"
                          : "text-gray-500 bg-gray-100",
                      )}
                      onClick={() => setIsEditing(true)}
                    >
                      <MdModeEditOutline className="text-lg lg:text-sm" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("snippets.edit")}</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "w-full min-h-[350px] max-h-[350px] flex justify-center items-center border rounded-lg dark:border-[#324e58]",
          name === "Accordion" && "bg-pink-500",
          name === "ExpertReviewsCarousel" && "bg-[#F9F6EE]",
        )}
      >
        {!hasPurchased ? (
          <div className="h-full max-h-[350px] w-full mx-auto overflow-auto py-4">
            {Component ? <Component snippetId={snippet.id} /> : null}
          </div>
        ) : selectedTab === 0 ? (
          <div className="h-full max-h-[350px] w-full mx-auto overflow-auto py-4">
            {Component ? <Component snippetId={snippet.id} /> : null}
          </div>
        ) : (
          <div className="w-full h-[350px] flex-1 overflow-auto py-4">
            <CodeBlock code={formattedCode} />
          </div>
        )}
      </div>
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={
            !isLoggedIn || !hasAccess
              ? t("snippets.accessRequired")
              : t("snippets.unlockSnippet")
          }
          description={
            !isLoggedIn || !hasAccess
              ? t("snippets.buyPackAndLogin")
              : t("snippets.confirmUnlock", {
                  creditPrice: snippet.creditPrice,
                  userCredits: user?.credits ?? 0,
                })
          }
        >
          <div className="flex items-center gap-2 justify-end">
            <Button
              size="lg"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsModalOpen(false);
              }}
              type="button"
              className="font-medium border lg:text-base"
              disabled={isPending}
            >
              {t("snippets.cancel")}
            </Button>

                  {!isLoggedIn || !hasAccess ? (
                    <Link href={`/${locale}/products/pack-pro-conversion-shopify`}>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="font-medium lg:text-base"
                      >
                        {t("snippets.buyPack")}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      type="button"
                      size="lg"
                      variant="secondary"
                      disabled={isPending}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePurchase();
                      }}
                      className="font-medium lg:text-base"
                    >
                      {isPending ? <PulseLoader size={7} /> : t("snippets.unlock")}
                    </Button>
                  )}
                </div>
              </ConfirmModal>
            )}
            {isEditing && (
              <EditSnippetForm
                isOpen={isEditing}
                snippetId={snippet.id}
                onClose={() => setIsEditing(false)}
                title={snippet.title}
                snippetCode={snippet.code}
                setGeneratedCode={setGeneratedCode}
              />
            )}
        </div>
    );
};

export default SnippetCard;

