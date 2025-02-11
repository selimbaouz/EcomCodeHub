import GetRatings from "@/lib/fn";
import { cn } from "@/lib/utils";
import { AiOutlineCheckCircle } from "react-icons/ai";

const ReviewCard = ({
    score,
    name,
    content,
  }: {
    score?: number;
    name: string;
    content: string;
  }) => {
    return (
            <div
                className={cn(
                    "bg-background relative size-full cursor-pointer overflow-hidden text-left rounded-lg shadow-md border dark:bg-[#2c4049]",
                )}
            >
                <div className="p-6 lg:p-8 space-y-4">
                    <div className={cn("space-y-1")}>
                        <div className="flex items-center gap-2">
                            <h6 className={cn("text-lg font-medium")}>
                                {name}
                            </h6>
                            <div className="flex items-center gap-1">
                                <AiOutlineCheckCircle className="text-primary text-xl" />
                                <p className={cn("text-xs text-primary", "xl:text-sm", "3xl:text-lg")}>Avis vérifié</p>
                            </div>
                        </div>
                        <GetRatings value={score ?? 0} className={cn("text-sm text-primary", "md:text-lg", "xl:text-base")} />
                    </div>
                    <p className={cn("text-sm font-normal", "lg:text-base")}>{content}</p>
                </div>
            </div>
    );
};

export default ReviewCard;