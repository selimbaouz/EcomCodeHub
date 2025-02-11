import NavBar from "@/components/navigation/NavBar";
import Snippets from "@/components/snippets";
import { Suspense } from "react";

export default async function CustomerAccount({params}: { params: { customerId: string } }) {
    console.log(params);
  return (
    <Suspense>
      <div className="sticky top-0 w-full z-50">
            <NavBar menu={[]} />
        </div>
        <div className="w-full max-w-screen-xl mx-auto">
            <Snippets />
        </div>
    </Suspense>
  );
}
