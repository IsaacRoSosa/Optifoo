'use client';
import { useState } from 'react';
import styles from '@/styles/recipeGenerator.module.css';
import { streamResponseChunks } from '../../../../backend/web/gemini-api';

function parseGeneratedRecipe(text) {
  function extractSection(text, sectionName) {
    const regex = new RegExp(`\\*\\*${sectionName}:\\*\\*(.*?)(?=\\*\\*|$)`, 's');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  }

  const titleMatch = text.match(/\*\*Title:\*\*\s*(.*?)(?:\n|$)/);
  const title = titleMatch ? titleMatch[1].trim() : 'Unknown Title';  

  const ingredientsText = extractSection(text, 'Ingredients');
  const ingredients = ingredientsText.split('\n').map(item => {
    const matchWithDescription = item.match(/\d+\.\s*(.*?):\s*(.*?),\s*(.*)/); 
    const matchWithoutDescription = item.match(/\d+\.\s*(.*?):\s*(.*)/);  

    if (matchWithDescription) {
      const name = matchWithDescription[1].trim();
      const quantity = matchWithDescription[2].trim();
      const description = matchWithDescription[3].trim();
      return { name, quantity, description };
    } else if (matchWithoutDescription) {
      const name = matchWithoutDescription[1].trim();
      const quantity = matchWithoutDescription[2].trim();
      return { name, quantity, description: '' };  
    }
    return null;
  }).filter(Boolean);

  const stepsText = extractSection(text, 'Steps');
  const steps = stepsText.split('\n').map(step => {
    const match = step.match(/\d+\.\s*(.*)/);  
    return match ? match[1].trim() : null;
  }).filter(Boolean);

  const dietaryText = extractSection(text, 'Dietary Considerations');
  const dietaryConsiderations = dietaryText.split('\n').map(item => item.replace('-', '').trim()).filter(Boolean);

  return {
    title,
    ingredients,
    steps,
    dietary_considerations: dietaryConsiderations
  };
}




export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [parsedRecipe, setParsedRecipe] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setGeneratedContent(''); 
    setParsedRecipe(null);

    const requestBody = {
      ingredients: ingredients.split(','), 
      preferences: preferences.split(','), 
      restrictions: restrictions.split(','), 
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

      let chunks = [];
      for await (let chunk of streamResponseChunks(response)) {
        chunks.push(chunk); 
      }

      const fullGeneratedText = chunks.join(''); 
      setGeneratedContent(fullGeneratedText);
      console.log(fullGeneratedText)

      const parsedRecipe = parseGeneratedRecipe(fullGeneratedText);
      setParsedRecipe(parsedRecipe); 
      console.log(parsedRecipe)

      

    } catch (err) {
      setError('Error generating the recipe. Please try again.');
      console.error('Error during recipe generation:', err);
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
          <h3>Generated Recipe (Raw):</h3>
          <p>{generatedContent}</p>
        </div>
      )}

      {parsedRecipe && (
        <div className={styles.result}>
          <h3>Generated Recipe (Parsed):</h3>
          <pre>{JSON.stringify(parsedRecipe, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
