import RecipeCard from './RecipeCard';
import styles from '@/styles/recipeList.module.css';

export default function RecipeList({ recipes, onLike, onOpenPopup }) {
  return (
    <div className={styles.recipeListContainer}>
      <div className={styles.recipeMessage}>
        <div className={styles.titleCont}>
          <h2>Try these delicious recipes to make your day</h2>
        </div>
        <div className={styles.subtitleCont}>
          <p>Remember to use soon-to-expire ingredients :) <br /> Every Ingredient Counts!</p>
        </div>
      </div>
      <div className={styles.recipeCards}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.name}
            recipe={recipe}
            onLike={onLike}
            onClick={onOpenPopup}
          />
        ))}
      </div>
    </div>
  );
}
 