"use client"
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FooterData = {
    link: string;
    label: string;
}

interface FooterProps {
    className?: string;
}

const Footer = ({
    className
}: FooterProps) => {
    const classLink = "font-normal text-sm";
    const pathname = usePathname();
    const t = useTranslations("fe.footer");

    const legalLinksData = t.raw("legalLinks") as Array<{ link: string; label: string }>;

    return (
        <div className={className}>
            <footer className={cn('p-4 text-left py-10 text-white space-y-20 bg-[#1A2A32] dark:bg-background z-10 h-full', "lg:py-14 lg:px-0")}>
                <div className={cn("max-w-screen-xl mx-auto space-y-14", "lg:p-6")}>
                    {/* <Image src={Logo} alt="Logo of HelloPurly" width={250} height={36} /> */}
                    <div className={cn("flex flex-col space-y-10", "lg:flex-row lg:items-start lg:justify-between lg:space-y-0")}>
                        <div className={cn("space-y-4")}>
                            <h6 className={cn("lg:text-xl font-medium")}>{t("aboutTitle")}</h6>
                            <p className={cn(classLink, "max-w-xs leading-relaxed", "lg:max-w-sm")}>
                                {t.rich("aboutText", {
                                    strong: (chunks) => <strong>{chunks}</strong>
                                })}
                            </p>
                        </div>
                        <div className={cn("space-y-4")}>
                            <h6 className={cn("lg:text-xl font-medium")}>{t("legalPagesTitle")}</h6>
                            <ul className="leading-relaxed text-sm">
                                {legalLinksData.map((data: FooterData, i: number) => (
                                    <li key={i}>
                                        <Link href={data.link} className={cn(classLink, data.link === pathname && "font-bold")}>{data.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cn("space-y-4")}>
                            <h6 className={cn("lg:text-xl font-medium")}>{t("contactTitle")}</h6>
                            <div className="leading-relaxed space-y-2 text-sm">
                                <Link href="mailto:tailwindliquid@gmail.com" className={cn(classLink)}>tailwindliquid@gmail.com</Link>
                                <p>{t("contactHours")}</p>
                            </div>
                        </div>
                    </div>
                     <div className="flex flex-col justify-start items-start lg:justify-center lg:items-center mx-auto w-full pt-10">
                        <p className="text-xs lg:text-sm">
                            <Link 
                                href="https://selimmersive.com" target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-white/80 uppercase hover:text-white hover:underline font-bold">
                                    SLMRSV
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;