import Footer from "@/components/Footer";
import NewVerificationForm from "@/components/forms/NewVerificationForm";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";
import { getMenu } from "@/data/shopify";

export default async function NewVerification() {
    const menu = await getMenu("main-menu");
    const footerMenu = await getMenu("footer");
    
    return (
      <LoaderSpinner>
        <div className="relative size-full">
          <div className="sticky top-0 w-full z-50">
            <NavBar menu={[]} isAccount />
          </div>
          <NewVerificationForm />
          <Footer footerMenu={footerMenu} />
        </div>
      </LoaderSpinner>
    );
};