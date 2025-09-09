import React from "react";
import styles from './product-showcase-section.module.css';
import { cn } from "@/lib/utils";
import ContainerSnippet from "../ContainerSnippet";

const ProductShowcaseSection = () => {
  return (
    <ContainerSnippet>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          {[
            {
              imgSrc: "https://cdn.shopify.com/s/files/1/0970/6094/6252/files/4.png?v=1755507381",
              title: "Title",
              content: "This is a mini description for this product.",
              buttonText: "Shop now",
              reverse: false,
            },
            {
              imgSrc: "https://cdn.shopify.com/s/files/1/0970/6094/6252/files/4.png?v=1755507381",
              title: "Title",
              content: "This is a mini description for this product.",
              buttonText: "Shop now",
              reverse: true,
            },
            {
              imgSrc: "https://cdn.shopify.com/s/files/1/0970/6094/6252/files/4.png?v=1755507381",
              title: "Title",
              content: "This is a mini description for this product.",
              buttonText: "Shop now",
              reverse: false,
            },
          ].map((data, i) => (
            <div key={i} className={styles.item}>
              <img
                src={data.imgSrc}
                alt="Image of product"
                className={cn(styles.img, data.reverse && styles.imgReverse)}
              />
              <div className={cn(styles.content, data.reverse && styles.contentReverse)}>
                <h3 className={styles.title}>{data.title}</h3>
                <p className={cn(styles.text, data.reverse ? styles.textRight : styles.textLeft)}>
                  {data.content}
                </p>
                <button className={styles.button}>{data.buttonText}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerSnippet>
  );
};

export default ProductShowcaseSection;
