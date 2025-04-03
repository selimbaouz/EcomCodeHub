import { getSubscriptions } from '@/actions/stripe';
import { auth } from '@/auth';
import NavBar from '@/components/navigation/NavBar';
import Plans from '@/components/Plans';
import { getUserByEmail } from '@/data/auth/user';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function PlansPage () {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");

    if(!session?.user && !user?.stripeCustomerId && !user?.plan) {
        redirect("/auth/login");
    }
    
    const sub = await getSubscriptions({subscriptionId: user?.subscriptionId ?? ""});

    return (
      <div>
        <div className="sticky top-0 w-full z-50">
            <NavBar menu={[]} isAccount />
        </div>
        <div className="px-4 w-full py-20 mx-auto bg-gray-100 dark:bg-[#324e58] h-full">
            <div className="max-w-screen-xl mx-auto w-full">
                <Plans 
                    nameOfPlan={sub?.data?.items.data[0].plan.nickname ?? ""}
                />
            </div>
        </div>
      </div>
    );
  }
  