import React from 'react';
import styles from './google-review-badge.module.css';
import ContainerSnippet from '../ContainerSnippet';

const GoogleReviewBadge = () => {
  return (
    <ContainerSnippet>
      <div className={styles.container}>
        <div className={styles.texte}>"Incroyable"</div>
        <img
          className={styles.image}
          src="https://cdn.shopify.com/s/files/1/0798/4267/2987/files/Revive_39.png?v=1733346031"
          alt="Visuel d'avis"
        />
        <div className={styles.rating}>Noté 4.4/5 sur</div>
        <img
          className={styles.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png"
          alt="Logo Google"
        />
      </div>
    </ContainerSnippet>
  );
};

export default GoogleReviewBadge;
