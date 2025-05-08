"use client";
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

const FlashPromo = () => {
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
    <div className="animatedBackground">
      <div className="py-3 mx-auto lg:gap-2">
        <div className="flex gap-3 lg:gap-6 justify-center items-center">
          <h5 className="font-bold text-left text-white text-sm lg:text-lg">
          -30% avec le code TW30: <br className='md:hidden'/>La vente flash se termine dans
          </h5>
          <div className="flex items-center justify-center gap-[4px]">
            <div className="bg-white p-1 rounded-sm lg:p-2 flex flex-col justify-center items-center -space-y-1">
              <h6 className="font-bold text-sm">{hrs}</h6>
              <p className="uppercase text-[8px] lg:text-[10px] font-bold">hrs</p>
            </div>
            <p className="text-white font-bold">:</p>
            <div className="bg-white p-1 rounded-sm lg:p-2 flex flex-col justify-center items-center -space-y-1">
              <h6 className="font-bold text-sm">{mins}</h6>
              <p className="uppercase text-[8px] lg:text-[10px] font-bold">min</p>
            </div>
            <p className="text-white font-bold">:</p>
            <div className="bg-white p-1 rounded-sm lg:p-2 flex flex-col justify-center items-center -space-y-1">
              <h6 className="font-bold text-sm">{secs}</h6>
              <p className="uppercase text-[8px] lg:text-[10px] font-bold">sec</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashPromo;
