import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

const PaymentSecurity = () => {
  const t = useTranslations("fe.content.paymentSecurity");
  const items: string[] = t.raw("items");

  return (
     <ul className={cn("text-sm space-y-6 py-4")}>
      {items.map((item, index) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  );
};

export default PaymentSecurity;
