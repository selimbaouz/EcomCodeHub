"use client";
import { cn } from '@/lib/utils';
import React, { FC, useEffect, useState } from 'react';
import { PricesFixeData } from '@/data';
import CardPlans from './card/CardPlans';
import { useModalStore } from '@/store/plans';
import { useCurrentUser } from '@/hook/use-current-user';
import { redirect } from 'next/navigation';

interface PlansProps {
  nameOfPlan: string;
}

const Plans: FC<PlansProps> = ({nameOfPlan}) => {
  const {modeSelected, setModeSelected} = useModalStore();
  const session = useCurrentUser();
  const [currentPlanIndex, setCurrentPlanIndex] = useState<number | null>(null);
  console.log(modeSelected)
  
  if(!session) {
    redirect("/auth/login")
  } 

  useEffect(() => {
    if (modeSelected === 1) {
          const planTitles = PricesFixeData(1).map(plan => plan.title);
          const index = planTitles.findIndex(title => title === nameOfPlan);
          setCurrentPlanIndex(index !== -1 ? index : null);
    } 
}, [modeSelected]);

  return (
    <section className={cn("flex flex-col justify-center max-w-7xl mx-auto items-center")}>
      <div className={cn("px-6 text-center space-y-8", "md:mx-auto md:max-w-lg", "lg:max-w-2xl lg:mx-auto", "xl:px-10 xl:max-w-full")}>
        <h2 className={cn(
          "text-2xl sm:text-[28px] px-2 leading-tight font-semibold",
          "lg:px-0 lg:text-[38px]",
          "xl:px-0 xl:text-3xl xl:leading-[1.4]",
          "pointer-events-none whitespace-pre-wrap",
          "text-foreground text-center",
        )}>
          {/* Passer au plan supérieur */}
          {modeSelected === 0 ? "Commander un pack" : "Souscrire à un abonnement"}
        </h2>
        <div className={cn("pt-10", "lg:pt-0")}>
          <div className='mx-auto w-max rounded-full flex items-center justify-center bg-foreground  p-2'>
            {[
              {
                id: 0,
                title: "Ponctuel"
              },
              {
                id: 1,
                title: "Mensuel"
              },
            ].map((data, index) => (
              <div key={index} className={cn("py-1.5 px-3 rounded-full cursor-pointer", modeSelected === data.id && "bg-primary")} onClick={() => setModeSelected(data.id)}>
                <p className={cn("text-sm", modeSelected === data.id ? "text-white" : "text-background/70")}>{data.title}</p>
              </div>
            ))}
          </div>
          <div className={cn("relative pt-7 w-full flex flex-col gap-4", "xl:flex-row xl:items-center xl:justify-center xl:gap-0")}>
            {PricesFixeData(modeSelected).map((data, index) => {
              const isCurrentPlan = modeSelected === 1 && currentPlanIndex === index;
              const buttonText = isCurrentPlan 
                ? "Plan actuel" 
                : modeSelected === 1 && currentPlanIndex !== null 
                  ? (index < currentPlanIndex ? "Rétrograder" : "Mettre à niveau")
                  : "Obtenir ce pack";
              
              return (
                <CardPlans
                  key={index}
                  planId={index}
                  title={data.title}
                  price={data.price}
                  content={data.content}
                  link={data.link}
                  options={data.options}
                  modeSelected={modeSelected}
                  infoPrice={data.infoPrice}
                  discount={data.discount}
                  nameOfPack={buttonText}
                  isCurrentPlan={isCurrentPlan}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;