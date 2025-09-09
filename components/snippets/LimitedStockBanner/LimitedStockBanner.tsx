import ContainerSnippet from '../ContainerSnippet';
import styles from './limited-stock-banner.module.css';

export const LimitedStockBanner = () => {
  return (
    <ContainerSnippet>
      <div className={styles.container}>
        <div className={styles.dot}><span className="sr-only">.</span></div>
        <div>
          <span className={styles.text1}>Stock limité</span>{' '}
          <span className={styles.text2}>
            Dernière chance pour obtenir cet article,{' '}
            <span className={styles.highlight}>ne le manquez pas !</span>
          </span>
        </div>
      </div>
    </ContainerSnippet>
  );
};