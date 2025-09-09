import ContainerSnippet from "../ContainerSnippet";
import styles from "./customer-stats.module.css";

const CustomerStats = () => {
  return (
    <ContainerSnippet>
      <section className={styles.facts}>
        <div className={styles.factsBody}>
          <div className={styles.factsBodyItem}>
            <div className={styles.factsBodyItemTxt}>
              <p><strong>500 000+</strong></p>
              <p>Clients satisfaits</p>
            </div>
          </div>
          <div className={styles.factsBodyItem}>
            <div className={styles.factsBodyItemTxt}>
              <p><strong>97%</strong></p>
              <p>Taux de succès</p>
            </div>
          </div>
          <div className={styles.factsBodyItem}>
            <div className={styles.factsBodyItemTxt}>
              <p><strong>3 000+</strong></p>
              <p>Avis 5 étoiles</p>
            </div>
          </div>
        </div>
      </section>
    </ContainerSnippet>
  );
};

export default CustomerStats;
