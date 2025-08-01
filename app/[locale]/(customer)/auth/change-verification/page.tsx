import { auth } from "@/auth";
import EmailChangeConfirmation from "@/components/email-verification/EmailChangeConfirmation";
import Footer from "@/components/Footer";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";

export default async function ChangeVerification() {
    const session = await auth();
    
    return (
      <LoaderSpinner>
        <div className="relative size-full">
          <div className="sticky top-0 w-full z-50">
            <NavBar isAccount={session ? true : false} />
          </div>
          <EmailChangeConfirmation />
          <Footer />
        </div>
      </LoaderSpinner>
    );
};
