import { cn } from '@/lib/utils';
import React from 'react';

const Delivery = () => {
    return (
        <>
            <p className={cn("text-sm space-y-6 py-4")}>
                <strong className='underline'>Achat unique : </strong>
                Une fois votre achat effectué, vous serez redirigé automatiquement vers une <strong>page Notion privée contenant tous les codes inclus dans le pack</strong>. Vous pourrez y accéder instantanément et <strong>commencer à personnaliser votre boutique Shopify</strong>.
            </p>
            <p>
                <strong className='underline'>Abonnement mensuel : </strong>
               <strong> À chaque mise à jour, vous recevrez un e-mail</strong> contenant un lien vers une nouvelle page Notion privée <strong>avec les derniers codes ajoutés</strong>. Cela garantit un accès continu aux nouveautés pour optimiser votre boutique au fil du temps.
            </p>
        </>
    );
};

export default Delivery;