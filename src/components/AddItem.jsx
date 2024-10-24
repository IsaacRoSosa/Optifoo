import React, { useState } from "react";
import styles from "@/styles/AddItem.module.css";

function AddItem({ onBackClick }) {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    icon: null,
    expiryDate: "",
    quantity: "",
    storageLocation: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setFormData({ ...formData, icon: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBackClick}>
        ←
      </button>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label htmlFor="itemName" className={styles.formLabel}>
            WHAT ARE YOU STORING
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            className={styles.formInput}
            value={formData.itemName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="category" className={styles.formLabel}>
            SELECT A CATEGORY
          </label>
          <select
            id="category"
            name="category"
            className={styles.formInput}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="meat">Meat</option>
          </select>
        </div>

        <div className={styles.formRow}>
          <label htmlFor="icon" className={styles.formLabel}>
            SELECT AN ICON
          </label>
          <input
            type="file"
            id="icon"
            name="icon"
            accept="image/*"
            className={styles.formInput}
            onChange={handleChange}
          />
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
            <option value="Fridge">Fridge</option>
            <option value="Freezer">Freezer</option>
          </select>
        </div>

        <button type="submit" className={styles.addButton}>
          ADD ITEM
        </button>
      </form>
    </div>
  );
}

export default AddItem;
