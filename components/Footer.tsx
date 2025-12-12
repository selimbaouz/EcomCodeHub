"use client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SecureBadges from "./snippets/SecureBadges/SecureBadges";

type FooterData = {
  link: string;
  label: string;
};

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const classLink = "font-normal text-sm";
  const pathname = usePathname();
  const t = useTranslations("fe.footer");

  const legalLinksData = t.raw("legalLinks") as Array<{
    link: string;
    label: string;
  }>;

  return (
    <div className={className}>
      <footer
        className={cn(
          "p-4 text-left py-10 text-white space-y-20 bg-primary dark:bg-background z-10 h-full",
          "lg:py-14 lg:px-0"
        )}
      >
        <div className={cn("max-w-screen-xl mx-auto space-y-14", "lg:p-6")}>
          {/* <Image src={Logo} alt="Logo of HelloPurly" width={250} height={36} /> */}
          <div
            className={cn(
              "flex flex-col space-y-10",
              "lg:flex-row lg:items-start lg:justify-between lg:space-y-0"
            )}
          >
            <div className={cn("space-y-4")}>
              <h6 className={cn("lg:text-xl font-medium")}>
                {t("aboutTitle")}
              </h6>
              <p
                className={cn(
                  classLink,
                  "max-w-xs leading-relaxed",
                  "lg:max-w-sm"
                )}
              >
                {t.rich("aboutText", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
            <div className={cn("space-y-4")}>
              <h6 className={cn("lg:text-xl font-medium")}>
                {t("legalPagesTitle")}
              </h6>
              <ul className="leading-relaxed text-sm">
                {legalLinksData.map((data: FooterData, i: number) => (
                  <li key={i}>
                    <Link
                      href={data.link}
                      className={cn(
                        classLink,
                        data.link === pathname && "font-bold"
                      )}
                    >
                      {data.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn("space-y-4")}>
              <h6 className={cn("lg:text-xl font-medium")}>
                {t("contactTitle")}
              </h6>
              <div className="leading-relaxed text-sm flex flex-col gap-2 items-start">
                <div className="flex items-center gap-1">
                  <span>Contact me by</span>
                  <Link
                    href="mailto:slmrsv.bz@gmail.com"
                    target="_blank"
                    className={cn(classLink, "underline")}
                  >
                    Email
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <span>or on</span>
                  <Link
                    href="https://wa.me/0745473667"
                    target="_blank"
                    className={cn(classLink, "underline")}
                  >
                    WhatsApp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <SecureBadges />
          <p className={cn("text-center text-[13px]")}>
            © 2025, EcomCodeHub. All rights reserved.
          </p>
          <Link
            href="https://selimbaouz.com"
            target="_blank"
            className={cn("text-center text-[13px] hover:underline")}
          >
            Made with ❤️ by Selim Baouz
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
