"use client";
// components/BenefitsCarousel.jsx
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // adapte ce chemin selon ta config
import styles from "./benefits-carousel.module.css";
import { cn } from "@/lib/utils";
import { useSnippetEditStore } from "@/store/snippetEdit";

const defaultBenefits = {
  sectionTitle: "Benefits",
  snippets: [
    {
      title: "Sustained energy and satiation",
      text: "No more afternoon slumps. Plant-based protein helps you to feel full and satisfied. This protein blend packs a nourishing punch so you can take on anything today throws your way.",
      image:
        "https://res.cloudinary.com/tailwindliquid/image/upload/v1748782377/Prot%C3%A9ine_v%C3%A9g%C3%A9tale_Orga_Sigmatic_et_cacao_szradp.png",
    },
    {
      title: "Stress relief adaptogens",
      text: "Unwind and decompress with a carefully curated blend of powerful adaptogen extracts (1500 mg to be exact!) to help you de-stress.",
      image:
        "https://res.cloudinary.com/tailwindliquid/image/upload/v1748958399/ChatGPT_Image_29_mai_2025_18_21_37_uceupz.png",
    },
    {
      title: "Immune system & wellness",
      text: "Functional mushrooms help support mind and body wellness, but especially your immune system. Each scoop has a special blend of immune supporting filler grain-free chaga, cordyceps.",
      image:
        "https://res.cloudinary.com/tailwindliquid/image/upload/v1748958400/ChatGPT_Image_29_mai_2025_18_22_22_fzs2oz.png",
    },
  ]
}

export default function BenefitsCarousel({snippetId}: {snippetId: string}) {
  const [selected, setSelected] = useState(0);
  const { snippets, setSnippetData } = useSnippetEditStore();
  const benefits = snippets[snippetId] ?? defaultBenefits;

  useEffect(() => {
  if (!snippets[snippetId]) {
    setSnippetData(snippetId, defaultBenefits);
  }
}, [snippetId, snippets, setSnippetData]);

useEffect(() => {
  if (selected >= benefits.snippets.length) {
    setSelected(Math.max(0, benefits.snippets.length - 1));
  }
}, [benefits, selected]);

  return (
    <div className="flex flex-col justify-center p-4 mx-auto">
      {/* Mobile Carousel */}
      <div className="lg:hidden">
        <h6 className={styles.mobileTitle}>{benefits.sectionTitle}</h6>
        <Carousel
          opts={{ loop: true, align: "start" }}
          className={styles.carousel}
        >
          <CarouselContent className={styles.carouselContent}>
            {benefits.snippets.map(({ title, text, image }, idx) => (
              <CarouselItem key={idx} className={styles.carouselItem}>
                <div className={styles.slideContent}>
                  <div className={styles.slideInner}>
                    <img
                      src={image}
                      alt={title}
                      className={styles.image}
                      width={400}
                      height={447}
                    />
                    <div className={styles.slideText}>
                      <h6 className={styles.benefitTitle}>{title}</h6>
                      <p className={styles.benefitText}>{text}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className={styles.desktopGrid}>
        <div className={styles.tabList}>
          <h6 className={styles.desktopTitle}>{benefits.sectionTitle}</h6>
          <div className={styles.tabItemList}>
            {benefits.snippets.map(({ title }, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={cn(
                  styles.tabBtn,
                  selected === i && styles.tabBtnActive,
                )}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
        {benefits.snippets[selected] && (
          <>
            <img
              id="benefit-image"
              src={benefits.snippets[selected].image || ""}
              alt="benefit"
              className={styles.desktopImage}
              width={400}
              height={447}
            />
            <p id="benefit-text" className={styles.desktopText}>
              {benefits.snippets[selected].text}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
