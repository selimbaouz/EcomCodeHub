"use client";

import { cn } from "@/lib/utils";
import SnippetCard from "../card/SnippetCard";
import { FC, useMemo } from "react";
import { SnippetsType, UserType } from "@/types/types";
import { useSnippetsFiltered } from "@/store/snippetsFiltered";
import { useTranslations } from "next-intl";

interface SnippetsProps {
    user: UserType;
    snippets: SnippetsType;
}
const Snippets: FC<SnippetsProps> = ({user, snippets}) => {
    const {searchQuery, category} = useSnippetsFiltered(); 
    const t = useTranslations("fe");
    const filteredSnippets = useMemo(() => {
        return snippets.filter(snippet => {
            const matchesCategory = category === t("snippets.database.categories.all") || t(`snippets.database.categories.${snippet.category?.title}`) === category;
            const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [snippets, searchQuery, category]);

    return (
        <div className={cn("w-full space-y-4 py-20", "lg:space-y-0")}>
            {filteredSnippets.length > 0 ? (
                <div className={cn("flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4")}>
                    {filteredSnippets.map((data, index) => (
                        <SnippetCard key={index} user={user} snippet={data} />
                    ))}
                </div>
            ) : ( category &&
                <div className="flex justify-center items-center w-full">{t("snippets.NoSnippetFound")}</div>
            )}
        </div>
    );
};

export default Snippets;