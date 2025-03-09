"use client";
import { cn } from '@/lib/utils';
import { useOpenAccountStore } from '@/store/account';
import React from 'react';

const AccountForm = () => {
    const {isOpenAccount} = useOpenAccountStore();

        return (
            <div className={cn('space-y-2 px-6 h-[90dvh] w-full', "lg:block", "xl:px-0 xl:py-14", !isOpenAccount && "hidden")}>   
                <h3 className={cn('text-2xl font-bold py-10 lg:py-0 lg:pb-14')}>Paramètres du compte</h3>
                
            </div>
        );
};

export default AccountForm;