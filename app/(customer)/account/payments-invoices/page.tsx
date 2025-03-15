import { auth } from "@/auth";
import AccountSidebar from "@/components/AccountSidebar";
import Footer from "@/components/Footer";
import AccountWrapper from "@/components/AccountWrapper";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";
import { getUserByEmail } from "@/data/auth/user";
import { getMenu } from "@/data/shopify";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import OrdersList from "@/components/OrdersList";
import { getUserInvoices } from "@/actions/order";

export default async function PaymentsInvoices() {
    const footerMenu = await getMenu("footer");
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    const initialInvoices = await getUserInvoices(20);
    
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
                <AccountWrapper
                    title="Mes commandes"
                >
                    <div>
                        <OrdersList initialInvoices={initialInvoices} />
                    </div>
                </AccountWrapper>
            </div>
                <Footer footerMenu={footerMenu} className="hidden lg:block" />
            </div>
        </LoaderSpinner>
    );
};