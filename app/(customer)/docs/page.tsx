import { auth } from "@/auth";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import NavBar from "@/components/navigation/NavBar";
import SearchBar from "@/components/SearchBar";
import Snippets from "@/components/snippets";
import { getUserByEmail } from "@/data/auth/user";
import { fetchCategoriesSnippets, fetchSnippets } from "@/actions/snippets";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import DocsClient from "@/components/DocsClient";

export default async function DocsPage() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    const snippets = await fetchSnippets();
    const categoriesSnippets = await fetchCategoriesSnippets();
    
    if(!session?.user && !user?.stripeCustomerId && !user?.plan) {
        redirect("/auth/login");
    }
    
    return (
        <DocsClient>
            <div className="sticky top-0 w-full z-50">
              <NavBar menu={[]} isAccount />
            </div>
            <div className="px-4 w-full mx-auto bg-gray-100 dark:bg-[#324e58] h-full">
                <div className="max-w-screen-xl mx-auto w-full">
                    <div className={cn("pt-20 pb-10 flex flex-col justify-center items-center space-y-4")}>
                        <Link href="/installation" className="group flex gap-2 items-center font-medium">
                            Débuter avec l'installation
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform"/>
                        </Link>
                        <h3 className="text-6xl mx-auto text-center">Bonjour <span className="font-bold">{user?.name}</span></h3>
                        <p className="text-lg text-gray-500">{user?.credits && user?.credits > 0 ? `Il vous reste ${user?.credits} crédits` : "Vous n'avez plus de crédit" }</p>
                    </div>
                    <div className={cn("flex flex-col justify-center items-center space-y-4")}>
                        <SearchBar />
                        <div className="w-full relative lg:max-w-[600px] mx-auto">
                            <Category categories={categoriesSnippets} />
                        </div>
                    </div>
                    <Snippets user={user} snippets={snippets} />
                </div>
            </div>
            <Footer footerMenu={[]} />
        </DocsClient>
    );
};
