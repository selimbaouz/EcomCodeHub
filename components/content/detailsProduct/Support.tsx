import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

const Support = () => {
  const t = useTranslations("fe.content.support");
  const items: string[] = t.raw("items");

  return (
    <ul className={cn("text-sm space-y-6 py-4")}>
      {items.map((item, index) => (
        <li
          key={index}
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
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
