import React from 'react';
import styles from './secure-badges.module.css';

const SecureBadges = () => {
    return (
       <div className={styles.container}>
            <img src="https://logo-marque.com/wp-content/uploads/2020/09/Mastercard-Logo-2016-2020.png" alt="icon secure payment" className={styles.icon} />
            <img src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png" alt="icon secure payment" className={styles.icon} />
            <img src="https://download.logo.wine/logo/Revolut/Revolut-Logo.wine.png" alt="icon secure payment" className={styles.icon} />
            <img src="https://w7.pngwing.com/pngs/385/158/png-transparent-apple-card-credit-logo-logos-pay-logos-and-brands-icon-thumbnail.png" alt="icon secure payment" className={styles.icon} />
        </div>
    );
};

export default SecureBadges;
