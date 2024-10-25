import styles from '@/styles/categoriesSlider.module.css';

export default function CategoriesSlider({ categories, onSelect }) {
  return (
    <div className={styles.slider}>
      {categories.map((category) => (
        <div
          key={category.name}
          className={styles.categoryCard}
          onClick={() => onSelect(category.name)}
        >
          <img style={styles.icon} src={category.icon} alt={category.name} />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
}
