"use client";
import React, { useState } from 'react';
import styles from './discount-code.module.css';
import { FaCheck, FaRegCopy } from 'react-icons/fa6';

const DiscountCode = () => {
  const [copied, setCopied] = useState(false);
  const text = 'TW13';

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
};

  return (
    <div className={styles.container}>
      {!copied ? (
        <>
          Utilisez le code <span className={styles.code}>{text}</span>
          <button
              onClick={handleCopy}
              className={styles.button}
          >
              {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />}
          </button>
        </>
      ) : (
        <span className={styles.copied}>Copié dans le presse-papiers !</span>
      )}
    </div>
  );
};

export default DiscountCode;
