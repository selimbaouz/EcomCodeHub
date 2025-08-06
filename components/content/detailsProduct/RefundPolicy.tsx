import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

const RefundPolicy = () => {
  const t = useTranslations('fe.content.refundPolicy');
  const items: string[] = t.raw('items');
  
  return (
    <ul className={cn('text-sm space-y-6 py-4')}>
      {items.map((item, index) => (
        <li
          key={index}
          // Rend les balises <strong> et <a> intégrées dans la traduction
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </ul>
  );
};

export default RefundPolicy;
