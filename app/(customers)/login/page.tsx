import LoaderSpinner from "@/components/loading/LoaderSpinner";

export default async function Login () {
  return (
    <LoaderSpinner>
        <div className="flex justify-center items-center h-[100dvh]">
            <form method="POST">
                <input type="email" name="email" required placeholder="Entrez votre email" />
                <button type="submit">Accéder</button>
            </form>
        </div>
    </LoaderSpinner>
  );
}
