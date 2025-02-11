"use client";

import { useEffect } from "react";

type UsePageVisibilityProps = {
    title: string;
    onVisible: string;
    onHidden?: () => void;
    favicon: string;
    faviconInactive: string;
};

export const usePageVisibility = ({
    title,
    onVisible,
    onHidden,
    favicon,
    faviconInactive,
}: UsePageVisibilityProps) => {
    useEffect(() => {
        const handleVisibilityChange = () => {
            const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");

            if (document.hidden) {
                document.title = title;
                if (onHidden) onHidden();
                if (link) link.href = faviconInactive; // Changez le favicon lorsque la page est cachée
            } else {
                document.title = onVisible;
                if (link) link.href = favicon; // Restaurez le favicon lorsque la page est visible
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Nettoyer l'écouteur d'événements à la désinstallation
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [title, onVisible, onHidden, favicon, faviconInactive]);
};