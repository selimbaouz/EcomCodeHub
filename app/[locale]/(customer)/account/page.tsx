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
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import DeleteAccountForm from "@/components/forms/DeleteAccountForm";
import UpdateEmailForm from "@/components/forms/UpdateEmailForm";

export default async function Account () {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email ?? "");
  
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
          {/* <div className={cn('hidden py-10 space-y-2 px-10 h-[90dvh] w-full', "xl:block xl:px-0 xl:py-14")}>
            
          </div> */}
          <AccountWrapper 
            title="Paramètres du compte"
            isAccountSettings
          >
            <UpdateEmailForm currentUser={session?.user!} />
            <UpdatePasswordForm />
            <DeleteAccountForm />
          </AccountWrapper>
      </div>
        <Footer className="hidden lg:block" />
      </div>
    </LoaderSpinner>
  );
}
