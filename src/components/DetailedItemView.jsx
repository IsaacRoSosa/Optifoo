import styles from "@/styles/DetailedItemView.module.css";
import { useState } from "react";

function DetailedItemView({ item, onBack }) {
  const [amount, setAmount] = useState(item.amount);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ←
      </button>
      <h2 className={styles.itemName}>{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />

      <div className={styles.amountControl}>
        <button onClick={() => setAmount(amount - 100)}>-</button>
        <span>{amount}g</span>
        <button onClick={() => setAmount(amount + 100)}>+</button>
      </div>

      <p>
        EXPIRES IN{" "}
        <span className={styles.expiryDays}>{item.expiryIn} Days</span>
      </p>

      <div className={styles.actions}>
        <button className={styles.actionButton}>FREEZE</button>
        <button className={styles.actionButton}>DONE</button>
        <button className={styles.actionButton}>WASTED :(</button>
        <button className={styles.actionButton}>EDIT</button>
      </div>
    </div>
  );
}

export default DetailedItemView;
