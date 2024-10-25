'use client';
import { useState } from 'react';
import styles from '@/styles/recipeGenerator.module.css';

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState(null); // Para manejar errores
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!ingredients) {
      setError('Please enter at least one ingredient.');
      return;
    }

    setLoading(true);
    setError(null);

    const requestBody = {
      ingredients: ingredients.split(','),
      preferences: preferences.split(','),
      restrictions: restrictions.split(',')
    };

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

      const data = await response.text();
      setGeneratedContent(data);
    } catch (err) {
      setError('Error generating the recipe. Please try again.');
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

      <button onClick={handleGenerate} className={styles.generateButton} disabled={loading}>
        {loading ? 'Generating...' : 'GENERATE'}
      </button>

      {error && <p className={styles.error}>{error}</p>}  {}
      {generatedContent && (
        <div className={styles.result}>
          <h3>Generated Recipe:</h3>
          <p>{generatedContent}</p>
        </div>
      )}
    </div>
  );
}
