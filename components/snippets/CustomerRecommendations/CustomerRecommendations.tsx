import ContainerSnippet from '../ContainerSnippet';
import styles from './customer-recommendations.module.css';
import React from 'react';

const CustomerRecommendations = () => {
    return (
        <ContainerSnippet>
            <div className={styles.container}>
                <div className={styles.avatarContainer}>
                    <img
                        className={styles.avatar}
                        src="https://avatars.githubusercontent.com/u/89768406"
                        width={100}
                        height={100}
                        alt={`Avatar`}
                    />
                    <img
                        className={styles.avatar}
                        src="https://avatars.githubusercontent.com/u/59442788"
                        width={100}
                        height={100}
                        alt={`Avatar`}
                    />
                    <img
                        className={styles.avatar}
                        src="https://avatars.githubusercontent.com/u/59228569"
                        width={100}
                        height={100}
                        alt={`Avatar`}
                    />
                </div>
                <p className={styles.text}>Recommandé par <span className={styles.boldText}>+650 </span>personnes</p>
            </div>
        </ContainerSnippet>
    );
};

export default CustomerRecommendations;
