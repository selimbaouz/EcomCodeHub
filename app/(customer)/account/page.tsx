import AccountSidebar from "@/components/AccountSidebar";
import Footer from "@/components/Footer";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";
import { getMenu } from "@/data/shopify";
import { cn } from "@/lib/utils";

export default async function Account () {
  const footerMenu = await getMenu("footer");

  return (
    <LoaderSpinner>
      <div className="relative size-full">
        <div className="sticky top-0 w-full z-50">
          <NavBar isAccount />
        </div>
        <div className={cn("h-[92dvh]", "lg:max-w-[1400px] lg:mx-auto", "xl:flex xl:gap-24")}>
        <AccountSidebar />
        <div className={cn('hidden py-10 space-y-2 px-10 h-[90dvh] w-full', "xl:block xl:px-0 xl:py-14")}>
          
        </div>
      </div>
        <Footer footerMenu={footerMenu} />
      </div>
    </LoaderSpinner>
  );
}
