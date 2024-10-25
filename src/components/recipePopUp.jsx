
import styles from '@/styles/recipePopup.module.css';
export default function RecipePopup({ recipe, onClose, onLike, onCook }) {
  if (!recipe) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ⟵
        </button>
        <h2 className={styles.recipeTitle}>{recipe.name}</h2>
        <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
        <div className={styles.infoBlock}>
          <p>
            <img src="/Images/icons/utensils.png" alt="category" className={styles.icon} />{' '}
            {recipe.category}
          </p>
          <p>
            <img src="/Images/icons/time.png" alt="time" className={styles.icon} />{' '}
            {recipe.time}
          </p>
        </div>
        <div className={styles.columns}>
          <div className={styles.ingredients}>
            <h3>Ingredients</h3>
            <ul className={styles.listIngredients}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className={styles.instructions}>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.likeButton} onClick={() => onLike(recipe.name)}>
            ❤️ Like
          </button>
          <button className={styles.cookButton} onClick={() => onCook(recipe.ingredients)}>
            Cook
          </button>
        </div>
      </div>
    </div>
  );
}
