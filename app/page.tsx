import Header from "@/components/Header";
import StickyBar from "@/components/navigation/StickyBar";
import NavBar from "@/components/navigation/NavBar";
import { getMenu } from "@/data/shopify";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Home() {
  const menu = await getMenu("main-menu");
  /* const footerMenu = await getMenu("footer"); */

  redirect('/products/pack-pro-conversion-shopify')
  return (
    <div>
      <div className={cn("sticky top-0 w-full z-50", "lg:hidden")}>
        <StickyBar />
        <NavBar menu={menu} />
      </div>
      <Header menu={menu} />
    </div>
  );
}
