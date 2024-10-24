import styles from "@/styles/Fridge.module.css";

function FoodTypeGrid({ title }) {
  return (
    <div>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.gridItems}></div>
    </div>
  );
}

export default FoodTypeGrid;
