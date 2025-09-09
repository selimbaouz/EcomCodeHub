import React from 'react';
import styles from './risk-free-badge.module.css';
import ContainerSnippet from '../ContainerSnippet';

const RiskFreeBadge = () => {
  return (
    <ContainerSnippet>
      <div className={styles.box}>
        <span className={styles.text}>
          SANS RISQUE ! Satisfait ou remboursé
        </span>
      </div>
    </ContainerSnippet>
  );
};

export default RiskFreeBadge;
