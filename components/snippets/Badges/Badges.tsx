import { cn } from '@/lib/utils';
import React from 'react';
import styles from './badges.module.css';

const Badges = () => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.badgePrimary)}>
        Accès instantané
      </div>
      <div className={cn(styles.badgeForeground)}>
        Top Achat 2025
      </div>
    </div>
  );
};

export default Badges;
