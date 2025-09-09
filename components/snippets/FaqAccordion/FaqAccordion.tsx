// components/FaqAccordion.jsx
import { useState } from "react";
import styles from "./faq-accordion.module.css";
import ContainerSnippet from "../ContainerSnippet";

const faqs = [
  {
    question: "What should I blend this with?",
    answer:
      "We love a classic chocolate banana smoothie (milk, banana, Creamy Cacao Organic Protein, and maybe even a scoop of our Focus Organic Mushroom Blend).",
  },
  {
    question: "Can I bake with this protein powder?",
    answer:
      "Absolutely. We love adding it to brownies and chocolate chip cookies!",
  },
  {
    question: "Does this have whey in it?",
    answer: "No whey! Just our organic protein blend.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx: any) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <ContainerSnippet>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Frequently Asked</h3>
        <div className={styles.accordion}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={styles.item}
            >
              <button
                className={styles.header}
                onClick={() => handleToggle(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-content-${idx}`}
                type="button"
              >
                <span>{faq.question}</span>
                <span className={styles.indicator}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 294.1L96 134.1l-30.2 30.2 190.2 190.2 190.2-190.2-30.2-30.2z" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-content-${idx}`}
                className={`${styles.content} ${
                  openIndex === idx ? styles.contentOpen : ""
                }`}
              >
                <p className={styles.answer}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerSnippet>
  );
}
