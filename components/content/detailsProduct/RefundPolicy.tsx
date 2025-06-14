import { cn } from '@/lib/utils';
import React from 'react';

const RefundPolicy = () => {
  return (
    <ul className={cn("text-sm space-y-6 py-4")}>
      <li>
        <strong className='underline'>Puis-je être remboursé ?</strong> Oui, un remboursement est possible <strong>uniquement si aucun crédit n’a été utilisé</strong>. Dès qu’un snippet est débloqué, l’achat est considéré comme consommé.
      </li>
      <li>
        <strong className='underline'>Comment demander un remboursement ?</strong> Il suffit de me contacter par email avec l’adresse utilisée pour l’achat : <a href="mailto:tailwindliquid@gmail.com" className="text-foreground underline">tailwindliquid@gmail.com</a>
      </li>
      <li>
        <strong className='underline'>Support à l'écoute :</strong> Avant tout remboursement, je suis là pour vous aider à résoudre votre problème technique. Mon objectif : que vous soyez satisfait.
      </li>
    </ul>
  );
};

export default RefundPolicy;
