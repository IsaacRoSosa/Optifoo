import styles from '@/styles/categoriesSlider.module.css';

export default function CategoriesSlider({ categories, onSelect }) {
  return (
    <div className={styles.slider}>
      {categories.map((category) => (
        <div
          key={category.name}
          className={`${styles.categoryCard} ${styles[category.name.toLowerCase()]}`}
          onClick={() => onSelect(category.name)}
        >
          <img className={styles.categoryIcon} src={category.icon} alt={category.name} />
          <p className={styles.title}>{category.name}</p>
        </div>
      ))}
    </div>
  );
}
