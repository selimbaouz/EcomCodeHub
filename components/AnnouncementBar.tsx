"use client";
import { cn } from '@/lib/utils';
import React from 'react';
import MarqueeStack from '@/components/MarqueeStack';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { MdOutlineDesignServices, MdOutlineSell } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { FaCheck, FaCopy } from 'react-icons/fa6';
import { BiRocket, BiTimeFive } from 'react-icons/bi';
import { useTranslations } from 'next-intl';

const AnnouncementBar = () => {
    const t = useTranslations("fe.productImage.announcement");

    const trustsDataGroup1 = [
    { icon: MdOutlineSell, title: t("trustsDataGroup1.increaseConversions") },
    { icon: FaCopy, title: t("trustsDataGroup1.easyCopyPaste") },
    { icon: BiTimeFive, title: t("trustsDataGroup1.saveTime") },
    { icon: BiRocket, title: t("trustsDataGroup1.fastPersonalization") },
    { icon: AiOutlineStar, title: t("trustsDataGroup1.instantResults") }
    ];

    const trustsDataGroup2 = [
    { icon: RiSecurePaymentLine, title: t("trustsDataGroup2.readyToUse") },
    { icon: MdOutlineDesignServices, title: t("trustsDataGroup2.proDesign") },
    { icon: AiOutlineStar, title: t("trustsDataGroup2.higherAttractiveness") },
    { icon: FaCheck, title: t("trustsDataGroup2.guaranteedSuccess") },
    { icon: MdOutlineSell, title: t("trustsDataGroup2.boostSales") }
    ];

    return (
        <>
            <div className={cn("relative bg-primary w-full h-14 text-white flex flex-col items-center justify-center font-medium", "lg:h-20")}>
                <MarqueeStack data={trustsDataGroup1} />
            </div>
            <div className={cn("relative bg-secondary w-full h-14 text-foreground dark:text-[#324e58] flex flex-col items-center justify-center font-medium", "lg:h-20")}>
                <MarqueeStack data={trustsDataGroup2} reverse />
            </div>
        </>
    );
};

export default AnnouncementBar;