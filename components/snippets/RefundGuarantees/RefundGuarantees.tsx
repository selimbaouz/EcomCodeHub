import ContainerSnippet from "../ContainerSnippet";
import styles from "./refund-guarantees.module.css";
import React from "react";

const RefundGuarantees = () => {
  return (
    <ContainerSnippet>
      <div className={styles.container}>
        <img
          src="https://res.cloudinary.com/ecomcodehub/image/upload/v1744045511/remboursement_garantie_hp46sq.png"
          alt="Img of moneyback"
          width={100}
          height={100}
        />
        <div className={styles.textContainer}>
          <h6 className={styles.title}>
            Remboursement Garantie Pendant 90 Jours
          </h6>
          <p className={styles.description}>
            Nous avons confiance en nos produits. Pas convaincu ? Renvoyez-le et
            nous vous rembourserons votre achat.
          </p>
        </div>
      </div>
    </ContainerSnippet>
  );
};

export default RefundGuarantees;
