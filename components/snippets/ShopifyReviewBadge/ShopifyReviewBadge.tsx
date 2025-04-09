import React from 'react';
import styles from './shopify-review-badge.module.css';

const ShopifyReviewBadge = () => {
  return (
    <div className={styles.container}>
      <div className={styles.texte}>"Incroyable"</div>
      <img
        className={styles.image}
        src="https://cdn.shopify.com/s/files/1/0798/4267/2987/files/Revive_39.png?v=1733346031"
        alt="Visuel d'avis"
      />
      <div className={styles.rating}>Noté 4.4/5 sur</div>
      <img
       className="logo"
       src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Shopify_Logo.png"
       alt="shopifyImage"
       width={80}
       height={80}
      />
    </div>
  );
};

export default ShopifyReviewBadge;
