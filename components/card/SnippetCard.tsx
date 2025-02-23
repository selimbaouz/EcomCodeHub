"use client";
import { selectSnippetData } from '@/data';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Highlight, themes } from "prism-react-renderer";
import { FaLock } from 'react-icons/fa6';

interface SnippetCardProps {
    name: string;
    content: React.ReactNode;
    code: string;
    isPrivate: boolean;
}
const SnippetCard = ({
    name,
    content,
    code,
    isPrivate
}: SnippetCardProps) => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className={cn("bg-background relative flex flex-col gap-2 w-full border p-4 rounded-2xl shadow-md", "dark:border-[#324e58]")}>
            <div className="flex justify-between items-center">
                <h6 className="font-semibold">{name}</h6>
                <div className="flex gap-4">
                    {isPrivate ? (
                        <div className={cn("flex gap-4 items-center")}>
                            <p className='font-bold text-sm'>Débloquez ?</p>
                            <FaLock className='text-lg' />
                        </div>
                    ) : 
                    (selectSnippetData.map((data, index) => (
                        <button
                            key={index}
                            className={cn("text-sm font-bold cursor-pointer", selectedTab === index ? "text-blue-500" : "text-gray-500")}
                            onClick={() => setSelectedTab(index)}
                        >
                            {data.title}
                        </button>
                    )))}
                </div>
            </div>
            <div className="w-full min-h-[350px] flex justify-center items-center border rounded-lg p-4 dark:border-[#324e58]">
                {isPrivate ? content : (
                    selectedTab === 0 ? content : (
                        <Highlight theme={themes.nightOwl} code={code} language="tsx">
                            {({ style, tokens, getLineProps, getTokenProps }) => (
                                <pre className="p-4 bg-gray-900 text-white text-sm rounded-lg overflow-x-auto size-full" style={style}>
                                    {tokens.map((line, i) => (
                                        <div key={i} {...getLineProps({ line })}>
                                            {line.map((token, key) => (
                                                <span key={key} {...getTokenProps({ token })} />
                                            ))}
                                        </div>
                                    ))}
                                </pre>
                            )}
                        </Highlight>
                    )
                )}
            </div>
        </div>
    );
};

export default SnippetCard;