import React from 'react';
import styles from './trustpilot-badge.module.css';

const TrustpilotBadge = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>"Incroyable"</div>
      <img
        className={styles.image}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwTrpqlDxrYZ0pXL4aXXL4azowSSvjMZM2g&s"
        alt="Image Trustpilot"
      />
      <div className={styles.rating}>Note de 4.4/5 sur</div>
      <img
        className={styles.logo}
        src="https://cdn.shopify.com/s/files/1/0798/4267/2987/files/trustpilot-logo-sml_bf402230-0d05-4609-a750-c310e4720da2.png?v=1733179329"
        alt="Logo Trustpilot"
      />
    </div>
  );
};

export default TrustpilotBadge;
