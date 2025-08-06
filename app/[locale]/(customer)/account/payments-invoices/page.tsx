import { auth } from "@/auth";
import AccountSidebar from "@/components/AccountSidebar";
import Footer from "@/components/Footer";
import AccountWrapper from "@/components/AccountWrapper";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";
import { getUserByEmail } from "@/data/auth/user";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import OrdersList from "@/components/OrdersList";
import { getUserInvoices } from "@/actions/order";
import Subscription from "@/components/Subscription";
import { getSubscriptions } from "@/actions/stripe";

export default async function PaymentsInvoicesPage() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    const initialInvoices = await getUserInvoices({ limit: 20, subscriptionId: user?.subscriptionId ?? "" });
    const subscription = await getSubscriptions({subscriptionId: user?.subscriptionId ?? ""});
    const subscriptionItem = subscription && subscription.data?.items?.data[0];

    if(!session?.user && !user?.stripeCustomerId && !user?.plan) {
        redirect("/auth/login");
    }

    return (
         <LoaderSpinner>
            <div className="relative size-full">
                <div className="sticky top-0 w-full z-50">
                <NavBar isAccount />
                </div>
                <div className={cn("min-h-[92dvh]", "lg:max-w-[1400px] lg:mx-auto", "xl:flex xl:gap-24")}>
                <AccountSidebar />
                {user && subscriptionItem ? (
                    <div className="flex flex-col gap-20 w-full">
                        <div className={cn('px-6 w-full', "lg:block", "xl:px-0 xl:pt-14")}>   
                            <h3 className={cn('text-2xl font-bold py-10 lg:py-0 lg:pb-14')}>Mon abonnement</h3>
                            <div>
                                <Subscription 
                                    subscriptionId={user?.subscriptionId ?? ""} 
                                    cancel_at_period_end={subscription?.data?.cancel_at_period_end ?? false} 
                                    current_period_end={subscription?.data?.current_period_end ?? 0} 
                                    nameOfPlan={subscriptionItem?.plan?.nickname ?? ""} 
                                    price={subscriptionItem?.price?.unit_amount ?? 0} 
                                />
                            </div>
                        </div>
                        <div className={cn('space-y-2 px-6 h-full w-full', "lg:block", "xl:px-0 xl:pt-14")}>   
                            <h3 className={cn('text-2xl font-bold py-10 lg:py-0 lg:pb-14')}>Mes commandes</h3>
                            <div className='space-y-20 pb-14'>
                                <OrdersList initialInvoices={initialInvoices?.data ?? []} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <AccountWrapper
                    title="Mes commandes"
                >
                        <div>
                            <OrdersList initialInvoices={initialInvoices?.data ?? []} />
                        </div>
                    </AccountWrapper>
                )}
            </div>
                <Footer className="hidden lg:block" />
            </div>
        </LoaderSpinner>
    );
};