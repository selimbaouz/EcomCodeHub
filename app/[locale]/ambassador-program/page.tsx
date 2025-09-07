import { auth } from "@/auth";
import AmbassadorProgram from "@/components/AmbassadorProgram";

export default async function AmbassadorProgramPage () {
  const session = await auth();

  return (
    <AmbassadorProgram session={session} />
  );
}
