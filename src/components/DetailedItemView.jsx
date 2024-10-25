import styles from "@/styles/DetailedItemView.module.css";
import { useState } from "react";

function DetailedItemView({ item, onBack }) {
  const [amount, setAmount] = useState(parseInt(item.quantity) || 0);

  const calculateDaysUntilExpiration = () => {
    const today = new Date();
    const expireDate = new Date(item.expireDate);
    const differenceInTime = expireDate - today;
    return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  };

  const daysUntilExpiration = calculateDaysUntilExpiration();

  const userId = "MtlWXrrdTQhg1Z080JCGAb4Mtfn1";

  const updateAmount = async (newAmount) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/user/${userId}/update_products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: [
              {
                productId: item.productId,
                category: item.category,
                quantity: newAmount,
                expireDate: item.expireDate,
                storedAt: item.storedAt,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        console.log("Product quantity updated successfully");
      } else {
        console.error("Failed to update product quantity");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleFinished = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/user/${userId}/delete_product`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: item.productId }),
        }
      );

      if (response.ok) {
        console.log("Product deleted successfully");
        onBack();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleFreezeToggle = async () => {
    const newLocation = item.storedAt === "Fridge" ? "Freezer" : "Fridge";

    try {
      const response = await fetch(
        `http://localhost:5001/api/user/${userId}/update_products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: [
              {
                productId: item.productId,
                category: item.category,
                quantity: amount,
                expireDate: item.expireDate,
                storedAt: newLocation,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        console.log(`Product moved to ${newLocation}`);
      } else {
        console.error("Failed to update product location");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleDecreaseAmount = () => {
    setAmount((prev) => {
      const newAmount = Math.max(prev - 100, 0);
      updateAmount(newAmount);
      return newAmount;
    });
  };

  const handleIncreaseAmount = () => {
    setAmount((prev) => {
      const newAmount = prev + 100;
      updateAmount(newAmount);
      return newAmount;
    });
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ←
      </button>
      <h2 className={styles.itemName}>{item.productId}</h2>
      <img
        src={item.imageUrl}
        alt={item.productId}
        className={styles.itemImage}
      />

      <div className={styles.amountControl}>
        <button onClick={handleDecreaseAmount}>-</button>
        <span>{amount}g</span>
        <button onClick={handleIncreaseAmount}>+</button>
      </div>

      <p>
        EXPIRES IN{" "}
        <span className={styles.expireDate}>{daysUntilExpiration} Days</span>
      </p>

      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={handleFreezeToggle}>
          {item.storedAt === "Fridge" ? "FREEZE" : "FRIDGE"}
        </button>
        <button className={styles.actionButton} onClick={handleFinished}>
          FINISHED
        </button>
      </div>
    </div>
  );
}

export default DetailedItemView;
