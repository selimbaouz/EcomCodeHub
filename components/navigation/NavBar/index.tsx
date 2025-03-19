"use client"
import SideBar from "../SideBar";
import NavBarMobile from "./NavBarMobile";
import NavBarWeb from "./NavBarWeb";
import { Menu, UserType } from "@/types/types";
import { cn } from "@/lib/utils";
import Cart from "@/components/cart/Cart";
import { useEffect, useState } from "react";
import { fetchUserByEmail } from "@/actions/user";
import { useSession } from "next-auth/react";

interface NavBarProps {
    menu?: Menu[];
    isAccount?: boolean;
}
export default function NavBar(
    {
        menu,
        isAccount,
    }: NavBarProps) {
        const { data: session } = useSession();
        const [user, setUser] = useState<UserType>();
        const currentUser = session?.user;

        useEffect(() => {
            if (!currentUser?.email) return;
        
            const fetchUser = async () => {
              const data = await fetchUserByEmail({email: currentUser.email ?? ""});
              setUser(data?.data);
            };
        
            fetchUser();
          }, [currentUser?.email]);

    return (
        <nav className={cn("bg-background border-b dark:border-white/10 z-[100]")}>
            <NavBarMobile currentUser={currentUser} isAccount={isAccount} />
            <NavBarWeb menu={menu ?? []} currentUser={currentUser} user={user} isAccount={isAccount} />

            {/* Panier */}
            <Cart />
            {/* Liens */}
            <SideBar menu={menu ?? []} isAccount={isAccount} />
        </nav>
    );
};
