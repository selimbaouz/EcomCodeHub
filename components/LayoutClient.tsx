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
        title: "Pourquoi tu es parti ? Reviens booster ta boutique !",
        onVisible: "TailwindLiquid - Boostez votre boutique Shopify",
        onHidden: () => "L'utilisateur a laissé filer ses conversions Shopify !",
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