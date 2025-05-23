"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils'; // ✅ Ajout propre
import styles from './collapse-down.module.css'; // ✅ Ton CSS module

const CollapseDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <section className={styles.section} aria-label="CollapseDown">
      <div className={cn(styles.container)}>
        {/* Header cliquable */}
        <div className={cn(styles.header)} onClick={toggleOpen}>
          <div className={cn(styles.left)}>
            <span className={cn(styles.emoji)}>🙀</span>
            <span className={cn(styles.title)}>Comment utiliser ce produit ?</span>
          </div>
          {/* Chevron qui tourne si isOpen */}
          <span className={cn(styles.chevron, isOpen && styles.open)}>
            ▼
          </span>
        </div>

        {/* Contenu qui apparaît si isOpen */}
        {isOpen && (
          <div className={cn(styles.content)}>
            <p>
              Appliquez quelques gouttes de sérum sur une peau propre et sèche,
              puis massez doucement jusqu'à absorption complète.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CollapseDown;
