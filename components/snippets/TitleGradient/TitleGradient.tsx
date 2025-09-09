import React from 'react';
import styles from './title-gradient.module.css';
import ContainerSnippet from '../ContainerSnippet';

const TitleGradient = () => {
  return (
    <ContainerSnippet>
      <h3 className={styles.title}>
        Pack Pro Conversion Shopify
      </h3>
    </ContainerSnippet>
  );
};

export default TitleGradient;