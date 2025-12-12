import ContainerSnippet from "../ContainerSnippet";
import styles from "./features-banner.module.css";

export default function FeaturesBanner() {
  return (
    <ContainerSnippet>
      <div className={styles.wrapper}>
        {/* Bandeau supérieur */}
        <div className={styles.topWave}>
          <svg
            className={styles.waveSvg}
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <path
              d="M 1440 80 V 72 C 1440 72 746.5 0 430 0 C 113.5 0 0 48 0 48 V 0 H 1440 Z"
              fill="#F9F5ED"
            />
          </svg>
        </div>

        {/* Contenu principal */}
        <div className={styles.content}>
          {/* USDA Organic */}
          <div className={styles.feature}>
            <img
              src="https://res.cloudinary.com/ecomcodehub/image/upload/v1749561073/No_Gums_No_Fillers_Text_c72a6162-dfe8-4d12-82dc-ca52ae8714fc_vmccm0.svg"
              alt="USDA Organic"
              width={82}
              height={82}
            />
            <p className={styles.label}>USDA Organic</p>
          </div>
          {/* Caffeine Free */}
          <div className={styles.feature}>
            <img
              src="https://res.cloudinary.com/ecomcodehub/image/upload/v1749561073/Gluten___Soy_Free_Text_3523da09-1dcd-4a63-8a84-18ea5c586837_ivltlo.svg"
              alt="Caffeine Free"
              width={82}
              height={82}
            />
            <p className={styles.label}>CAFFEINE FREE</p>
          </div>
          {/* No Fillers */}
          <div className={styles.feature}>
            <img
              src="https://res.cloudinary.com/ecomcodehub/image/upload/v1749561073/USDA_O_djt8xk.svg"
              alt="No Fillers"
              width={82}
              height={82}
            />
            <p className={styles.label}>NO FILLERS</p>
          </div>
          {/* Plant-Based */}
          <div className={styles.feature}>
            <img
              src="https://res.cloudinary.com/ecomcodehub/image/upload/v1749561073/Plant-Based_Text_8749ebc3-2f31-4e3c-9f69-0b2bcdc19104_zdwsge.svg"
              alt="Plant-Based"
              width={82}
              height={82}
            />
            <p className={styles.label}>PLANT-BASED</p>
          </div>
          {/* Gluten Free */}
          <div className={`${styles.feature} ${styles.colSpan2}`}>
            <img
              src="https://res.cloudinary.com/ecomcodehub/image/upload/v1749561073/18g_Protein_Text_efa05510-0a29-420a-a169-e4208e47288d_u3s7uv.svg"
              alt="Gluten Free"
              width={82}
              height={82}
            />
            <p className={styles.label}>Gluten Free</p>
          </div>
        </div>

        {/* Bandeau inférieur */}
        <div className={styles.bottomWave}>
          <svg
            className={styles.waveSvg}
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <path
              d="M 1440 80 V 72 C 1440 72 746.5 0 430 0 C 113.5 0 0 48 0 48 V 0 H 1440 Z"
              fill="#F9F5ED"
            />
          </svg>
        </div>
      </div>
    </ContainerSnippet>
  );
}
