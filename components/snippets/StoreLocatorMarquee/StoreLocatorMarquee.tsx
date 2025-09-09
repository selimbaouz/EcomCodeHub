// components/StoreLocatorMarquee.jsx
import ContainerSnippet from '../ContainerSnippet';
import styles from './store-locator-marquee.module.css';

const logos = [
  "https://res.cloudinary.com/tailwindliquid/image/upload/v1749294946/Fred_Meyer_bpaya0.svg",
  "https://res.cloudinary.com/tailwindliquid/image/upload/v1749294946/H-E-B_yqvkwh.svg",
  "https://res.cloudinary.com/tailwindliquid/image/upload/v1749294946/sprouts_cca6wi.svg",
  "https://res.cloudinary.com/tailwindliquid/image/upload/v1749294946/Wegmans_ffz0gd.svg",
  "https://res.cloudinary.com/tailwindliquid/image/upload/v1749294946/whole-foods_go1zwq.svg",
  "https://res.cloudinary.com/tailwindliquid/image/upload/v1749294946/Natural_Grocers_phfvit.svg",
];

export default function StoreLocatorMarquee() {
  // On duplique les logos pour l’effet infini
  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <ContainerSnippet>
      <div className={styles.marqueeWrapper}>
        <span className={styles.marqueeTitle}>
          Finds us <br className="lg:hidden" />near you
        </span>
            <div className={styles.marqueeTrack}>
            {marqueeLogos.map((src, idx) => (
                <img
                key={idx}
                src={src}
                alt=""
                className={styles.logo}
                loading="lazy"
                />
            ))}
            </div>
      </div>
    </ContainerSnippet>
  );
}
