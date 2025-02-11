import Marquee from "./ui/marquee";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { FC } from "react";

interface MarqueeStackProps {
  data: {
    icon: IconType;
    title: string;
}[];
  reverse?: boolean;
}
const MarqueeStack: FC<MarqueeStackProps> = ({
  data, 
  reverse
}) => {
    return (
        <div className={cn("absolute z-10 flex w-full flex-col items-center justify-center overflow-hidden")}>
          <Marquee pauseOnHover className="[--duration:30s]" reverse={reverse}>
            <div className={cn("flex items-center gap-10 px-3", "xl:gap-20 xl:px-8")}>
              {
                data.map((data, index) => (
                    <div key={index} className={cn("flex items-center gap-3")}>
                        <p className={cn("text-xl", "lg:text-5xl font-bold uppercase")}>
                            {data.title}
                        </p>
                    </div>
                ))
              }
            </div>
          </Marquee>
        </div>
    );
};

export default MarqueeStack;