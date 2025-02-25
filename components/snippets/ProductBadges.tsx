import { cn } from '@/lib/utils';
import React from 'react';

const ProductBadges = () => {
    return (
        <div className={cn("flex items-center gap-2")}>
            <div className={cn("text-xs text-white font-semibold bg-primary px-2 py-1 rounded-lg")}>
                Accès instantané
            </div>
            <div className={cn("text-xs text-background font-semibold bg-foreground px-2 py-1 rounded-lg")}>
                Top Achat 2025
            </div>
        </div>
    );
};

export default ProductBadges;