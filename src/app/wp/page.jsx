'use client';
import styles from '@/styles/wp.module.css';
import { useState } from 'react';

const icons = {
  lechuga: "/Images/lechuga.webp",
  sandia: "/Images/lechuga.webp",
  tomate: "/Images/lechuga.webp",
  carne: "/Images/lechuga.webp",
  huevo: "/Images/lechuga.webp",
  sopa: "/Images/lechuga.webp",
  zanahoria: "/Images/lechuga.webp"
};

export default function WPPage() {
  const [wasteData, setWasteData] = useState({
    expiringSoon: ['lechuga', 'sandia', 'tomate', 'carne', 'huevo'],
    totalWaste: '200gr',
    mealsSpoiled: { name: 'sopa', description: 'Chicken Soup', quantity: 1 },
    ingredientsSpoiled: { name: 'zanahoria', description: 'Carrots', quantity: 3 },
    wasteReduction: 25,
  });

  return (
    <div className={styles.container}>
      {/* Expiring Soon Section */}
      <div className={styles.expiringSoon}>
        <h2>! EXPIRING SOON !</h2>
        <div className={styles.iconsContainer}>
          {wasteData.expiringSoon.map((item, index) => (
            <div key={index} className={styles.iconWrapper}>
              <img src={icons[item]} alt={item} className={styles.icon} />
            </div>
          ))}
        </div>
      </div>

      {/* Waste Summary */}
      <div className={styles.wasteSummary}>
        <h3>THIS MONTH YOU WASTED</h3>
        <h1 className={styles.header}>{wasteData.totalWaste} of food</h1>
      </div>

      {/* Meals and Ingredients Spoiled Section */}
      <div className={styles.spoiledSection}>
        {/* Meals Spoiled */}
        <div className={styles.spoiledHeader}>MEALS SPOILED</div>
        <div className={styles.spoiledContent}>
          <img src={icons[wasteData.mealsSpoiled.name]} alt={wasteData.mealsSpoiled.description} className={styles.spoiledIcon} />
          <span className={styles.spoiledText}>{wasteData.mealsSpoiled.description.toUpperCase()}</span>
        </div>

        {/* Ingredients Spoiled */}
        <div className={styles.spoiledHeader}>INGREDIENTS SPOILED</div>
        <div className={styles.spoiledContent}>
          <img src={icons[wasteData.ingredientsSpoiled.name]} alt={wasteData.ingredientsSpoiled.description} className={styles.spoiledIcon} />
          <span className={styles.spoiledText}>{wasteData.ingredientsSpoiled.quantity} {wasteData.ingredientsSpoiled.description.toUpperCase()}</span>
        </div>
      </div>

      {/* Reduction Message */}
      <div className={styles.reductionMessage}>
        <p className={styles.header}>
          You wasted {wasteData.wasteReduction}% less food this week compared to last week
        </p>
      </div>
    </div>
  );
}