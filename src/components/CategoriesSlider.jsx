import styles from '@/styles/categoriesSlider.module.css';

export default function CategoriesSlider({ categories, onSelect, selectedCategories }) {
  return (
    <div className={styles.slider}>
      {categories.map((category) => (
        <div
          key={category.name}
          className={`${styles.categoryCard} ${
            selectedCategories.includes(category.name) ? styles.selected : ''
          } ${styles[category.name.toLowerCase()]}`}
          onClick={() => onSelect(category.name)}
        >
          <img className={styles.categoryIcon} src={category.icon} alt={category.name} />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
}
