"use client"
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import styles from './sidebar-time.module.css';

const SideBarTime = () => {
    const [timeLeft, setTimeLeft] = useState(3 * 3600 + 25 * 60 + 9); // 3h 25min 9s en secondes

    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}min ${secs.toString().padStart(2, '0')}s`;
    };

    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <h6 className={cn(styles.countdownText)}>
                    La vente se termine aujourd'hui !  <span className={cn("underline")}>{formatTime(timeLeft)}</span>
                </h6>
            </div>
        </div>
    );
};

export default SideBarTime;