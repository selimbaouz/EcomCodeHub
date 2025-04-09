import React from 'react';
import styles from './frequency-badge.module.css';

const FrequencyBadge = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>7k+ clients ont acheté au cours du dernier mois</div>
    </div>
  );
};

export default FrequencyBadge;
