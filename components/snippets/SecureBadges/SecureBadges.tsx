import React from 'react';
import styles from './secure-badges.module.css';

const SecureBadges = () => {
    return (
       <div className={styles.container}>
            <img src="/images/visa.jpg" alt="icon secure payment" className={styles.icon} />
            <img src="/images/mastercard.png" alt="icon secure payment" className={styles.icon} />
            <img src="/images/applepay.png" alt="icon secure payment" className={styles.icon} />
            <img src="/images/paypal.png" alt="icon secure payment" className={styles.icon} />
            <img src="/images/twint.png" alt="icon secure payment" className={styles.icon} />
        </div>
    );
};

export default SecureBadges;
