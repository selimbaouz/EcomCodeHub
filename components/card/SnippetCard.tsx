"use client";
import { selectSnippetData } from '@/data';
import { cn } from '@/lib/utils';
import React, { startTransition, useState, useTransition } from 'react';
import { FaCheck, FaCoins, FaLock, FaRegCopy, FaUnlock } from 'react-icons/fa6';
import CodeBlock from '../CodeBlock';
import { SnippetType, UserType } from '@/types/types';
import ComponentsSnippet from '../snippets/ComponentsSnippet';
import { onPurchaseSnippet } from '@/data/snippets';
import ConfirmModal from '../modals/ConfirmModal';
import { Button } from '../ui/button';
import { PulseLoader } from 'react-spinners';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface SnippetCardProps {
    snippet: SnippetType;
    user: UserType
}
const SnippetCard = ({
    snippet,
    user
}: SnippetCardProps) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [copied, setCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const name = snippet.componentName;
    if(!name) return null;
    const Component = ComponentsSnippet[name] || null;
    var pretty = require('pretty');
    const formattedCode = pretty(snippet.code, {ocd: true});
    const hasPurchased = snippet.purchases.some((purchase) => purchase.userId === user?.id);

    const handleCopy = () => {
        navigator.clipboard.writeText(formattedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePurchase = async () => {
        startTransition(async () => {
            onPurchaseSnippet(snippet.id, user?.id ?? "", snippet.creditPrice)
            .then((data) => {
                if(data?.success) {
                  toast.success(data?.success);
                  setIsModalOpen(false);
                  router.refresh();
                } else {
                  toast.error(data?.error);
                }
              })
              .catch(() => {
                toast.error("Quelque chose s'est mal passé. Veuillez réessayer plus tard ou contacter le support si le problème persiste.");
              });
            });
      };

    return (
        <div className={cn("bg-background relative flex flex-col gap-2 w-full border p-4 rounded-2xl shadow-md", "dark:border-[#324e58]")}>
            <div className="flex justify-between items-center">
                <h6 className="font-semibold">{snippet.title}</h6>
                <div className={cn("flex items-center gap-2", "lg:gap-4")}>
                    <div className="flex bg-gray-100 rounded-xl p-0.5">
                        {!hasPurchased ? (
                            <button type='button' onClick={(e) => {
                                e.preventDefault();
                                setIsModalOpen(true);
                            }} className={cn('flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer bg-background', 'hover:bg-foreground hover:text-background')}>
                                <div className={cn("flex gap-2 items-center")}>
                                    <FaUnlock className='text-sm' />
                                    <p className='font-bold text-sm hidden lg:block'>Débloquez</p>
                                </div>
                                <p className='text-gray-400'>|</p>
                                <div className='flex gap-2 items-center'>
                                    <FaCoins className='text-sm'/>
                                    <p>{snippet.creditPrice}</p>
                                </div>
                            </button>
                        ) : 
                        (selectSnippetData.map((data, index) => (
                            <button
                                key={index}
                                className={cn("flex items-center gap-2 text-sm font-bold cursor-pointer py-2 px-3 rounded-xl", selectedTab === index ? "bg-white text-foreground" : "text-gray-500")}
                                onClick={() => setSelectedTab(index)}
                            >
                                <data.icon className='text-lg' />
                                <h6 className={cn("hidden", "lg:block")}>{data.title}</h6>
                            </button>
                        )))}
                    </div>
                    {hasPurchased && (
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-gray-100 border text-foreground rounded-lg hover:bg-gray-200 transition"
                    >
                        {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />}
                    </button>
                    )}
                </div>
            </div>
            <div className="w-full min-h-[350px] max-h-[350px] flex justify-center items-center border rounded-lg p-4 dark:border-[#324e58]">
                {!hasPurchased ? (
                    <div className="h-full max-h-[350px]">
                        {Component} 
                    </div>
                ) : (
                    selectedTab === 0 ? (
                        <div className="h-full max-h-[350px]">
                            {Component} 
                        </div>
                    ) : (
                        <div className="w-full h-[350px] flex-1 overflow-hidden">
                            <CodeBlock code={formattedCode} />
                        </div>
                    )
                )}
            </div>
            {isModalOpen && (
                <ConfirmModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                title="Débloquez le snippet"
                description={`Ce snippet coûte ${snippet.creditPrice} crédits et il vous reste ${user?.credits} crédits. Êtes-vous sûr de vouloir débloquer ce snippet ?`}
              >
                <div className={cn("flex items-center gap-2 justify-end")}>
                  <Button
                    size="lg" 
                    variant="outline" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsModalOpen(false);
                    }}
                    type="button"
                    className={cn("font-medium border", "lg:text-base")}
                    disabled={isPending}
                  >  
                    Annuler
                  </Button>
                  <Button 
                    type='button' 
                    size="lg" 
                    variant="secondary" 
                    disabled={isPending}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePurchase();
                    }} 
                    className={cn("font-medium", "lg:text-base")}
                  >
                    {isPending ? (
                      <PulseLoader
                        size={7}
                      />) : (
                      "Débloquez"
                    )}
                  </Button>
                </div>
              </ConfirmModal>
            )}
        </div>
    );
};

export default SnippetCard;