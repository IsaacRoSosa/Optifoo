'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/HomePage.module.css';
import Link from 'next/link';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    const userId = localStorage.getItem('user_uid');
    setIsAuthenticated(!!userId); 
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <div className={styles.content}>
        <h1 className={styles.title}>WELCOME TO <br />OPTIFOOD</h1>
        <h2 className={styles.sub}>Where every ingredient counts</h2>
        <Link href={isAuthenticated ? '/recipeGenerator' : '/login'}>
          <div className={styles.button}>
            <span>{isAuthenticated ? 'EXPLORE SOMETHING' : 'LETS GET STARTED'}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
