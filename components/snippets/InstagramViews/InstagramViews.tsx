import { FaInstagram } from 'react-icons/fa6';
import styles from './instagram-view.module.css';

export const InstagramViews = () => {
  return (
    <div className={styles.instagramViews}>
      <FaInstagram className='text-sm' />
      <span>Vu sur Instagram</span>
    </div>
  );
};
