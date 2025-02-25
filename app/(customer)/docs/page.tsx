import { auth } from "@/auth";
import Footer from "@/components/Footer";
import NavBar from "@/components/navigation/NavBar";
import Snippets from "@/components/snippets";
import { getUserByEmail, getUserByUserName } from "@/data/auth/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DocsPage() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    
    if(!session?.user && !user?.stripeCustomerId && !user?.plan) {
        redirect("/auth/login");
    }
    
    return (
        <Suspense>
        <div className="sticky top-0 w-full z-50">
              <NavBar menu={[]} />
          </div>
          <div className="px-4 w-full mx-auto bg-gray-100 dark:bg-[#324e58] h-full">
              <Snippets />
          </div>
          <Footer footerMenu={[]} />
      </Suspense>
    );
};
