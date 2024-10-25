import styles from '@/styles/recipePopup.module.css';

export default function RecipePopup({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <h2>{recipe.name}</h2>
        <img src={recipe.image} alt={recipe.name} />
        <div className={styles.popupInfo}>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
