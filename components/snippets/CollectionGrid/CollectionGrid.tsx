import React from 'react';
import styles from './collection-grid.module.css';
import ContainerSnippet from '../ContainerSnippet';

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Huile Sublimante Corps et Cheveux',
    description: 'Huile nourrissante multi-usage à base d’huile d’argan et de jojoba. Laisse la peau douce et satinée, tout en apportant brillance et souplesse aux cheveux secs et ternes.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0970/6094/6252/files/visualelectric-1735945501671.png?v=1756925382',
    link: '#',
  },
  {
    id: '2',
    title: 'Éclat Naturel Sérum Visage',
    description: 'Un sérum léger enrichi en extraits botaniques pour illuminer et hydrater intensément la peau. Combat les signes de fatigue et révèle un teint frais et lumineux toute la journée.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0970/6094/6252/files/visualelectric-1735945586877.png?v=1755631114',
    link: '#',
  },
  {
    id: '3',
    title: 'Crème Anti-Âge',
    description: 'Préservez l’élasticité de votre peau et atténuez les rides avec notre crème haute performance.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0970/6094/6252/files/visualelectric-1735945480872.png?v=1756925348',
    link: '#',
  },
  {
    id: '4',
    title: 'Extra Lit-B Shot',
    description: 'Redonnez de l’éclat à votre peau avec le sérum exfoliant Extra Lit-B Shot de Pop Beauty.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0970/6094/6252/files/2.png?v=1755507381',
    link: '#',
  },
];

const CollectionGrid = () => {
  return (
    <ContainerSnippet>
      <div className={styles.collectionGrid}>
        <div className={styles.gridContainer}>
          {products.map((product) => (
            <a key={product.id} href={product.link} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className={styles.cardImage}
                />
              </div>
              <h3 className={styles.cardTitle}>{product.title}</h3>
              <p className={styles.cardDescription}>{product.description}</p>
            </a>
          ))}
        </div>
      </div>
    </ContainerSnippet>
  );
};

export default CollectionGrid;