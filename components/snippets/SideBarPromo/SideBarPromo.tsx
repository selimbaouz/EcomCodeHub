"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import styles from './sidebar-promo.module.css';
import ContainerSnippet from '../ContainerSnippet';

const SideBarPromo = () => {
    const [timeLeft, setTimeLeft] = useState(39 * 60 + 25); // 39 minutes 25 secondes en secondes

    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <ContainerSnippet>
            <div className={cn(styles.container)}>
                <div className={cn(styles.content)}>
                    <div className={cn(styles.countdownText)}>
                        SEULEMENT {formatTime(timeLeft)} pour obtenir <strong>20% de réduction</strong><br />
                    </div>
                    <div className={cn(styles.codeSection)}>
                        Utiliser le code <strong>NEW20</strong>
                        <Link href="#" className={cn(styles.codeLink)}>
                            Acheter Maintenant
                            <MdOutlineArrowForwardIos className={cn(styles.icon)} />
                        </Link>
                    </div>
                </div>
            </div>
        </ContainerSnippet>
    );
};

export default SideBarPromo;