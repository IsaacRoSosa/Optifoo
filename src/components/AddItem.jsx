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
        <input
          type="text"
          name="itemName"
          placeholder="What are you storing"
          className={styles.formInput}
          value={formData.itemName}
          onChange={handleChange}
        />
        <select
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
        <input
          type="file"
          name="icon"
          accept="image/*"
          className={styles.formInput}
          onChange={handleChange}
        />
        <input
          type="date"
          name="expiryDate"
          className={styles.formInput}
          value={formData.expiryDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Select a quantity"
          className={styles.formInput}
          value={formData.quantity}
          onChange={handleChange}
        />
        <input
          type="text"
          name="storageLocation"
          className={styles.formInput}
          value={formData.storageLocation}
          placeholder="Write a location"
          onChange={handleChange}
        />
        <button type="submit" className={styles.addButton}>
          ADD ITEM
        </button>
      </form>
    </div>
  );
}

export default AddItem;
