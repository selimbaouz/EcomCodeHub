import { FaInstagram } from 'react-icons/fa6';
import styles from './instagram-view.module.css';
import ContainerSnippet from '../ContainerSnippet';

export const InstagramViews = () => {
  return (
    <ContainerSnippet>
      <div className={styles.instagramViews}>
        <FaInstagram className='text-sm' />
        <span>Vu sur Instagram</span>
      </div>
    </ContainerSnippet>
  );
};
