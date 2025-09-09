import { calculateDeliveryDates, calculateDeliverySteps } from '@/lib/fn';
import React from 'react';
import styles from './delivery-steps.module.css';
import ContainerSnippet from '../ContainerSnippet';

const DeliverySteps = () => {
    const [orderDate, readyDate, deliveryDate] = calculateDeliverySteps(3, 5, 7, 10);
    return (
        <ContainerSnippet>
            <div className={styles.container}>
                <div className={styles.line} />
                
                <div className={styles.step}>
                    <div className={styles.stepIcon}>
                        <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 576 512" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM403.029 192H360v-60c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v60h-43.029c-10.691 0-16.045 12.926-8.485 20.485l67.029 67.029c4.686 4.686 12.284 4.686 16.971 0l67.029-67.029c7.559-7.559 2.205-20.485-8.486-20.485z"></path>
                        </svg>
                    </div>
                    <div className={styles.stepText}>
                        <h3 className={styles.stepTitle}>{orderDate}</h3>
                        <p className={styles.stepDescription}>Commande</p>
                    </div>
                </div>

                <div className={styles.step}>
                    <div className={styles.stepIcon}>
                        <svg stroke="currentColor" fill="white" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="25px" width="25px" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 9l-2-4h-3v-2c0-0.55-0.45-1-1-1h-9c-0.55 0-1 0.45-1 1v8l1 1h1.268c-0.17 0.294-0.268 0.636-0.268 1 0 1.105 0.895 2 2 2s2-0.895 2-2c0-0.364-0.098-0.706-0.268-1h5.536c-0.17 0.294-0.268 0.636-0.268 1 0 1.105 0.895 2 2 2s2-0.895 2-2c0-0.364-0.098-0.706-0.268-1h1.268v-3zM11 9v-3h2.073l1.5 3h-3.573z"></path>
                        </svg>
                    </div>
                    <div className={styles.stepText}>
                        <h3 className={styles.stepTitle}>{readyDate}</h3>
                        <p className={styles.stepDescription}>Expédition</p>
                    </div>
                </div>

                <div className={styles.step}>
                    <div className={styles.stepIcon}>
                        <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 512 512" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"></path>
                        </svg>
                    </div>
                    <div className={styles.stepText}>
                        <h3 className={styles.stepTitle}>{deliveryDate}</h3>
                        <p className={styles.stepDescription}>Livraison</p>
                    </div>
                </div>
            </div>
        </ContainerSnippet>
    );
};

export default DeliverySteps;
