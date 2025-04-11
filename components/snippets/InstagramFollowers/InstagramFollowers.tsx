import { FaInstagram } from 'react-icons/fa6';
import styles from './instagram-followers.module.css';

export const InstagramFollowers = () => {
  return (
    <div className={styles.instagramFollowers}>
      <FaInstagram className='text-sm' />
      <span>plus de 300k followers sur Instagram</span>
    </div>
  );
};
