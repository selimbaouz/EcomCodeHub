import React from 'react';
import styles from './product-promo-secion.module.css';
import ContainerSnippet from '../ContainerSnippet';

const ProductPromoSection = () => {
  return (
    <ContainerSnippet>
      <div className={styles.section}>
        <img
          src="https://cdn.shopify.com/s/files/1/0970/6094/6252/files/3653ebd4-30ab-4440-b174-93da30c4ff1b.jpg?v=1755506366"
          alt="Image of product"
          className={styles.img}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>
            For your brand buy now !
          </h3>
          <p className={styles.desc}>
            This is a mini description for this product, this is a mini description for this product, this is a mini description for this product
          </p>
          <button className={styles.button}>
            Discover More
          </button>
        </div>
      </div>
    </ContainerSnippet>
  );
};

export default ProductPromoSection;
