import ContainerSnippet from "../ContainerSnippet";
import styles from "./limited-offer.module.css";

export default function LimitedOffer() {
  return (
    <ContainerSnippet>
      <div className={styles.limitedOfferWrapper}>
        <h2 className={styles.limitedOfferTitle}>
          1 ACHETÉ = LE 2 ÈME À -50%
        </h2>
        <p className={styles.limitedOfferSubtitle}>
          OFFRE LIMITÉE
        </p>
      </div>
    </ContainerSnippet>
  );
}
