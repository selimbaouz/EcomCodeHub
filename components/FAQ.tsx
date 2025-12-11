import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useTranslations } from "next-intl";

type FAQData = {
  title: string;
  content: string;
};
const FAQ = () => {
  const t = useTranslations("fe.productImage.faq");
  const faqData = t.raw("items");

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
            {t("title")}
          </h3>
          <p className="text-base font-medium lg:text-xl max-w-4xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full text-left space-y-2"
        >
          {faqData.map((data: FAQData, index: number) => (
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
                {data.title}
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "text-sm lg:text-base pb-4 font-normal whitespace-pre-line"
                )}
              >
                {data.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default FAQ;
