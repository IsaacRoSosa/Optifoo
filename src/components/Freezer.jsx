import styles from "./../styles/Fridge.module.css";
import FoodTypeGrid from "./FoodTypeGrid";
import { useState } from "react";
import Modal from "./Modal";
import DetailedItemView from "./DetailedItemView";

function Freezer({ products }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const categorizedProducts = {
    meals: products.filter((product) => product.category === "Meal"),
    vegetables: products.filter((product) => product.category === "Vegetable"),
    fruits: products.filter((product) => product.category === "Fruit"),
    seafood: products.filter((product) => product.category === "Seafood"),
    meat: products.filter((product) => product.category === "Meat"),
    fish: products.filter((product) => product.category === "Fish"),
    grain: products.filter((product) => product.category === "Grain"),
    dairy: products.filter((product) => product.category === "Dairy"),
    protein: products.filter((product) => product.category === "Protein"),
    oil: products.filter((product) => product.category === "Oil"),
    nuts: products.filter((product) => product.category === "Nuts"),
    mushroom: products.filter((product) => product.category === "Mushroom"),
    legume: products.filter((product) => product.category === "Legume"),
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
        items={categorizedProducts.meals}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="VEGETABLES"
        items={categorizedProducts.vegetables}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="FRUITS"
        items={categorizedProducts.fruits}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="SEAFOOD"
        items={categorizedProducts.seafood}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="MEAT"
        items={categorizedProducts.meat}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="FISH"
        items={categorizedProducts.fish}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="GRAIN"
        items={categorizedProducts.grain}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="DAIRY"
        items={categorizedProducts.dairy}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="PROTEIN"
        items={categorizedProducts.protein}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="OIL"
        items={categorizedProducts.oil}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="NUTS"
        items={categorizedProducts.nuts}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="MUSHROOM"
        items={categorizedProducts.mushroom}
        onItemClick={handleItemClick}
      />
      <FoodTypeGrid
        title="LEGUME"
        items={categorizedProducts.legume}
        onItemClick={handleItemClick}
      />
    </div>
  );
}

export default Freezer;
