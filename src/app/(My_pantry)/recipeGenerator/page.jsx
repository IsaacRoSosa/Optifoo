'use client';
import { useState } from 'react';
import styles from '@/styles/recipeGenerator.module.css';
import { streamResponseChunks } from '../../../../backend/web/gemini-api';
import AiPopUp from '@/components/AiPopUp';
import CookingLoader from '@/components/CookingLoader';
import { useAuth } from '@/hooks/useAuth'; 
import RecipeContainer from '@/components/RecipeContainer';

export default function RecipeGenerator() {
  const { user } = useAuth(); // Hook de autenticación
  const userId = user?.id || localStorage.getItem('user_uid'); // ID del usuario autenticado
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [parsedRecipe, setParsedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const cleanJSON = (text) => {
    
    const cleaned = text
    .replace(/```json|```/g, '') // Remueve etiquetas de bloque
    .replace(/\\n/g, '') // Remueve saltos de línea
    .trim(); // Elimina espacios al inicio y final



    return cleaned;
  };

  const handleGenerate = async (requestBody) => {
    try {
      const response = await fetch('http://localhost:5001/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Error generating the recipe');
      }

      let chunks = [];
      for await (let chunk of streamResponseChunks(response)) {
        chunks.push(chunk);
      }

      const fullGeneratedText = chunks.join('');
      console.log('Received:', fullGeneratedText);

      const cleanedText = cleanJSON(fullGeneratedText);
      console.log('Cleaned Text:', cleanedText);

      const recipe = JSON.parse(cleanedText); // Parseamos el JSON limpio

      setGeneratedRecipes((prev) => [...prev, recipe]);
    } catch (err) {
      setError('Error generating the recipe. Please try again.');
      console.error('Error during recipe generation:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = async (recipe) => {
    const newRecipe = {
      title: recipe.title,
      ingredients: recipe.ingredients,
      timeToPrepare: "",
      bePublic: true,  // Receta pública
      madeBy: userId || 'OptiChef',  // Propietario de la receta
      categories: ['OptiChef'],
      steps: recipe.steps,
    };

    try {
      const response = await fetch('http://localhost:5001/api/addrecipy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Receta guardada:', data);
      } else {
        console.error('Error al guardar la receta:', data);
      }
    } catch (error) {
      console.error('Error inesperado al guardar la receta:', error);
    }
  };




  const generateContent = async () => {
    setLoading(true);
    setError(null);

    const requestBody = {
      ingredients: ingredients.split(',').map((ing) => ing.trim()),
      preferences: preferences.split(',').map((pref) => pref.trim()),
      restrictions: restrictions.split(',').map((res) => res.trim()),
    };

    try {
      await handleGenerate(requestBody);
    } catch (error) {
      setError('Error generating the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onOpenPopup = (recipe) => {
    setParsedRecipe(recipe);
    setShowPopup(true);
  };

  const onClosePopup = () => {
    setShowPopup(false);
    setParsedRecipe(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🍆 LET'S TRY SOMETHING NEW</h1>
      <h2 className={styles.subtitle}>ASK CHEF OPTI</h2>

      <div className={styles.inputBox}>
        <label>Ingredients</label>
        <textarea
          className={styles.textareaCosa}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
        />
      </div>

      <div className={styles.inputBox}>
        <label>Preferences</label>
        <textarea
          className={styles.textareaCosa}
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="Enter preferences (e.g., Vegan, Low-Carb)"
        />
      </div>

      <div className={styles.inputBox}>
        <label>Restrictions</label>
        <textarea
          className={styles.textareaCosa}
          value={restrictions}
          onChange={(e) => setRestrictions(e.target.value)}
          placeholder="Enter dietary restrictions (e.g., Nuts, Gluten-Free)"
        />
      </div>

      <button onClick={generateContent} className={styles.generateButton} disabled={loading}>
        {loading ? 'Generating...' : 'GENERATE'}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {loading && <CookingLoader />}

      <div className={styles.containerRecip}>

        <RecipeContainer recipes={generatedRecipes} onOpenPopup={onOpenPopup} />
      </div>



      {showPopup && parsedRecipe && (
        <AiPopUp recipe={parsedRecipe} onClose={onClosePopup} onSave={saveRecipe}/>
      )}
    </div>
  );
}
