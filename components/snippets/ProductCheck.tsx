import { checkProduct } from '@/data';
import { cn } from '@/lib/utils';
import React from 'react';

const ProductCheck = () => {
    return (
        <ul className={cn("flex flex-col py-2 gap-2 lg:py-4 lg:gap-4 max-w-xs")}>
            {checkProduct.map((data, index) => (
                <li key={index} className={cn("bg-secondary/30 flex w-max flex-wrap px-2 py-1 gap-2 items-center text-center dark:text-white dark:bg-[#324e58] rounded-lg")}>
                    <data.icon className={cn("text-lg text-foreground rounded-lg")} />
                    <p className={cn("text-[10px] text-foreground font-medium", "lg:text-sm")}>{data.title}</p>
                </li>
            ))}
        </ul>
    );
};

export default ProductCheck;