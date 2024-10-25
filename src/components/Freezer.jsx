import styles from "./../styles/Fridge.module.css";
import FoodTypeGrid from "./FoodTypeGrid";
import { useState } from "react";
import Modal from "./Modal";
import DetailedItemView from "./DetailedItemView";

function Freezer() {
  const [selectedItem, setSelectedItem] = useState(null);

  const foodData = {
    meals: [
      {
        id: 1,
        name: "Beef Stew",
        imageUrl: "/Images/cat/beef.png",
        amount: 200,
        expiryIn: 5,
      },
      {
        id: 2,
        name: "Salad",
        imageUrl: "/Images/cat/healthy.png",
        amount: 150,
        expiryIn: 3,
      },
    ],
    vegetables: [
      {
        id: 3,
        name: "Lettuce",
        imageUrl: "/Images/cat/vegetable.png",
        amount: 100,
        expiryIn: 7,
      },
      {
        id: 4,
        name: "Carrot",
        imageUrl: "/Images/cat/vegetable.png",
        amount: 100,
        expiryIn: 7,
      },
    ],
    fruits: [
      {
        id: 5,
        name: "Apple",
        imageUrl: "/Images/cat/fruit.png",
        amount: 120,
        expiryIn: 6,
      },
    ],
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => setSelectedItem(null);

  return (
    <div className={styles.grid}>
      {selectedItem && (
        <Modal onClose={closeModal}>
          <DetailedItemView item={selectedItem} onBack={closeModal} />
        </Modal>
      )}

      <FoodTypeGrid
        title="MEALS"
        items={foodData.meals}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="VEGETABLES"
        items={foodData.vegetables}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="FRUITS"
        items={foodData.fruits}
        onItemClick={handleItemClick}
      />
    </div>
  );
}

export default Freezer;
