import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const Description = () => {
  const t = useTranslations("fe.content"); // utilise le namespace adapté

  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <p
          key={i}
          className={cn("text-sm space-y-6 py-4")}
        >
          {t.rich(`description.paragraph${i}`, {
            strong: (chunks) => <strong>{chunks}</strong>
          })}
        </p>
      ))}
    </>
  );
};

export default Description;
