import ContainerSnippet from "../ContainerSnippet";
import styles from "./review-banner.module.css";

export default function ReviewBanner() {
  return (
    <ContainerSnippet>
      <div className={styles.container}>
        <div className={styles.stars}>
          <img
            className={styles.image}
            src="https://cdn.shopify.com/s/files/1/0798/4267/2987/files/Revive_39.png?v=1733346031"
            alt="Étoiles évaluation"
          />
        </div>
        <span className={styles.text}>
          noté <strong className="font-extrabold text-[#2e2f3c]">4.5/5</strong> basé sur <strong className="font-extrabold text-[#2e2f3c]">+650 avis</strong>
        </span>
      </div>
    </ContainerSnippet>
  );
}
