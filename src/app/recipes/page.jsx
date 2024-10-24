'use client';
import styles from '@/styles/recipes.module.css';
import { useState } from 'react';

const icons = {
  breakfast: "/Images/manzana1.jpg",
  vegetarian: "/Images/manzana1.jpg",
  meat: "/Images/manzana1.jpg",
  dessert: "/Images/manzana1.jpg",
  lunch: "/Images/manzana1.jpg",
  chocolate: "/Images/manzana1.jpg"
};

const recipes = [
    {
      name: 'Mixed Tropical Fruit Salad',
      time: '30 Minutes',
      category: 'Healthy',
      image: '/Images/manzana1.jpg',
    },
    {
      name: 'Big and Juicy Wagyu Beef Cheeseburger',
      time: '30 Minutes',
      category: 'Western',
      image: '/Images/manzana1.jpg',
    },
    {
      name: 'Tropical Fruit Salad',
      time: '30 Minutes',
      category: 'Healthy',
      image: '/Images/manzana1.jpg',
    },
    {
      name: 'Juicy Wagyu Beef Cheeseburger',
      time: '30 Minutes',
      category: 'Western',
      image: '/Images/manzana1.jpg',
    },
    {
      name: 'Fruit Salad',
      time: '30 Minutes',
      category: 'Healthy',
      image: '/Images/manzana1.jpg',
    },
  ];

export default function CategoriesPage() {
  const [categories] = useState([
    { name: 'Breakfast', icon: 'breakfast' },
    { name: 'Vegetarian', icon: 'vegetarian' },
    { name: 'Meat', icon: 'meat' },
    { name: 'Dessert', icon: 'dessert' },
    { name: 'Lunch', icon: 'lunch' },
    { name: 'Chocolate', icon: 'chocolate' }
  ]);

  const [likedRecipes, setLikedRecipes] = useState([]);

  const handleLikeClick = (recipeName) => {
    if (likedRecipes.includes(recipeName)) {
      setLikedRecipes(likedRecipes.filter(name => name !== recipeName));
    } else {
      setLikedRecipes([...likedRecipes, recipeName]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Categories</h1>
        <button className={styles.viewAllButton}>View All Categories</button>
      </div>
      
      <div className={styles.categories}>
        {categories.map((category) => (
          <div key={category.name} className={styles.categoryCard}>
            <div className={styles.icon}>
              <img src={icons[category.icon]} alt={category.name} className={styles.iconImage} />
            </div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <div className={styles.recipeMessage}>
        <h2>Try these delicious recipes to make your day</h2>
        <p>Remember to use soon-to-expire ingredients :) Every Ingredient Counts!</p>
      </div>

      <div className={styles.recipeCards}>
        {recipes.map((recipe) => (
          <div key={recipe.name} className={styles.recipeCard}>
            <div className={styles.recipeImageContainer}>
              <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
              <button
                className={`${styles.heartButton} ${likedRecipes.includes(recipe.name) ? styles.liked : ''}`}
                onClick={() => handleLikeClick(recipe.name)}
              >
                {likedRecipes.includes(recipe.name) ? 'Liked' : 'Like'}
              </button>
            </div>
            <h3 className={styles.recipeTitle}>{recipe.name}</h3>
            <div className={styles.recipeInfo}>
              <p className={styles.recipeTime}>
                <span>⏱️</span>{recipe.time}
              </p>
              <p className={styles.recipeCategory}>
                <span>🍽️</span>{recipe.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
