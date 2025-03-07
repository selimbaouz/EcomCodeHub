"use client";

import { cn } from "@/lib/utils";
import SnippetCard from "../card/SnippetCard";
import { FC } from "react";
import { SnippetsType, UserType } from "@/types/types";

interface SnippetsProps {
    user: UserType;
    snippets: SnippetsType;
}
const Snippets: FC<SnippetsProps> = ({user, snippets}) => {
    return (
        <div className={cn("space-y-4", "lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 py-20 lg:space-y-0")}>
            {snippets.map((data, index) => (
                <SnippetCard
                    key={index}
                    user={user}
                    snippet={data}
                />
            ))}
        </div>
    );
};

export default Snippets;