import React from 'react';
import styles from './review-badge.module.css';

const ReviewBadge = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatars}>
        <img
          src="https://img.freepik.com/free-photo/stylish-african-american-woman-smiling_23-2148770405.jpg"
          alt="Customer 2"
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
        noté <strong>4.5/5</strong> sur plus de <strong>650 avis</strong>
      </span>
    </div>
  );
};

export default ReviewBadge;
