import React from "react";
import styles from "./product-quick-facts.module.css";

const ProductQuickFacts = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto">
      <div className={styles.wrapper}>
        <div className={styles.fact}>
          <h6 className={styles.label}>tasting notes</h6>
          <p className={styles.value}>Light smooth flavor</p>
        </div>
        <div className={styles.fact}>
          <h6 className={styles.label}>Caffeine level</h6>
          <p className={styles.value}>Caffeine free</p>
        </div>
        <div className={styles.fact}>
          <h6 className={styles.label}>Usage</h6>
          <p className={styles.value}>
            Add 1 scoop to your coffee, tea or smoothie. Try in baked goods too!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickFacts;
