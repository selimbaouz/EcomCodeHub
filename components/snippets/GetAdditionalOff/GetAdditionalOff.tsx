import { cn } from '@/lib/utils';
import React from 'react';

const GetAdditionalOff = () => {
    return (
        <div className={cn("bg-[#F5EBE9] text-sm text-[#090909] flex gap-2 items-center justify-center mx-auto px-10 py-[2px] w-max")}>
            Bénéficiez de -15 % avec le code <strong>Spring</strong>
        </div>
    );
};

export default GetAdditionalOff;