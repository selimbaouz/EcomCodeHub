"use client";
import SideBar from "../SideBar";
import NavBarMobile from "./NavBarMobile";
import NavBarWeb from "./NavBarWeb";
import { cn } from "@/lib/utils";
import Cart from "@/components/cart/Cart";

export default function NavBar() {
  return (
    <nav className={cn("bg-background border-b dark:border-white/10 z-[100]")}>
      <NavBarMobile />
      <NavBarWeb />
      {/* Panier */}
      <Cart />
      {/* Liens */}
      <SideBar />
    </nav>
  );
}
