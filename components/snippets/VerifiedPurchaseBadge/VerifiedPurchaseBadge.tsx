import React from 'react';
import styles from './verified-purchase-badge.module.css';

const VerifiedPurchaseBadge = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatars}>
        <img
          src="https://img.freepik.com/free-photo/stylish-african-american-woman-smiling_23-2148770405.jpg"
          alt="Customer 1"
          className={styles.avatar}
        />
        <img
          src="https://thumbs.dreamstime.com/b/beautiful-african-american-woman-relaxing-outside-happy-middle-aged-smiling-46298787.jpg"
          alt="Customer 2"
          className={styles.avatar}
        />
        <img
          src="https://media.istockphoto.com/id/1320651997/photo/young-woman-close-up-isolated-studio-portrait.jpg?s=612x612&w=0&k=20&c=lV6pxz-DknISGT2jjiSvUmSaw0hpMDf-dBpT8HTSAUI="
          alt="Customer 3"
          className={styles.avatar}
        />
      </div>
      <span className={styles.text}>
        <span className={styles.name}>Michelle</span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png"
          alt="verified badge"
          className={styles.verified}
        />
        <span>et <strong className={styles.peopleCount}>758</strong> clients ont acheté ce produit</span>
      </span>
    </div>
  );
};

export default VerifiedPurchaseBadge;
