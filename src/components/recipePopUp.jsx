import styles from '@/styles/recipePopup.module.css';

export default function RecipePopup({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img className={styles.close} src="/Images/icons/cloose.png" alt="close" />
        </button>

        <h2 className={styles.recipeTitle}>{recipe.title}</h2>
        <img
          src={recipe.image || '/Images/icons/OptiChef.png'} // Imagen por 
          alt={recipe.title}
          className={styles.recipeImage}
        />

        <div className={styles.columns}>

          <div className={styles.ingredients}>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={ingredient.idProduct || index}>
                  <strong>{ingredient.name}</strong>: {ingredient.quantity}
                  {ingredient.description && ` (${ingredient.description})`}
                </li>
              ))}
            </ul>
          </div>

          {/* Instrucciones */}
          <div className={styles.steps}>
            <h3>Instructions</h3>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
