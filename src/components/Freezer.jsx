import styles from "./../styles/Fridge.module.css";
import FoodTypeGrid from "./FoodTypeGrid";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import DetailedItemView from "./DetailedItemView";

function Freezer() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [foodData, setFoodData] = useState({
    meals: [],
    vegetables: [],
    fruits: [],
  });

  useEffect(() => {
    const fetchFreezerItems = async () => {
      const userId = "placeholder_user_id";

      try {
        const response = await fetch(
          `http://localhost:5001/api/user/${userId}/get_products`
        );
        const data = await response.json();

        if (response.ok) {
          const freezerItems = data.products.filter(
            (product) => product.storageLocation === "Freezer"
          );
          const categorizedItems = {
            meals: freezerItems.filter((item) => item.category === "Meal"),
            vegetables: freezerItems.filter(
              (item) => item.category === "Vegetable"
            ),
            fruits: freezerItems.filter((item) => item.category === "Fruit"),
          };

          setFoodData(categorizedItems);
        } else {
          console.error("Error fetching freezer items:", data.error);
        }
      } catch (error) {
        console.error("Error fetching freezer items:", error);
      }
    };

    fetchFreezerItems();
  }, []);

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
