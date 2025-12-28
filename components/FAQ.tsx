import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useTranslations } from "next-intl";
import { FAQData, FAQItem } from "@/types/product";

const FAQ = ({ data }: { data: FAQData }) => {
  const t = useTranslations("fe");
  const faqData = data.items;

  return (
    <div className="dark:bg-[#2c4049]">
      <section
        className={cn(
          "px-4 relative py-10 space-y-4 text-2xl font-bold text-left max-w-screen-md mx-auto",
          "lg:text-3xl lg:py-20 lg:px-0",
          "xl:text-4xl"
        )}
      >
        <div className={cn("space-y-6 pb-4 lg:pb-6 text-center")}>
          <h3 className="mx-auto xl:text-6xl uppercase max-w-screen-lg">
            {t(data.title as any)}
          </h3>
          <p className="text-base font-medium lg:text-xl max-w-4xl mx-auto">
            {t(data.subtitle as any)}
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full text-left space-y-2"
        >
          {faqData.map((item: FAQItem, index: number) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={cn(
                "bg-secondary/30 py-0.5 px-4 lg:py-1 lg:px-6 rounded-lg"
              )}
            >
              <AccordionTrigger
                className={cn(
                  "text-sm lg:text-base xl:text-lg font-semibold text-left text-foreground"
                )}
              >
                {t(item.title as any)}
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "text-sm lg:text-base pb-4 font-normal whitespace-pre-line"
                )}
              >
                {t(item.content as any)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default FAQ;
