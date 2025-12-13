import React, { useEffect, useState } from "react";

const FlashPromo = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateTimeLeft = () => {
      // Date cible : 31 décembre 2025 à 23:59:59 UTC
      const targetDate = new Date("2025-12-31T23:59:59Z").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return 0;
      }

      return Math.floor(difference / 1000); // Convertir en secondes
    };

    // Initialiser le compte à rebours
    setTimeLeft(calculateTimeLeft());

    // Mettre à jour chaque seconde
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft() as number;
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  const formatTime = (totalSeconds: number | null) => {
    if (totalSeconds === null) {
      return { days: "00", hrs: "00", mins: "00", secs: "00" };
    }

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days: String(days).padStart(2, "0"),
      hrs: String(hours).padStart(2, "0"),
      mins: String(minutes).padStart(2, "0"),
      secs: String(seconds).padStart(2, "0"),
    };
  };

  const { days, hrs, mins, secs } = formatTime(timeLeft);

  return (
    <div className="relative bg-gradient-to-r from-primary via-secondary to-primary bg-[length:300%_100%] animate-[gradientShift_3s_ease_infinite]">
      <div className="py-2 px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 justify-center items-center">
          {/* Texte FOMO */}
          <div className="flex items-center gap-1 lg:gap-2">
            <span className="text-yellow-300 font-bold text-xs lg:text-sm animate-pulse">
              ⚠️ LAST CHANCE
            </span>
            <h5 className="font-bold text-center text-white text-xs lg:text-base">
              FOR THE HOLIDAY OFFER
            </h5>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-[6px]">
            {/* Jours */}
            {parseInt(days) > 0 && (
              <>
                <div className="bg-background rounded-md px-2 py-0.5 min-w-[20px] lg:min-w-[45px] flex flex-col items-center justify-center">
                  <h6 className="text-sm lg:text-base font-extrabold text-primary leading-none m-0">
                    {days}
                  </h6>
                  <p className="text-[0.65rem] font-semibold text-primary/80 m-0 mt-0.5 uppercase tracking-wide">
                    days
                  </p>
                </div>
                <p className="text-white font-bold text-sm">:</p>
              </>
            )}

            {/* Heures */}
            <div className="bg-background rounded-md px-2 py-0.5 min-w-[20px] lg:min-w-[45px] flex flex-col items-center justify-center">
              <h6 className="text-sm lg:text-base font-extrabold text-primary leading-none m-0">
                {hrs}
              </h6>
              <p className="text-[0.65rem] font-semibold text-primary/80 m-0 mt-0.5 uppercase tracking-wide">
                hrs
              </p>
            </div>
            <p className="text-white font-bold text-sm">:</p>

            {/* Minutes */}
            <div className="bg-background rounded-md px-2 py-0.5 min-w-[20px] lg:min-w-[45px] flex flex-col items-center justify-center">
              <h6 className="text-sm lg:text-base font-extrabold text-primary leading-none m-0">
                {mins}
              </h6>
              <p className="text-[0.65rem] font-semibold text-primary/80 m-0 mt-0.5 uppercase tracking-wide">
                min
              </p>
            </div>
            <p className="text-white font-bold text-sm">:</p>

            {/* Secondes */}
            <div className="bg-background rounded-md px-2 py-0.5 min-w-[20px] lg:min-w-[45px] flex flex-col items-center justify-center">
              <h6 className="text-sm lg:text-base font-extrabold text-primary leading-none m-0">
                {secs}
              </h6>
              <p className="text-[0.65rem] font-semibold text-primary/80 m-0 mt-0.5 uppercase tracking-wide">
                sec
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashPromo;
