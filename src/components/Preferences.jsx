import React, { useState, useEffect } from "react";
import "../styles/Preferences.css";  

import {
  getAllergiesFromUser,
  getDietsFromUser,
  addAllergyToUser,
  addDietToUser,
  deleteAllergyFromUser,
  deleteDietFromUser,
} from "../api";  // Ajusta la ruta del archivo donde defines tus métodos API

const Preferences = () => {
  const userId = "123"; 
  const [user, setUser] = useState({
    name: "Isaac",
    avatar: "/Images/egg-smile.png",  
    allergies: [],
    diets: [],
  });
  
  const [newAllergy, setNewAllergy] = useState("");  
  const [newDiet, setNewDiet] = useState("");        

  useEffect(() => {
    async function fetchUserPreferences() {
      try {
        const allergies = await getAllergiesFromUser(userId);
        const diets = await getDietsFromUser(userId);
        setUser((prevUser) => ({
          ...prevUser,
          allergies: allergies || [],
          diets: diets || [],
        }));
      } catch (error) {
        console.error("Error al obtener preferencias del usuario:", error);
      }
    }
    fetchUserPreferences();
  }, [userId]);

  const handleAddAllergy = async () => {
    if (newAllergy) {
      try {
        await addAllergyToUser(userId, newAllergy);
        setUser((prevUser) => ({
          ...prevUser,
          allergies: [...prevUser.allergies, newAllergy],
        }));
        setNewAllergy(""); 
      } catch (error) {
        console.error("Error al añadir la alergia:", error);
      }
    }
  };

  const handleAddDiet = async () => {
    if (newDiet) {
      try {
        await addDietToUser(userId, newDiet);
        setUser((prevUser) => ({
          ...prevUser,
          diets: [...prevUser.diets, newDiet],
        }));
        setNewDiet(""); 
      } catch (error) {
        console.error("Error al añadir la dieta:", error);
      }
    }
  };

  const handleDeleteAllergy = async (allergy) => {
    try {
      await deleteAllergyFromUser(userId, allergy);
      setUser((prevUser) => ({
        ...prevUser,
        allergies: prevUser.allergies.filter((a) => a !== allergy),
      }));
    } catch (error) {
      console.error("Error al eliminar la alergia:", error);
    }
  };

  const handleDeleteDiet = async (diet) => {
    try {
      await deleteDietFromUser(userId, diet);
      setUser((prevUser) => ({
        ...prevUser,
        diets: prevUser.diets.filter((d) => d !== diet),
      }));
    } catch (error) {
      console.error("Error al eliminar la dieta:", error);
    }
  };

  return (
    <div className="preferences-container">
      <header className="app-header">
        <h1>OPTIFOOD</h1>
        <nav>
          <ul>
            <li>Pantry</li>
            <li>Waste Prevented</li>
            <li>Recipes</li>
            <li>Recipe Generator</li>
          </ul>
        </nav>
        <img className="profile-icon" src={user.avatar} alt="User Icon" />
      </header>

      <section className="user-profile">
        <img src={user.avatar} alt="User Avatar" className="user-avatar" />
        <h2>{user.name}</h2>
      </section>

      <section className="user-preferences">
        <h3>Alergias:</h3>
        <ul>
          {user.allergies.map((allergy, index) => (
            <li key={index}>
              {allergy} 
              <button onClick={() => handleDeleteAllergy(allergy)}>Eliminar</button>
            </li>
          ))}
        </ul>

        <input
          type="text"
          value={newAllergy}
          onChange={(e) => setNewAllergy(e.target.value)}
          placeholder="Añadir nueva alergia"
        />
        <button onClick={handleAddAllergy}>Añadir Alergia</button>

        <h3>Dietas:</h3>
        <ul>
          {user.diets.map((diet, index) => (
            <li key={index}>
              {diet} 
              <button onClick={() => handleDeleteDiet(diet)}>Eliminar</button>
            </li>
          ))}
        </ul>

        <input
          type="text"
          value={newDiet}
          onChange={(e) => setNewDiet(e.target.value)}
          placeholder="Añadir nueva dieta"
        />
        <button onClick={handleAddDiet}>Añadir Dieta</button>
      </section>
    </div>
  );
};

export default Preferences;
