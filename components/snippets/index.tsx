"use client";

import { cn } from "@/lib/utils";
import SnippetCard from "../card/SnippetCard";
import { SnippetSelected } from "@/data";

const Snippets = () => {
    return (
        <div className={cn("grid grid-cols-2 gap-10 py-20")}>
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