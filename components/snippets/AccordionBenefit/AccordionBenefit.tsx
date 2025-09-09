import React, { useState } from 'react';
import styles from './accordion-benefit.module.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { GoHorizontalRule, GoPlus } from 'react-icons/go';
import ContainerSnippet from '../ContainerSnippet';

const AccordionBenefit = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    { 
      question: "Quel est le délai de livraison ?", 
      answer: "Le délai de livraison est généralement de 3 à 5 jours ouvrables en fonction de votre emplacement. Vous recevrez un e-mail avec les informations de suivi une fois que votre commande sera expédiée." 
    },
    { 
      question: "Comment retourner un produit ?", 
      answer: "Vous pouvez retourner un produit dans les 30 jours suivant l'achat. Le produit doit être dans son état d'origine, non utilisé, et avec l'emballage intact. Veuillez contacter notre service client pour initier le processus de retour." 
    },
    { 
      question: "Quels moyens de paiement acceptez-vous ?", 
      answer: "Nous acceptons les paiements par carte de crédit/débit (Visa, MasterCard, American Express), PayPal, et d'autres options de paiement locales disponibles selon votre région." 
    },
  ];
  

  return (
    <ContainerSnippet>
      <div className={styles.accordion}>
      {questions.map((item, index) => (
          <div className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`} key={index}>
          <div className={styles.accordionHeader} onClick={() => toggleItem(index)}>
              {item.question}
              <span className={styles.indicator}>{activeIndex === index ? <GoHorizontalRule className="text-lg" /> : <GoPlus className="text-xl" />}</span>
          </div>
          <div className={`${styles.accordionContent} ${activeIndex === index ? styles.show : ''}`} style={{paddingLeft: "0px", paddingRight: "0px"}}>
              <p>{item.answer}</p>
          </div>
          </div>
      ))}
      </div>
    </ContainerSnippet>
  );
};

export default AccordionBenefit;
