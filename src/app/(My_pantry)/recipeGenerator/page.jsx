'use client';
import { useState } from 'react';
import styles from '@/styles/recipeGenerator.module.css';
import { streamResponseChunks } from '../../../../backend/web/gemini-api';
import AiPopUp from '@/components/AiPopUp';
import CookingLoader from '@/components/CookingLoader';
import RecipeContainer from '@/components/RecipeContainer';

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [parsedRecipe, setParsedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const cleanJSON = (text) => {
    
    return text.replace(/```json|```|\\n/g, '').trim();
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
      const recipe = JSON.parse(cleanedText); // Parseamos el JSON limpio

      setGeneratedRecipes((prev) => [...prev, recipe]);
    } catch (err) {
      setError('Error generating the recipe. Please try again.');
      console.error('Error during recipe generation:', err);
    } finally {
      setLoading(false);
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
        <AiPopUp recipe={parsedRecipe} onClose={onClosePopup} />
      )}
    </div>
  );
}
