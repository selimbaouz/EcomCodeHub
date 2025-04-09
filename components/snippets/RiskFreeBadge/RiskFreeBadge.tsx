import React from 'react';
import styles from './risk-free-badge.module.css';

const RiskFreeBadge = () => {
  return (
    <div className={styles.box}>
      <span className={styles.text}>
        SANS RISQUE ! Satisfait ou remboursé
      </span>
    </div>
  );
};

export default RiskFreeBadge;
