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
import { getMenu } from "@/data/shopify";
import { Button } from "@/components/ui/button";

export default async function Home() {
    const menu = await getMenu("main-menu");
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    const snippets = await fetchSnippets();
    const categoriesSnippets = await fetchCategoriesSnippets();
    
    return (
        <div>
            <div className="sticky top-0 w-full z-50">
              <NavBar menu={menu ?? []} isAccount={session?.user ? true : false} />
            </div>
            <div className="px-4 w-full mx-auto bg-gray-100 dark:bg-[#324e58] h-full">
                <div className="max-w-screen-2xl mx-auto w-full">
                  {!session?.user ? (
                    <div className={cn("pt-20 pb-10 flex flex-col justify-center items-center space-y-6 lg:space-y-8")}>
                      <h1 className="text-4xl lg:text-7xl font-bold text-center max-w-7xl">
                        La bibliothèque ultime de snippets pour Shopify
                      </h1>
                      <p className="lg:text-xl text-center text-gray-700 max-w-3xl">
                        Découvrez une collection exclusive de snippets Tailwindcss conçus spécialement pour Shopify. Gagnez du temps en transformant votre boutique en un clin d'œil, copiez, collez et c'est en ligne.
                      </p>

                        <Button size="xl" className="text-base lg:text-lg px-6 py-4" asChild>
                          <Link href="/products/pack-pro-conversion-shopify">
                            Acheter un pack
                          </Link>
                        </Button>
                    </div>
                  ) : (
                    <div className={cn("pt-20 pb-10 flex flex-col justify-center items-center space-y-4")}>
                        <Link href="/installation" className="group flex gap-2 items-center font-medium">
                            Débuter avec l'installation
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform"/>
                        </Link>
                        <h3 className="text-6xl mx-auto text-center">Bonjour <span className="font-bold">{user?.name}</span></h3>
                        <p className="text-lg text-gray-500">{user?.credits && user?.credits > 0 ? `Il vous reste ${user?.credits} crédits` : "Vous n'avez plus de crédit" }</p>
                    </div>
                  )}
                    
                    <div className={cn("flex flex-col justify-center items-center pt-10")}>
                        <SearchBar />
                        <div className="w-full relative lg:max-w-[600px] mx-auto">
                            <Category categories={categoriesSnippets} />
                        </div>
                    </div>
                    <Snippets user={user} snippets={snippets} />
                </div>
            </div>
            <Footer />
        </div>
    );
};
