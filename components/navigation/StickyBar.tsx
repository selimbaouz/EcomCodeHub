"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const StickyBar = () => {
    const [index, setIndex] = useState(0);
    const t = useTranslations("fe");

    const stickyBarData = [
     {
        title: t('stickyBar.codeReady'),
      },
      {
        title: t('stickyBar.newMonthly'),
      },
      {
        title: t('stickyBar.proRender'),
      },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % stickyBarData.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-primary w-full h-10 text-white flex items-center justify-center font-medium relative overflow-hidden">
        {stickyBarData.map((item, i) => (
            <div
                key={i}
                className={`absolute gap-2 transition-opacity duration-500 font-bold ${
                    i === index ? "opacity-100" : "opacity-0"
                }`}
            >
            <span>{item.title}</span>
            </div>
        ))}
    </div>
    );
};

export default StickyBar;