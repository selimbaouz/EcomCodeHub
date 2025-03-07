import Footer from "@/components/Footer";
import { ResetForm } from "@/components/forms/ResetForm";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";
import { getMenu } from "@/data/shopify";

export default async function Reset() {
    const menu = await getMenu("main-menu");
    const footerMenu = await getMenu("footer");
    
    return (
      <LoaderSpinner>
        <div className="relative size-full">
          <div className="sticky top-0 w-full z-50">
            <NavBar menu={[]} isAccount />
          </div>
          <ResetForm />
          <Footer footerMenu={footerMenu} />
        </div>
      </LoaderSpinner>
    );
};