import { FaTiktok } from 'react-icons/fa6';
import styles from './tiktok-view.module.css';

export const TiktokViews = () => {
  return (
    <div className={styles.tiktokViews}>
      <FaTiktok className='text-sm' />
      <span>Plus de 10 millions de vues sur Tiktok</span>
    </div>
  );
};
