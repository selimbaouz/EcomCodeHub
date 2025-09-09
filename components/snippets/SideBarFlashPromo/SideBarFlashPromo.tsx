"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import styles from './sidebar-flash-promo.module.css';
import ContainerSnippet from '../ContainerSnippet';

const SideBarFlashPromo = () => {
  const [timeLeft, setTimeLeft] = useState(4 * 3600 + 10 * 60 + 14); // 4h 10min 14s

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hrs: String(hours).padStart(2, '0'),
      mins: String(minutes).padStart(2, '0'),
      secs: String(seconds).padStart(2, '0'),
    };
  };

  const { hrs, mins, secs } = formatTime(timeLeft);

  return (
    <ContainerSnippet>
      <div className={cn(styles.animatedBackground)}>
        <div className="py-3 mx-auto lg:gap-2">
          <div className="flex gap-3 lg:gap-6 justify-center items-center">
            <h5 className="font-bold text-center text-white text-sm lg:text-lg">
              La vente flash se termine dans
            </h5>
            <div className="flex items-center justify-center gap-[4px]">
              <div className={cn(styles.timerBox)}>
                <h6 className={styles.timeText}>{hrs}</h6>
                <p className={styles.unitText}>hrs</p>
              </div>
              <p className="text-white font-bold">:</p>
              <div className={cn(styles.timerBox)}>
                <h6 className={styles.timeText}>{mins}</h6>
                <p className={styles.unitText}>min</p>
              </div>
              <p className="text-white font-bold">:</p>
              <div className={cn(styles.timerBox)}>
                <h6 className={styles.timeText}>{secs}</h6>
                <p className={styles.unitText}>sec</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerSnippet>
  );
};

export default SideBarFlashPromo;
