import React, { useState, useEffect } from "react";
import styles from "@/styles/AddItem.module.css";
import SendImageButton from "./SendImageButton";

const detectImage = async (imageFile, setResponse) => {
  const url = 'http://localhost:5001/api/detect';
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(url, { method: 'POST', body: formData });
    const data = await response.json();

    if (response.ok) {
      console.log('Server response:', data);
      setResponse(data); // Actualiza el estado con la respuesta de la API
    } else {
      console.error(`Request error: ${response.status} - ${data.error}`);
    }
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

const extractTextFromImage = async (imageFile, setResponse) => {
  const url = 'http://localhost:5001/api/ocr';
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(url, { method: 'POST', body: formData });
    const data = await response.json();

    if (response.ok) {
      console.log('Server response:', data);
      setResponse(data); // Actualiza el estado con la respuesta de la API
    } else {
      console.error(`Request error: ${response.status} - ${data.error}`);
    }
  } catch (error) {
    console.error('Error sending request:', error);
  }
};


function AddItem({ onBackClick }) {
  const [formData, setFormData] = useState({
    item: "",
    category: "",
    expiryDate: "",
    quantity: "",
    storageLocation: "",
  });

  const [products, setProducts] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const [response, setResponse] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid JPG image.');
    }
  };

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

    const userId = "MtlWXrrdTQhg1Z080JCGAb4Mtfn1";

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
              <option
                key={product.productId || product.name}
                value={product.name}
              >
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

        <button type="submit" className={styles.addButton} disabled={!isFormValid}>
            ADD ITEM
        </button>

        <div style={{backgroundColor: "black",
            padding: "10px",
            borderRadius: "8px", marginTop: "20px"}}>


          <div style={{ marginTop: '20px' }}>
            <input type="file" accept="image/jpeg" onChange={handleFileChange} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <SendImageButton
                imageFile={selectedFile}
                onClickFunction={(image) => detectImage(image, setResponse)}
                buttonText="Detect Image"
              />
              <SendImageButton
                imageFile={selectedFile}
                onClickFunction={(image) => extractTextFromImage(image, setResponse)}
                buttonText="Extract Text"
              />
            </div>
          </div>

          <div style={{ 
            marginTop: '20px', 
            color: "white", 
          }}>
            <h3>Detected Items:</h3>
            <ul>
              {response.length > 0 ? (
                response.map((item, index) => (
                  <li key={index}>
                    {item.quantity} - {item.element}
                  </li>
                ))
              ) : (
                <li>No items detected</li>
              )}
            </ul>
          </div>
        </div>
        
      </form>
    </div>
  );
}

export default AddItem;
