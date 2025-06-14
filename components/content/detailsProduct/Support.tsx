import { cn } from '@/lib/utils';
import React from 'react';

const Support = () => {
  return (
    <ul className={cn("text-sm space-y-6 py-4")}>
      <li>
        Je suis disponible pour vous accompagner à chaque étape, que ce soit pour un problème technique ou une question sur l'installation ou l'utilisation des codes.
      </li>
      <li>
        <strong className='underline'>Contactez-moi directement :</strong> Par Whatsapp ou par email : <a href="mailto:tailwindliquid@gmail.com" className="text-blue-500 underline">tailwindliquid@gmail.com</a>
      </li>
     {/*  <li>
        <strong className='underline'>Rejoignez notre communauté Discord :</strong>  
        Échangez avec d'autres utilisateurs, partagez vos expériences et trouvez des solutions ensemble. <br />
        <a href="https://discord.gg/tonlien" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Accéder au serveur Discord
        </a>
      </li> */}
    </ul>
  );
};

export default Support;
