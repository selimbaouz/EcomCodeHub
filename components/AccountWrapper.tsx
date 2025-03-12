"use client";
import { cn } from '@/lib/utils';
import { useOpenAccountStore } from '@/store/account';
import React, { FC } from 'react';

interface AccountWrapperProps {
    title: string;
    children: React.ReactNode;
    isAccountSettings?: boolean;
}
const AccountWrapper: FC<AccountWrapperProps> = ({
    title,
    children,
    isAccountSettings
}) => {
    const {isOpenAccount} = useOpenAccountStore();

        return (
            <div className={cn('space-y-2 px-6 min-h-[90dvh] h-full w-full', "lg:block", "xl:px-0 xl:py-14", isAccountSettings && !isOpenAccount && "hidden")}>   
                <h3 className={cn('text-2xl font-bold py-10 lg:py-0 lg:pb-14')}>{title}</h3>
                <div className='space-y-20 pb-14'>
                    {children}
                </div>
            </div>
        );
};

export default AccountWrapper;