import React from 'react';
import styles from './product-statistics.module.css';
import ContainerSnippet from '../ContainerSnippet';

const ProductStatistics = () => {
  return (
    <ContainerSnippet>
      <div className={styles.container}>
        <img
          src="https://cdn.shopify.com/s/files/1/0976/7999/9301/files/72d09198-d4c2-42fb-8b16-036e1b7e32a7.jpg?v=1756303598"
          alt="Image of product"
          className={styles.image}
        />
        <div className={styles.content}>
          <h3 className={styles.heading}>Nourish and Enhance Your Natural Beauty</h3>
          <div>
            {[
              { stat: "97%", content: "This is a mini description for this product" },
              { stat: "97%", content: "This is a mini description for this product" },
              { stat: "97%", content: "This is a mini description for this product" }
            ].map((data, index) => (
              <div key={index} className={styles.statItem}>
                <h3 className={styles.statValue}>{data.stat}</h3>
                <p className={styles.statDescription}>{data.content}</p>
              </div>
            ))}
          </div>
          <button className={styles.button}>Buy It Now</button>
        </div>
      </div>
    </ContainerSnippet>
  );
};

export default ProductStatistics;
