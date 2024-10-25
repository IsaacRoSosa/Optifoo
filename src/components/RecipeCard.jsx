import { useState } from 'react';
import styles from '@/styles/recipeCard.module.css';

export default function RecipeCard({ recipe, onLike, onClick }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(recipe.name); 
  };

  return (
    <div className={styles.recipeCard} onClick={() => onClick(recipe)}>
      <div className={styles.recipeImageContainer}>
        <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
        <button
          className={`${styles.heartButton} ${liked ? styles.liked : ''}`}
          onClick={(e) => {
            e.stopPropagation(); 
            handleLike();
          }}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>
      <div className={styles.recipeDetails}>
        <h3 className={styles.recipeTitle}>{recipe.name}</h3>
        <div className={styles.recipeInfo}>
          <p className={styles.recipeTime}>
            <img  className={styles.icon} src="/Images/icons/time.png" alt="time" />{recipe.time}
          </p>
          <p className={styles.recipeCategory}>
          <img  className={styles.icon} src="/Images/icons/utensils.png" alt="category" /> {recipe.category}
          </p>
        </div>
      </div>
    </div>
  );
}
