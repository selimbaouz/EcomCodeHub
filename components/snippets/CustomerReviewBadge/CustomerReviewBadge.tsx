"use client";
import React, { useEffect, useRef } from 'react';
import styles from './customer-review-badge.module.css';

const CustomerReviewBadge = () => {
    const timeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const startCountdown = (duration: number, display: HTMLElement) => {
        let timer = duration;
        const interval = setInterval(() => {
          const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
          const seconds = (timer % 60).toString().padStart(2, '0');
          display.textContent = `Temps restant : ${minutes}:${seconds}`;
  
          if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "C'est terminé !";
          }
        }, 1000);
      };
  
      if (timeRef.current) {
        startCountdown(23 * 60 + 22, timeRef.current);
      }
    }, []);
  
    return (
      <div className={styles.container}>
        <img
          src="https://img.freepik.com/free-photo/stylish-african-american-woman-smiling_23-2148770405.jpg"
          alt="Photo de profil utilisateur"
          className={styles.image}
        />
        <div className={styles.content}>
          <div className={styles.username}>
            Michelle
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
              alt="Badge vérifié"
              className={styles.icon}
            />
          </div>
          <div className={styles.text}>
            On a combiné les promos du Black Friday et du Nouvel An rien que pour vous. Profitez de 255€ de réduction !
          </div>
        </div>
        <div className={styles.time} ref={timeRef}>Temps restant : 00:23:22</div>
      </div>
    );
  };

export default CustomerReviewBadge;