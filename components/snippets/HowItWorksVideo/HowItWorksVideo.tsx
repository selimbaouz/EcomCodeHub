import React from 'react';
import styles from "./how-it-works-video.module.css"
import { cn } from '@/lib/utils';

const HowItWorksVideo = () => {
    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.videoWrapper)}>
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className={cn(styles.video)}
                >
                    <source
                        src="https://cdn.shopify.com/videos/c/o/v/ed3678df18cd40689fe197f1c9a390f2.mp4"
                        type="video/mp4"
                    />
                </video>
                <p className={cn(styles.text)}>1{")"} Mesurer 5g de Café</p>
            </div>
            <div className={cn(styles.videoWrapper)}>
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className={cn(styles.video)}
                >
                    <source
                        src="https://cdn.shopify.com/videos/c/o/v/b10992f6d80540178e0da8d81034de4f.mp4"
                        type="video/mp4"
                    />
                </video>
                <p className={cn(styles.text)}>2{")"} Mélanger avec de l'eau</p>
            </div>
            <div className={cn(styles.videoWrapper)}>
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className={cn(styles.video)}
                >
                    <source
                        src="https://cdn.shopify.com/videos/c/o/v/4d94533cb3f8417abe9d67593e0bd4ba.mp4"
                        type="video/mp4"
                    />
                </video>
                <p className={cn(styles.text)}>3{")"} Bien mélanger</p>
            </div>
            <div className={cn(styles.videoWrapper)}>
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className={cn(styles.video)}
                >
                    <source
                        src="https://cdn.shopify.com/videos/c/o/v/9f4ddb5d8ed44a968f2f546719a1128b.mp4"
                        type="video/mp4"
                    />
                </video>
                <p className={cn(styles.text)}>4{")"} Profitez</p>
            </div>
        </div>
    );
};

export default HowItWorksVideo;