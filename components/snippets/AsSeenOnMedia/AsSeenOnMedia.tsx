import { cn } from '@/lib/utils';
import styles from './as-seen-on-media.module.css';

const logos = [
    'https://cdn.prod.website-files.com/5c1922e22200fb24773c7093/5e8c510ac6500478b24f7161_547c2379c91499027c75e3c3_logo-_0004_defonce.png',
    'https://cdn-assets.inwink.com/823331c0-bab3-ee11-bea0-00224880d694-public/assets/pictures/logo_bfm_business.png',
    'https://annonces-legales.lefigaro.fr/app/uploads/2022/11/LeFigaro_Logo_Entier_Reserve_Blc.png',
    '//spacegoods.com/cdn/shop/files/marie_1000x.svg?v=1726480688',
];

const AsSeenOnMedia = () => {
    return (
    <section className={styles.asSeenOn} >
        {logos.map((logo, i) => (
        <img key={i} src={logo} alt={`Logo partenaire ${i + 1}`} className={cn(styles.container,
            i === 1 && "h-20",
            i === 2 && "h-10",
            i === 3 && "h-10",
            i === 4 && "h-10",
        )} />
        ))}
    </section>
    );
};

export default AsSeenOnMedia;