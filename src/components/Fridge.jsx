import styles from "./../styles/Fridge.module.css";
import FoodTypeGrid from "./FoodTypeGrid";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import DetailedItemView from "./DetailedItemView";

function Freezer() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [userProducts, setUserProducts] = useState({
    meals: [],
    vegetables: [],
    fruits: [],
  });

  useEffect(() => {
    const fetchUserProducts = async () => {
      const userId = "placeholder_user_id"; // REEMPLAZAR POR EL ID DEL USUARIO

      try {
        const response = await fetch(
          `http://localhost:5001/api/user/${userId}/get_products`
        );
        const data = await response.json();

        if (response.ok) {
          const categorizedProducts = {
            meals: data.products.filter(
              (product) => product.category === "Meal"
            ),
            vegetables: data.products.filter(
              (product) => product.category === "Vegetable"
            ),
            fruits: data.products.filter(
              (product) => product.category === "Fruit"
            ),
          };

          setUserProducts(categorizedProducts);
        } else {
          console.error("Error fetching user products:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchUserProducts();
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
        items={userProducts.meals}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="VEGETABLES"
        items={userProducts.vegetables}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="FRUITS"
        items={userProducts.fruits}
        onItemClick={handleItemClick}
      />
    </div>
  );
}

export default Freezer;
