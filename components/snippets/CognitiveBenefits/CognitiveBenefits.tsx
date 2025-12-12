import React from "react";
import styles from "./cognitive-benefits.module.css";
import ContainerSnippet from "../ContainerSnippet";

const CognitiveBenefits = () => {
  return (
    <ContainerSnippet>
      <div className={styles.wrapper}>
        <div className={styles.benefit}>
          <img
            src="https://res.cloudinary.com/ecomcodehub/image/upload/v1748596586/nuage_t14dnl.webp"
            alt="image representing the enhanced mental focus"
            className={styles.image}
          />
          <h6 className={styles.title}>Enhanced mental focus</h6>
        </div>

        <div className={styles.benefit}>
          <img
            src="https://res.cloudinary.com/ecomcodehub/image/upload/v1748596580/brain2_web_rh2u08.avif"
            alt="image representing productivity and lasting concentration"
            className={styles.image}
          />
          <h6 className={styles.title}>
            Productivity and lasting concentration
          </h6>
        </div>

        <div className={styles.benefit}>
          <img
            src="https://res.cloudinary.com/ecomcodehub/image/upload/v1748596581/brain3_web_b3bfuf.avif"
            alt="image representing brain health and memory"
            className={styles.image}
          />
          <h6 className={styles.title}>Brain health and memory</h6>
        </div>
      </div>
    </ContainerSnippet>
  );
};

export default CognitiveBenefits;
