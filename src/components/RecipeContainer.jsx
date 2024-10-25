import styles from '@/styles/recipeContainer.module.css';

export default function RecipeContainer({ recipes, onOpenPopup }) {
  return (
    <div className={styles.container}>
      {recipes.map((recipe, index) => (
        <div
          key={index}
          className={styles.recipeCard}
          onClick={() => onOpenPopup(recipe)}
        >
          <div className={styles.recipeImageContainer}>
            <img
              src="/Images/icons/OptiChef.png"
              alt={recipe.title}
              className={styles.recipeImage}
            />
          </div>
          <div className={styles.recipeDetails}>
            <h3 className={styles.recipeTitle}>{recipe.title}</h3>
            <p className={styles.recipeCategory}>OptiChef</p>
          </div>
        </div>
      ))}
    </div>
  );
}
