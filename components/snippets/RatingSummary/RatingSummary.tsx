import GetRatings from '@/lib/fn';
import { cn } from '@/lib/utils';
import React from 'react';
import styles from './rating-summary.module.css';

const RatingSummary = () => {
  return (
    <div className={cn(styles.container)}> 
      <p className={cn(styles.ratingNote)}>4.8/5</p>
      <GetRatings value={5} className={cn(styles.ratingStars)} />
      <p className={cn(styles.ratingNote)}>
        Basé sur <strong>650 ecommercants</strong>
      </p>
    </div>
  );
};

export default RatingSummary;
