"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { onPurchaseSnippetSchema } from "@/schemas";

export async function fetchSnippets() {
    return await db.snippet.findMany({
        include: {
            purchases: true,
            category: true,
        }
    });
}

export async function fetchCategoriesSnippets() {
    return await db.category.findMany();
}

export const onPurchaseSnippet = action
  .schema(onPurchaseSnippetSchema) 
  .action(async ({ parsedInput: { userId, creditPrice, snippetId } }) => {
    const session = await auth();
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!session?.user?.id || session?.user?.id !== user?.id) throw new Error("Utilisateur non authentifié.");

    if (!user || user.credits < creditPrice) {
        return { error: "Vous n'avez pas assez de crédit." };
    }

     // Vérifier si l'achat existe déjà
    const existingPurchase = await db.purchase.findFirst({
        where: { userId, snippetId },
    });

    if (existingPurchase) return; // L'utilisateur possède déjà le snippet

    await db.user.update({
        where: { id: userId },
        data: { credits: user.credits - creditPrice },
    });

    await db.purchase.create({
        data: { userId, snippetId },
    });

    return { success: "Bravo ! Vous avez débloquez un snippet" };
});