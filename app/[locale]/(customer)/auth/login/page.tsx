import { auth } from "@/auth";
import Footer from "@/components/Footer";
import { LoginForm } from "@/components/forms/LoginForm";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";

export default async function Login () {
  const session = await auth();

  return (
    <LoaderSpinner>
      <div className="relative size-full">
        <div className="sticky top-0 w-full z-50">
          <NavBar isAccount={session ? true : false} />
        </div>
        <LoginForm />
        <Footer />
      </div>
    </LoaderSpinner>
  );
}
