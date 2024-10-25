'use client';
import { useState, useEffect } from 'react';
import RecipePopup from '@/components/RecipePopup';
import CategoriesSlider from '@/components/CategoriesSlider';
import RecipeList from '@/components/RecipeList';
import styles from '@/styles/recipesPage.module.css';

export default function MainPage({ userId }) {
  const [recipes, setRecipes] = useState([]); // Recetas obtenidas de la API
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/getrecipies', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
      console.log('Data from API:', data); // Verifica el contenido
  
      if (response.ok && data.recipies) {
        const userRecipes = data.recipies.filter(
          (recipe) => recipe.bePublic || recipe.madeBy === userId
        );
        setRecipes(userRecipes); // Guardamos las recetas en el estado
      } else {
        console.error('Error al obtener las recetas o la estructura es incorrecta:', data);
        setError('Error al cargar las recetas.');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      setError('Error al cargar las recetas.');
    }
  };
  

  // Cargar recetas al montar el componente
  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleLike = (recipeName) => {
    console.log(`Liked recipe: ${recipeName}`);
  };

  const handleCook = (ingredients) => {
    console.log(`Used ingredients: ${ingredients.join(', ')}`);
  };

  const handleOpenPopup = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClosePopup = () => {
    setSelectedRecipe(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSelectAllCategories = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((cat) => cat.name));
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      (Array.isArray(recipe.categories) && 
       recipe.categories.some((cat) => selectedCategories.includes(cat))); // Verifica si hay categorías
  
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const categories = [
    { name: 'Breakfast', icon: '/Images/cat/breakfast.png' },
    { name: 'Lunch', icon: '/Images/cat/lunch.png' },
    { name: 'Dinner', icon: '/Images/cat/dinner.png' },
    { name: 'Vegetarian', icon: '/Images/cat/vegetarian.png' },
    { name: 'Beef', icon: '/Images/cat/beef.png' },
    { name: 'Seafood', icon: '/Images/cat/seafood.png' },
    { name: 'Dessert', icon: '/Images/cat/dessert.png' },
    { name: 'Snack', icon: '/Images/cat/snack.png' },
    { name: 'Chicken', icon: '/Images/cat/chicken.png' },
    { name: 'Pork', icon: '/Images/cat/pork.png' },
    { name: 'Mexican', icon: '/Images/cat/mexican.png' },
    { name: 'Healthy', icon: '/Images/cat/healthy.png' },
    {name: 'Glueten Free', icon: 'https://cdn-icons-png.flaticon.com/512/5009/5009812.png'},
  ];

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBar}
        />
        <button onClick={handleSelectAllCategories} className={styles.actionButton}>
          {selectedCategories.length === categories.length
            ? 'Deselect All Categories'
            : 'Select All Categories'}
        </button>
      </div>

      <CategoriesSlider
        categories={categories}
        onSelect={handleCategorySelect}
        selectedCategories={selectedCategories}
      />

      <RecipeList
        recipes={filteredRecipes}
        onLike={handleLike}
        onOpenPopup={handleOpenPopup}
      />

      {selectedRecipe && (
        <RecipePopup
          recipe={selectedRecipe}
          onClose={handleClosePopup}
          onLike={handleLike}
          onCook={handleCook}
        />
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
