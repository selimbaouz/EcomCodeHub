import { FaTiktok } from 'react-icons/fa6';
import styles from './tiktok-follower.module.css';

export const TiktokFollowers = () => {
  return (
    <div className={styles.tiktokFollowers}>
      <FaTiktok className='text-sm' />
      <span>Plus de 500k followers sur Tiktok</span>
    </div>
  );
};
