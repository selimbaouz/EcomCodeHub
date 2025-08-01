"use client";
import { cn } from '@/lib/utils';
import { useSnippetsFiltered } from '@/store/snippetsFiltered';
import { SnippetsType } from '@/types/types';
import React, { FC, useEffect, useMemo } from 'react';

interface CategoryProps {
    categories: {
      id: string;
      title: string;
  }[];
}

const Category: FC<CategoryProps> = ({categories}) => {
    const { setCategory, category } = useSnippetsFiltered();

    const categoriesFiltered = useMemo(() => {
        const categoriesSet = new Set<string>(["Tout"]);
        categories.forEach(category => {
            if (category?.title) {
                categoriesSet.add(category.title);
            }
        });
        return Array.from(categoriesSet);
    }, [categories]);

    return (
        <div className="whitespace-nowrap flex items-center justify-start gap-2 2xl:justify-center pt-10 overflow-x-scroll scrollbar-hidden">
            {categoriesFiltered.map((title, i) => (
                <div 
                    key={i}
                    onClick={() => setCategory(title)}
                    className={cn("border rounded-full px-3 py-1 text-sm border-foreground/30 cursor-pointer hover:bg-foreground hover:text-background", 
                        category === title && "bg-foreground text-background"
                    )}>
                    {title}
                </div>
            ))}
        </div>
    );
};

export default Category;