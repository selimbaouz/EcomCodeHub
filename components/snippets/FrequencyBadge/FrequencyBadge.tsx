import React from 'react';
import styles from './frequency-badge.module.css';
import ContainerSnippet from '../ContainerSnippet';

const FrequencyBadge = () => {
  return (
    <ContainerSnippet>
      <div className={styles.container}>
        <div className={styles.text}>7k+ clients ont acheté au cours du dernier mois</div>
      </div>
    </ContainerSnippet>
  );
};

export default FrequencyBadge;
