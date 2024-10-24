import styles from "@/styles/Fridge.module.css";
import { useState } from "react";
import FoodTypeGrid from "./FoodTypeGrid";

function Freezer() {
  const [lettuceAmount, setLettuceAmount] = useState(100);
  const [carrotAmount, setCarrotAmount] = useState(100);
  return (
    <div className={styles.grid}>
      <FoodTypeGrid title="MEALS" />
      <FoodTypeGrid title="VEGETABLES" />
      <FoodTypeGrid title="FRUITS" />
      <FoodTypeGrid title="PANTRY STAPLES" />
      <FoodTypeGrid title="FROZEN FOODS" />
      <FoodTypeGrid title="BEVERAGES" />
      <FoodTypeGrid title="BREAD & BAKERY" />
      <FoodTypeGrid title="DAIRY & EGGS" />
      <FoodTypeGrid title="MEAT & SEAFOOD" />
    </div>
  );
}

export default Freezer;
