import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { faqData } from "@/data";

const FAQ = () => {
    return (
        <div className="dark:bg-[#2c4049]">
            <section className={cn(
                "px-4 relative py-10 space-y-4 text-2xl font-bold text-left max-w-screen-md mx-auto", 
                "lg:text-3xl lg:py-20 lg:px-0", 
                "xl:text-4xl"
            )}>
                <div className={cn("space-y-3 pb-4 text-center")}>
                    <h3 className="mx-auto xl:text-6xl">
                    Vos questions
                    </h3>
                    <p className="text-base font-medium lg:text-xl max-w-4xl mx-auto">Retrouvez ici les réponses aux questions les plus fréquentes pour vous accompagner dans l’utilisation de votre pack</p>
                </div>
                <Accordion type="single" collapsible className="w-full text-left">
                    {faqData.map((data, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className={cn("border-foreground/30 py-1")}>
                            <AccordionTrigger className={cn("text-sm lg:text-base")}>
                                {data.title}
                            </AccordionTrigger>
                            <AccordionContent className={cn("text-sm lg:text-base py-6 font-normal whitespace-pre-line")}>
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