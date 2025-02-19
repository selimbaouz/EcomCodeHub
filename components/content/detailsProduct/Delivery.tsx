import { cn } from '@/lib/utils';
import React from 'react';

const Delivery = () => {
    return (
        <div className='space-y-6 py-4'>
            <p className={cn("text-sm")}>
                <strong className='underline'>Après votre achat :</strong>{" "}
                Une fois votre paiement validé par Stripe, vos crédits seront automatiquement ajoutés à votre compte en fonction du pack que vous avez choisi. Vous serez ensuite redirigé vers la page de connexion où vous devrez entrer l'adresse e-mail utilisée lors de votre paiement et confirmer votre e-mail pour pouvoir accéder à votre compte. 
            </p>
            <p>
                <strong className='underline'>Accès aux composants :</strong>{" "}
                Vous serez ensuite dirigé vers une page d'accueil où vous trouverez une liste de composants de code, classés par niveau (1, 3 et 5 crédits). Chaque composant sera accompagné d'un visuel interactif et du coût en crédits nécessaire pour le débloquer. Vous pourrez explorer les différents composants et, pour chaque code, vous aurez la possibilité de cliquer sur 'Voir le code'. Si vous confirmez votre choix, le coût en crédits sera immédiatement déduit de votre solde et, une fois pris, le code restera accessible de façon permanente.
            </p>
            <p>
                <strong className='underline'>Accès VIP pour abonnés :</strong>{" "}
                En tant qu'abonné, vous bénéficierez d'un accès exclusif à un groupe VIP. Ce groupe vous offrira la possibilité d'échanger avec d'autres utilisateurs, de partager des idées pour améliorer vos boutiques et de soumettre vos suggestions si vous recherchez des codes spécifiques non disponibles. De plus, chaque mois, de nouveaux codes seront ajoutés pour vous permettre de maintenir votre boutique à jour avec les dernières tendances et améliorations.
            </p>
        </div>
    );
};

export default Delivery;
