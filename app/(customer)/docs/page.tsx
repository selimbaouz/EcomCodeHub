import { auth } from "@/auth";
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
          <div className="w-full max-w-screen-xl mx-auto">
              <Snippets />
          </div>
      </Suspense>
    );
};
