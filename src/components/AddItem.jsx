import React, { useState, useEffect } from "react";
import styles from "@/styles/AddItem.module.css";
import { useAuth } from "@/hooks/useAuth";

function AddItem({ onBackClick }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    item: "",
    category: "",
    expiryDate: "",
    quantity: "",
    storageLocation: "",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/getproducts");
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        } else {
          console.error("Error fetching products:", data.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "item") {
      const selectedProduct = products.find(
        (product) => product.name === value
      );
      setFormData((prevData) => ({
        ...prevData,
        item: value,
        category: selectedProduct ? selectedProduct.category : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userUid = user?.id || localStorage.getItem("user_uid");

    try {
      const response = await fetch(
        `http://localhost:5001/api/user/${userUid}/update_products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: [
              {
                productId: formData.item,
                category: formData.category,
                quantity: formData.quantity,
                expireDate: formData.expiryDate,
                storedAt: formData.storageLocation,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Product added successfully:", data.message);
        onBackClick();
      } else {
        console.error("Error adding product:", data.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const isFormValid =
    formData.item &&
    formData.category &&
    formData.expiryDate &&
    formData.quantity &&
    formData.storageLocation;

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label htmlFor="item" className={styles.formLabel}>
            SELECT A PRODUCT
          </label>
          <select
            id="item"
            name="item"
            className={styles.formInput}
            value={formData.item}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a product
            </option>
            {products.map((product) => (
              <option key={product.idProducto} value={product.name}>
                {product.name} ({product.category})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <label htmlFor="expiryDate" className={styles.formLabel}>
            WHEN DOES IT EXPIRE
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            className={styles.formInput}
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="quantity" className={styles.formLabel}>
            SELECT A QUANTITY
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className={styles.formInput}
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="storageLocation" className={styles.formLabel}>
            WHERE IS IT STORED
          </label>
          <select
            id="storageLocation"
            name="storageLocation"
            className={styles.formInput}
            value={formData.storageLocation}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a storage location
            </option>
            <option value="Fridge">Fridge</option>
            <option value="Freezer">Freezer</option>
          </select>
        </div>

        <button
          type="submit"
          className={styles.addButton}
          disabled={!isFormValid}
        >
          ADD ITEM
        </button>
      </form>
    </div>
  );
}

export default AddItem;
