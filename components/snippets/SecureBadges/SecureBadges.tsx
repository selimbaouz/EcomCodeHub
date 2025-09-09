import React from 'react';
import styles from './secure-badges.module.css';
import ContainerSnippet from '../ContainerSnippet';

const SecureBadges = () => {
    return (
        <ContainerSnippet>
            <div className={styles.container}>
                    <img src="/images/visa.jpg" alt="icon secure payment" className={styles.icon} />
                    <img src="/images/mastercard.png" alt="icon secure payment" className={styles.icon} />
                    <img src="/images/applepay.png" alt="icon secure payment" className={styles.icon} />
                    <img src="/images/paypal.png" alt="icon secure payment" className={styles.icon} />
                    <img src="/images/twint.png" alt="icon secure payment" className={styles.icon} />
            </div>
        </ContainerSnippet>
    );
};

export default SecureBadges;
