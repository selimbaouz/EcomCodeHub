import { cn } from "@/lib/utils";
import { FC } from "react";
import { IconType } from "react-icons";

interface TrustFeaturesProps {
    icon: IconType;
    title: string;
    content?: string;
}

const TrustFeatures: FC<TrustFeaturesProps> = ({
    icon: Icon,
    title,
    content,
}) => {
    return (
        <div className={cn("text-center bg-white/30 h-full border border-white backdrop-blur-lg shadow-md rounded-2xl p-4 w-full space-y-1 flex flex-col justify-center items-center", "xl:p-14")}>
            <div className={cn("bg-secondary rounded-full p-2 lg:p-4 mb-2 border-2 border-white")}>
                <Icon className={cn("size-8 text-white", "xl:size-10")} />
            </div>
            <h6 className={cn("font-medium text-white", "xl:text-xl")}>
                {title}
            </h6>
            <p className={cn("font-light text-white text-sm xs:px-10", "sm:px-0", "md:px-6", "lg:px-20", "xl:px-10")}>
                {content}
            </p>
        </div>
    );
};

export default TrustFeatures;