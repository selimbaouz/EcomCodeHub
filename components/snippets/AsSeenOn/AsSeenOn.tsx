import { cn } from '@/lib/utils';
import styles from './as-seen-on.module.css';

const logos = [
  'https://cdn.prod.website-files.com/5c1922e22200fb24773c7093/5e8c510ac6500478b24f7161_547c2379c91499027c75e3c3_logo-_0004_defonce.png',
  'https://cdn-assets.inwink.com/823331c0-bab3-ee11-bea0-00224880d694-public/assets/pictures/logo_bfm_business.png',
  'https://annonces-legales.lefigaro.fr/app/uploads/2022/11/LeFigaro_Logo_Entier_Reserve_Blc.png',
  '//spacegoods.com/cdn/shop/files/marie_1000x.svg?v=1726480688',
];

export default function AsSeenOn() {
  return (
    <section className={styles.asSeenOn} aria-label="Vu dans la presse">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          <span className={styles.divider} />
          Vu dans la presse
          <span className={styles.divider} />
        </h2>
        <div className={styles.logos}>
          {logos.map((logo, i) => (
            <img key={i} src={logo} alt={`Logo partenaire ${i + 1}`} className={cn("mx-auto max-w-[180px]",
                i === 1 && "h-20",
                i === 2 && "h-20",
                i === 3 && "h-20",
                i === 4 && "h-10",
            )} />
          ))}
        </div>
      </div>
    </section>
  );
}
