import React from 'react';
import styles from './product-title.module.css';
import ContainerSnippet from '../ContainerSnippet';

const ProductTitle = () => {
  return (
    <ContainerSnippet>
      <h3 className={styles.title}>
        Pack Pro Conversion Shopify
      </h3>
    </ContainerSnippet>
  );
};

export default ProductTitle;