"use client";
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

export const contentData = (selected: number) => {
    switch (selected) {
    case 0:
      return {
        title: "Titre pour Option 1",
        description: "Description associée à l'Option 1.",
      };
    case 1:
      return {
        title: "Titre pour Option 2",
        description: "Description associée à l'Option 2.",
      };
    case 2:
      return {
        title: "Titre pour Option 3",
        description: "Description associée à l'Option 3.",
      };
    case 3:
      return {
        title: "Titre pour Option 4",
        description: "Description associée à l'Option 4.",
      };
      case 4:
      return {
        title: "Titre pour Option 5",
        description: "Description associée à l'Option 5.",
      };
    default:
      return {
        title: "Titre pour Option 1",
        description: "Description associée à l'Option 1.",
      };
    }
  };
const SelectOptions = () => {
    const [select, setselect] = useState(0);
    return (
        <div>

        <div className="max-w-xs bg-[#259d93] text-white rounded-[20px] w-full relative lg:max-w-[600px] p-6 mx-auto">
            <div className="whitespace-nowrap flex items-center justify-start gap-2 mb-10 overflow-x-scroll scrollbar-hidden">
                {[
                    {
                        title: "Option 1"
                    },
                    {
                        title: "Option 2"
                    },
                    {
                        title: "Option 3"
                    },
                    {
                        title: "Option 4"
                    },
                    {
                        title: "Option 5"
                    },
                ].map((data, index) => (
                    <button
                    key={index}
                    className={cn("px-4 py-2 text-[14px] lg:text-[16px] font-bold", select === index && "font-bold text-foreground font-foreground border-b-2 border-foreground")}
                    data-id="1"
                    onClick={() => {
                        contentData(index);
                        setselect(index);
                    }}
                    >
                    {data.title}
                    </button>
                ))}
            </div>

            <div id="content" className="text-center space-y-6 lg:space-y-8">
                <h2 id="title" className="text-[20px] text-white lg:text-[20px] font-bold">{contentData(select).title}</h2>
                <p id="description" className="text-[14px] lg:text-[16px]">{contentData(select).description}</p>
            </div>
            </div>
        </div>
    );
};

export default SelectOptions;