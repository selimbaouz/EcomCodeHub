import GetRatings from '@/lib/fn';
import { cn } from '@/lib/utils';
import React from 'react';

const RatingSummary = () => {
    return (
        <div className={cn("flex items-center gap-2")}> 
            <p className={cn("font-medium text-xs text-foreground", "lg:text-sm")}>4.8/5</p>
            <GetRatings value={5} className={cn("text-sm sm:text-md text-primary", "md:text-lg", "xl:text-sm")} />
            <p className={cn("font-medium text-xs text-foreground", "lg:text-sm")}>
                Basé sur <strong>650 ecommercants</strong>
            </p>
        </div>
    );
};

export default RatingSummary;