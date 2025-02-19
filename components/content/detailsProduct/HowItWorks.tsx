import { cn } from '@/lib/utils';
import React from 'react';

const HowItWorks = () => {
    return (
        <ul className={cn("text-sm space-y-6 py-4")}>
            <li>
                <strong className='underline'>1. Choisissez votre pack :</strong> Sélectionnez un pack de crédits en fonction de vos besoins : Pack Débutant (20 crédits), Pack Avancé (60 crédits), ou Pack Pro (90 crédits.
            </li>
            <li>
                <strong className='underline'>2. Explorez les codes disponibles :</strong> Une fois vos crédits ajoutés, explorez les codes classés par niveau de complexité (1, 3 ou 5 crédits). Chaque code est conçu pour améliorer une fonctionnalité spécifique de votre boutique Shopify.
            </li>
            <li>
                <strong className='underline'>3. Débloquez un code :</strong> Selon le nombre de crédits dont vous disposez, vous pouvez débloquer des codes basiques (1 crédit), intermédiaires (3 crédits) ou avancés (5 crédits).
            </li>
            <li>
                <strong className='underline'>4. Ajoutez un code à votre boutique Shopify :</strong> 
                <ul>
                    <li>Connectez-vous à votre tableau de bord Shopify.</li>
                    <li>Allez dans "Personnaliser le thème".</li>
                    <li>Cliquez sur "Ajouter une section", puis sélectionnez "Custom Liquid".</li>
                </ul>
            </li>
            <li>
                <strong className='underline'>5. Collez le code :</strong> Copiez le code débloqué et collez-le directement dans la section "Custom Liquid" de votre thème Shopify.
            </li>
            <li>
                <strong className='underline'>6. Enregistrez et admirez :</strong> Cliquez sur "Enregistrer", puis voyez instantanément les changements appliqués sur votre boutique.
            </li>
        </ul>
    );
};

export default HowItWorks;
