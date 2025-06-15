import { auth } from '@/auth';
import CreditsGratuits from '@/components/CreditsGratuits';
import Footer from '@/components/Footer';
import NavBar from '@/components/navigation/NavBar';
import { getUserByEmail } from '@/data/auth/user';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function CreditsGratuitsPage() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    
    if(!session?.user && !user?.stripeCustomerId && !user?.plan) {
        redirect("/auth/login");
    }

    return (
        <div>
            <div className="sticky top-0 w-full z-50">
                <NavBar menu={[]} isAccount />
            </div>            
            <CreditsGratuits />
            <Footer />
        </div>
    );
};
