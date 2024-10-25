'use client';
import { useState } from 'react';
import styles from '@/styles/recipeGenerator.module.css';

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    const content = `
      Genera una receta basada en los siguientes ingredientes: ${ingredients}.
      Ten en cuenta las siguientes preferencias: ${preferences}.
      Ten en cuenta las siguientes restricciones: ${restrictions}.
      Por favor incluye los pasos para preparar la receta y las cantidades aproximadas de cada ingrediente.
    `;
    console.log(content);

    // Aquí se haría la llamada al backend para obtener la receta generada.
    setGeneratedContent(content); // Simulación de respuesta.
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🍆 LET'S TRY SOMETHING NEW</h1>
      <h2 className={styles.subtitle}>ASK CHEF OPTI</h2>

      <div className={styles.inputBox}>
        <label>Ingredients</label>
        <textarea className={styles.textareaCosa}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
        />
      </div>

      <div className={styles.inputBox}>
        <label>Preferences</label>
        <textarea className={styles.textareaCosa}
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="Enter preferences (e.g., Vegan, Low-Carb)"
        />
      </div>

      <div className={styles.inputBox}>
        <label>Restrictions</label>
        <textarea
          value={restrictions}
          onChange={(e) => setRestrictions(e.target.value)}
          placeholder="Enter dietary restrictions (e.g., Nuts, Gluten-Free)"
        />
      </div>

      <button onClick={handleGenerate} className={styles.generateButton}>
        GENERATE
      </button>

      {generatedContent && (
        <div className={styles.result}>
          <h3>Generated Recipe:</h3>
          <p>{generatedContent}</p>
        </div>
      )}
    </div>
  );
}
