import styles from "@/styles/recipePopup.module.css";

export default function RecipePopUp({ recipe, onClose, onLike, onCook }) {
  if (!recipe) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img
            className={styles.close}
            src="/Images/icons/cloose.png"
            alt="close"
          />
        </button>

        <div className={styles.recipeImageContainer}>
          <img
            src={recipe.imageUrl || "/Images/icons/OptiChef.png"}
            alt={recipe.title}
            className={styles.recipeImage}
          />
          <button
            className={styles.heartButton}
            onClick={(e) => {
              e.stopPropagation();
              onLike(recipe.title);
            }}
          >
            ❤️
          </button>
        </div>

        <div className={styles.recipeDetails}>
          <h3 className={styles.recipeTitle}>{recipe.title}</h3>

          <div className={styles.infoBlock}>
            <p className={styles.info}>
              <img
                src="/Images/icons/utensils.png"
                alt="category"
                className={styles.icon}
              />
              {recipe.categories ? recipe.categories.join(", ") : "Optichef"}
            </p>
            <p className={styles.info}>
              <img
                src="/Images/icons/time.png"
                alt="time"
                className={styles.icon}
              />
              {recipe.timeToPrepare}
            </p>
          </div>

          <div className={styles.columns}>
            <div className={styles.ingredients}>
              <h3 className={styles.subTitles}>Ingredients</h3>
              <ul className={styles.listIngredients}>
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    className={styles.text}
                    key={ingredient.idProduct || index}
                  >
                    <strong>{ingredient.name}</strong>: {ingredient.quantity}
                    {ingredient.description && ` (${ingredient.description})`}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.instructions}>
              <h3 className={styles.subTitles}>Instructions</h3>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li className={styles.text} key={index}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <button
            className={styles.cookButton}
            onClick={() => onCook(recipe.ingredients)}
          >
            Cook
          </button>
        </div>
      </div>
    </div>
  );
}
