import { redirect } from "next/navigation";

export default function RootPage({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  redirect(`/${locale}`);
}
