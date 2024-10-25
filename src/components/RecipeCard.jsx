import { useState } from 'react';
import styles from '@/styles/recipeCard.module.css';

export default function RecipeCard({ recipe, onLike, onClick }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(recipe.title); 
  };

  return (
    <div className={styles.recipeCard} onClick={() => onClick(recipe)}>
      <div className={styles.recipeImageContainer}>
        <img
          src={recipe.image || '/Images/icons/OptiChef.png'} // Imagen por defecto
          alt={recipe.title}
          className={styles.recipeImage}
        />
        <button
          className={`${styles.heartButton} ${liked ? styles.liked : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic en el botón cierre el popup
            handleLike();
          }}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>
      <div className={styles.recipeDetails}>
        <h3 className={styles.recipeTitle}>{recipe.title}</h3>
        <div className={styles.recipeInfo}>
          <p className={styles.recipeTime}>
            <img className={styles.icon} src="/Images/icons/time.png" alt="time" />
            {recipe.timeToPrepare}
          </p>
          <p className={styles.recipeCategory}>
            <img className={styles.icon} src="/Images/icons/utensils.png" alt="category" />
            {recipe.categories ? recipe.categories.join(', ') : 'No categories'}

          </p>
        </div>
      </div>
    </div>
  );
}