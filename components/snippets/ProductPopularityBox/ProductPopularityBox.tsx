"use client";
import styles from './product-popularity-box.module.css'
import { useEffect, useState } from 'react'

export const ProductPopularityBox = () => {
  const [viewCount, setViewCount] = useState<number>(925)

  useEffect(() => {
    const variation = Math.floor(Math.random() * 41) - 20
    const newCount = 925 + variation

    const lastUpdated = localStorage.getItem('lastUpdated')
    const storedCount = localStorage.getItem('viewCount')

    if (!lastUpdated || Date.now() - Number(lastUpdated) > 86400000) {
      localStorage.setItem('viewCount', newCount.toString())
      localStorage.setItem('lastUpdated', Date.now().toString())
      setViewCount(newCount)
    } else if (storedCount) {
      setViewCount(parseInt(storedCount))
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.badge}>Vues</div>
      <div className={styles.text}>
        Au cours des dernières 24 heures, ce produit a été consulté <span>{viewCount}</span> fois.
      </div>
    </div>
  )
}
