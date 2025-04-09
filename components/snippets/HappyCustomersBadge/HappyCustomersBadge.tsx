import React from 'react';
import styles from './happy-customers.module.css';

const HappyCustomersBadge = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatars}>
        <img
          src="https://img.freepik.com/free-photo/stylish-african-american-woman-smiling_23-2148770405.jpg"
          className={styles.avatar}
          alt="Customer 1"
        />
        <img
          src="https://thumbs.dreamstime.com/b/beautiful-african-american-woman-relaxing-outside-happy-middle-aged-smiling-46298787.jpg"
          className={styles.avatar}
          alt="Customer 2"
        />
        <img
          src="https://media.istockphoto.com/id/1320651997/photo/young-woman-close-up-isolated-studio-portrait.jpg?s=612x612&w=0&k=20&c=lV6pxz-DknISGT2jjiSvUmSaw0hpMDf-dBpT8HTSAUI="
          className={styles.avatar}
          alt="Customer 3"
        />
      </div>
      <span className={styles.text}>1,000,000+ clients satisfaits</span>
    </div>
  );
};

export default HappyCustomersBadge;
