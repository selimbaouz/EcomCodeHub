"use client";
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

const WhyTL = () => {
    const t = useTranslations("fe.content.whyTL");

    const items: string[] = t.raw("items");
    return (
        <ul className={cn("text-sm py-2 space-y-4")}>
            {items.map((item, index) => (
                <li
                key={index}
                // On utilise dangerouslySetInnerHTML parce que la chaîne contient du HTML <strong class='underline'>
                dangerouslySetInnerHTML={{ __html: item }}
                />
            ))}
        </ul>
    );
};

export default WhyTL;