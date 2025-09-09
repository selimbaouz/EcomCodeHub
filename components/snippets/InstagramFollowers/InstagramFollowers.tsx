import { FaInstagram } from 'react-icons/fa6';
import styles from './instagram-followers.module.css';
import ContainerSnippet from '../ContainerSnippet';

export const InstagramFollowers = () => {
  return (
    <ContainerSnippet>
      <div className={styles.instagramFollowers}>
        <FaInstagram className='text-sm' />
        <span>plus de 300k followers sur Instagram</span>
      </div>
    </ContainerSnippet>
  );
};
