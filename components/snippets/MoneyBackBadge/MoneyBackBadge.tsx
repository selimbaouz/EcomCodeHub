import React from 'react';
import styles from './money-back-badge.module.css';

const MoneyBackBadge = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dot}><span style={{ visibility: 'hidden' }}>.</span></div>
      <div className={styles.text}>Garantie satisfait ou remboursé pendant 30 jours.</div>
    </div>
  );
};

export default MoneyBackBadge;
