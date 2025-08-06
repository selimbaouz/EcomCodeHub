import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

const HowItWorks = () => {
    const t = useTranslations("fe.content.howItWorks");
    
    const items: (string | string[])[] = t.raw("items");

    return (
        <ul className={cn("text-sm space-y-6 py-4")}>
            {items.map((item, index) => {
                if (Array.isArray(item)) {
                    // Si c'est un tableau, afficher en sous-liste
                    return (
                        <ul
                            key={index}
                            className={cn("list-disc ml-5 mt-2 space-y-1")}
                            aria-label="sublist"
                            >
                            {item.map((subItem, subIndex) => (
                                <li key={subIndex}>{subItem}</li>
                            ))}
                        </ul>
                    );
                } else {
                // Sinon, afficher la chaîne avec rendu HTML (pour <strong> etc.)
                return (
                    <li
                        key={index}
                        dangerouslySetInnerHTML={{ __html: item }}
                    />
                );
                }
            })}
        </ul>
    );
};

export default HowItWorks;
