import Footer from "@/components/Footer";
import { ResetForm } from "@/components/forms/ResetForm";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";

export default async function Reset() {
    /* const menu = await getMenu("main-menu"); */
    
    return (
      <LoaderSpinner>
        <div className="relative size-full">
          <div className="sticky top-0 w-full z-50">
            <NavBar menu={[]} isAccount />
          </div>
          <ResetForm />
          <Footer />
        </div>
      </LoaderSpinner>
    );
};