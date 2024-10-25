// components/CookingLoader.js
import React from 'react';
import styles from '@/styles/CookingLoader.module.css'; // Importamos el CSS

const CookingLoader = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cooking in progress</h1>
      <div className={styles.cooking}>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.area}>
          <div className={styles.sides}>
            <div className={styles.pan}></div>
            <div className={styles.handle}></div>
          </div>
          <div className={styles.pancake}>
            <div className={styles.pastry}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingLoader;
 