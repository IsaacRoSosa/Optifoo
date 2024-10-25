import styles from "@/styles/Fridge.module.css";

function FoodTypeGrid({ title, items, onItemClick }) {
  return (
    <div>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.gridItems}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.item}
            onClick={() => onItemClick(item)}
          >
            <img src={item.imageUrl} alt={item.name} className={styles.image} />
            <div>{item.name}</div>
            <div>{item.amount}g</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodTypeGrid;
