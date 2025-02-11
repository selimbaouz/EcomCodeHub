import { cn } from '@/lib/utils';
import React from 'react';

const HowItWorks = () => {
    return (
        <ul className={cn("text-sm space-y-6 py-4")}>
            <li>
                <strong className='underline'>1. Accédez à votre page Notion privée :</strong> Après votre achat, connectez-vous à la page Notion qui contient tous les codes inclus dans votre pack.
            </li>
            <li>
                <strong className='underline'>2. Choisissez le code adapté :</strong> Parcourez les sections pour trouver le code correspondant à la fonctionnalité que vous souhaitez ajouter à votre boutique Shopify.
            </li>
            <li>
                <ul>
                    <strong className='underline'>3. Ajoutez un bloc Custom Liquid dans votre thème Shopify :</strong>
                    <li>
                            Connectez-vous à votre tableau de bord Shopify.
                    </li>
                    <li>
                    Allez dans Personnaliser le thème.
                    </li>
                    <li>
                        Cliquez sur Ajouter une section, puis sélectionnez Custom Liquid.
                    </li>
                </ul>
            </li>
            <li>
                <strong className='underline'>4. Collez le code :</strong> Copiez le code depuis Notion et collez-le directement dans la section Custom Liquid de votre thème Shopify.
            </li>
            <li>
                <strong className='underline'>5. Enregistrez et visualisez :</strong> Cliquez sur Enregistrer, puis admirez instantanément les améliorations sur votre boutique en ligne.
            </li>
        </ul>
    );
};

export default HowItWorks;