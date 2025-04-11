"use client";
import React, { useState } from "react";
import styles from "./christmas-discount.module.css";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { TbChristmasTreeFilled } from "react-icons/tb";

const ChristmasDiscount = () => {
  const [copied, setCopied] = useState(false);
  const text = "Noel25";

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      {!copied ? (
        <div className="flex items-center gap-2">
          <TbChristmasTreeFilled className="text-lg" />
          <p>
            -20% pour Noël avec le code :{" "}
            <span className={styles.code}>{text}</span>
          </p>
          <button onClick={handleCopy} className={styles.button}>
            {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />}
          </button>
        </div>
      ) : (
        <span className={styles.copied}>Copié dans le presse-papiers !</span>
      )}
    </div>
  );
};

export default ChristmasDiscount;
