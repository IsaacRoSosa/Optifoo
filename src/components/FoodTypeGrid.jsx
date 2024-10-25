import styles from "@/styles/Fridge.module.css";

function FoodTypeGrid({ title, items, onItemClick }) {
  return (
    <div>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.gridItems}>
        {items.map((item) => (
          <div
            key={item.productId}
            className={styles.item}
            onClick={() => onItemClick(item)}
          >
            <img src={item.url_product} className={styles.image} />
            <div>{item.productId}</div>
            <div>{item.quantity}g</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodTypeGrid;
