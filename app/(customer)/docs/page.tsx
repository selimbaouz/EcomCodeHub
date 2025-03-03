import { auth } from "@/auth";
import Footer from "@/components/Footer";
import NavBar from "@/components/navigation/NavBar";
import Snippets from "@/components/snippets";
import { getUserByEmail } from "@/data/auth/user";
import { fetchSnippets } from "@/data/snippets";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DocsPage() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    const snippets = await fetchSnippets();
    
    if(!session?.user && !user?.stripeCustomerId && !user?.plan) {
        redirect("/auth/login");
    }
    
    return (
        <Suspense>
        <div className="sticky top-0 w-full z-50">
              <NavBar menu={[]} />
          </div>
          <div className="px-4 w-full mx-auto bg-gray-100 dark:bg-[#324e58] h-full">
            <div className="max-w-screen-xl mx-auto">
                <h3 className="pt-10 font-bold">Installations</h3>
                <p className="text-sm"></p>
                <Snippets user={user} snippets={snippets} />
            </div>
          </div>
          <Footer footerMenu={[]} />
      </Suspense>
    );
};
