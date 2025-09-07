"use client";

import { cn } from "@/lib/utils";
import SnippetCard from "../card/SnippetCard";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SnippetsType, UserType } from "@/types/types";
import { useSnippetsFiltered } from "@/store/snippetsFiltered";
import { useTranslations } from "next-intl";
import { PulseLoader } from "react-spinners";
import { useLoadingMoreStore } from "@/store/loadingMoreSnippet";

interface SnippetsProps {
    user: UserType;
    snippets: SnippetsType;
}

const PAGE_SIZE = 25;

const Snippets: FC<SnippetsProps> = ({user, snippets}) => {
    const loaderRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(1);
    const [displayedSnippets, setDisplayedSnippets] = useState<SnippetsType>([]);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const { loadingMore, setLoadingMore } = useLoadingMoreStore();
    const {searchQuery, category} = useSnippetsFiltered(); 
    const t = useTranslations("fe");
    
    const filteredSnippets = useMemo(() => {
        return snippets.filter(snippet => {
            const matchesCategory = category === t("snippets.database.categories.all") || t(`snippets.database.categories.${snippet.category?.title}`) === category;
            const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [snippets, searchQuery, category]);

    // Charger snippets sur changement de filtre ou reset
    useEffect(() => {
        setIsLoadingInitial(true);
        const timer = setTimeout(() => {
            setDisplayedSnippets(filteredSnippets.slice(0, PAGE_SIZE));
            setPage(1);
            setIsLoadingInitial(false);
        }, 500); // petit délai pour simuler chargement
        return () => clearTimeout(timer);
    }, [filteredSnippets]);

    // Callback pour charger plus de snippets
    const loadMore = useCallback(() => {
        if (loadingMore) return;

        setLoadingMore(true);

        // Simule un fetch/chargement asynchrone
        setTimeout(() => {
        const nextPage = page + 1;
        const newSnippets = filteredSnippets.slice(0, nextPage * PAGE_SIZE);
        setDisplayedSnippets(newSnippets);
        setPage(nextPage);
        setLoadingMore(false);
        }, 800);
    }, [page, filteredSnippets, loadingMore]);

    // Intersection Observer pour détecter quand loader est visible
    useEffect(() => {
        if (!loaderRef.current) return;
        const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && displayedSnippets.length < filteredSnippets.length) {
            loadMore();
            }
        },
        { rootMargin: "200px" }
        );
        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loadMore, displayedSnippets.length, filteredSnippets.length]);
    
    return (
        <div className={cn("w-full space-y-4 py-20", "lg:space-y-0")}>
            {isLoadingInitial ? (
            // Loader principal (hydratation / 1er rendu)
            <div className="flex justify-center items-center w-full h-40">
                <PulseLoader size={7} />
            </div>
            ) : displayedSnippets.length > 0 ? (
            <div
                className={cn(
                "flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4"
                )}
            >
                {displayedSnippets.map((data, index) => (
                <SnippetCard key={index} user={user} snippet={data} />
                ))}
            </div>
            ) : (
            category && (
                <div className="flex justify-center items-center w-full">
                {t("snippets.NoSnippetFound")}
                </div>
            )
            )}

            {/* Loader infini, uniquement si on charge PLUS de snippets */}
            {!isLoadingInitial && (
            <div
                ref={loaderRef}
                className="w-full py-20 flex items-center justify-center col-span-full"
            >
                {loadingMore && <PulseLoader size={7} />}
            </div>
            )}
        </div>
    );
};

export default Snippets;