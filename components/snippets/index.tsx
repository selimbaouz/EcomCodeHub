"use client";

import { cn } from "@/lib/utils";
import SnippetCard from "../card/SnippetCard";
import { SnippetSelected } from "@/data";

const Snippets = () => {
    return (
        <div className={cn("space-y-4", "lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 py-20 lg:space-y-0 max-w-screen-xl mx-auto")}>
            {SnippetSelected().map((data, index) => (
                <SnippetCard
                    key={index}
                    name={data.title}
                    content={data.content}
                    code={data.code}
                    isPrivate={data.private}
                />
            ))}
        </div>
    );
};

export default Snippets;