import React, { useEffect, useState } from 'react';
import styles from './checkout-message.module.css';

const CheckoutMessage: React.FC = () => {
  const [currentCount, setCurrentCount] = useState<number>(5);

  const minCount = 1;
  const maxCount = 10;

  const updateCheckoutMessage = () => {
    const changeFactor = Math.random() < 0.5 ? -1 : 1;
    const changeValue = Math.floor(Math.random() * 2) + 1;
    let newCount = currentCount + changeFactor * changeValue;

    if (newCount < minCount) {
      newCount = minCount;
    } else if (newCount > maxCount) {
      newCount = maxCount;
    }

    setCurrentCount(newCount);
  };

  useEffect(() => {
    const interval = setInterval(updateCheckoutMessage, 10000); // toutes les 10 secondes
    return () => clearInterval(interval); // nettoyage du setInterval
  }, [currentCount]);

  return (
    <div className={styles.checkoutMessage}>
      <strong className={styles.changingNumber}>{currentCount}</strong> personnes finalisent leur commande en ce moment
    </div>
  );
};

export default CheckoutMessage;
