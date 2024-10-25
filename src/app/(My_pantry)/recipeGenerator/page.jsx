'use client';
import { useState } from 'react';
import styles from '@/styles/recipeGenerator.module.css';
import { streamResponseChunks } from '../../../../backend/web/gemini-api';

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [parsedRecipe, setParsedRecipe] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

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
      setGeneratedContent(fullGeneratedText);

      console.log(fullGeneratedText)
      

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
    setGeneratedContent(''); 
    setParsedRecipe(null);  
    setGeneratedImage(null);

    const requestBody = {
      ingredients: ingredients.split(','), 
      preferences: preferences.split(','), 
      restrictions: restrictions.split(','), 
    };

    try {
      await Promise.all([
        handleGenerate(requestBody)
      ]);
    } catch (error) {
      setError('Error generating the recipe or image. Please try again.');
      console.error('Error during generation:', error);
    } finally {
      setLoading(false);
    }
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

      {error && <p className={styles.error}>{error}</p>}  {}

      {generatedContent && (
        <div className={styles.result}>
          <h3>Generated Recipe (Raw):</h3>
          <p>{generatedContent}</p>
        </div>
      )}
      
    </div>
  );
}
