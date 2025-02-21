import Footer from "@/components/Footer";
import { LoginForm } from "@/components/forms/login-form";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";
import { getMenu } from "@/data/shopify";
import { cn } from "@/lib/utils";

export default async function Login () {
  const menu = await getMenu("main-menu");
  const footerMenu = await getMenu("footer");

  return (
    <LoaderSpinner>
      <div className="relative size-full">
        <div className="sticky top-0 w-full z-50">
          <NavBar menu={[]} />
        </div>
        <LoginForm />
        <Footer footerMenu={footerMenu} />
      </div>
    </LoaderSpinner>
  );
}
