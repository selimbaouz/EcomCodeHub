"use client"
import { legalsLinksData } from "@/data";
import { cn } from "@/lib/utils";
/* import Logo from "@/public/images/logo.webp" */
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterProps {
    className?: string;
}
const Footer = ({
    className
}: FooterProps) => {
    const classLink = "font-normal text-sm";
    const pathname = usePathname();

    return (
        <div className={className}>
            <footer className={cn('p-4 text-left py-10 text-white space-y-20 bg-[#1A2A32] dark:bg-background z-10 h-full', "lg:py-14 lg:px-0")}>
                <div className={cn("max-w-screen-xl mx-auto space-y-14", "lg:p-6")}>
                    {/* <Image src={Logo} alt="Logo of HelloPurly" width={250} height={36} /> */}
                    <div className={cn("flex flex-col space-y-10", "lg:flex-row lg:items-start lg:justify-between lg:space-y-0")}>
                        <div className={cn("space-y-4")}>
                            <h6 className={cn("lg:text-xl font-medium")}>À propos</h6>
                            <p className={cn(classLink, "max-w-xs leading-relaxed", "lg:max-w-sm")}>
                                J{"'"}ai lancé <strong>TailwindLiquid</strong> pour offrir aux e-commerçants Shopify des outils puissants et accessibles pour transformer leurs boutiques en véritables moteurs de conversions.
                            </p>
                        </div>
                        <div className={cn("space-y-4")}>
                            <h6 className={cn("lg:text-xl font-medium")}>Pages Légales</h6>
                            <ul className="leading-relaxed text-sm">
                                {legalsLinksData.map((data, i) => (
                                    <li key={i}>
                                        <Link href={data.link} className={cn(classLink, data.link === pathname && "font-bold")}>{data.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cn("space-y-4")}>
                            <h6 className={cn("lg:text-xl font-medium")}>Contactez-nous</h6>
                            <div className="leading-relaxed space-y-2 text-sm">
                                <Link href="mailto:tailwindliquid@gmail.com" className={cn(classLink)}>tailwindliquid@gmail.com</Link>
                                <p>Du lundi au vendredi: 09h00 - 17h30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;