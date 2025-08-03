"use client";
import { cn } from '@/lib/utils';
import React, { FC, useState } from 'react';
import { Button } from './ui/button';
import { PulseLoader } from 'react-spinners';
import { cancelAtPeriodEnd } from '@/actions/stripe';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface SubscriptionProps {
    subscriptionId: string;
    cancel_at_period_end: boolean;
    current_period_end: number;
    nameOfPlan: string;
    price: number;
}
const Subscription:FC<SubscriptionProps> = ({
  subscriptionId, 
  cancel_at_period_end,
  current_period_end,
  nameOfPlan,
  price
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations("fe");

    const handleCancelSubscription = async () => {
        setIsLoading(true);
    
        try {
          const res = await cancelAtPeriodEnd({subscriptionId});
    
          if(res?.data?.success) {
            toast.success(t(`toast.success.${res.data.success}`));
          }
    
        } catch (error) {
          console.error("Erreur lors du démarrage du paiement :", error);
          toast.error(t("toast.errors.errorServerStripe"));
        } finally {
          setIsLoading(false);
        }
      };

    return (
      <div className={cn("w-full lg:flex lg:justify-between lg:items-center")}>
          <div className={cn("space-y-2")}>
              <h6 className='font-light'>Plan actuel</h6>
              <h3 className={cn("font-bold text-2xl")}>{nameOfPlan || "Pack Inconnu"}</h3>
              <p>
                {cancel_at_period_end 
                  ? "L'abonnement a été annulé et ne se renouvellera pas."
                  : current_period_end
                    ? `Le prochain paiement de ${price && (price / 100).toFixed(2)}€ sera le ${new Date(current_period_end * 1000).toLocaleDateString("fr-FR", { day: '2-digit', month: 'long', year: 'numeric' })}`
                    : "Date de renouvellement inconnue"
                  }
              </p>
          </div>
          <form action={handleCancelSubscription}>
              <Button
                  size="xl" 
                  variant="default"
                  disabled={isLoading || cancel_at_period_end}
                  type="submit"
                  className={cn("w-full font-medium")}
              >
                  {isLoading ? (
                      <PulseLoader size={7} color="white" />
                  ) : (
                      cancel_at_period_end ? "Abonnement annulé" : "Annuler l'abonnement"
                  )}
              </Button>
          </form>
      </div>
    );
};

export default Subscription;