"use client";
import { useState, useEffect } from "react";
import { stickyBarData } from "@/data";
import styles from "./adbar.module.css";

const AdBar = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % stickyBarData.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.bar}>
        {stickyBarData.map((item, i) => (
          <div
            key={i}
            className={`${styles.item} ${i === index ? styles.visible : styles.hidden}`}
          >
            <span>{item.title}</span>
          </div>
        ))}
      </div>
        );
};

export default AdBar;