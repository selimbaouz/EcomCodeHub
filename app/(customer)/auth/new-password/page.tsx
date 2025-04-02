import Footer from "@/components/Footer";
import NewPasswordForm from "@/components/forms/NewPasswordForm";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";

export default async function NewVerification() {
    /* const menu = await getMenu("main-menu"); */
    
    return (
      <LoaderSpinner>
        <div className="relative size-full">
          <div className="sticky top-0 w-full z-50">
            <NavBar menu={[]} isAccount />
          </div>
          <NewPasswordForm />
          <Footer />
        </div>
      </LoaderSpinner>
    );
};