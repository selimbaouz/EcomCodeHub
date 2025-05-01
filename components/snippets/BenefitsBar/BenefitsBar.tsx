import { cn } from '@/lib/utils';
import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { TbTruckReturn } from 'react-icons/tb';

const BenefitsBar = () => {
    return (
        <div className={cn("bg-[#F5EBE9] flex justify-between items-center mx-auto w-max gap-4 py-[2px] px-4")}>
            <div className={cn("flex items-center gap-1")}>
                <CiDeliveryTruck />
                <p className={cn("text-xs text-[#090909]")}>
                    Livraison gratuite en France
                </p>
            </div>
            <div className={cn("flex items-center gap-1")}>
                <TbTruckReturn />
                <p className={cn("text-xs text-[#090909]")}>
                    Garantie 30 jours
                </p>
            </div>
        </div>
    );
};

export default BenefitsBar;