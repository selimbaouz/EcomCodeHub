import React from 'react';
import styles from './service-badges.module.css';
import { CiDeliveryTruck } from 'react-icons/ci';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { TbTruckReturn } from 'react-icons/tb';

const ServiceBadges = () => {
    const services = [
        { icon: CiDeliveryTruck, title: 'Livraison rapide' },
        { icon: MdOutlineSupportAgent, title: 'Support 24/7' },
        { icon: TbTruckReturn, title: 'Retour sous 30 jours' },
    ];

    return (
        <div className={styles.container}>
            {services.map((data, index) => (
                <div key={index} className={styles.badge}>
                    <data.icon className={styles.icon} />
                    <p className={styles.text}>{data.title}</p>
                </div>
            ))}
        </div>
    );
};

export default ServiceBadges;