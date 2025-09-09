import { FaTiktok } from 'react-icons/fa6';
import styles from './tiktok-follower.module.css';
import ContainerSnippet from '../ContainerSnippet';

export const TiktokFollowers = () => {
  return (
    <ContainerSnippet>
      <div className={styles.tiktokFollowers}>
        <FaTiktok className='text-sm' />
        <span>Plus de 500k followers sur Tiktok</span>
      </div>
    </ContainerSnippet>
  );
};
