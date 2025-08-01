import React from 'react';
import { auth } from "@/auth";
import { getUserByEmail } from "@/data/auth/user";
import { redirect } from "next/navigation";
import NavBar from '@/components/navigation/NavBar';
import Footer from '@/components/Footer';
import Installation from '@/components/Installation';

export default async function InstallationPage() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    
    if(!session?.user && !user?.stripeCustomerId && !user?.plan) {
        redirect("/auth/login");
    }

    return (
        <div>
            <div className="sticky top-0 w-full z-50">
                <NavBar isAccount />
            </div>
            <Installation />
            <Footer />
        </div>
    );
};
