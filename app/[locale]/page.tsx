import { auth } from "@/auth";
import { getUserByEmail } from "@/data/auth/user";
import { fetchCategoriesSnippets, fetchSnippets } from "@/actions/snippets";
import Home from "@/components/Home";

export default async function HomePage() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email ?? "");
    const snippets = await fetchSnippets();
    const categoriesSnippets = await fetchCategoriesSnippets();

    /* if(!session?.user && !user?.stripeCustomerId && !user?.plan) {
            redirect("/auth/login");
    } */
    
    return (
      <Home 
        session={session}
        user={user}
        snippets={snippets}
        categoriesSnippets={categoriesSnippets}
      />
    );
};
