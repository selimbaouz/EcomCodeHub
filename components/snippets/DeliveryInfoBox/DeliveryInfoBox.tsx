import styles from './delivery-info-box.module.css';

export const DeliveryInfoBox = () => {
  return (
    <div className={styles.deliveryBox}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <div className={styles.icon}>
            <svg
              width="18"
              fill="#474747"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  className="st0"
                  d="M6,5h9v2l3.7,0.8c0.9,0.2,1.7,0.8,2.1,1.7l1.8,4c0.2,0.4,0.3,0.8,0.3,1.3v1.7V18h-3"
                  stroke="#474747"
                  strokeWidth="2"
                  fill="none"
                />
                <line x1="5" y1="13" x2="2" y2="13" stroke="#474747" strokeWidth="2" />
                <line x1="15" y1="18" x2="9" y2="18" stroke="#474747" strokeWidth="2" />
                <circle cx="6.5" cy="18.5" r="2.5" stroke="#474747" strokeWidth="2" fill="none" />
                <circle cx="17.5" cy="18.5" r="2.5" stroke="#474747" strokeWidth="2" fill="none" />
                <polyline points="15,7 15,12 15,14" stroke="#474747" strokeWidth="2" fill="none" />
                <line x1="1" y1="9" x2="7" y2="9" stroke="#474747" strokeWidth="2" />
                <line x1="4" y1="19" x2="3" y2="19" stroke="#474747" strokeWidth="2" />
              </g>
            </svg>
          </div>
          Livraison et retours gratuits
        </div>
        <div className={styles.deliveryTime}>
          Livraison gratuite sans contact pour toutes les commandes<br />
          Délai de livraison : <span>2 - 5 jours ouvrés</span>
        </div>
      </div>
    </div>
  );
};
