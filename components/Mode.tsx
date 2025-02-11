"use client";

import { productModeSelected, selectModesData } from "@/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Mode = () => {
    const [selected, setSelected] = useState(0);

    return (
        <section className={cn("px-4 bg-foreground dark:bg-[#2c4049] w-full relative py-10 space-y-6 text-center", "lg:py-20 lg:space-y-10 lg:px-0")}>
            <div className="space-y-3 pb-4">
                <div className={cn("flex items-center justify-center gap-4 max-w-screen-xl mx-auto", "lg:gap-10")}>
                    {selectModesData.map((data, index) => (
                        <h3 
                            key={index} 
                            onClick={() => setSelected(index)}
                            className={cn("transition-opacity cursor-pointer text-2xl lg:text-xl font-bold", "xl:text-6xl", selected === index ? "text-white" : "text-white/50")}
                        >{data.title}</h3>
                    ))}
                </div>
                    <p className="text-white text-base font-medium lg:text-xl max-w-4xl mx-auto">{selectModesData[selected].description}</p>
            </div>
            {productModeSelected(selected).content}
        </section>
    );
};

export default Mode;