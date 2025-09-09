import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { TbTruckReturn } from 'react-icons/tb';
import ContainerSnippet from '../ContainerSnippet';
import styles from "./benefits-bar.module.css";

const BenefitsBar = () => {
    return (
        <ContainerSnippet>
            <div className={styles.barWrapper}>
                <div className={styles.item}>
                    <CiDeliveryTruck />
                    <p className={styles.itemText}>
                        Livraison gratuite en France
                    </p>
                </div>
                <div className={styles.item}>
                    <TbTruckReturn />
                    <p className={styles.itemText}>
                        Garantie 30 jours
                    </p>
                </div>
            </div>
        </ContainerSnippet>
    );
};

export default BenefitsBar;
