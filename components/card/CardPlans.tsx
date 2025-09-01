"use client";
import { cn } from '@/lib/utils';
import React, { FC, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { buyOneTimePlan, upgradeSubscription } from '@/actions/stripe';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { PulseLoader } from 'react-spinners';
import { Button } from '../ui/button';

interface CardPlansProps {
  planId: number;
  title: string;
  price: string;
  content: string;
  link: string;
  options?: {
    title: string;
  }[];
  modeSelected?: number;
  infoPrice?: string;
  discount: string;
  nameOfPack: string;
  isCurrentPlan: boolean;
}

const CardPlans: FC<CardPlansProps> = ({
  planId,
  title,
  price,
  content,
  link,
  options,
  modeSelected,
  infoPrice,
  discount,
  nameOfPack,
  isCurrentPlan
}) => {
  const t = useTranslations("fe");
  const [subError, setSubError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    setSubError(false);
    setIsLoading(true);
    try {
      if (modeSelected === 0) {
        const test = await buyOneTimePlan({ priceId: link, nameOfPack: nameOfPack });
        if(test?.data?.url) {
          window.location.href = test.data.url
        }
      } else {
        const upgrade = await upgradeSubscription({ newPriceId: link });
        if(upgrade?.data?.success) {
          toast.success(t(`toast.success.${upgrade?.data?.success}`));
        } else {
          toast.error(t(`toast.errors.${upgrade?.data?.error}`));
           if (upgrade?.data?.error === "subscriptionPaymentIncomplete") {
              setSubError(true);
            }
        }
      }
    } catch (error) {
      toast.error(t("toast.errors.errorBuyStripe"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full rounded-3xl flex flex-col justify-start items-center gap-2 p-6 border", "lg:px-8 lg:py-10", 
      planId === 0 && "lg:border-r-0 lg:rounded-r-none",
      planId === 1 ? `border-primary bg-[#E4F7F1] flex-grow lg:h-[720px]`
      : "border-foreground bg-background",
      planId === 2 && "lg:border-l-0 lg:rounded-l-none",
    )}>
      <div className={cn("space-y-2", "lg:space-y-3 text-left")}>
        <div className="flex items-center gap-4">
          <h3 className={cn('font-bold', "lg:text-2xl")}>{title}</h3>
          {infoPrice && <div className={cn("text-xs py-1 px-2 bg-primary rounded-md text-background", "lg:text-sm lg:-top-4")}>{infoPrice}</div>}
        </div>
        <div className='py-2 space-y-3'>
          <h3 className={cn("text-5xl font-bold")}>{price}<span className='text-base'>{modeSelected === 1 ? `${t("plans.byMonth")} €` : "€"}</span></h3>
          {discount ? <div className={cn("text-xs bg-foreground text-background rounded-md py-0.5 px-2 w-max", "lg:text-sm lg:-top-4")}>{discount}</div> : <div className={cn("text-xs py-1.5 px-2 w-max", "lg:text-sm lg:-top-4")}/>}
        </div>
        <p className={cn("text-foreground font-normal pb-6")}>{content}</p>
        <Button
          disabled={isLoading || subError}
          asChild
          className={cn(planId === 1 ? "bg-primary hover:bg-primary/80" : "bg-foreground hover:bg-foreground/80")}
        >
          <Link 
            href={isCurrentPlan || isLoading || subError ? "#" : link}
            target={isCurrentPlan ? "_self" : "_blank"}
            rel="preload"
            aria-disabled={isLoading || subError ? "true" : "false"}
            tabIndex={isLoading || subError ? -1 : 0}
            className={cn(
            "text-white w-full", 
            "h-12 mx-auto",
            "md:h-14",
            "xl:mx-0 xl:h-14 p-[1px]",
            "*:transition ease-out *:hover:duration-300 *:hover:text-white", 
            "transition-all ease-in ",
            "backdrop-blur-xl flex items-center justify-center text-base antialiased rounded-[10px]",
          )}
          onClick={isLoading || isCurrentPlan ? (e) => e.preventDefault() : handleClick}
          >
          {isLoading ? <PulseLoader size={7} color="white" /> : nameOfPack}
          </Link>
        </Button>
        <div className={cn("space-y-2 py-4")}>
          {options?.map((option, index) => (
            <div key={index} className={cn('flex items-center mx-auto gap-4', "lg:mx-0")}>
              <FaCheckCircle className='text-primary text-base' />
              <div className={cn("text-sm text-foreground")}>{option.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardPlans;