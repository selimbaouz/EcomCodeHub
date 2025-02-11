import { cn } from '@/lib/utils';
import React from 'react';

const WhyTL = () => {
    return (
        <ul className={cn("text-sm py-2 space-y-4")}>
            <li>
                <strong className='underline'>Facile à utiliser :</strong> Aucun besoin de compétences techniques ;), copiez, collez, et c’est prêt !
            </li>
            <li>
                <strong className='underline'>Économique :</strong> Une alternative abordable aux thèmes Shopify coûteux (jusqu’à 350 €).
            </li>
            <li>
                <strong className='underline'>Optimisé pour le SEO :</strong> Des codes légers et performants pour améliorer la visibilité de votre boutique.
            </li>
            <li>
                <strong className='underline'>Compatible avec tous les thèmes Shopify :</strong> Fonctionne parfaitement, quel que soit votre design actuel.
            </li>
        </ul>
    );
};

export default WhyTL;