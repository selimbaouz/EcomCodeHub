import Footer from "@/components/Footer";
import { CodeForm } from "@/components/forms/CodeForm";
import LoaderSpinner from "@/components/loading/LoaderSpinner";
import NavBar from "@/components/navigation/NavBar";

export default async function Code () {

  return (
    <LoaderSpinner>
      <div className="relative size-full">
        <div className="sticky top-0 w-full z-50">
          <NavBar menu={[]} isAccount />
        </div>
        <CodeForm />
        <Footer />
      </div>
    </LoaderSpinner>
  );
}
