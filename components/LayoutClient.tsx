"use client";
import { FC } from "react";
import Favicon from "@/app/favicon.ico";
import FaviconInactive from "@/app/favicon-inactive.ico";
import { usePageVisibility } from "@/hook/usePageVisibility";

interface LayoutClientProps {
    children: React.ReactNode;
}

const LayoutClient: FC<LayoutClientProps> = ({children}) => {
    usePageVisibility({
        title: "Pourquoi tu es parti ? reviens ici !",
        onVisible: "WEMOM - La ceinture qui sécurise votre bébé",
        onHidden: () => "L'utilisateur a décidé que son bébé n'était pas une priorité !",
        favicon: Favicon.src,
        faviconInactive: FaviconInactive.src
    });
    return (
        <main>
            {children}
        </main>
    );
};

export default LayoutClient;