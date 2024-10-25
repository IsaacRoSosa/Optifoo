import styles from '@/styles/AirecipePopup.module.css';

export default function AiPopUp({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
        <img className={styles.close} src="/Images/icons/cloose.png" alt=" close" />
        </button>
        <h2 className={styles.recipeTitle}>{recipe.title}</h2>
        <img src="/Images/icons/OptiChef.png" alt={recipe.title} className={styles.recipeImage} />
     

        <div className={styles.infoBlock}>
          <p className={styles.category}>
            <img src="/Images/icons/utensils.png" alt="OptiChef" className={styles.icon} />{' '}
            OptiChef
          </p>
        </div>

        <div className={styles.columns}>
          <div className={styles.ingredients}>
            <h3 className={styles.subTitles}>Ingredients</h3>
            <ul className={styles.listIngredients}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <strong>{ingredient.name}:</strong> {ingredient.quantity} {ingredient.description}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.instructions}>
            <h3 className={styles.subTitles}>Instructions</h3>
            <ol className={styles.listInstructions}>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.cookButton}>SAVE </button>
        </div>
      </div>
    </div>
  );
}
