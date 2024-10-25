"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/Pantry.module.css";
import ButtonGroup from "@/components/ButtonGroup";
import Fridge from "@/components/Fridge";
import AddItem from "@/components/AddItem";
import Freezer from "@/components/Freezer";

function Pantry() {
  const [selectedTab, setSelectedTab] = useState("FRIDGE");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      const userId = "MtlWXrrdTQhg1Z080JCGAb4Mtfn1";

      try {
        const response = await fetch(
          `http://localhost:5001/api/user/${userId}/get_products`
        );
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        } else {
          console.error("Error fetching user products:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchUserProducts();
  }, []);
  const fridgeProducts = products.filter(
    (product) => product.storedAt === "Fridge"
  );
  const freezerProducts = products.filter(
    (product) => product.storedAt === "Freezer"
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>MY PANTRY</h1>
      {selectedTab !== "ADD" && <ButtonGroup setSelectedTab={setSelectedTab} />}
      {selectedTab === "FRIDGE" && <Fridge products={fridgeProducts} />}
      {selectedTab === "FREEZER" && <Freezer products={freezerProducts} />}
      {selectedTab === "ADD" && (
        <AddItem onBackClick={() => setSelectedTab("FRIDGE")} />
      )}
    </div>
  );
}

export default Pantry;
