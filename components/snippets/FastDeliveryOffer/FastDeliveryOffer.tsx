import React from 'react';
import styles from './fast-delivery-offer.module.css'; // Assurez-vous de créer ce fichier .module.css

const FastDeliveryOffer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.fastDeliveryOffer}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" fill="#007800" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" style={{ background: "new 0 0 24 24" }}>
                    <g>
                        <path className="st0" d="M6,5h9v2l3.7,0.8c0.9,0.2,1.7,0.8,2.1,1.7l1.8,4c0.2,0.4,0.3,0.8,0.3,1.3v1.7V18h-3" />
                        <line className="st0" x1="5" y1="13" x2="2" y2="13" />
                    </g>
                    <line className="st0" x1="15" y1="18" x2="9" y2="18" />
                    <circle className="st0" cx="6.5" cy="18.5" r="2.5" />
                    <circle className="st0" cx="17.5" cy="18.5" r="2.5" />
                    <polyline className="st0" points="15,7 15,12 15,14 " />
                    <line className="st0" x1="1" y1="9" x2="7" y2="9" />
                    <line className="st0" x1="4" y1="19" x2="3" y2="19" />
                </svg>
                Livraison rapide en 2-3 jours
            </div>
        </div>
    );
};

export default FastDeliveryOffer;
