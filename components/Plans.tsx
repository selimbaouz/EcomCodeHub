"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { PricesFixeData } from '@/data';
import CardPlans from './card/CardPlans';
import { useModalStore } from '@/store/plans';
import { getSubscriptions } from '@/actions/stripe';
import { useCurrentUser } from '@/hook/use-current-user';
import { getUserByEmail } from '@/data/auth/user';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { UserType } from '@/types/types';

const Plans = () => {
  const {modeSelected, setModeSelected} = useModalStore();
  const [subscription, setSubscription] = useState<Stripe.Response<Stripe.Subscription> | undefined>(undefined);
  const subscriptionItem = subscription?.items.data[0];
  const [user, setUser] = useState<UserType>(null);
  const session = useCurrentUser();
  
  if(!session) {
    redirect("/auth/login")
  } 

  useEffect(() => {
    const fetchSubscription = async () => {
        try {
            const user = await getUserByEmail(session?.email ?? "");
            if(!user) {
              redirect("/auth/login")
            } 
            setUser(user);
            const sub = await getSubscriptions({subscriptionId: user?.subscriptionId ?? ""});
            setSubscription(sub?.data); // Stocke l'état réel
        } catch (error) {
            console.error("Erreur lors de la récupération du statut de l'abonnement", error);
        }
    };

    fetchSubscription();
}, []);

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
              const isCurrentPlan = modeSelected === 1 && (subscriptionItem?.price.unit_amount ?? 0 / 100).toFixed(2) === data.price;
              
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
                  nameOfPack={isCurrentPlan ? "Plan actuel" : "Obtenir ce pack"}
                  user={user}
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