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
      image: '/Images/manzana1.jpg', // Reemplaza con la ruta de tu imagen
    },
    {
      name: 'Big and Juicy Wagyu Beef Cheeseburger',
      time: '30 Minutes',
      category: 'Western',
      image: '/Images/manzana1.jpg', // Reemplaza con la ruta de tu imagen
    },
    // ... (agrega más recetas)
  ];

export default function CategoriesPage() {
  // Definir estado para las categorías
  const [categories] = useState([
    { name: 'Breakfast', icon: 'breakfast' },
    { name: 'Vegetarian', icon: 'vegetarian' },
    { name: 'Meat', icon: 'meat' },
    { name: 'Dessert', icon: 'dessert' },
    { name: 'Lunch', icon: 'lunch' },
    { name: 'Chocolate', icon: 'chocolate' }
  ]);

  // Estado para gestionar qué recetas han sido "liked"
  const [likedRecipes, setLikedRecipes] = useState([]);

  // Función para manejar clic en el corazón
  const handleLikeClick = (recipeName) => {
    if (likedRecipes.includes(recipeName)) {
      // Si ya está en la lista de "liked", lo removemos (dislike)
      setLikedRecipes(likedRecipes.filter(name => name !== recipeName));
    } else {
      // Si no está, lo agregamos (like)
      setLikedRecipes([...likedRecipes, recipeName]);
    }
  };

  return (
    <div className={styles.container}>
      {/* Contenedor de título y botón */}
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

      {/* Sección de mensaje sobre las recetas */}
      <div className={styles.recipeMessage}>
        <h2>Try these delicious recipes to make your day</h2>
        <p>Remember to use soon-to-expire ingredients :) Every Ingredient Counts!</p>
      </div>

      {/* Tarjetas de recetas */}
      <div className={styles.recipeCards}>
        {recipes.map((recipe) => (
          <div key={recipe.name} className={styles.recipeCard}>
            <div className={styles.recipeImageContainer}>
              <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
              {/* Botón de corazón */}
              <button
                className={`${styles.heartButton} ${likedRecipes.includes(recipe.name) ? styles.liked : ''}`}
                onClick={() => handleLikeClick(recipe.name)}
              >
                ❤️
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
