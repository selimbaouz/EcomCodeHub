"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Locale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

// Ajoute ces imports ou déclare-les si ce n'est pas déjà fait :
import { locales } from "@/i18n/request";

const LocaleSwitcher = ({
  locale,
}: {
  locale: Locale;
}) => {
  const t = useTranslations("fe");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select onValueChange={(value) => router.replace(pathname, { locale: value as Locale })} value={locale}>
      <SelectTrigger className="w-auto">
        <div className="font-medium uppercase">{locale}</div>
      </SelectTrigger>
      <SelectContent className="min-w-4">
        <SelectGroup>
          {locales.map((loc, index) => (
            <SelectItem key={index} value={loc}>
             {t(`localeNames.${loc}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcher;
