import { cn } from "@/lib/utils";
import { FC, MouseEventHandler } from "react";
import { IconType } from "react-icons";

interface SelectButtonProps {
    icon: IconType;
    title: string;
    classname: string;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const SelectButton: FC<SelectButtonProps> = ({
    icon: Icon,
    title,
    classname,
    onClick
}) => {
    return (
        <div 
            className={cn("p-3 w-[109px] text-center rounded-xl border", "md:w-full md:px-4", classname)}
            onClick={onClick}
        >
            <div className={cn("lg:flex  lg:items-center lg:gap-6")}>
                <div className={cn("hidden", "lg:size-12 lg:flex lg:justify-center lg:items-center lg:border lg:border-foreground/50 lg:bg-gradient-to-b lg:from-[#171923]/50 lg:to-[#111219]/50 lg:rounded-xl")}>
                    <Icon className={cn("text-2xl")} />
                </div>
                <h6 className={cn("uppercase text-xs font-bold", "md:hidden")}>
                    {title === "Automatique" ? "Auto" : title}
                </h6>
                <h6 className={cn("hidden", "md:block md:text-md md:uppercase md:font-medium")}>
                    {title}
                </h6>
            </div>
        </div>
    );
};

export default SelectButton;