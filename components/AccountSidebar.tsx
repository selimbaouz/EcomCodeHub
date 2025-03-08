"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { Button } from './ui/button';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { IoIosArrowForward } from 'react-icons/io';
import { useCurrentUser } from "@/hook/use-current-user";

const AccountSidebar = () => {
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const categoriesWeb = [
    { title: "Informations personnelles", link: "" },
    { title: "Connexion et sécurité", link: "" },
    { title: "Paiements et factures", link: "" },
    { title: "Notifications", link: "" },
  ];

  const categoriesMobile = [
    { title: "Acheter des crédits", link: "" },
    { title: "Passer au plan supérieur", link: "" },
    { title: "Parrainage", link: "" },
  ];

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/auth/login" });
    setIsLoading(false);
  };

  return (
    <div className={cn("px-6 w-full border-r", "lg:max-w-sm lg:block", 'xl:py-14', !pathname?.endsWith("/account") && "hidden")}>
      <h3 className={cn('text-2xl font-bold py-10 lg:py-0 lg:pb-14')}>Paramètres</h3>
      <div className="space-y-4 py-4">
        {categoriesWeb.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={cn("flex items-center justify-between font-medium w-full text-foreground hover:font-semibold py-2",
              pathname === item.link ? " font-semibold" : "font-medium"
                
            )}
          >
            <p>{item.title}</p>
            <IoIosArrowForward className={cn('text-base', 'lg:hidden')} />
          </Link>
        ))}
        {categoriesMobile.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={cn("flex items-center justify-between font-medium w-full text-foreground hover:font-semibold py-2",
                "lg:hidden",
                pathname === item.link ? " font-semibold" : "font-medium"
                  
              )}
            >
              <p>{item.title}</p>
              <IoIosArrowForward className={cn('text-base', 'lg:hidden')} />
            </Link>
          ))}
      </div>
      <div className="space-y-0">
        {/* <Button size="xl" variant="outline" className={cn("w-full font-medium mt-10 mb-4", "lg:text-base")}>Supprimer son compte</Button> */}
        <Button
          size="xl" 
          onClick={handleSignOut} 
          disabled={isLoading}
          className={cn("w-full font-medium mt-10 mb-4", "lg:hidden")}
        >
          {isLoading ? (
            <PulseLoader
              size={7}
              color="white"
            />) : (
            "Déconnexion"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AccountSidebar;