"use client"
import SideBar from "../SideBar";
import NavBarMobile from "./NavBarMobile";
import NavBarWeb from "./NavBarWeb";
import { cn } from "@/lib/utils";
import Cart from "@/components/cart/Cart";

interface NavBarProps {
    isAccount?: boolean;
}
export default function NavBar(
    {
        isAccount,
    }: NavBarProps) {

    return (
        <nav className={cn("bg-background border-b dark:border-white/10 z-[100]")}>
            <NavBarMobile isAccount={isAccount} />
            <NavBarWeb isAccount={isAccount} />

            {/* Panier */}
            <Cart />
            {/* Liens */}
            <SideBar isAccount={isAccount} />
        </nav>
    );
};
